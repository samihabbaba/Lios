import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-update-trip-rate',
  templateUrl: './update-trip-rate.component.html',
  styleUrls: ['./update-trip-rate.component.scss']
})
export class UpdateTripRateComponent implements OnInit {

  @Input() displayTripRateUpdateDialog: boolean;
  @Output() closeInqueryDialog = new EventEmitter<any>();
  objectSubscriber$: Subscription;

  tripId: string;
  newRate = 0;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    public translate: TranslateService
  ) {

  }

  ngOnInit(): void {

  }


  submit(button: any) {
   

    this.dataService.updateTripRate({
      tripId:this.tripId,
      rate:this.newRate
    }).subscribe(
      (resp) => {
        this.formService.triggerRefresh();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ödeme başarı ile yapıldı',
        });
        this.onDialogHide();

      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
        this.onDialogHide();
      }
    );
    
  }



  onDialogShow() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
      this.tripId = value.id
      });
  }

  onDialogHide() {
    this.closeInqueryDialog.emit();
  }

  


  
  
}
