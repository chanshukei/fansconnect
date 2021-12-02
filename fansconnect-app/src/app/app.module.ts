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

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    EventsComponent,
    HomeComponent,
    PhotobattleComponent,
    EventfansComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
