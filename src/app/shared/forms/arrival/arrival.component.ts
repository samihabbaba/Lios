import { Component, OnInit } from '@angular/core';
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
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.scss'],
})
export class ArrivalComponent implements OnInit {
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
      this.movementsTypeDropdown = this.dataService.movementType;
      this.purposesDropdown = this.dataService.Purposes;
      this.dataService.getAllPorts(1, 10000, '').subscribe((resp) => {
        this.ports = resp.portList.map((x) => x.name);
      });
      this.dataService.getAllAccommodations().subscribe((resp) => {
        this.accomodations = resp;
      });

      this.getGroups();
      this.getCaptains();

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
        this.shipId = value.id;
        console.log(value);
        this.initializeForm();
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
    });
  }

  getGroups() {
    this.dataService.getAllGroups('').subscribe(
      (resp) => {
        this.groupsArr = resp;
        // console.log(this.groupsArr);
      },
      (error) => {}
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
      (error) => {}
    );
  }

  submitForm() {
    let obj = this.form.getRawValue();
    obj.shipId = this.shipId;
    if (obj.accommodationId?.id) obj.accommodationId = obj.accommodationId.id;
    if (obj.pilotageId?.id) obj.pilotageId = obj.pilotageId.id;
    if (!obj.isPilotage) obj.pilotageId = 0;
    for (let item of this.categories.value) {
      if (item.categoryId.id) {
        item.categoryId = item.categoryId.id;
      }
    }
    // console.log(obj);
    this.dataService.addArrival(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Yeni geliş başarıyla eklendi',
      });
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      shipId: new FormControl(null, []),
      destinationPort: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      accommodationId: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date(), []),
      sourcePort: new FormControl(null, [Validators.required]),
      isFree: new FormControl(false, []),
      isPilotage: new FormControl(false, []),
      pilotageId: new FormControl(null, []),
      normalPassenger: new FormControl(null, []),
      transitPassenger: new FormControl(null, []),
      soldierPassenger: new FormControl(null, []),
      normalVehicle: new FormControl(null, []),
      transitVehicle: new FormControl(null, []),
      categories: new FormControl([]),
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
    this.categoryObj = { categoryId: null, quantity: null };
  }

  deleteProduct(product: any, index: any) {
    // console.log(product);
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
