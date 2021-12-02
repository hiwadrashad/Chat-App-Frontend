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
import { AddGroupChatModalComponent } from './add-group-chat-modal/add-group-chat-modal.component';
import { AddSingleChatModalComponent } from './add-single-chat-modal/add-single-chat-modal.component';
import { GroupSidebarComponent } from './group-sidebar/group-sidebar.component';
import { IndividualSidebarComponent } from './individual-sidebar/individual-sidebar.component';
import { GeneralSidebarComponent } from './general-sidebar/general-sidebar.component';
import { MicrosoftLoginComponent } from './microsoft-login/microsoft-login.component';
import { CommonModule } from '@angular/common';
export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId: 'bdb47601-aa88-48f3-a6fb-ce9a18df147b',
      redirectUri: 'http://localhost:4200/profileoverview'
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
    ChatComponent,
    AddGroupChatModalComponent,
    AddSingleChatModalComponent,
    GroupSidebarComponent,
    IndividualSidebarComponent,
    GeneralSidebarComponent,
    MicrosoftLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    RouterModule,
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
