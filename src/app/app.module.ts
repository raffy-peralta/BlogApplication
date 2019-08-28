import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountsService } from './services/accounts/accounts.service';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService, initializeApp } from './services/config/config.service';
import { BlogsService } from './services/blogs/blogs.service';
import { NgPipesModule } from 'ngx-pipes';
import { DraftComponent } from './components/draft/draft.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    AdminComponent,
    DashboardComponent,
    DraftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgPipesModule
  ],
  providers: [AccountsService, ConfigService,{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps:[ConfigService],
    multi: true
    },BlogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
