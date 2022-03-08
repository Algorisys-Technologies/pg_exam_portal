import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid!: string;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;


  constructor(private _locationStrategy: LocationStrategy,
    private _route: ActivatedRoute,
    private _questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    this.laodQuestions();
    this.startTimer();
  }

  laodQuestions() {
    this._questionService.getQuestionsOfQuizForTest(this.qid).subscribe((data: any) => {
      this.questions = data;

      this.timer = this.questions.length * 2 * 60;

      // this.questions.forEach((q: any) => {
      //   q['givenAnswer'] = '';
      // });

    }, () => {
      Swal.fire('Error!!', 'Error while loading the questions from the server', 'error');
    })
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this._locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer - minutes * 60;
    return `${minutes} min : ${seconds} sec`;
  }

  evalQuiz() {
    this._questionService.evalQuiz(this.questions).subscribe((data: any) => {
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers = data.correctAnswers;
      this.attempted = data.attempted;
      this.isSubmit = true;
    })
  }

  printPage() {
    window.print();
  }
}

