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
import { fadeInOut } from 'src/app/animations/animation';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.scss'],
  animations: [fadeInOut()],
})
export class DepartureComponent implements OnInit {
  isLoading: boolean = false;
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
  tripId: string;
  ports: any[];
  accomodations: any[];
  @Input() formName: any;

  // selectOptions = [
  //   { label: 'Free', value: true },
  //   { label: 'Conventional', value: false },
  // ];

  groupsArr: any[];
  categoriesArr: any[] = [];

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
      if (
        this.formService.checkForm('departureForm') ||
        this.formService.checkForm('departureFormUpdate')
      ) {
        this.isLoading = true;
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
      if (
        this.formService.checkForm('departureForm') ||
        this.formService.checkForm('departureFormUpdate')
      ) {
        this.destroySubscription();
      }
    });
  }

  ngOnInit() {}

  deaprtureUpdate = false;
  lastDeparture: any = {};
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
        // console.log(this.tripId)
        value.lastDeparture
          ? (this.deaprtureUpdate = true)
          : (this.deaprtureUpdate = false);
        this.lastDeparture = value.lastDeparture;
        this.initializeForm(value.lastDeparture);
      });

    if (
      this.formName === 'departureForm' ||
      this.formName === 'departureFormUpdate'
    ) {
      this.submitSubscriber$ = this.formService
        .getSubmitSubject()
        .subscribe((value) => {
          if (value === 'submit') {
            this.submitForm();
          } else if (value == 'delete') {
            this.deleteDeparture();
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

  getCaptains() {
    this.dataService.getAllCaptains('', 1, 10000).subscribe((resp) => {
      this.captains = resp.captainList.filter((x) => x.isGuidline === true);

      if (this.deaprtureUpdate) {
        let index = this.captains.findIndex(
          (x) => x.id == this.lastDeparture.pilotageId
        );
        if (index !== -1) {
          this.form.patchValue({
            pilotageId: { ...this.captains[index] },
          });
        }
      }

      this.isLoading = false;
    }),
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      };
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
    this.formService.loadingSubject.next(true);
    let obj = this.form.getRawValue();
    obj.tripId = this.tripId;
    if (obj.pilotageId?.id) obj.pilotageId = obj.pilotageId.id;
    if (!obj.isPilotage) obj.pilotageId = 0;
    for (let item of this.categories.value) {
      if (item.categoryId.id) {
        item.categoryId = item.categoryId.id;
      }
    }
    // console.log(obj);
    if (this.deaprtureUpdate) {
      obj.id = this.lastDeparture.id;
      this.dataService.updateDeparture(obj).subscribe(
        (response) => {
          this.formService.triggerRefresh();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Yeni gidiş başarıyla eklendi',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Bir hata oluştu.',
          });
        },
        () => {
          this.formService.loadingSubject.next(false);
        }
      );
    } else {
      this.dataService.addDeparture(obj).subscribe(
        (response) => {
          this.formService.triggerRefresh();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Yeni gidiş başarıyla eklendi',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Bir hata oluştu.',
          });
        },
        () => {
          this.formService.loadingSubject.next(false);
        }
      );
    }
  }

  deleteDeparture() {
    this.dataService.deleteDeparture(this.tripId).subscribe(
      (resp) => {
        this.formService.triggerRefresh();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Yeni gidiş başarıyla eklendi',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
  }

  initializeForm(dataUpdate: any = undefined) {
    if (dataUpdate && dataUpdate.pilotageId && this.captains) {
      let index = this.captains.findIndex((x) => x.id == dataUpdate.pilotageId);
      if (index !== -1) {
        this.form.patchValue({
          pilotageId: { ...this.captains[index] },
        });
      }
    }

    this.form = this.fb.group({
      destinationPort: new FormControl(
        dataUpdate ? dataUpdate.destinationPort : null,
        [Validators.required]
      ),
      date: new FormControl(
        dataUpdate ? new Date(dataUpdate.date) : new Date(),
        []
      ),
      isPilotage: new FormControl(
        dataUpdate ? dataUpdate.isPilotage : false,
        []
      ),
      pilotageId: new FormControl(
        dataUpdate && dataUpdate.pilotageId.id ? dataUpdate.pilotageId : null,
        []
      ),
      normalPassenger: new FormControl(
        dataUpdate ? dataUpdate.normalPassenger : 0,
        []
      ),
      transitPassenger: new FormControl(
        dataUpdate ? dataUpdate.transitPassenger : 0,
        []
      ),
      soldierPassenger: new FormControl(
        dataUpdate ? dataUpdate.soldierPassenger : 0,
        []
      ),
      normalVehicle: new FormControl(
        dataUpdate ? dataUpdate.normalVehicle : 0,
        []
      ),
      transitVehicle: new FormControl(
        dataUpdate ? dataUpdate.transitVehicle : 0,
        []
      ),
      categories: new FormControl(dataUpdate ? dataUpdate.categories : []),
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
    // console.log(this.categories.value);

    if (this.deaprtureUpdate) {
      this.dataService
        .addLoad({
          ...this.categoryObj,
          transactionId: this.lastDeparture.id,
          categoryId: this.categoryObj.categoryId.id,
        })
        .subscribe(
          (resp) => {},
          (error) => {}
        );
    }

    this.categoryObj = { categoryId: null, quantity: null };
  }

  deleteProduct(product: any, index: any) {
    // console.log(product);
    this.categories.value.splice(index, 1);

    this.dataService
      .updateLoad({
        ...product,
        transactionId: this.lastDeparture.id,
        isDeleted: true,
      })
      .subscribe((resp) => {});
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
