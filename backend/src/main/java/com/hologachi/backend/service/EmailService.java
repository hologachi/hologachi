package com.hologachi.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Autowired
	JavaMailSender javaMailSender;
	
	public String sendEmail() {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("hologachi@gmail.com");
		message.setTo("hologachi@gmail.com");
		message.setSubject("Test Subject");
		message.setText("Test Body");
		
		javaMailSender.send(message);
		
		return "Mail send Successfully";
	}
}
