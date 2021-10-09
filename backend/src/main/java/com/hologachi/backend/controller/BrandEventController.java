package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.BrandEvent;
import com.hologachi.backend.repository.BrandEventRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/brandEvent")
public class BrandEventController {
	
	@Autowired
	private BrandEventRepository brandEventRepository;
	
	@GetMapping
	public List<BrandEvent> getBrandEvents() {
		return brandEventRepository.findAll();
	}

}
