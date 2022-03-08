import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any[] = [];

  constructor(private _quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz() {
    this._quizService.getQuizzes().subscribe((data: any) => {
      this.quizzes = data;
    },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error in loading quizzes", 'error');
      })
  }

  removeQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete Quiz?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._quizService.deleteQuiz(qId).subscribe(() => {
          this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId)
          Swal.fire("Success", "Quiz Deleted Successfully", 'success');
        }, () => {
          Swal.fire("Error", "Error in deleting quiz", 'error');
        })
      }
    })

  }

}
