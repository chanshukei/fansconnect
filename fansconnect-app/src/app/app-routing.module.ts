import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventService } from './event.service';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'events', component: EventsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
