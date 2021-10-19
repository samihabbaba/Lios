import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-crane-services',
  templateUrl: './crane-services.component.html',
  styleUrls: ['./crane-services.component.scss'],
})
export class CraneServicesComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  tabViewSubscriber$: Subscription;
  form: FormGroup;

  tabView: string;
  objReceived: any;
  @Input() formName: any;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog,
    public translate: TranslateService
  ) {


      this.dialogRef.onShow.subscribe(() => {
        this.loadSubscriptions();
      });
      this.dialogRef.onHide.subscribe(() => {
        this.destroySubscription();
this.formName = null;
      });

  }

  ngOnInit() {}

  loadSubscriptions() {
    this.tabViewSubscriber$ = this.formService.tabPage.subscribe((value) => {
      this.tabView = value;
    });
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        if (this.tabView === 'crane') {
          this.dataService.getCraneServiceById(value.id).subscribe((resp) => {
            this.objReceived = resp;
            console.log(this.objReceived);
            this.initializeForm();
            this.disableInputs();

            this.formValidationSubscriber$ =
              this.formService.listenToValueChanges(this.form);
          });
        }
      });
      if(this.formName === 'craneServicesForm') {
    this.submitSubscriber$ = this.formService
      .getSubmitSubject()
      .subscribe((value) => {
        if (value === 'submit' && this.tabView === 'crane') {
          this.submitForm();
        }
      });
    }
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
    this.tabViewSubscriber$.unsubscribe();
    this.formService.resetForm();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    for (let key in obj) {
      if (key !== 'minimimCharge') {
        delete obj[key];
      }
    }
    obj.id = this.objReceived.id;
    this.dataService.updateCraneService(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Servis başarıyla güncellendi',
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
      workDescription: new FormControl(this.objReceived.workDescription, [
        Validators.required,
      ]),
      code: new FormControl(this.objReceived.code, [Validators.required]),
      alternativeCode: new FormControl(this.objReceived.alternativeCode, [
        Validators.required,
      ]),
      codePercent: new FormControl(this.objReceived.codePercent, [
        Validators.required,
      ]),
      alternativeCodePercent: new FormControl(
        this.objReceived.alternativeCodePercent,
        [Validators.required]
      ),
      minimimCharge: new FormControl(this.objReceived.minimimCharge, [
        Validators.required,
      ]),
      isActive: new FormControl(this.objReceived.isActive, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }

  // Table shit

  clonedData: any;

  onRowEditInit(item) {
    this.clonedData = Object.assign({}, item);
  }

  onRowEditSave(item) {
    this.dataService.updateCraneServiceCharge(item).subscribe((resp) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Değişiklikleriniz kaydedildi',
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

  onRowEditCancel(i) {
    this.objReceived.charges[i] = this.clonedData;
  }

  disableInputs() {
    this.form.get('name')?.disable();
    this.form.get('workDescription')?.disable();
    this.form.get('code')?.disable();
    this.form.get('alternativeCode')?.disable();
    this.form.get('codePercent')?.disable();
    this.form.get('alternativeCodePercent')?.disable();
    this.form.get('isActive')?.disable();
  }
}
