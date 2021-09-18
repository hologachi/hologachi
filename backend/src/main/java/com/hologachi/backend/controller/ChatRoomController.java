package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.ChatRoom;
import com.hologachi.backend.repository.ChatPtcptsRepository;
import com.hologachi.backend.repository.ChatRoomRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chat")
public class ChatRoomController {
	
	@Autowired
	private ChatRoomRepository chatRoomRepository;
	
	@GetMapping("/list/{userId}")
	public List<ChatRoom> getMyChatrooms(@PathVariable int userId) {
		return chatRoomRepository.findByUsersUserId(userId);
	}

}
