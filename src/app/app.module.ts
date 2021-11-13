import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ProfileoverviewComponent } from './profileoverview/profileoverview.component';
import { LoginComponent } from './login/login.component'
import { CommunicationService } from './communication.service';
import { SellingPageComponent } from './selling-page/selling-page.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId: '241b9b9d-a4c2-45ed-983e-3cf2e31ff3de',
      redirectUri: 'http://localhost:4200/'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileoverviewComponent,
    LoginComponent,
    SellingPageComponent,
    RegisterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [{
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
