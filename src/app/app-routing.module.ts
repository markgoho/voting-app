import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './question/question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'question/new',
    component: NewQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'question/:id',
    component: QuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'question/:id/edit',
    component: EditQuestionComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: '**', redirectTo: 'questions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
