import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventfansComponent } from './eventfans/eventfans.component';
import { HomeComponent } from './home/home.component';
import { PhotobattleComponent } from './photobattle/photobattle.component';
import { QuestionsComponent } from './questions/questions.component';
import { SupportitemComponent } from './supportitem/supportitem.component';
import { LoginComponent } from './login/login.component';
import { IncomeComponent } from './income/income.component';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SmaterialComponent } from './smaterial/smaterial.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LuckydrawComponent } from './luckydraw/luckydraw.component';
import { ShopComponent } from './shop/shop.component';
import { ShopItemEditComponent } from './shop-item-edit/shop-item-edit.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { GameBattleComponent } from './game-battle/game-battle.component';
import { GameCreationComponent } from './game-creation/game-creation.component';
import { SicardStoreComponent } from './sicard-store/sicard-store.component';
import { MyorderReviewComponent } from './myorder-review/myorder-review.component';
import { GameStartComponent } from './game-start/game-start.component';
import { SicardGameStartComponent } from './sicard-game-start/sicard-game-start.component';
import { SupportItemFormComponent } from './support-item-form/support-item-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SurveyComponent } from './survey/survey.component';
import { SicardGameHomeComponent } from './sicard-game-home/sicard-game-home.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionsKingComponent } from './questions-king/questions-king.component';
import { QuestionsKingHomeComponent } from './questions-king-home/questions-king-home.component';
import { DesignCompComponent } from './design-comp/design-comp.component';
import { DonationComponent } from './donation/donation.component';
import { DonationReviewComponent } from './donation-review/donation-review.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'eventfans', component: EventfansComponent },
  { path: 'photobattle', component: PhotobattleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'material', component: SmaterialComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'chatroom', component: ChatroomComponent },
  { path: 'luckydraw', component: LuckydrawComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shopItemEdit', component: ShopItemEditComponent },
  { path: 'myorderReview', component: MyorderReviewComponent },
  { path: 'orderReview', component: OrderReviewComponent },
  { path: 'game-battle', component: GameBattleComponent },
  { path: 'sicard-game-start', component: SicardGameStartComponent },
  { path: 'sicard-game-home', component: SicardGameHomeComponent },
  { path: 'game-start', component: GameStartComponent },
  { path: 'game-creation', component: GameCreationComponent },
  { path: 'sicard-store', component: SicardStoreComponent },
  { path: 'supportitem', component: SupportitemComponent },
  { path: 'support-item-form', component: SupportItemFormComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'questions-king', component: QuestionsKingComponent },
  { path: 'questions-king-home', component: QuestionsKingHomeComponent },
  { path: 'design-comp', component: DesignCompComponent },
  { path: 'donation-review', component: DonationReviewComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'profile', component: ProfileComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
