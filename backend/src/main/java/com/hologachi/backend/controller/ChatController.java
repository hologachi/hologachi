package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.Chat;
import com.hologachi.backend.repository.ChatRepository;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private ChatRepository chatRepository;
	
	@GetMapping("/message")
	public List<Chat> getAllChats() {
		return chatRepository.findAll();
	}

}
