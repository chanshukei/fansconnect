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
import { ShopComponent } from './shop/shop.component';
import { ShopItemEditComponent } from './shop-item-edit/shop-item-edit.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { OrderFilter } from './order-review/orderfilter';
import { GameBattleComponent } from './game-battle/game-battle.component';
import { GameCreationComponent } from './game-creation/game-creation.component';
import { SicardStoreComponent } from './sicard-store/sicard-store.component';
import { MyorderReviewComponent } from './myorder-review/myorder-review.component';
import { EventFilter } from './events/eventfilter';
import { GameStartComponent } from './game-start/game-start.component';
import { SicardGameStartComponent } from './sicard-game-start/sicard-game-start.component';
import { SupportItemFormComponent } from './support-item-form/support-item-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SurveyComponent } from './survey/survey.component';
import { SicardGameHomeComponent } from './sicard-game-home/sicard-game-home.component';
import { QuestionsKingComponent } from './questions-king/questions-king.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionsKingHomeComponent } from './questions-king-home/questions-king-home.component';
import { DesignCompComponent } from './design-comp/design-comp.component';
import { DonationComponent } from './donation/donation.component';
import { DonationReviewComponent } from './donation-review/donation-review.component';
import { SicardStorepComponent } from './sicard-storep/sicard-storep.component';
import { SicardCreationComponent } from './sicard-creation/sicard-creation.component';
import { SicardSnackShopComponent } from './sicard-snack-shop/sicard-snack-shop.component';

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
    LuckydrawComponent,
    ShopComponent,
    ShopItemEditComponent,
    OrderReviewComponent,
    OrderFilter,
    EventFilter,
    GameBattleComponent,
    GameCreationComponent,
    SicardStoreComponent,
    MyorderReviewComponent,
    GameStartComponent,
    SicardGameStartComponent,
    SupportItemFormComponent,
    ProfileComponent,
    ChatroomComponent,
    SurveyComponent,
    SicardGameHomeComponent,
    QuestionsKingComponent,
    AddQuestionComponent,
    QuestionsKingHomeComponent,
    DesignCompComponent,
    DonationComponent,
    DonationReviewComponent,
    SicardStorepComponent,
    SicardCreationComponent,
    SicardSnackShopComponent
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
