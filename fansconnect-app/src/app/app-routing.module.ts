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
  { path: 'luckydraw', component: LuckydrawComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shopItemEdit', component: ShopItemEditComponent },
  { path: 'supportitem', component: SupportitemComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
