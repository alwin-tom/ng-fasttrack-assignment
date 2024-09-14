import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserHolidayManagementComponent } from './user-holiday-management/user-holiday-management.component';

const routes: Routes = [
  {
    path: "users",
    component: UserListComponent
  },
  {
    path: "users/:id",
    component: UserHolidayManagementComponent
  },
  {
    path: "**",
    redirectTo: "/users",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
