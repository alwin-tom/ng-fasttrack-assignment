import { Component, OnInit } from '@angular/core';
import { HttpHelperService } from '../services/http-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  allEmployees: any = [];

  constructor(private httpHelper: HttpHelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.httpHelper.doGet("/employee")
      .subscribe((data: any) => {
        this.allEmployees = data;
      });
  }

  navigateToUserHolidayDetails(employeeId: string) {
    this.router.navigate(["users/" + employeeId]);
  }

}
