import { LogService } from './services/log.service';
import { RoleService } from './services/role.service';
import { LocationService } from './services/location.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './common/app-error-handler';
import { XHRBackend, RequestOptions, Http, HttpModule } from '@angular/http';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MdInputModule, MdButtonModule, MdCheckboxModule, MdMenuModule, MdDialogModule, MdIconModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { SuccessComponent } from './components/dialogs/success/success.component';
import { ErrorComponent } from './components/dialogs/error/error.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { LocationCreateComponent } from './components/location/location-create/location-create.component';
import { LocationEditComponent } from './components/location/location-edit/location-edit.component';
import { UserChangepassComponent } from './components/user/user-changepass/user-changepass.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    LoginComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    ConfirmComponent,
    SuccessComponent,
    ErrorComponent,
    UserEditComponent,
    LocationListComponent,
    NoAccessComponent,
    LocationCreateComponent,
    LocationEditComponent,
    UserChangepassComponent
  ],
  entryComponents: [
    ConfirmComponent,
    SuccessComponent,
    ErrorComponent,
    UserCreateComponent,
    UserEditComponent,
    LocationCreateComponent,
    LocationEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdDialogModule,
    MdIconModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
      RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'user/login', component: LoginComponent},
            { path: 'user/list', component: UserListComponent, canActivate: [AuthGuard, AdminAuthGuard] },
            { path: 'user/create', component: UserCreateComponent, canActivate: [AuthGuard, AdminAuthGuard] },
            { path: 'user/edit/:id', component: UserEditComponent, canActivate: [AuthGuard, AdminAuthGuard] },
            { path: 'user/changepass', component: UserChangepassComponent, canActivate: [AuthGuard] },
            { path: 'location/list', component: LocationListComponent, canActivate: [AuthGuard, AdminAuthGuard]},
            { path: 'location/create', component: LocationCreateComponent, canActivate: [AuthGuard, AdminAuthGuard]},
            { path: 'no-access', component: NoAccessComponent},
            { path: 'home', component: HomeComponent }
        ])

  ],
  providers: [
        HttpService,
        UserService,
        AuthService,
        AuthGuard,
        AdminAuthGuard,
        LocationService,
        RoleService,
        LogService
  ]
})
export class AppModule { }
