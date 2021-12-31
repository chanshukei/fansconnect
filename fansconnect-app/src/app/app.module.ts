import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { HttpClientModule} from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { PhotobattleComponent } from './photobattle/photobattle.component';
import { EventfansComponent } from './eventfans/eventfans.component';
import { FormsModule } from '@angular/forms';
import { SupportitemComponent } from './supportitem/supportitem.component';
import { LoginComponent } from './login/login.component';
import { IncomeComponent } from './income/income.component';
import { MapComponent } from './map/map.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SmaterialComponent } from './smaterial/smaterial.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LuckydrawComponent } from './luckydraw/luckydraw.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    EventsComponent,
    HomeComponent,
    PhotobattleComponent,
    EventfansComponent,
    SupportitemComponent,
    LoginComponent,
    IncomeComponent,
    MapComponent,
    DashboardComponent,
    SmaterialComponent,
    ChatbotComponent,
    LuckydrawComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
