import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DesignCompComponent } from './design-comp/design-comp.component';
import { DonationReviewComponent } from './donation-review/donation-review.component';
import { DonationComponent } from './donation/donation.component';
import { EventsComponent } from './events/events.component';
import {HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
import { LuckydrawComponent } from './luckydraw/luckydraw.component';
import { MapComponent } from './map/map.component';
import { MyorderReviewComponent } from './myorder-review/myorder-review.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsKingHomeComponent } from './questions-king-home/questions-king-home.component';
import { QuestionsKingComponent } from './questions-king/questions-king.component';
import { ShopComponent } from './shop/shop.component';
import { SupportItemFormComponent } from './support-item-form/support-item-form.component';
import { SupportitemComponent } from './supportitem/supportitem.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'myorderReview', component: MyorderReviewComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'events', component: EventsComponent },
  { path: 'questions-king-home', component: QuestionsKingHomeComponent },
  { path: 'questions-king', component: QuestionsKingComponent },
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'supportitem', component: SupportitemComponent },
  { path: 'map', component: MapComponent },
  { path: 'support-item-form', component: SupportItemFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orderReview', component: OrderReviewComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'donation-review', component: DonationReviewComponent },
  { path: 'luckydraw', component: LuckydrawComponent },
  { path: 'design-comp', component: DesignCompComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
