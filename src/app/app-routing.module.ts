import { TokenComponent } from './components/token/token.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "home", component: HomeComponent },
  { path: "token/:value", component: TokenComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: LoginComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
