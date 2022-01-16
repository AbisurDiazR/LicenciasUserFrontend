import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Img, PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';
import { CurrencyPipe } from '@angular/common';
import { FUNDAMENT, PORTAL, VALIDATE } from 'src/app/shared/data';
import { LogosService } from 'src/app/services/logos.service';
import { LicenciasService } from 'src/app/services/licencias.service';
import { FormatosService } from 'src/app/services/formatos.service';

@Component({
  selector: 'app-alta-licencias',
  templateUrl: './alta-licencias.component.html',
  styleUrls: ['./alta-licencias.component.scss']
})
export class AltaLicenciasComponent implements OnInit {

  public id_licencia!: string | null;
  public licencia: any;
  public textQr!: string;
  public defaultSize: number = 9;
  public logoObject!: any;
  public titleSize: number = 19;
  public formatoObject!: any;

  constructor(
    private _licenciasService: LicenciasService,
    private _route: ActivatedRoute,
    private _currency: CurrencyPipe,
    private _logoService: LogosService,
    private _formatosService: FormatosService
  ) { }

  ngOnInit(): void {
    this.id_licencia = this._route.snapshot.paramMap.get('id');
    this.setlicencia(this.id_licencia);
    this.getLogos();
    this.getFormatos();
  }
  getFormatos() {
    this._formatosService.getUidDocument().then((res: any) => {
      res.forEach((doc: any) => {
        this.formatoObject = {
          licFrenteMunicipio: doc.data().levelLowformato,
          licVueltaMunicipio: doc.data().levelOneformato,
          licFrenteEstado: doc.data().levelTwoformato,
          licVueltaEstado: doc.data().levelThreeformato
        }
      });
      console.log(this.formatoObject);
    });
  }
  getLogos() {
    this._logoService.getUidDocument().then((res: any) => {
      res.forEach((doc: any) => {
        this.logoObject = {
          left: doc.data().levelLowlogo,
          right: doc.data().levelOnelogo
        }
      });
    });
  }

  public setQrText() {
    this.textQr = `[licencia-AUTÉNTICO][MUNICIPIO-CUAUTEPEC-GRO]
    Folio: ${this.licencia.folio}/
    Marca: ${this.licencia.vehicleBrand}/Línea: ${this.licencia.vehicleLine}/
    Modelo: ${this.licencia.vehicleModel}/
    Núm. Serie: ${this.licencia.vehicleSerialNumber}/
    Núm. Motor: ${this.licencia.vehicleMotorNumber} /Fecha vencimiento: ${this.licencia.expirationDate}/`;
  }

  public setlicencia(id_licencia: string | null) {
    this._licenciasService.getLicenciaById(id_licencia).subscribe((res: any) => {
      this.licencia = { id: res.id, ...res.data() };
    });
  }

  public async generateFormat() {
    this.setQrText();
    let imageOne!: any;
    let imageTwo!: any;
    if (this.licencia.format === 'Municipal') {
      imageOne = this.formatoObject.licFrenteMunicipio;
      imageTwo = this.formatoObject.licVueltaMunicipio;
    } else {
      imageOne = this.formatoObject.licFrenteEstado;
      imageTwo = this.formatoObject.licVueltaEstado;
    }
    const pdf = new PdfMakeWrapper();
    const qr = new QR(this.textQr).fit(150).absolutePosition(412, 130).alignment("center").end;
    const qrBottom = new QR(this.textQr).fit(100).absolutePosition(395, 640).alignment("center").end;
    PdfMakeWrapper.setFonts(pdfFonts);
    pdf.pageSize({
      width: 1015.75,
      height: 637.80
    });
    pdf.add(await new Img(imageOne).width(1015.75).height(637.80).build());
    pdf.add(await new Img(imageTwo).width(1015.75).height(637.80).build());
    pdf.create().open();
  }

  public async createRecive() {
    this.setQrText();
    const pdf = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);
    const qr = new QR(this.textQr).alignment('left').fit(150).end;
    pdf.add(qr);
    pdf.add(await new Img(this.logoObject.left).alignment('left').absolutePosition(50, 50).width(160).height(50).build());
    pdf.add(new Txt('H. AYUNTAMIENTO').fontSize(this.titleSize).alignment('center').bold().absolutePosition(100, 70).end);
    pdf.add(new Txt('CUAUTEPEC, GRO.').fontSize(this.titleSize).alignment('center').bold().absolutePosition(100, 90).end);
    pdf.add(await new Img(this.logoObject.right).alignment('right').absolutePosition(0, 25).width(80).height(80).build());
    pdf.add(new Txt('Recibo de pago por la expedición de licencia de conducir.').fontSize(12).alignment('left').absolutePosition(40, 130).end);
    pdf.add(new Table([
      [new Table([[`Num de licencia: ${this.licencia.folio}`,
      `Fecha de expedición: ${this.licencia.expeditionDate}`,
      `Fecha de vencimiento: ${this.licencia.expirationDate}`]
      ]).layout('noBorders').widths('*').end],
      [new Table([[`Solicitate: ${this.licencia.name} ${this.licencia.lastName}`]]).layout('noBorders').widths('*').end],
      [new Table(
        [
          [`Domicilio: ${this.licencia.street}`],
          [`${this.licencia.colony}`]
        ]
      ).layout('noBorders').widths('*').end],
      [new Table([[`CURP o RFC: ${this.licencia.curp}`]]).layout('noBorders').widths('*').end],
      [new Table([
        ['Codigo QR:'],
        [new Table([
          [qr]
        ]).widths('auto').heights(row => 200).layout('noBorders').end]
      ]).widths('auto').layout('noBorders').end],
    ]).widths('*').end);
    pdf.add(new Txt(VALIDATE).absolutePosition(40, 520).alignment('justify').end);
    pdf.add(new Txt(FUNDAMENT).bold().italics().absolutePosition(40, 570).alignment('justify').end);
    pdf.add(new Txt(PORTAL).absolutePosition(40, 720).alignment('justify').end);
    pdf.watermark(new Txt('PAGADO').fontSize(85).opacity(0.5).color('blue').end);
    pdf.create().open();
  }

}
