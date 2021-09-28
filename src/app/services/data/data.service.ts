import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  currentUser: any = {};
  backTo = '';

  shipTypes = [
    'RESEARCH',
    'SOLDIER',
    'FISHING BOAT',
    'BALLOON',
    'DIVER SHIP',
    'SUBMARINE',
    'PONTOON',
    'BULK VESSEL',
    'ANIMAL SHIP',
    'CONTAINER SHIP',
    'DRY CARGO',
    'SMALL BOATS',
    'RO/RO',
    'TUG',
    'RO/RO MOTOR LOAD',
    'SERVICE ENGINE',
    'TANKER',
    'TRAWL',
    'TOUR SHIP',
    'YACHT',
    'CRUISE SHIP',
    'FLOATING POOL',
    'KIYI EMNİYETİ DENIZ ARACI',
    'SCHOOL SHIP',
    'DRAWER',
    'REED BARGE',
    'Practice',
  ];

  movementType = [
    'Defective Official Release',
    'Defective Official Entry',
    'Shift to Idle',
    'Official Release',
    'Picture Introduction',
    'Shifting',
    'Practice',
  ];

  Purposes = ['General', 'Supply', 'Asylum', 'Commercial', 'Shipyard'];

  ports = ['Famagusta', 'kyrenia', 'Lefke', 'kalecik'];

  martialStatus = ['Single', 'Married', 'Divorced'];

  gender = ['Male', 'Female'];

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  staffTypes = ['Worker', 'Temporary employee', 'Employee', 'Contract Employee'];

  roles = ['Admin', 'Accounting', 'Clerk'];

  countries = [
    'Northern Cyprus (TRNC)',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'British Virgin Islands',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Cape Verde',
    'Cayman Islands',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote D Ivoire',
    'Croatia',
    'Cruise Ship',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Polynesia',
    'French West Indies',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kuwait',
    'Kyrgyz Republic',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Pierre and Miquelon',
    'Samoa',
    'San Marino',
    'Satellite',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'St Kitts and Nevis',
    'St Lucia',
    'St Vincent',
    'St. Lucia',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    "Timor L'Este",
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'Uruguay',
    'Uzbekistan',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (US)',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        /* Your code goes here on every router change */
        this.checkCurrencyIfUpdated();
      }
    });
  }

  checkCurrencyIfUpdated() {
    this.checkCurrency().subscribe(
      (resp) => {
        if (!resp) {
          this.router.navigateByUrl('/dashboard');
        }
      },
      (error) => {
        // this.router.navigateByUrl('/dashboard');
      }
    );
  }

  /////////////////////////
  //  accounting controller  //
  /////////////////////////

  getAllCategory_service() {
    return this.http.get<any>(`${environment.apiUrl}service/category`, {
      headers: this.httpOptions.headers,
    });
  }

  getServicesByCategoryId(categoryId) {
    return this.http.get<any>(`${environment.apiUrl}service/${categoryId}`, {
      headers: this.httpOptions.headers,
    });
  }

  getAllServicesOptionByServiceId(serviceId) {
    return this.http.get<any>(
      `${environment.apiUrl}service/category/${serviceId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getShipInvoiceHistory(shipId) {
    return this.http.get<any>(
      `${environment.apiUrl}service/${shipId}/invoice`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getInvoiceItemsByInvoiceId(invoiceId) {
    return this.http.get<any>(
      `${environment.apiUrl}service/invoice/${invoiceId}/item`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getInvoiceById(invoiceId) {
    return this.http.get<any>(
      `${environment.apiUrl}service/invoice/${invoiceId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getInvoiceSingleItemById(itemId) {
    return this.http.get<any>(
      `${environment.apiUrl}service/invoice/item/${itemId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  updateInvoiceItem(item) {
    return this.http.put(
      `${environment.apiUrl}service/invoice/item/${item.id}`,
      item,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getOpenInvoiceForShip(shipId) {
    // return this.http.get<any>(`${environment.apiUrl}service/invoice/open`, {
    //   headers: this.httpOptions.headers,
    // });

    return this.http.get<any>(
      `${environment.apiUrl}service/invoice/open?shipId=${shipId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewInvoiceForShip(shipId) {
    return this.http.post(
      `${environment.apiUrl}service/invoice/${shipId}`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  addNewInvoiceItem(obj) {
    return this.http.post(`${environment.apiUrl}service/invoice/item`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  payInvoice(invoiceId) {
    return this.http.post(
      `${environment.apiUrl}service/pay/${invoiceId}`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  cancelInvoice(invoiceId) {
    return this.http.put(
      `${environment.apiUrl}service/invoice/${invoiceId}/cancel`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  deleteInvoice(invoiceId) {
    return this.http.put(
      `${environment.apiUrl}service/invoice/${invoiceId}/delete`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  closeInvoice(invoiceId) {
    return this.http.put(
      `${environment.apiUrl}service/invoice/${invoiceId}/close`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  deleteInvoiceItem(itemId) {
    return this.http.delete(
      `${environment.apiUrl}service/invoice/item/${itemId}/delete`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  /////////////////////////
  //  agency controller  //
  /////////////////////////

  getAllAgencies(SearchQuery, AgencyType, PageNumber, pageSize) {
    return this.http.get<any>(
      `${environment.apiUrl}agency?SearchQuery=${SearchQuery}&AgencyType=${AgencyType}&PageNumber=${PageNumber}&PageSize=${pageSize}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewAgency(obj) {
    return this.http.post(`${environment.apiUrl}agency`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getAgencyById(id) {
    return this.http.get<any>(`${environment.apiUrl}agency/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateAgency(obj) {
    return this.http.put(`${environment.apiUrl}agency/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ////////////////////////
  // captain controller //
  ////////////////////////

  getAllCaptains(SearchQuery, PageNumber, pageSize) {
    return this.http.get<any>(
      `${environment.apiUrl}captain?SearchQuery=${SearchQuery}&PageNumber=${PageNumber}&pageSize=${pageSize}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewCaptain(obj) {
    return this.http.post(`${environment.apiUrl}captain`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getCaptainById(id) {
    return this.http.get<any>(`${environment.apiUrl}captain/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateCaptain(obj) {
    return this.http.put(`${environment.apiUrl}captain/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ////////////////////////
  //  Cranes controller //
  ////////////////////////

  getAllCranes(StartDate, EndDate, PageNumber, PageSize, SearchQuery, IsPaid) {
    return this.http.get<any>(
      `${environment.apiUrl}crane/invoice?StartDate=${StartDate}&EndDate=${EndDate}
      &PageNumber=${PageNumber}&PageSize=${PageSize}&SearchQuery=${SearchQuery}&IsPaid=${IsPaid}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewCrane(obj) {
    return this.http.post(`${environment.apiUrl}crane`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getCraneByInvoiceId(id) {
    return this.http.get<any>(`${environment.apiUrl}crane/invoice/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  getCraneByServiceId(id) {
    return this.http.get<any>(`${environment.apiUrl}crane/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateCrane2(obj) {
    return this.http.put(`${environment.apiUrl}crane/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  payCraneInvoice(id, list) {
    return this.http.post(`${environment.apiUrl}crane/invoice/${id}`, list, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getCraneInvoiceReport(id, isAlternative) {
    return this.http.get(
      `${environment.apiUrl}report/crane/invoice/${id}?isAlternative=${isAlternative}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getCraneInvoiceByPaymentReport(id, isAlternative) {
    return this.http.get(
      `${environment.apiUrl}report/crane/payment/${id}?isAlternative=${isAlternative}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  ////////////////////////
  // Discount controller //
  ////////////////////////

  // ships

  getAllShipsDiscounts() {
    // pageSize=0 // PageNumber=0, // SearchQuery='',
    return this.http.get<any>(`${environment.apiUrl}discount/ship`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewShipsDiscounts(obj) {
    return this.http.post(`${environment.apiUrl}discount/ship`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getShipsDiscountById(id) {
    return this.http.get<any>(`${environment.apiUrl}discount/ship/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateShipsDiscount(obj) {
    return this.http.put(`${environment.apiUrl}discount/ship/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // overtime

  getAllOvertimeDiscounts() {
    // pageSize=0 // PageNumber=0, // SearchQuery='',
    return this.http.get<any>(`${environment.apiUrl}discount/overtime`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewOvertimeDiscounts(obj) {
    return this.http.post(`${environment.apiUrl}discount/overtime`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getOvertimeDiscountById(id) {
    return this.http.get<any>(`${environment.apiUrl}discount/overtime/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateOvertimeDiscount(obj) {
    return this.http.put(
      `${environment.apiUrl}discount/overtime/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  /////////////////////////
  // inquiry controller  //
  /////////////////////////

  // overtime
  getAllOvertimeInqueryForTrip(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/${id}/overtime`, {
      headers: this.httpOptions.headers,
    });
  }

  getOvertimeInqueryById(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/overtime/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addOvertimeInquery(obj) {
    return this.http.post(`${environment.apiUrl}inquiry/overtime`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateOvertimeInquery(obj) {
    return this.http.put(
      `${environment.apiUrl}inquiry/overtime/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // boat
  getAllBoatInqueryForTrip(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/${id}/boat`, {
      headers: this.httpOptions.headers,
    });
  }

  getBoatInqueryById(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/boat/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addBoatInquery(obj) {
    return this.http.post(`${environment.apiUrl}inquiry/boat`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateBoatInquery(obj) {
    return this.http.put(`${environment.apiUrl}inquiry/boat/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // crane
  getAllCraneInqueryForTrip(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/${id}/crane`, {
      headers: this.httpOptions.headers,
    });
  }

  getCraneInqueryById(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/crane/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addCraneInquery(obj) {
    return this.http.post(`${environment.apiUrl}inquiry/crane`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateCraneInquery(obj) {
    return this.http.put(`${environment.apiUrl}inquiry/crane/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // below is old (to be deleted)
  // inquiry part

  getAllInquies(
    searchQuery,
    PageNumber,
    PageSize,
    ShipId,
    AgencyId,
    CategoryId,
    RequestDateStart,
    RequestDateStartEnd,
    WorkDateStart,
    WorkDateEnd,
    Port,
    RequestStatus
  ) {
    return this.http.get<any>(`${environment.apiUrl}inquiry`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewInquiry(obj) {
    return this.http.post(`${environment.apiUrl}inquiry`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getInquiryById(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateInquiry(obj) {
    return this.http.put(`${environment.apiUrl}inquiry/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getAllInquiryeCategory() {
    return this.http.get<any>(`${environment.apiUrl}inquiry/category`, {
      headers: this.httpOptions.headers,
    });
  }

  // inquiry car part

  getAllInquiryCars() {
    return this.http.get<any>(`${environment.apiUrl}inquiry/car`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewInquiryCar(obj) {
    return this.http.post(`${environment.apiUrl}inquiry/car`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getInquiryCarById(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/car/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateInquiryCar(obj) {
    return this.http.put(`${environment.apiUrl}inquiry/car/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getInquiryCarByInquiryId(inquiryId) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/${inquiryId}/car`, {
      headers: this.httpOptions.headers,
    });
  }

  // inquiry crane part

  getAllInquiryCranes() {
    return this.http.get<any>(`${environment.apiUrl}inquiry/crane`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewInquiryCrane(obj) {
    return this.http.post(`${environment.apiUrl}inquiry/crane`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getInquiryCraneById(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/crane/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateInquiryCrane(obj) {
    return this.http.put(`${environment.apiUrl}inquiry/crane/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getInquiryCraneByInquiryId(inquiryId) {
    return this.http.get<any>(
      `${environment.apiUrl}inquiry/${inquiryId}/crane`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // inquiry overTime part

  getAllInquiryOverTimes() {
    return this.http.get<any>(`${environment.apiUrl}inquiry/overTime`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewInquiryOverTime(obj) {
    return this.http.post(`${environment.apiUrl}inquiry/overTime`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getInquiryOverTimeById(id) {
    return this.http.get<any>(`${environment.apiUrl}inquiry/overTime/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateInquiryOverTime(obj) {
    return this.http.put(
      `${environment.apiUrl}inquiry/overTime/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getInquiryOverTimeByInquiryId(inquiryId) {
    return this.http.get<any>(
      `${environment.apiUrl}inquiry/${inquiryId}/overTime`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  //////////////////////////
  // inventory controller //
  //////////////////////////

  // brand part

  getAllBrands(searchQuery) {
    return this.http.get<any>(`${environment.apiUrl}brand`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewBrand(obj) {
    return this.http.post(`${environment.apiUrl}brand`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getBrandById(id) {
    return this.http.get<any>(`${environment.apiUrl}brand/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateBrand(obj) {
    return this.http.put(`${environment.apiUrl}brand/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // group part

  getAllGroups(searchQuery) {
    return this.http.get<any>(`${environment.apiUrl}group`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewGroup(obj) {
    return this.http.post(`${environment.apiUrl}group`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getGroupById(id) {
    return this.http.get<any>(`${environment.apiUrl}group/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateGroup(obj) {
    return this.http.put(`${environment.apiUrl}group/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // category part

  getAllCategories(searchQuery, gruopId = null) {
    return this.http.get<any>(
      `${environment.apiUrl}category?gruopId=${gruopId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewCategory(obj) {
    return this.http.post(`${environment.apiUrl}category`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getCategoryById(id) {
    return this.http.get<any>(`${environment.apiUrl}category/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateCategory(obj) {
    return this.http.put(`${environment.apiUrl}category/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // product part

  getAllProducts(SearchQuery, PageNumber, PageSize, categoryId = null) {
    return this.http.get<any>(
      `${environment.apiUrl}product?SearchQuery=${SearchQuery}&PageNumber=${PageNumber}&PageSize=${PageSize}&categoryId=${categoryId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewProduct(obj) {
    return this.http.post(`${environment.apiUrl}product`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getProductById(id) {
    return this.http.get<any>(`${environment.apiUrl}product/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateProduct(obj) {
    return this.http.put(`${environment.apiUrl}product/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  addNewProducCategory(obj) {
    return this.http.post(`${environment.apiUrl}product/category`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateProductCategory(categoryId) {
    return this.http.put(
      `${environment.apiUrl}product/category/${categoryId}`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  //////////////////////
  // other controller //
  //////////////////////

  // sign part

  getAllSigns() {
    return this.http.get<any>(`${environment.apiUrl}sign`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewSign(obj) {
    return this.http.post(`${environment.apiUrl}sign`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getSignById(id) {
    return this.http.get<any>(`${environment.apiUrl}sign/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateSign(obj) {
    return this.http.put(`${environment.apiUrl}sign/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // currency part

  getAllCurrencies() {
    return this.http.get<any>(`${environment.apiUrl}currency`, {
      headers: this.httpOptions.headers,
    });
  }

  getCurrencyById(id) {
    return this.http.get<any>(`${environment.apiUrl}currency/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateCurrency(id, rate) {
    return this.http.put(`${environment.apiUrl}currency/${id}`, rate, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getBaseCurrency() {
    return this.http.get<any>(`${environment.apiUrl}currency/base`, {
      headers: this.httpOptions.headers,
    });
  }

  checkCurrency() {
    return this.http.get<any>(`${environment.apiUrl}currency/check`, {
      headers: this.httpOptions.headers,
    });
  }

  // accommodation part

  getAllAccommodations() {
    return this.http.get<any>(`${environment.apiUrl}accommodation`, {
      headers: this.httpOptions.headers,
    });
  }

  getAccommodationById(id) {
    return this.http.get<any>(`${environment.apiUrl}accommodation/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  // holiday part

  getAllHoliday() {
    return this.http.get<any>(`${environment.apiUrl}holiday`, {
      headers: this.httpOptions.headers,
    });
  }

  getHolidayById(id) {
    return this.http.get<any>(`${environment.apiUrl}holiday/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateHoliday(obj) {
    return this.http.put(`${environment.apiUrl}holiday/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  addNewHoliday(obj) {
    return this.http.post(`${environment.apiUrl}holiday`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ///////////////////////
  // Payment controller //
  ///////////////////////

  //get all payments
  getAllPayments(pageNumber, pageSize, startDate, endDate, shipId, tripId) {
    return this.http.get<any>(
      `${environment.apiUrl}payment?PageNumber=${pageNumber}&PageSize=${pageSize}&StartDate=${startDate}&EndDate=${endDate}&ShipId=${shipId}&TripId=${tripId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // add new payment
  addNewPayment(payment) {
    return this.http.post<any>(`${environment.apiUrl}payment`, payment, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  //get payment by id
  getPaymentById(paymentId) {
    return this.http.get<any>(`${environment.apiUrl}payment/${paymentId}`, {
      headers: this.httpOptions.headers,
    });
  }

  //get invoice by id
  getPaymentInvoiceById(invoiceId) {
    return this.http.get<any>(`${environment.apiUrl}invoice/${invoiceId}`, {
      headers: this.httpOptions.headers,
    });
  }

  //get trip invoice by id
  getTripInvoiceById(tripId) {
    return this.http.get<any>(`${environment.apiUrl}trip/${tripId}/invoice`, {
      headers: this.httpOptions.headers,
    });
  }

  //get paymeny for trip by id
  getTripPaymenyById(tripId) {
    return this.http.get<any>(`${environment.apiUrl}paymeny/trip/${tripId}`, {
      headers: this.httpOptions.headers,
    });
  }

  ///////////// manual payment

  //get all payments
  getAllManualPayments(
    pageNumber,
    pageSize,
    startDate,
    endDate,
    Bank,
    Agency,
    SearchQuery
  ) {
    return this.http.get<any>(
      `${environment.apiUrl}payment/manual?PageNumber=${pageNumber}&PageSize=${pageSize}&StartDate=${startDate}&EndDate=${endDate}&Bank=${Bank}&Agency=${Agency}&SearchQuery=${SearchQuery}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  // add new payment
  addNewManualPayment(payment) {
    return this.http.post<any>(`${environment.apiUrl}payment/manual`, payment, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  //get payment by id
  getManualPaymentById(paymentId) {
    return this.http.get<any>(
      `${environment.apiUrl}payment/manual/${paymentId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  updateManualPayment(obj) {
    return this.http.put(`${environment.apiUrl}payment/manual/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ///////////////////////
  // Service controller //
  ///////////////////////

  //ships
  getAllShipsServices() {
    return this.http.get<any>(`${environment.apiUrl}service/ship`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewShipsService(obj) {
    return this.http.post<any>(`${environment.apiUrl}service/ship`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getShipsServiceById(id) {
    return this.http.get<any>(`${environment.apiUrl}service/ship/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateShipsService(obj) {
    return this.http.put(`${environment.apiUrl}service/ship/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateShipsServiceCharge(obj) {
    return this.http.put(
      `${environment.apiUrl}service/ship/charge/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  //overtime
  getAllOvertimeServices() {
    return this.http.get<any>(`${environment.apiUrl}service/overtime`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewOvertimeService(obj) {
    return this.http.post<any>(`${environment.apiUrl}service/overtime`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getOvertimeServiceById(id) {
    return this.http.get<any>(`${environment.apiUrl}service/overtime/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateOvertimeService(obj) {
    return this.http.put(
      `${environment.apiUrl}service/overtime/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  updateOvertimeServiceCharge(obj) {
    return this.http.put(
      `${environment.apiUrl}service/overtime/charge/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  //boat
  getAllBoatServices() {
    return this.http.get<any>(`${environment.apiUrl}service/boat`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewBoatService(obj) {
    return this.http.post<any>(`${environment.apiUrl}service/boat`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getBoatServiceById(id) {
    return this.http.get<any>(`${environment.apiUrl}service/boat/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateBoatService(obj) {
    return this.http.put(`${environment.apiUrl}service/boat/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateBoatServiceCharge(obj) {
    return this.http.put(
      `${environment.apiUrl}service/boat/charge/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // //crane
  getAllCraneServices() {
    return this.http.get<any>(`${environment.apiUrl}service/crane`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewCraneService(obj) {
    return this.http.post<any>(`${environment.apiUrl}service/crane`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getCraneServiceById(id) {
    return this.http.get<any>(`${environment.apiUrl}service/crane/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateCraneService(obj) {
    return this.http.put(`${environment.apiUrl}service/crane/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateCraneServiceCharge(obj) {
    return this.http.put(
      `${environment.apiUrl}service/crane/charge/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  ///////////////////////
  // Port controller //
  ///////////////////////

  getAllPorts(PageNumber, PageSize, SearchQuery) {
    return this.http.get<any>(
      `${environment.apiUrl}port?PageNumber=${PageNumber}&PageSize=${PageSize}&SearchQuery=${SearchQuery}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewPort(obj) {
    return this.http.post<any>(`${environment.apiUrl}port`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getPortById(id) {
    return this.http.get<any>(`${environment.apiUrl}port/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updatePort(obj) {
    return this.http.put(`${environment.apiUrl}port/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ///////////////////////
  // Report controller //
  ///////////////////////

  getReportTemplate(reportType) {
    return this.http.post<any>(
      // `${environment.apiUrl}initviewer?reportType=${reportType}`,
      `http://193.140.43.22/initviewer?reportType=${reportType}`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getShipForm(tripId) {
    return this.http.get<any>(`${environment.apiUrl}report/ship/${tripId}`, {
      // return this.http.get<any>(`http://localhost:47564/api/v1/report/ship/${invoiceId}`, {
      headers: this.httpOptions.headers,
    });
  }

  getShipInvoice(tripId) {
    return this.http.get<any>(`${environment.apiUrl}report/total/${tripId}`, {
      // return this.http.get<any>(`http://localhost:47564/api/v1/report/ship/${invoiceId}`, {
      headers: this.httpOptions.headers,
    });
  }

  getOvertimeInquiry(tripId) {
    return this.http.get<any>(
      `${environment.apiUrl}report/overtime/${tripId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getBoatInvoice(tripId) {
    return this.http.get<any>(
      `${environment.apiUrl}report/boat/invoice/${tripId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getBoatInquiry(tripId) {
    return this.http.get<any>(`${environment.apiUrl}report/boat/${tripId}`, {
      headers: this.httpOptions.headers,
    });
  }

  getCraneInvoice(invoiceId) {
    return this.http.get<any>(
      `${environment.apiUrl}report/crane/invoice/${invoiceId}`,
      {
        // return this.http.get<any>(`http://localhost:47564/api/v1/report/crane/${invoiceId}`, {
        headers: this.httpOptions.headers,
      }
    );
  }

  // getMakbuzInvoice(invoiceId) {
  //   return this.http.get<any>(`${environment.apiUrl}report/total/${invoiceId}`, {
  //     // return this.http.get<any>(`http://localhost:47564/api/v1/report/total/${invoiceId}`, {
  //     headers: this.httpOptions.headers,
  //   });
  // }

  getDashboard() {
    return this.http.get<any>(`${environment.apiUrl}report/dashboard`, {
      headers: this.httpOptions.headers,
    });
  }

  getShipDashboard(shipId) {
    return this.http.get<any>(
      `${environment.apiUrl}report/dashboard/ship?shipId=${shipId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  //////////////////////
  // ship controller  //
  //////////////////////

  getAllShips(
    SearchQuery,
    PageSize,
    PageNumber,
    isLocal = false,
    inPort = false
  ) {
    return this.http.get<any>(
      `${environment.apiUrl}ship?isLocal=${isLocal}&inPort=${inPort}&SearchQuery=${SearchQuery}&PageSize=${PageSize}&PageNumber=${PageNumber}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewShip(obj) {
    return this.http.post(`${environment.apiUrl}ship`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getShipById(id) {
    return this.http.get<any>(`${environment.apiUrl}ship/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateShip(obj) {
    return this.http.put(`${environment.apiUrl}ship/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // autoComplete
  getShipAuto(searchQuery) {
    return this.http.get<any>(
      `${environment.apiUrl}ship/auto?searchQuery=${searchQuery}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  //local
  addNewShipLocal(obj) {
    return this.http.post(`${environment.apiUrl}ship/local`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // detail

  getShipDetail(shipId) {
    return this.http.get<any>(`${environment.apiUrl}ship/${shipId}/detail`, {
      headers: this.httpOptions.headers,
    });
  }

  updateShipDetail(obj) {
    return this.http.put(`${environment.apiUrl}ship/detail/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // extra
  getShipExtra(shipId) {
    return this.http.get<any>(`${environment.apiUrl}ship/${shipId}/extra`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewShipExtra(obj) {
    return this.http.post(`${environment.apiUrl}ship/extra`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateShipExtra(obj) {
    return this.http.put(`${environment.apiUrl}ship/extra/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // construction part

  getAllConstructionsForShip(shipId) {
    return this.http.get<any>(
      `${environment.apiUrl}ship/${shipId}/construction`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewShipConstruction(obj) {
    return this.http.post(`${environment.apiUrl}ship/construction`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateShipConstruction(obj) {
    return this.http.put(
      `${environment.apiUrl}ship/construction/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // size part

  getAllSizesForShip(shipId) {
    return this.http.get<any>(`${environment.apiUrl}ship/${shipId}/size`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewShipSize(obj) {
    return this.http.post(`${environment.apiUrl}ship/size`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateShipSize(obj) {
    return this.http.put(`${environment.apiUrl}ship/size/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // document part

  getAllDocumentsForShip(shipId) {
    return this.http.get<any>(`${environment.apiUrl}ship/${shipId}/document`, {
      headers: this.httpOptions.headers,
    });
  }

  getDocumentById(documentId) {
    return this.http.get<any>(
      `${environment.apiUrl}ship/document/${documentId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewShipDocument(obj) {
    return this.http.post(`${environment.apiUrl}ship/document`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateDocument(obj) {
    return this.http.put(`${environment.apiUrl}ship/document/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // engine part

  getAllEnginesForShip(shipId) {
    return this.http.get<any>(`${environment.apiUrl}ship/${shipId}/engine`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewShipEngine(obj) {
    return this.http.post(`${environment.apiUrl}ship/engine`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateShipEngine(obj) {
    return this.http.put(`${environment.apiUrl}ship/engine/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // mortage part

  getAllMortagesForShip(shipId) {
    return this.http.get<any>(`${environment.apiUrl}ship/${shipId}/mortage`, {
      headers: this.httpOptions.headers,
    });
  }

  getMortageById(mortageId) {
    return this.http.get<any>(
      `${environment.apiUrl}ship/mortage/${mortageId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewShipMortage(obj) {
    return this.http.post(`${environment.apiUrl}ship/mortage`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateMortage(obj) {
    return this.http.put(`${environment.apiUrl}ship/mortage/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // owner part

  getAllOwnersForShip(shipId) {
    return this.http.get<any>(`${environment.apiUrl}ship/${shipId}/owner`, {
      headers: this.httpOptions.headers,
    });
  }

  getOwnerById(ownerId) {
    return this.http.get<any>(`${environment.apiUrl}ship/owner/${ownerId}`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewShipOwner(obj) {
    return this.http.post(`${environment.apiUrl}ship/owner`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateOwner(obj) {
    return this.http.put(`${environment.apiUrl}ship/owner/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ////////////////////////////////
  // shipTransaction controller //
  ////////////////////////////////

  getAllShipTransactions(
    StartDate,
    EndDate,
    PageNumber,
    PageSize,
    SearchQuery
  ) {
    return this.http.get<any>(
      `${environment.apiUrl}transaction?StartDate=${StartDate}&EndDate=${EndDate}
      &PageNumber=${PageNumber}&PageSize=${PageSize}&SearchQuery=${SearchQuery}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewShipTransaction(obj) {
    return this.http.post(`${environment.apiUrl}transaction`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getShipTransactionById(id) {
    return this.http.get<any>(`${environment.apiUrl}transaction/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateShipTransaction(obj) {
    return this.http.put(`${environment.apiUrl}transaction/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // car transaction part

  getAllCarTransactionForSpeceficTransaction(transactionId) {
    return this.http.get<any>(
      `${environment.apiUrl}transaction/${transactionId}/car`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getCarTransactionById(carTransId) {
    return this.http.get<any>(
      `${environment.apiUrl}transaction/car/${carTransId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewCarTransaction(obj) {
    return this.http.post(`${environment.apiUrl}transaction/car`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateCarTransaction(obj) {
    return this.http.put(
      `${environment.apiUrl}transaction/car/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // passenger transaction part

  getAllPassengerTransactionForSpeceficTransaction(transactionId) {
    return this.http.get<any>(
      `${environment.apiUrl}transaction/${transactionId}/passenger`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getPassengerTransactionById(carTransId) {
    return this.http.get<any>(
      `${environment.apiUrl}transaction/passenger/${carTransId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewPassengerTransaction(obj) {
    return this.http.post(`${environment.apiUrl}transaction/passenger`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updatePassengerTransaction(obj) {
    return this.http.put(
      `${environment.apiUrl}transaction/passenger/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // product transaction part

  getAllProductTransactionForSpeceficTransaction(transactionId) {
    return this.http.get<any>(
      `${environment.apiUrl}transaction/${transactionId}/product`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getProductTransactionById(carTransId) {
    return this.http.get<any>(
      `${environment.apiUrl}transaction/product/${carTransId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewProductTransaction(obj) {
    return this.http.post(`${environment.apiUrl}transaction/product`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateProductTransaction(obj) {
    return this.http.put(
      `${environment.apiUrl}transaction/product/${obj.id}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  //////////////////////
  // staff controller //
  //////////////////////

  getAllStaffs(SearchQuery, PageNumber, PageSize) {
    return this.http.get<any>(
      `${environment.apiUrl}staff?SearchQuery=${SearchQuery}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewStaff(obj) {
    return this.http.post(`${environment.apiUrl}staff`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getStaffById(id) {
    return this.http.get<any>(`${environment.apiUrl}staff/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  updateStaff(obj) {
    return this.http.put(`${environment.apiUrl}staff/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getContactById(contactId) {
    return this.http.get<any>(
      `${environment.apiUrl}staff/contact/${contactId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addNewContact(obj) {
    return this.http.post(`${environment.apiUrl}staff/contact`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateContact(obj, contactId) {
    return this.http.put(
      `${environment.apiUrl}staff/contact/${obj.id}?contactId=${contactId}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  staffUsernameAvailable(username) {
    return this.http.post<any>(
      `${environment.apiUrl}staff/check/${username}`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  updateStaffPassword(password, staffId) {
    return this.http.post(
      `${environment.apiUrl}staff/${staffId}/password`,
      password,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  //////////////////////
  // Transaction controller //
  //////////////////////

  deleteArrival(tripId) {
    return this.http.put(
      `${environment.apiUrl}trip/arrival/${tripId}/delete`,
      // `${environment.apiUrl}trip/arrival/${obj.tripId}`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  deleteDeparture(tripId) {
    return this.http.put(
      `${environment.apiUrl}trip/departure/${tripId}/delete`,
      // `${environment.apiUrl}trip/arrival/${obj.tripId}`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // add query variabbles
  getAllTrips(
    startDate,
    endDate,
    PageNumber,
    PageSize,
    SearchQuery,
    ShipId = 0,
    Accommodation = '',
    Port = '',
    InPort = false,
    IsArrival = false,
    IsDeparture = false
  ) {
    return this.http.get<any>(
      `${environment.apiUrl}trip?startDate=${startDate}&endDate=${endDate}&ShipId=${ShipId}&Accommodation=${Accommodation}&Port=${Port}&InPort=${InPort}&IsArrival=${IsArrival}&IsDeparture=${IsDeparture}&SearchQuery=${SearchQuery}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  tripCheckout(id) {
    return this.http.put(
      `${environment.apiUrl}trip/${id}/checkout`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // arrival
  getArrivalByTipId(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/${id}/arrival`, {
      headers: this.httpOptions.headers,
    });
  }

  addArrival(obj) {
    return this.http.post(`${environment.apiUrl}trip/arrival`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateArrival(obj) {
    return this.http.put(
      `${environment.apiUrl}trip/arrival/${obj.id}`,
      // `${environment.apiUrl}trip/arrival/${obj.tripId}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // departure
  getDepartureByTipId(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/${id}/departure`, {
      headers: this.httpOptions.headers,
    });
  }

  addDeparture(obj) {
    return this.http.post(`${environment.apiUrl}trip/departure`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateDeparture(obj) {
    return this.http.put(`${environment.apiUrl}trip/departure/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // load
  getAllLoadsForTrasaction(id) {
    return this.http.get<any>(`${environment.apiUrl}load/transaction/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  getLoadById(id) {
    return this.http.get<any>(`${environment.apiUrl}load/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addLoad(obj) {
    return this.http.post(`${environment.apiUrl}load`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateLoad(obj) {
    return this.http.put(`${environment.apiUrl}load/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // movement
  getAllMovmentsForTrip(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/${id}/movement`, {
      headers: this.httpOptions.headers,
    });
  }

  getMovementById(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/movement/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addMovement(obj) {
    return this.http.post(`${environment.apiUrl}trip/movement`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateMovement(obj) {
    return this.http.put(`${environment.apiUrl}trip/movement/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // overtime
  getAllOvertimeForTrip(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/${id}/overtime`, {
      headers: this.httpOptions.headers,
    });
  }

  getOvertimeById(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/overtime/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addOvertime(obj) {
    return this.http.post(`${environment.apiUrl}trip/overtime`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateOvertime(obj) {
    return this.http.put(`${environment.apiUrl}trip/overtime/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // boat
  getAllBoatForTrip(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/${id}/boat`, {
      headers: this.httpOptions.headers,
    });
  }

  getBoatById(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/boat/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addBoat(obj) {
    return this.http.post(`${environment.apiUrl}trip/boat`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateBoat(obj) {
    return this.http.put(`${environment.apiUrl}trip/boat/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // crane
  getAllCraneForTrip(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/${id}/crane`, {
      headers: this.httpOptions.headers,
    });
  }

  getCraneById(id) {
    return this.http.get<any>(`${environment.apiUrl}trip/crane/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  addCrane(obj) {
    return this.http.post(`${environment.apiUrl}trip/crane`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateCrane(obj) {
    return this.http.put(`${environment.apiUrl}trip/crane/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // not API functions

  displayFormattedNumber(num: any, isMoney = true) {
    try {
      num = Number(num);
      if (num === 0) {
        return 0;
      }
      if (isMoney) {
        num = num.toFixed(2);
      } else if (num.toString().includes('.')) {
        num = num.toFixed(2);
      }

      let numTr = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return numTr;
    } catch (ex) {
      return num;
    }
  }

  returnDateTime(date: any = null) {
    if (date == null) {
      const hfa = new Date();

      date = hfa.toISOString();

      const offset = new Date().getTimezoneOffset();

      const dateToReturn = new Date(date);

      const m = dateToReturn.getMinutes();

      // dateToReturn.setMinutes( dateToReturn.getMinutes() - offset);

      return dateToReturn;
    }
    let offset = new Date().getTimezoneOffset();
    offset *= 2;

    const dateToReturn = new Date(date);

    const m = dateToReturn.getMinutes();

    dateToReturn.setMinutes(dateToReturn.getMinutes() - offset);

    let hfa = dateToReturn.toISOString();
    let hda = dateToReturn.toString();

    // return dateToReturn;
    return hfa;
  }

  returnDateTimeToSend(date) {
    const offset = new Date().getTimezoneOffset();

    const dateToReturn = new Date(date);

    const m = dateToReturn.getMinutes();

    dateToReturn.setMinutes(dateToReturn.getMinutes() + offset);

    return dateToReturn;
  }

  returnTimeFromDate(date) {
    if (date === null || date === undefined) {
      return '';
    }
    // "date": "2021-02-21T12:22:16.951Z",
    let timeP = 'AM';
    let time = date.split('T')[1];
    let time1 = +time.split(':')[0];
    const time2 = time.split(':')[1];

    if (time1 > 12) {
      time1 -= 12;
      timeP = 'PM';
    }

    if (time1 === 0) {
      time1 = 12;
    }

    return time1 + ':' + time2 + ' ' + timeP;
  }

  returnDateTimeIso(date: any = null, machineTime = false) {
    const offset = new Date().getTimezoneOffset();

    let dateToReturn = new Date();

    if (date !== null) {
      dateToReturn = new Date(date);
      dateToReturn.setMinutes(dateToReturn.getMinutes() - offset);
    } else {
      if (machineTime) {
        dateToReturn.setMinutes(dateToReturn.getMinutes() - offset);
      }
    }

    const dateRet = dateToReturn.toISOString();
    return dateRet;
  }
}
