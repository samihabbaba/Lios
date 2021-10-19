import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
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
  selector: 'app-delete-arrival',
  templateUrl: './delete-arrival.component.html',
  styleUrls: ['./delete-arrival.component.scss'],
})
export class DeleteArrivalComponent implements OnInit {
  submitSubscriber$: Subscription;
  objectSubscriber$: Subscription;

  shipId: string;
  tripId: string;
  shipName: string;
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
      this.objectSubscriber$ = this.formService
        .getFormObject()
        .subscribe((value) => {
          this.shipId = value.id;
          this.tripId = value.tripId;
          this.shipName = value.name;
          if (!this.tripId) {
            this.tripId = value.id;
            this.shipId = value.shipId;
            this.shipName = value.shipName;
          }
          this.formService.setFormToValid();
        });
      if (this.formName === 'deleteArrivalForm') {
        this.submitSubscriber$ = this.formService
          .getSubmitSubject()
          .subscribe((value) => {
            if (value === 'submit') {
              this.dataService.deleteArrival(this.tripId).subscribe(
                (resp) => {
                  this.formService.triggerRefresh();
                  this.messageService.add({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Geliş başarıyla silindi',
                  });
                },
                () => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Bir hata oluştu.',
                  });
                }
              );
            }
          });
      }
    });
    this.dialogRef.onHide.subscribe(() => {
      this.formName = null;
      this.submitSubscriber$.unsubscribe();
      this.formService.setFormToInvalid();
    });
  }

  ngOnInit(): void {}
}
