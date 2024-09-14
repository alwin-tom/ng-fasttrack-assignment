import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpHelperService } from '../services/http-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-holiday-management',
  templateUrl: './user-holiday-management.component.html',
  styleUrls: ['./user-holiday-management.component.scss']
})
export class UserHolidayManagementComponent implements OnInit {

  employeeId: string = "";
  employeeDetails: any = {};
  existingHolidays: any = {};
  minDate: Date = new Date();
  holidayApplicationForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    holidayLabel: new FormControl('', [Validators.required]),
    holidayId: new FormControl('')
  });
  modalReference: any;


  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private httpHelper: HttpHelperService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.employeeId = params['id'];
        this.httpHelper.doGet("/employee/" + this.employeeId)
          .subscribe((data: any) => {
            this.employeeDetails = data;
          });
        this.loadAllHolidays();
      });
  }

  loadAllHolidays() {
    this.httpHelper.doGet("/holidays/employee/" + this.employeeId)
      .subscribe((data: any) => {
        this.existingHolidays = data;
      })
  }

  addHoliday(content: any) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(formDetails: FormGroup, eventId: any) {
    if (formDetails.valid) {
      formDetails.value.startDate;
      let reqData = {
        "holidayLabel": formDetails.value.holidayLabel,
        "employeeId": this.employeeId,
        "startOfHoliday": new Date(formDetails.value.startDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")),
        "endOfHoliday": new Date(formDetails.value.endDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")),
        "status": eventId == 'draft-btn' ? "DRAFT" : "SCHEDULED"
      }
      this.httpHelper.doPut("/holidays", reqData)
        .subscribe((data) => {
          this.modalReference.close();
          this.holidayApplicationForm.reset();
          this.loadAllHolidays();
        },
          (err: any) => {
            console.log(err);
            if (err.status == 400) {
              alert(err.error.message);
            }
          });
    } else {
      alert("Invalid dates");
    }
  }

  onSubmitUpdate(formDetails: FormGroup, eventId: any) {
    console.log(formDetails);
    
    if (formDetails.valid) {
      formDetails.value.startDate;
      let reqData = {
        "holidayId": formDetails.value.holidayId,
        "holidayLabel": formDetails.value.holidayLabel,
        "employeeId": this.employeeId,
        "startOfHoliday": new Date(formDetails.value.startDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")),
        "endOfHoliday": new Date(formDetails.value.endDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")),
        "status": eventId == 'draft-btn' ? "DRAFT" : "SCHEDULED"
      }
      this.httpHelper.doPost("/holidays", reqData)
        .subscribe((data) => {
          this.modalReference.close();
          this.holidayApplicationForm.reset();
          this.loadAllHolidays();
        },
          (err: any) => {
            console.log(err);
            if (err.status == 400) {
              alert(err.error.message);
            }
          });
    } else {
      alert("Invalid dates");
    }
  }

  deleteEntry(holidayId: string) {
    if (confirm("Do you want to cancel this holiday?")) {
      this.httpHelper.doDelete("/holidays/" + holidayId)
        .subscribe((data) => {
          this.loadAllHolidays();
        })
    }
  }

  openEditPopup(holidayDetails: any, content: any) {

    this.holidayApplicationForm.patchValue({
      startDate: formatDate(new Date(holidayDetails.startOfHoliday), 'yyyy-MM-dd', 'en-us'),
      endDate: formatDate(new Date(holidayDetails.endOfHoliday), 'yyyy-MM-dd', 'en-us'),
      holidayId: holidayDetails.holidayId,
      holidayLabel: holidayDetails.holidayLabel
    });
    this.modalReference = this.modalService.open(content);
  }

  closeModal() {
    this.holidayApplicationForm.reset();
    this.modalReference.close();
  }

}
