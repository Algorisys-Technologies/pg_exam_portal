package com.exam.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class RestExceptionHandler {
	@ExceptionHandler(ApplicationException.class)
	protected ResponseEntity<Object> globalException(ApplicationException ex, WebRequest request) {
		System.out.println("Message:" + ex.getMessage());
		System.out.println("Http status:" + ex.getStatus());
		System.out.println("discription:" + request.getDescription(false));
		return new ResponseEntity<>(ex.getStatus());
	}

}
