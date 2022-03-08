package com.exam.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.exam.exception.ApplicationException;
import com.exam.model.User;
import com.exam.repo.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username)  {
		User user=this.userRepository.findByUsername(username);
		if(user == null) {
			throw new ApplicationException("User not found!",HttpStatus.NOT_FOUND);
		}
		
		return user;
	}

}
