import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-crane-payments',
  templateUrl: './crane-payments.component.html',
  styleUrls: ['./crane-payments.component.scss'],
})
export class CranePaymentsComponent implements OnInit {
  objectSubscriber$: Subscription;
  crane: any;

  @Input() formName: any;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog
  ) {
    this.dialogRef.onShow.subscribe(() => {
      if (this.formService.checkForm('cranePaymentsForm')) {
        this.loadSubscriptions();
      }
    });
    this.dialogRef.onHide.subscribe(() => {
      if (this.formService.checkForm('cranePaymentsForm')) {
        this.destroySubscription();
      }
    });
  }

  ngOnInit() {}

  loadSubscriptions() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.crane = { ...value };
      });

    this.formService.setFormToInvalid();
  }

  destroySubscription() {
    this.objectSubscriber$.unsubscribe();
  }

  reportVar1;
  reportVar2;
  reportIsAlternative;
  displayTelerikDialog;
  telerik;
  showTelerikReport(var1 = '', var2 = '', isAlternative = false) {
    this.reportVar1 = var1;
    this.reportVar2 = var2;

    if (isAlternative) {
      this.reportIsAlternative = 'true';
    } else {
      this.reportIsAlternative = 'false';
    }

    this.displayTelerikDialog = true;
    this.telerik = true;
  }
}
