package com.exam.exception;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private HttpStatus status;
	private String message;

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ApplicationException() {
		super();
	} 
	
	public ApplicationException(String message) {
		super(message);
		this.message = message;
	}

	public ApplicationException(HttpStatus status) {
		super();
		this.status = status;
	}

	public ApplicationException(String message, HttpStatus status) {
		super(message);
		this.message = message;
		this.status = status;
	}

	public ApplicationException(HttpStatus status, String message) {
		super(message);
		this.message = message;
		this.status = status;
	}

}
