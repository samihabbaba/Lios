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
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.scss'],
})
export class AddAgencyComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;
  @Input() formName: any;

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
        this.initializeForm();
        this.loadSubscriptions();
      });
      this.dialogRef.onHide.subscribe(() => {
        this.destroySubscription();
        this.formName = null;
      });

  }

  ngOnInit() {}

  loadSubscriptions() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        console.log(value);
      });

      if(this.formName === 'addAgencyForm') {

    this.submitSubscriber$ = this.formService
      .getSubmitSubject()
      .subscribe((value) => {
        if (value === 'submit') {
          this.submitForm();
        }
      });}

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
    this.dataService.addNewAgency(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Yeni acente başarıyla eklendi',
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
      name: new FormControl(null, [Validators.required]),
      taxNumber: new FormControl(null, []),
      explanation: new FormControl(null, []),
      creationDate: new FormControl(new Date(), []),
      agencyType: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, []),
      fax: new FormControl(null, []),
      country: new FormControl(null, []),
      district: new FormControl(null, []),
      address: new FormControl(null, []),
      webLink: new FormControl(null, []),
      email: new FormControl(null, []),
      isInsured: new FormControl(false, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}
