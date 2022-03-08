import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any[] = [];
  quizForm!: FormGroup;

  constructor(private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuizForm();
    this.loadCategory();
  }

  loadQuizForm() {
    this.quizForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      maxMarks: ['', [Validators.required]],
      numberOfQuestions: ['', [Validators.required]],
      active: [true],
      category: ['', [Validators.required]],
    })
  }

  get title() {
    return this.quizForm.get("title");
  }

  get description() {
    return this.quizForm.get("description");
  }

  get maxMarks() {
    return this.quizForm.get("maxMarks");
  }

  get numberOfQuestions() {
    return this.quizForm.get("numberOfQuestions");
  }

  get active() {
    return this.quizForm.get("active");
  }

  get category() {
    return this.quizForm.get("category");
  }

  loadCategory() {
    this._categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    }, (error) => {
      console.log(error);
      Swal.fire("Error !!", "Error in loading data from server", "error");
    })
  }


  onSubmit() {
    this.titleValid() && this.descriptionValid() && this.onSubmitAddQuiz();
  }

  titleValid() {
    if ((this.quizForm.controls['title'].value).trim() == '') {
      this.snackBar.open('Title is not empty!!', 'ok', {
        duration: 3000
      })
      return false;
    }
    return true;
  }

  descriptionValid() {
    if ((this.quizForm.controls['description'].value).trim() == '') {
      this.snackBar.open('Description is not empty!!', 'ok', {
        duration: 3000
      })
      return false;
    }
    return true;
  }

  onSubmitAddQuiz() {
    let formValue = this.quizForm.getRawValue();
    formValue['category'] = {
      cid: formValue['category']
    }
    this._quizService.addQuiz(formValue).subscribe(() => {
      this.clear();
      Swal.fire("Success !!", 'Quiz added successfully', 'success');
    }, () => {
      Swal.fire("Error !!", "Error while adding Quiz", "error");
    })
  }

  clear() {
    this.quizForm.reset();
    Object.keys(this.quizForm.controls).forEach(key => {
      this.quizForm.get(key)?.setErrors(null);
    })
  }



}
