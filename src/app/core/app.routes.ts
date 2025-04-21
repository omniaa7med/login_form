import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { HomeComponent } from '../home/home.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from '../auth/register/register.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
];
