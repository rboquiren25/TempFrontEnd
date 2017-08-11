import { DataService } from './services/data.service';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './common/app-error-handler';
import { XHRBackend, RequestOptions, Http } from '@angular/http';
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


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
      RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'user/login', component: LoginComponent},
            { path: 'home', component: HomeComponent }
        ])

  ],
  providers: [
        Http,
        UserService,
        DataService,
        {provide: ErrorHandler, useClass: AppErrorHandler}
  ]
})
export class AppModule { }
