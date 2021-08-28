package com.hologachi.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/login")
public class LoginContoller {
	
	@Autowired
	UserRepository userRepository;
	
	// 새로 가입 
	@PostMapping("/google")
	public ResponseEntity<User> handleLoginGoogle(@RequestBody User newbie) {
		System.out.println(newbie.getNickname());
		
		Optional<User> findUser = userRepository.findByGoogleId(newbie.getGoogleId());
		
		if(findUser.isPresent()) {
			User existedUser = findUser.get();
			
			existedUser.setAccesstoken(newbie.getAccesstoken());
			existedUser.setExpire(newbie.getExpire());
			
			return ResponseEntity.ok(userRepository.save(existedUser));
		} 
		
		return ResponseEntity.ok(userRepository.save(newbie));
		
	}

}
