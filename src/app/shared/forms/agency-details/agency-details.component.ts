import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.scss'],
})
export class AgencyDetailsComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;
  objReceived: any;

  agencyTypes = [
    {
      name: 'Company Name',
      value: 'companyName',
    },
    {
      name: 'Personal',
      value: 'personal',
    },
  ];

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog
  ) {
    this.dialogRef.onShow.subscribe(() => {
      this.loadSubscriptions();
    });
    this.dialogRef.onHide.subscribe(() => {
      this.destroySubscription();
    });
  }

  ngOnInit() {}

  loadSubscriptions() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.objReceived = value;

        if (this.objReceived.agencyType === 'Company') {
          this.objReceived.agencyType = this.agencyTypes[0];
        } else {
          this.objReceived.agencyType = this.agencyTypes[1];
        }
      });
    this.initializeForm();
    this.submitSubscriber$ = this.formService
      .getSubmitSubject()
      .subscribe((value) => {
        if (value === 'submit') {
          this.submitForm();
        }
      });

    this.formValidationSubscriber$ = this.formService.listenToValueChanges(
      this.form
    );

    this.dirtyFormSubscriber$ = this.formService
      .getDirtyFormSubject()
      .subscribe((value) => {
        if (value) {
          Object.keys(this.form.controls).forEach((x) => {
            this.form.get(x)?.markAsTouched();
          });
        }
      });
  }

  destroySubscription() {
    this.objectSubscriber$.unsubscribe();
    this.submitSubscriber$.unsubscribe();
    this.formValidationSubscriber$.unsubscribe();
    this.dirtyFormSubscriber$.unsubscribe();
    this.formService.resetForm();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    obj.agencyType = obj.agencyType.value;
    obj.id = this.objReceived.id;
    this.dataService.updateAgency(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Acente başarıyla güncellendi',
      });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      name: new FormControl(this.objReceived.name, [Validators.required]),
      taxNumber: new FormControl(this.objReceived.taxNumber, []),
      explanation: new FormControl(this.objReceived.explanation, []),
      agencyType: new FormControl(this.objReceived.agencyType, [
        Validators.required,
      ]),
      telephone: new FormControl(this.objReceived.telephone, []),
      fax: new FormControl(this.objReceived.fax, []),
      country: new FormControl(this.objReceived.country, []),
      district: new FormControl(this.objReceived.district, []),
      address: new FormControl(this.objReceived.address, []),
      webLink: new FormControl(this.objReceived.webLink, []),
      email: new FormControl(this.objReceived.email, []),
      isInsured: new FormControl(this.objReceived.isInsured, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}
