import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Cell, Columns, Img, PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';
import { NgxNumToWordsService } from 'ngx-num-to-words';
import { CurrencyPipe } from '@angular/common';
import { FUNDAMENT, PORTAL, VALIDATE } from 'src/app/shared/data';
import { LogosService } from 'src/app/services/logos.service';

@Component({
  selector: 'app-alta-permisos',
  templateUrl: './alta-permisos.component.html',
  styleUrls: ['./alta-permisos.component.scss']
})
export class AltaPermisosComponent implements OnInit {
  public id_permiso!: string | null;
  public permiso: any;
  public textQr!: string;
  public defaultSize: number = 9;
  public logoObject!: any;

  constructor(
    private _permissionService: PermissionService,
    private _route: ActivatedRoute,
    private _currency: CurrencyPipe,
    private _logoService: LogosService
  ) { }

  ngOnInit(): void {
    this.id_permiso = this._route.snapshot.paramMap.get('id');
    this.setPermiso(this.id_permiso);
    this.getLogos();
  }
  getLogos() {
    this._logoService.getUidDocument().then((res: any) => {
      res.forEach((doc: any) => {
        this.logoObject = {
          left: doc.data().levelLowlogo,
          right: doc.data().levelOnelogo
        }     
      });
      console.log(this.logoObject);
    });
  }

  public setQrText() {
    this.textQr = `[PERMISO-AUTÉNTICO][MUNICIPIO-CUAUTEPEC-GRO]
    Folio: ${this.permiso.invoice}/
    Marca: ${this.permiso.vehicleBrand}/Línea: ${this.permiso.vehicleLine}/
    Modelo: ${this.permiso.vehicleModel}/
    Núm. Serie: ${this.permiso.vehicleSerialNumber}/
    Núm. Motor: ${this.permiso.vehicleMotorNumber} /Fecha vencimiento: ${this.permiso.expirationDate}/`;
  }

  public setPermiso(id_permiso: string | null) {
    this._permissionService.getServiceById(id_permiso).subscribe((res: any) => {
      this.permiso = { id: res.id, ...res.data() };
    });
  }

  public generateFormat() {
    this.setQrText();
    let splitName = this.permiso.solicitantName.split(' ');
    const pdf = new PdfMakeWrapper();
    const qr = new QR(this.textQr).fit(150).absolutePosition(412, 130).alignment("center").end;
    const qrBottom = new QR(this.textQr).fit(100).absolutePosition(395, 640).alignment("center").end;
    PdfMakeWrapper.setFonts(pdfFonts);
    pdf.add(qr);
    pdf.add(new Table([
      [new Txt('Marca:').fontSize(this.defaultSize).end, new Txt('Linea:').fontSize(this.defaultSize).end, new Txt('Modelo:').fontSize(this.defaultSize).end], 
      [new Txt(`${this.permiso.vehicleBrand}`).fontSize(this.defaultSize).end, 
      new Txt(`${this.permiso.vehicleLine}`).fontSize(this.defaultSize).end, 
      new Txt(`${this.permiso.vehicleModel}`).fontSize(this.defaultSize).end]
    ]).widths([120, 100, 60]).layout('noBorders').absolutePosition(117, 250).alignment('center').end);
    pdf.add(new Table([
      [new Txt('Núm. motor:').fontSize(this.defaultSize).end, new Txt('Núm. serie:').fontSize(this.defaultSize).end, new Txt('Color:').fontSize(this.defaultSize).end], 
      [new Txt(`${this.permiso.vehicleMotorNumber}`).fontSize(this.defaultSize).end, 
      new Txt(`${this.permiso.vehicleSerialNumber}`).fontSize(this.defaultSize).end, 
      new Txt(`${this.permiso.vehicleColor}`).fontSize(this.defaultSize).end]
    ]).widths([120, 100, 60]).layout('noBorders').absolutePosition(117, 284).alignment('center').end);
    pdf.add(new Table([
      [new Txt('Fecha de expedición:').fontSize(this.defaultSize).end, 
      new Txt(`${this.permiso.expeditionDate}`).fontSize(this.defaultSize).end, 
      new Txt('Fecha de vencimiento:').fontSize(this.defaultSize).end, 
      new Txt(`${this.permiso.expirationDate}`).fontSize(this.defaultSize).end]
    ]).widths([100, 60, 100, 60]).layout('noBorders').absolutePosition(117, 330).alignment('center').end);
    pdf.add(new Txt(`${splitName[0]} ${splitName[1]}`).fontSize(this.defaultSize).absolutePosition(122, 486).alignment('left').end);
    pdf.add(new Txt(`${splitName[splitName.length - 2]} ${splitName[splitName.length - 1]}`).fontSize(this.defaultSize).absolutePosition(122, 495).alignment('left').end);
    pdf.add(new Txt(`${this.permiso.solicitantStreet}`).fontSize(this.defaultSize).absolutePosition(92, 515).alignment('left').end);
    pdf.add(new Txt(`${this.permiso.solicitantLocation}`).fontSize(this.defaultSize).absolutePosition(92, 525).alignment('left').end);
    pdf.add(new Txt('Transito municipal').fontSize(this.defaultSize).absolutePosition(87, 542).alignment('left').end);
    pdf.add(new Txt(`${this._currency.transform(this.permiso.import, 'MXN')}`).fontSize(this.defaultSize).absolutePosition(500, 536).alignment('right').end);
    pdf.add(new Txt(`CURP o RFC: ${this.permiso.curp}`).fontSize(this.defaultSize).absolutePosition(80,670).end);
    pdf.add(new Txt(`Folio: ${this.permiso.invoice}`).fontSize(this.defaultSize).absolutePosition(80, 660).alignment('left').end);
    pdf.add(new Txt(`Contribuyente: ${this.permiso.solicitantName}`).fontSize(this.defaultSize).absolutePosition(80, 680).alignment('left').end);
    pdf.add(new Txt(`Domicilio: ${this.permiso.solicitantStreet} ${this.permiso.solicitantLocation}`).fontSize(this.defaultSize).absolutePosition(80, 700).alignment('left').end);
    pdf.add(new Txt(`Importe: ${this._currency.transform(this.permiso.import, 'MXN')}`).fontSize(this.defaultSize).absolutePosition(120, 740).alignment('left').end);
    pdf.add(qrBottom);
    pdf.create().open();
  }

  public async createRecive() {
    //var leftImage = this.getBase64Image(document.getElementById("leftId"));
    //var rightImage = this.getBase64Image(document.getElementById("rightId"));
    this.setQrText();
    const pdf = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);
    const qr = new QR(this.textQr).alignment('left').fit(150).end;
    pdf.add(qr);
    pdf.add(await new Img(this.logoObject.left).alignment('left').absolutePosition(50,50).width(160).height(50).build());
    pdf.add(new Txt('H. AYUNTAMIENTO CUAUTEPEC, GRO.').alignment('center').bold().absolutePosition(100,70).end);
    pdf.add(await new Img(this.logoObject.right).alignment('right').absolutePosition(0,50).width(80).height(80).build());
    pdf.add(new Txt('Recibo de pago por la expedición de permiso para circular sin placas y sin tarjeta de circulación').fontSize(12).alignment('left').absolutePosition(40,130).end);
    pdf.add(new Table([
      [new Table([[`Num de Permiso: ${this.permiso.invoice}`,
      `Fecha de expedición: ${this.permiso.expeditionDate}`,
      `Fecha de vencimiento: ${this.permiso.expirationDate}`]
      ]).layout('noBorders').widths('*').end],
      [new Table([[`Solicitate: ${this.permiso.solicitantName}`]]).layout('noBorders').widths('*').end],
      [new Table([[`Domicilio: ${this.permiso.solicitantStreet} ${this.permiso.solicitantLocation}`]]).layout('noBorders').widths('*').end],
      [new Table([[`CURP o RFC: ${this.permiso.curp}`]]).layout('noBorders').widths('*').end],
      [new Table([
        ['Codigo QR:'],
        [new Table([
          [qr]
        ]).widths('auto').heights(row => 200).layout('noBorders').end]
      ]).widths('auto').layout('noBorders').end],      
    ]).widths('*').end);
    pdf.add(new Txt(VALIDATE).absolutePosition(40,520).alignment('justify').end);
    pdf.add(new Txt(FUNDAMENT).bold().italics().absolutePosition(40,570).alignment('justify').end);
    pdf.add(new Txt(PORTAL).absolutePosition(40,720).alignment('justify').end);    
    pdf.watermark(new Txt('PAGADO').fontSize(85).opacity(0.5).color('blue').end);
    pdf.create().open();
  }

  public getBase64Image(img: any) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx: any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

}
