import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HttpHelperService } from '../services/http-helper.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpClient: HttpClient;

  class HttpHelperServiceMock {
    doGet(url: any) {
      let employees = [
        {
          employeeId: "klm000001",
          name: "Alwin"
        }
      ];
      return of(employees);
    }
  }

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [HttpClientModule,
        {provide: HttpHelperService, useClass: HttpHelperServiceMock}
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create get all user details', () => {
    component.loadAllUsers();
    fixture.detectChanges();

    expect(component.allEmployees.length).toEqual(1);
    
    let cards = fixture.debugElement.queryAll(By.css(".user-card"));
    expect(cards.length).toEqual(1);

  });
});
