import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileoverviewComponent } from './profileoverview/profileoverview.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { SellingPageComponent } from './selling-page/selling-page.component';
import { MicrosoftLoginComponent } from './microsoft-login/microsoft-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'admindashboard', component: AdminDashboardComponent},
  {path:'mslogin', component: MicrosoftLoginComponent},
  {path:'login', component: LoginComponent},
  {path:'chat', component: ChatComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: SellingPageComponent},
  {path:'profileoverview', component: ProfileoverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule
,]
})
export class AppRoutingModule { }
