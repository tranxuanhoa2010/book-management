import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookAddComponent } from './book-add/book-add.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { CheckLoginGuard } from './guards/check-login-guards';
import { CheckSaveFormGuard } from './guards/check-save-form-guard';

const routing: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bookList', component: BookComponent, canActivate: [CheckLoginGuard]},
    { path: 'book-detail/:id', component: BookDetailComponent, canDeactivate: [CheckSaveFormGuard] },
    { path: 'book-edit/:id', component: BookEditComponent},
    { path: 'book-add', component: BookAddComponent},
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent }

] 
export const appRoutes = RouterModule.forRoot(routing);