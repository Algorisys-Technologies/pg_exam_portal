import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId!: string;
  qTitle!: string;
  questions: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService

  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._questionService.getQuestionsOfQuiz(this.qId).subscribe((data: any) => {
      this.questions = data;
    }, (error) => {
      console.log(error);
      Swal.fire('Error !!', 'Error while loading Questions from server', 'error');
    })
  }

  removeQuestion(quesId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete Question?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._questionService.deleteQuestion(quesId).subscribe(() => {
          this.questions = this.questions.filter((question) => question.quesId != quesId)
          Swal.fire("Success", "Category Deleted Successfully", 'success');
        }, () => {
          Swal.fire("Error", "Error in deleting category", 'error');
        })
      }
    })
  }

}
