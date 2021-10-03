package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.Donation;
import com.hologachi.backend.repository.DonationRepository;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private DonationRepository chatRepository;
	
	@GetMapping("/message")
	public List<Donation> getAllChats() {
		return chatRepository.findAll();
	}

}
