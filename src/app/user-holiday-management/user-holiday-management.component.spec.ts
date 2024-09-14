import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHolidayManagementComponent } from './user-holiday-management.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHelperService } from '../services/http-helper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { from, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('UserHolidayManagementComponent', () => {
  let component: UserHolidayManagementComponent;
  let fixture: ComponentFixture<UserHolidayManagementComponent>;
  let httpClient: HttpClient;

  class HttpHelperServiceMock {
    doGet(url: string) {
      let response;
      if (!url.includes("holidays")) {
        response = {
          employeeId: "klm000001",
          name: "Alwin"
        };
      } else {
        response = [
          {
            "holidayId": "e207927f-7964-4ddd-bede-36a327ff55aa",
            "holidayLabel": "111",
            "employeeId": "klm000001",
            "startOfHoliday": "2024-09-18T08:00:00Z",
            "endOfHoliday": "2024-09-20T08:00:00Z",
            "status": "SCHEDULED"
          }
        ];
      }
      return of(response);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHolidayManagementComponent],
      providers: [HttpClientModule,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{ id: 1 }]),
          },
        },

        { provide: HttpHelperService, useClass: HttpHelperServiceMock }
      ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserHolidayManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all holidays', () => {
    component.loadAllHolidays();
    expect(component.existingHolidays.length).toEqual(1);
  });
});
