import { Component, OnInit } from '@angular/core';
import { LabelService, HelperService } from 'src/app/shared/_services';
import { Observable } from 'rxjs';
import { View } from 'src/app/shared/_models';
import { AppointmentService} from 'src/app/shared/_services/appointment.service';
import { FormGroup, Validators, FormControl,FormBuilder  } from '@angular/forms';
import { ModalService } from 'src/app/shared/_directives';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public labels$: Observable<{ [key: string]: string }>;
  public minDate: Date = this._helper.minDate;
  public datepickerFormat: string = this._helper.datepickerFormat;
  public dateFormat: string = this._helper.dateFormat;


  public appointmentCurrentPage = 1;
  public appointments: Array<any> = [];
  public customers: Array<any> = [];
  public appointmentTypes: Array<any> = [];
  public drivers: Array<any> = [];
  public appointmentSearchKey: '';

  public hasAppointmentList: boolean = false;
  public showAddEditAppointmentForm: boolean = false;
  public appointmentFormSubmitted: boolean = false;
  public appointmentFormMode: 'ADD' | 'EDIT';
  public editItem: any;
  public deleteItem: any;

  public appointmentform: FormGroup;
  public appointmenttypeid = new FormControl(null, [Validators.required]);

  public masterdata: any;
  public submitted = false;
  // convenience getter for easy access to form fields
  get f() { return this.appointmentform.controls; }
  public searchForm: FormGroup;

  constructor(
    private _appointment: AppointmentService,
    private router: Router,
    private _helper: HelperService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private _label: LabelService) {
  //  this._appointment.getappointment();

  }

  ngOnInit() {
    this.masterdata = this._helper.getSiteMasterData();
   
    
    this._appointment.getappointment({
      
        date: null,
        SearchString: null
      
    }).subscribe(result => {
      this.appointments = result;
      console.log("appointments list",this.appointments);
    }); 

    // this._customer.getcustomer('').subscribe(result => {
    //   this.customers = result;
    //   console.log("customers list",this.customers);
    // });

    this.createAppointmentForm();
  }

  initializeAppointmentData(list) {
    this.appointments = list;
    this.hasAppointmentList = this.appointments.length > 0;
    console.log(this.hasAppointmentList, "Get appointments list");
  }

  public searchappointments() {
    const key = this.appointmentSearchKey.trim();
    //this._appointment.filterappointment(key);
  }

  public createAppointmentForm() {
    this.searchForm = this.formBuilder.group({
      searchstring:'',
      date:null
      
    });

    this.appointmentform = new FormGroup(
      {
        id: new FormControl(null, [Validators.required]),
        firstname: new FormControl(null, [Validators.required]),
        lastname: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        date: new FormControl(null, [Validators.required]),
        contact: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        bloodgroup: new FormControl(null, [Validators.required]),
        address:  new FormControl(null, [Validators.required])
       
      }
    );
    this.resetAppointmentForm();
  }

  resetAppointmentForm() {
    this.appointmentform.reset();
    this.appointmentFormSubmitted = false;
    this.appointmentform.setValue({
      id: 0,        
      date: null,
      email: null,
      contact: null,
      firstname: null,
      lastname: null,
      gender: null,
      bloodgroup: null,
      address:null
    });
  }
  resetSearchForm() {
    this.searchForm.reset();
    this.searchForm.setValue({
      // productcode: null,
      // leaddate: null,
      // comment: null,
      // isclosure: false,
      // meetinglocation:null,
      // botInstanceid:null,
      // isCancelled:false

  });
  }
  onReset() {
    this.resetAppointmentForm();
    this.resetSearchForm();
    this.showAddEditAppointmentForm = false;
  }

  onSubmit() {
    console.log(this.appointmentFormMode, "appointment form mode");

    this.appointmentFormSubmitted = true;
    if (this.appointmentform.invalid) {
      this.modalService.open('errormsgbox');
       return;
    }

    if (this.appointmentFormMode === 'ADD') {
      // const data = {
      //   date:this.searchForm.value.date,
       
      //   email: this.searchForm.value.email,
      //   contact: this.searchForm.value.contact,
      //   firstname: this.searchForm.value.firstname,
      //   lastname: this.searchForm.value.lastname,
      //   gender: this.searchForm.value.gender,
      //   bloodgroup: this.searchForm.value.bloodgroup,
      //   address: this.searchForm.value.address
      // };
      let data = {
        ...this.appointmentform.value,
      };
      console.log(data, "appointment request for Addappointment");
      this._appointment.addappointment(data).subscribe(_ => {
        this.showAddEditAppointmentForm = false;
        this.router.navigate([`/appointment`]);


        this._appointment.getappointment({
      
          date: null,
          SearchString: null
        
      }).subscribe(result => {
        this.appointments = result;
        console.log("appointments list",this.appointments);
      }); 


      }); 
    } else {
      const data = {
        ...this.editItem,
        ...this.appointmentform.value
      };
     // data.dob = this._helper.convertDateToString(data.dob, 'DD,MMM, YYYY');
     // data.joiningdate = this._helper.convertDateToString(data.joiningdate, 'DD,MMM, YYYY');
     // data.validtill = this._helper.convertDateToString(data.validtill, 'DD,MMM, YYYY');
     this._appointment.updateappointment(data).subscribe(_ => {
        this.showAddEditAppointmentForm = false;
        this.router.navigate([`/appointment`]);

      }); 
    } 
  }

  onSearchSubmit() {
   /* if (this.searchForm.invalid) {
      return;
    } */
    let request: string='';
    
   
    console.log("Request",request);
    this._appointment.getappointment({
      date:this.searchForm.value.date,
      SearchString:this.searchForm.value.searchstring
    }); 

    
  }
  
  addNewappointment() {
    this.resetAppointmentForm();
    this.showAddEditAppointmentForm = true;
    console.log("");
    this.appointmentFormMode = 'ADD';
  }
 
  editAppointment(item) {
    this.appointmentform.reset();
    this.appointmentFormSubmitted = false;
    this.showAddEditAppointmentForm = true;
    this.appointmentFormMode = 'EDIT';
    this.editItem = item;
    this.appointmentform.setValue({
      id: item.id,
      date: new Date(item.date),
      email: item.email,
      contact: item.contact,
      firstname: item.firstname,
      lastname: item.lastname,
      gender: item.gender,
      bloodgroup: item.bloodgroup,
      address: item.address      


    });
  }

  deleteAppointment(item) {
    this.deleteItem = item;
    this.modalService.open('appointmentconfirmation');
  }

  closeModal(id, option) {
    switch (option) {
      case 'YES': {
        if (!this._helper.isEmpty(this.deleteItem)) {
          this._appointment.deleteappointment(this.deleteItem).subscribe(_ => {
            this.deleteItem = null;


            this._appointment.getappointment({
      
              date: null,
              SearchString: null
            
          }).subscribe(result => {
            this.appointments = result;
            console.log("appointments list",this.appointments);
          }); 




          }); 
        } else {
          this.deleteItem = null;
        }
        this.modalService.close(id);
        break;
      }
      default: {
        this.deleteItem = null;
        this.modalService.close(id);
      }
    }
  } 
  closeErrorModal(id) {
    this.modalService.close(id);
  }
}
