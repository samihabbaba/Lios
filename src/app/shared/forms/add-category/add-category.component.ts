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
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;
  @Input() formName: any;

  groups: any[] = [];
  filteredGroups: any;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog,
    public translate: TranslateService
  ) {


      this.dialogRef.onShow.subscribe(() => {
        this.loadGroups();
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

    this.initializeForm();
    if(this.formName === 'addCategoryForm') {
    this.submitSubscriber$ = this.formService
      .getSubmitSubject()
      .subscribe((value) => {
        if (value === 'submit') {
          this.submitForm();
        }
      });
    }
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
    obj.groupId = obj.groupId.value;
    this.dataService.addNewCategory(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Kategori başarıyla eklendi',
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
      description: new FormControl(null, []),
      groupId: new FormControl(null, [Validators.required]),
      orderNo: new FormControl(null, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }

  filterAutocomplete(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.groups.length; i++) {
      let country = this.groups[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredGroups = filtered;
  }

  loadGroups() {
    this.dataService.getAllGroups('').subscribe((response) => {
      for (const item of response) {
        this.groups.push({ name: item.name, value: item.id });
      }
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }
}
