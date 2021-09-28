import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-captain',
  templateUrl: './add-captain.component.html',
  styleUrls: ['./add-captain.component.scss'],
})
export class AddCaptainComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  form: FormGroup;

  dropdownOptions: any[];

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog
  ) {
    this.dialogRef.onShow.subscribe(() => {
      this.dropdownOptions = this.dataService.countries;
      this.initializeForm();
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
        console.log(value);
      });

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
  }

  destroySubscription() {
    this.objectSubscriber$.unsubscribe();
    this.submitSubscriber$.unsubscribe();
    this.formValidationSubscriber$.unsubscribe();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    this.dataService.addNewCaptain(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Yeni kaptan başarıyla eklendi',
      });
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      title: new FormControl(null, []),
      telephone: new FormControl(null, []),
      country: new FormControl(null, []),
      district: new FormControl(null, []),
      address: new FormControl(null, []),
      webLink: new FormControl(null, []),
      email: new FormControl(null, []),
      isLocal: new FormControl(false, []),
      isGuidline: new FormControl(false, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}
