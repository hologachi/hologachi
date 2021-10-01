package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.DonationSite;
import com.hologachi.backend.repository.DonationSiteRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/donation")
public class DonationSiteController {
	
	@Autowired
	private DonationSiteRepository donationSiteRepository;
	
	@GetMapping("/list")
	public List<DonationSite> getDonationSites() {
		return donationSiteRepository.findAll();
	}

}
