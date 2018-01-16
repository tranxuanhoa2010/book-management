import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './app.routes';
import { LoginService } from './login.service';
import { CheckLoginGuard } from './guards/check-login-guards';
import { CheckSaveFormGuard } from './guards/check-save-form-guard';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookAddComponent } from './book-add/book-add.component';



@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookEditComponent,
    BookAddComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutes
  ],
  providers: [LoginService, CheckLoginGuard, CheckSaveFormGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
