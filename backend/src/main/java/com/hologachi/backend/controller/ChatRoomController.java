package com.hologachi.backend.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.ChatRoom;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.repository.PtcptRepository;
import com.hologachi.backend.repository.ChatRoomRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chat")
public class ChatRoomController {
	
	@Autowired
	private ChatRoomRepository chatRoomRepository;
	@Autowired
	private PtcptRepository ptcptRepository;
	
	@GetMapping("/list/{userId}")
	public List<ChatRoom> getMyChatrooms(@PathVariable int userId) {
		return chatRoomRepository.findByUsersUserId(userId);
	}
	
	@PostMapping("/endDeal")
	public void endDeal(@RequestBody Map<String, Integer> data) {
		System.out.println(data.toString());
		
		Optional<Ptcpt> foundPtcpt = ptcptRepository.findByPostPostIdAndUserUserId(data.get("postId"), data.get("userId"));
		
		if(foundPtcpt.isPresent()) {
			Ptcpt updatePtcpt = foundPtcpt.get();
			
			if(updatePtcpt.getUser().getUserId() == data.get("userId") && updatePtcpt.getStep().equals("agree")) {
				if(updatePtcpt.getDealRate() != 0) {
					int score = updatePtcpt.getDealRate();
					score = (score + data.get("rating")) / 2;
					updatePtcpt.setDealRate(score);
					updatePtcpt.setStep("finish");
				} else {
					updatePtcpt.setDealRate(data.get("rating"));
					updatePtcpt.setStep("finish");
				}
			}
			
			ptcptRepository.save(updatePtcpt);
		} 
	}

}
