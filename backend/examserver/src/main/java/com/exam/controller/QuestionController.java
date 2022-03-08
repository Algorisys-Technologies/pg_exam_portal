package com.exam.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/question")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@Autowired
	private QuizService quizService;

	// add Question
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}

	// update Question
	@PutMapping("/")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}

	// get single Question
	@GetMapping("/{questionId}")
	public ResponseEntity<Question> getQuestion(@PathVariable("questionId") String questionId) {
		return ResponseEntity.ok(this.questionService.getQuestion(questionId));
	}

	// get all questions
	@GetMapping("/")
	public ResponseEntity<Set<Question>> getQuestions() {
		return ResponseEntity.ok(this.questionService.getQuestions());
	}

	// delete question
	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable("questionId") String questionId) {
		this.questionService.deleteQuestion((questionId));
	}

	// get no of questions of quiz
	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId") String quizId) {
		Quiz quiz = this.quizService.getQuiz(quizId);
		Set<Question> questions = quiz.getQuestions();
		List<Question> list = new ArrayList<>(questions);
		if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
		}

		list.forEach((q) -> {
			q.setAnswer("");
		});

		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}

	// get all questions of quiz
	@GetMapping("/quiz/all/{quizId}")
	public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("quizId") String quizId) {
		Quiz quiz = new Quiz();
		quiz.setqId(quizId);
		Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
		return ResponseEntity.ok(questionsOfQuiz);
	}

	// eval quiz
	@PostMapping("eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
		double marksGot = 0;
		int correctAnswers = 0;
		int attempted = 0;
		for (Question q : questions) {
			Question question = this.questionService.getQuestion(q.getQuesId());
			if (question.getAnswer().equals(q.getGivenAnswer())) {
				correctAnswers++;
				double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
				marksGot += marksSingle;
			}
			if (q.getGivenAnswer() != null) {
				attempted++;
			}
		}
		Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted",
				attempted);
		return ResponseEntity.ok(map);
	}

}
