import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  // get all questions based on quiz
  public getQuestionsOfQuiz(quizId: string) {
    return this._http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  // get all questions based on quiz for test
  public getQuestionsOfQuizForTest(quizId: string) {
    return this._http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  // add question 
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  // update question
  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  // delete question
  public deleteQuestion(quesId: string) {
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

  //get single questions based on quesId
  public getQuestion(quesId: string) {
    return this._http.get(`${baseUrl}/question/${quesId}`)
  }

  public evalQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

}
