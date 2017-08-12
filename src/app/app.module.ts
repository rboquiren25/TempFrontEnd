import { AuthService } from './services/auth.service';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './common/app-error-handler';
import { XHRBackend, RequestOptions, Http, HttpModule } from '@angular/http';
import {ToastyModule} from 'ng2-toasty';
import { UserService } from './services/user.service';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MdInputModule, MdButtonModule, MdCheckboxModule, MdMenuModule} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';



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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
      RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'user/login', component: LoginComponent},
            { path: 'user/list', component: UserListComponent},
            { path: 'user/create', component: UserCreateComponent},
            { path: 'user/edit', component: UserEditComponent},
            { path: 'home', component: HomeComponent }
        ])

  ],
  providers: [
        UserService,
        AuthService
  ]
})
export class AppModule { }
