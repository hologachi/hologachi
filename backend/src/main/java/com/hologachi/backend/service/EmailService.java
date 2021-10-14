package com.hologachi.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Autowired
	JavaMailSender javaMailSender;
	
	public String sendChatroomAlertEmail(String rqsterEmail, String rqsterName, String postTitle, String chatroomURL) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("hologachi@gmail.com");
		message.setTo(rqsterEmail);
		message.setSubject("홀로가치에서 신청하신 <" + postTitle + ">거래가 수락되었습니다.");
		message.setText(rqsterName + "님! " + postTitle + " 에서 진행하는 거래에 빨리 참여하세요!\n 아래에 링크로 이동하면 채팅방으로 연결됩니다!\n" + chatroomURL);
		
		javaMailSender.send(message);
		
		return "Mail send Successfully";
	}
}
