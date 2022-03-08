import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId!: string;
  qTitle!: string;
  addQuestion!: FormGroup;


  constructor(private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _questionService: QuestionService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this.addQuestionForm();
  }

  addQuestionForm() {
    this.addQuestion = this._fb.group({
      content: ['', [Validators.required]],
      option1: ['', [Validators.required]],
      option2: ['', [Validators.required]],
      option3: [''],
      option4: [''],
      answer: ['', [Validators.required]]
    })
  }

  get content() {
    return this.addQuestion.get('content');
  }

  get option1() {
    return this.addQuestion.get('option1');
  }

  get option2() {
    return this.addQuestion.get('option2');
  }

  get option3() {
    return this.addQuestion.get('option3');
  }

  get option4() {
    return this.addQuestion.get('option4');
  }

  get answer() {
    return this.addQuestion.get('answer');
  }

  onSubmit() {
    this.contentValid() && this.onSubmitAddQuestion();
  }

  contentValid() {
    if (this.addQuestion.controls['content'].value.trim() == '') {
      this._snackBar.open('Content is not empty!!', 'ok', {
        duration: 3000
      })
      return false;
    }
    return true;
  }

  onSubmitAddQuestion() {
    let formValue = this.addQuestion.getRawValue();
    formValue['quiz'] = {
      qId: this.qId
    }
    this._questionService.addQuestion(formValue).subscribe(() => {
      Swal.fire('success', 'question added successfully, Add another question', 'success');
      this.clear();
    }, (error) => {
      Swal.fire('Error', 'Error in adding question', 'error');
    })
  }

  clear() {
    this.addQuestion.reset();
    Object.keys(this.addQuestion.controls).forEach(key => {
      this.addQuestion.get(key)?.setErrors(null);
    })
  }




}
