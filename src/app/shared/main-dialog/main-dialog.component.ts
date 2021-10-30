import { NgIf, NgSwitch } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.scss'],
})
export class MainDialogComponent implements OnInit {
  @Input() displayDialog: boolean = true;
  @Input() dialogHeader: string = 'Default Header';
  @Input() formName: any;
  @Output() closeDialog = new EventEmitter<any>();

  formIsValid: boolean = false;
  formValidationSubscription$: Subscription;

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  submitForm(button: any, del = false) {
    if (button.disabled) {
      this.formService.setFormAsDirty();
    } else {
      this.formService.triggerSubmit(del ? 'delete' : 'submit');
      if (this.formName !== 'payCraneForm') {
        this.closeDialog.emit();
      }
    }
  }

  onDialogShow() {
    // console.log(this.formName);
    this.formService.currentlyOpenForm = this.formName;
    this.formValidationSubscription$ = this.formService
      .getFormValidationSubject()
      .subscribe((x) => {
        this.formIsValid = x;
      });
  }

  onDialogHide() {
    this.formValidationSubscription$.unsubscribe();
    this.closeDialog.emit();
    this.formService.setFormToInvalid();
    // this.formName = null;
  }

  dialogWidth(): string {
    if (this.formName === 'craneDetailsForm') {
      return '95vw';
    }
    return '70vw';
  }
}
