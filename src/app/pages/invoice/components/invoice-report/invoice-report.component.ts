import { Component, Inject, OnInit, AfterViewInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InvoiceService } from "../../services/invoice.service";
import * as pdfjsLib from "pdfjs-dist";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { DocumentTemplateSelectService } from "@shared/services/document-template-select.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IconsService } from "@shared/services/icons.service";

@Component({
  selector: "vex-invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.scss"],
})
export class InvoiceReportComponent implements OnInit, AfterViewInit {
  pdfDoc: any;
  pageNum: number = 1;
  pageRendering: boolean = false;
  pageNumPending: number = null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  icClose = IconsService.prototype.getIcon("icClose");
  pdfUrl: string | ArrayBuffer | null = null;

  documentTemplateSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      documentTemplateId: [0, [Validators.required]], // Asegúrate de que sea obligatorio
    });

    // Suscribirse al cambio de selección de plantilla
    this.form.get("documentTemplateId");
  }

  constructor(
    public dialogRef: MatDialogRef<InvoiceReportComponent>,
    private _documentTemplateSelectService: DocumentTemplateSelectService,
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.listSelectDocumentTemplate();
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }

  listSelectDocumentTemplate(): void {
    this._documentTemplateSelectService
      .listSelectDocumentTemplates()
      .subscribe((resp) => {
        this.documentTemplateSelect = resp;
      });
  }

  renderPage(num: number) {
    this.pageRendering = true;
    this.pdfDoc.getPage(num).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      this.canvas.height = viewport.height;
      this.canvas.width = viewport.width;

      const renderContext = {
        canvasContext: this.ctx,
        viewport: viewport,
      };

      page.render(renderContext).promise.then(() => {
        this.pageRendering = false;

        if (this.pageNumPending !== null) {
          this.renderPage(this.pageNumPending);
          this.pageNumPending = null;
        }
      });
    });
  }

  queueRenderPage(num: number) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  downloadInvoiceReport() {
    this.invoiceService.invoiceReport(
      this.data,
      "invoice",
      this.form.get("documentTemplateId").value
    );
    this.dialogRef.close("download");
  }

  downloadAndEmailInvoiceReport() {
    this.invoiceService.invoiceEmailReport(
      this.data,
      "invoice",
      this.form.get("documentTemplateId").value
    );
    this.dialogRef.close("email");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
