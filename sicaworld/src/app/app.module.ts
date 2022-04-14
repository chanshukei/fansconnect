import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrderFilter } from './filter/orderfilter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { MyorderReviewComponent } from './myorder-review/myorder-review.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { EventsComponent } from './events/events.component';
import { EventFilter } from './filter/eventfilter';
import { QuestionsKingComponent } from './questions-king/questions-king.component';
import { QuestionsKingHomeComponent } from './questions-king-home/questions-king-home.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { SupportitemComponent } from './supportitem/supportitem.component';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { DonationComponent } from './donation/donation.component';
import { DonationReviewComponent } from './donation-review/donation-review.component';
import { SupportItemFormComponent } from './support-item-form/support-item-form.component';
import { LuckydrawComponent } from './luckydraw/luckydraw.component';
import { DesignCompComponent } from './design-comp/design-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ShopComponent,
    MyorderReviewComponent,
    OrderFilter,
    EventFilter,
    ProfileComponent,
    OrderReviewComponent,
    EventsComponent,
    QuestionsKingComponent,
    QuestionsKingHomeComponent,
    AddQuestionComponent,
    SupportitemComponent,
    MapComponent,
    DashboardComponent,
    DonationComponent,
    DonationReviewComponent,
    SupportItemFormComponent,
    LuckydrawComponent,
    DesignCompComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
