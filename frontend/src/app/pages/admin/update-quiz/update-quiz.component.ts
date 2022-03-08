import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _quizService: QuizService,
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  qId!: string;
  categories: any[] = [];
  editQuizForm!: FormGroup;

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this._quizService.getQuiz(this.qId).subscribe((data: any) => {
      data['category'] = data['category']?.cid;
      this.editQuizForm.patchValue(data);
    }, (error) => {
      console.log(error);
    })

    this.loadCategory();
    this.loadQuizEditForm();
  }


  loadQuizEditForm() {
    this.editQuizForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      maxMarks: ['', [Validators.required]],
      numberOfQuestions: ['', [Validators.required]],
      active: [true],
      category: ['', [Validators.required]],
    })
  }

  get title() {
    return this.editQuizForm.get("title");
  }

  get description() {
    return this.editQuizForm.get("description");
  }

  get maxMarks() {
    return this.editQuizForm.get("maxMarks");
  }

  get numberOfQuestions() {
    return this.editQuizForm.get("numberOfQuestions");
  }

  get active() {
    return this.editQuizForm.get("active");
  }

  get category() {
    return this.editQuizForm.get("category");
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
    if (this.editQuizForm.controls['title'].value.trim() == '') {
      this.snackBar.open('Title is not empty!!', 'ok', {
        duration: 3000
      })
      return false;
    }
    return true;
  }

  descriptionValid() {
    if (this.editQuizForm.controls['description'].value.trim() == '') {
      this.snackBar.open('Description is not empty!!', 'ok', {
        duration: 3000
      })
      return false;
    }
    return true;
  }


  async onSubmitAddQuiz() {
    let formValue = this.editQuizForm.getRawValue();
    formValue.qId = this.qId;
    formValue['category'] = {
      cid: formValue['category']
    }

    this._quizService.updateQuiz(formValue).subscribe(() => {
      Swal.fire("Success !!", 'Quiz updated successfully', 'success').then(() => {
        this._router.navigate(['/admin/quizzes']);
      });
    }, () => {
      Swal.fire("Error !!", "Error while updated Quiz", "error");
    })
  }

  clear() {
    this.editQuizForm.reset();
    Object.keys(this.editQuizForm.controls).forEach(key => {
      this.editQuizForm.get(key)?.setErrors(null);
    })
  }

}
