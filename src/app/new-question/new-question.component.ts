import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Question } from '../question.model';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  newQuestion: string;
  questionsCollection: AngularFirestoreCollection<Question>;

  constructor(private afs: AngularFirestore) {
    this.questionsCollection = afs.collection<Question>('questions');
  }

  ngOnInit() {}

  async onCreate() {
    await this.questionsCollection.add({
      question: this.newQuestion,
      yesVotes: 0,
      noVotes: 0
    });

    this.newQuestion = '';
  }
}
