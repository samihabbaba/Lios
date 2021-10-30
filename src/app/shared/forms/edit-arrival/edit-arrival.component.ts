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
  selector: 'app-edit-arrival',
  templateUrl: './edit-arrival.component.html',
  styleUrls: ['./edit-arrival.component.scss'],
})
export class EditArrivalComponent implements OnInit {
  tripId: string;
  formObj: any;

  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;

  movementsTypeDropdown: any[];
  purposesDropdown: any[];

  captains: any[];
  filteredCaptains: any[] = [];

  shipId: string;
  ports: any[];
  accomodations: any[];

  selectOptions = [
    { label: 'Free', value: true },
    { label: 'Conventional', value: false },
  ];

  groupsArr: any[];
  categoriesArr: any[] = [];
  @Input() formName: any;

  categoryObj: any = { categoryId: null, quantity: null };

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog,
    public translate: TranslateService
  ) {
    this.dialogRef.onShow.subscribe(() => {
      if (this.formService.checkForm('editArrivalForm')) {
        this.movementsTypeDropdown = this.dataService.movementType;
        this.purposesDropdown = this.dataService.Purposes;
        this.dataService.getAllPorts(1, 10000, '').subscribe(
          (resp) => {
            this.ports = resp.portList.map((x) => x.name);
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Bir hata oluştu.',
            });
          }
        );
        this.dataService.getAllAccommodations().subscribe(
          (resp) => {
            this.accomodations = resp;
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Bir hata oluştu.',
            });
          }
        );

        this.getGroups();
        this.getCaptains();

        this.loadSubscriptions();
      }
    });
    this.dialogRef.onHide.subscribe(() => {
      if (this.formService.checkForm('editArrivalForm')) {
        this.destroySubscription();
      }
    });
  }

  ngOnInit() {}

  loadSubscriptions() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.shipId = value.id;
        this.tripId = value.tripId;
        if (!this.tripId) {
          this.tripId = value.id;
          this.shipId = value.shipId;
        }
        this.dataService.getArrivalByTipId(this.tripId).subscribe(
          (resp) => {
            this.formObj = resp;
            console.log(this.formObj);
            this.initializeForm();
            this.formValidationSubscriber$ =
              this.formService.listenToValueChanges(this.form);
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Bir hata oluştu.',
            });
          }
        );
      });
    if (this.formName === 'editArrivalForm') {
      this.submitSubscriber$ = this.formService
        .getSubmitSubject()
        .subscribe((value) => {
          if (value === 'submit') {
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
    this.formService.resetForm();
  }

  getCaptains() {
    this.dataService.getAllCaptains('', 1, 10000).subscribe(
      (resp) => {
        this.captains = resp.captainList.filter((x) => x.isGuidline === true);
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

  getGroups() {
    this.dataService.getAllGroups('').subscribe(
      (resp) => {
        this.groupsArr = resp;
        // console.log(this.groupsArr);
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

  groupSelectionChange(event) {
    // console.log(event.value.id);
    this.getCategories(event.value.id);
  }

  getCategories(id) {
    this.dataService.getAllCategories('', id).subscribe(
      (resp) => {
        this.categoriesArr = resp;
        // console.log(this.categoriesArr);
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

  submitForm() {
    let obj = this.form.getRawValue();
    obj.shipId = this.shipId;
    obj.id = this.formObj.id;
    if (obj.accommodationId?.id) obj.accommodationId = obj.accommodationId.id;
    if (obj.pilotageId?.id) obj.pilotageId = obj.pilotageId.id;
    if (!obj.isPilotage) obj.pilotageId = 0;
    for (let item of this.categories.value) {
      if (item.categoryId.id) {
        item.categoryId = item.categoryId.id;
      }
    }
    obj.tripId = this.tripId;
    // console.log(obj);
    this.dataService.updateArrival(obj).subscribe(
      (response) => {
        this.formService.triggerRefresh();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Geliş başarıyla güncellendi',
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

  initializeForm() {
    this.form = this.fb.group({
      shipId: new FormControl(null, []),
      destinationPort: new FormControl(this.formObj.destinationPort, [
        Validators.required,
      ]),
      purpose: new FormControl(this.formObj.purpose, [Validators.required]),
      type: new FormControl(this.formObj.type, [Validators.required]),
      accommodationId: new FormControl(
        this.accomodations.find((x) => x.id === this.formObj.accommodationId),
        [Validators.required]
      ),
      date: new FormControl(new Date(this.formObj.date), []),
      sourcePort: new FormControl(this.formObj.sourcePort, [
        Validators.required,
      ]),
      isFree: new FormControl(this.formObj.isFree, []),
      isPilotage: new FormControl(this.formObj.isPilotage, []),
      isDefective: new FormControl(this.formObj.isDefective, []),
      pilotageId: new FormControl(this.formObj.pilotageId, []),
      normalPassenger: new FormControl(this.formObj.normalPassenger, []),
      transitPassenger: new FormControl(this.formObj.transitPassenger, []),
      soldierPassenger: new FormControl(this.formObj.soldierPassenger, []),
      normalVehicle: new FormControl(this.formObj.normalVehicle, []),
      transitVehicle: new FormControl(this.formObj.transitVehicle, []),
      categories: new FormControl(this.formObj.categories),
    });
  }

  get categories(): any {
    return this.form.get('categories');
  }

  addProduct() {
    this.categoryObj.categoryId.categoryName = JSON.stringify(
      this.categoryObj?.categoryId?.name,
      null
    );
    delete this.categoryObj?.categoryId?.name;
    this.categories.value.push(this.categoryObj);

    let load = {
      categoryId: this.categoryObj.categoryId.id,
      transactionId: this.formObj.id,
      quantity: this.categoryObj.quantity,
    };

    this.dataService.addLoad(load).subscribe(
      (resp) => {},
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
    // console.log(this.categories.value);
    this.categoryObj = { categoryId: null, quantity: null };
  }

  deleteProduct(product: any, index: any) {
    // console.log(product);
    let obj = {
      isDeleted: true,
      categoryId: product.categoryId,
      quantity: product.quantity,
      id: product.id,
    };
    this.dataService.updateLoad(obj).subscribe(
      () => {},
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
    this.categories.value.splice(index, 1);
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }

  // autocomplete functions
  filterCaptains(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.captains.length; i++) {
      let item = this.captains[i];
      if (
        item?.firstName?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        item?.lastName?.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(item);
      }
    }
    this.filteredCaptains = filtered;
  }
}
