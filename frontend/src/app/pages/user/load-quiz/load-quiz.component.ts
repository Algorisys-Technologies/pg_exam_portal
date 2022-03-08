import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  quizzes: any;

  constructor(private _route: ActivatedRoute,
    private _quizService: QuizService,

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: any) => {
      this.catId = params.catId;

      this.catId == 0 ? this.getQuizzes() : this.getQuizzesOfCategory();
    })
  }

  getQuizzes() {
    this._quizService.getActiveQuizzes().subscribe((data: any) => {
      this.quizzes = data;
    }, () => {
      Swal.fire('Error!!', 'Error while loading all quizzes from server', 'error');
    })
  }

  getQuizzesOfCategory() {
    this._quizService.getActiveQuizzesOfCategory(this.catId).subscribe((data: any) => {
      this.quizzes = data;
    }, () => {
      Swal.fire('Error!!', 'Error while loading quizzes from server', 'error');
    })
  }


}
