import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { QuoteService } from "../../services/quote.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { StatusSelectService } from "@shared/services/status-select.service";

@Component({
  selector: "vex-quote-change",
  templateUrl: "./quote-change.component.html",
  styleUrls: ["./quote-change.component.scss"],
})
export class QuoteChangeComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  statusSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      quoteId: [0, [Validators.required]],
      voucherNumber: [{ value: "", disabled: true }],
      statusId: [0, [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _quoteService: QuoteService,
    private _statusSelectService: StatusSelectService,
    public _dialogRef: MatDialogRef<QuoteChangeComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectStatus();
    if (this.data != null) {
      this.quoteById(this.data.data.quoteId);
    }
  }

  listSelectStatus(): void {
    this._statusSelectService.listSelectStatuses().subscribe((resp) => {
      this.statusSelect = resp;
    });
  }

  quoteById(quoteId: number): void {
    this._quoteService.quoteById(quoteId).subscribe((resp) => {
      this.form.reset({
        quoteId: resp.quoteId,
        voucherNumber: resp.voucherNumber,
        statusId: resp.statusId,
      });
    });
  }

  quoteSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const quoteId = this.form.get("quoteId").value;

    if (quoteId > 0) {
      this.quoteEdit();
    }
  }

  quoteEdit(): void {
    this._quoteService.quoteEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
