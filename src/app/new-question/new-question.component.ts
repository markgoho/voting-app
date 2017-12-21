import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Question } from '../question.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent {
  newQuestion: string;
  emptyQuestion: boolean;
  questionsCollection: AngularFirestoreCollection<Question>;
  questionRef: AngularFirestoreDocument<Question>;

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  onCreate() {
    if (this.newQuestion) {
      const title = this.newQuestion.trim();
      this.authService.user$.subscribe(user => {
        const path = `users/${user.uid}/questions`;
        console.log(path, this.newQuestion);
        this.db.collection<Question>(`users/${user.uid}/questions`).add({
          title: this.newQuestion,
          votes: 0
        });
        this.emptyQuestion = false;
      });
    } else {
      this.emptyQuestion = true;
    }
    this.newQuestion = '';
  }
}
