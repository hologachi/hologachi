package com.hologachi.backend.controller;

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

import com.hologachi.backend.model.Donation;
import com.hologachi.backend.model.DonationSite;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.DonationRepository;
import com.hologachi.backend.repository.DonationSiteRepository;
import com.hologachi.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/donation")
public class DonationController {
	
	@Autowired
	private DonationSiteRepository donationSiteRepository;
	@Autowired
	private DonationRepository donationRepository;
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/list")
	public List<DonationSite> getDonationSites() {
		return donationSiteRepository.findAll();
	}
	
	@PostMapping("/apply/{userId}")
	public void applyDonation(@PathVariable String userId, @RequestBody Donation data) {
		Optional<User> user = userRepository.findById(Integer.valueOf(userId));
		
		if(user.isPresent()) {
			data.setUser(user.get());
			donationRepository.save(data);
		}
		
	}
	
	@PostMapping("/my")
	public List<Donation> getMyDonation(@RequestBody Map<String, Integer> data) {
		System.out.println(data);
		
		List<Donation> foundDonation = donationRepository.findByUserUserId(data.get("userId"));
		System.out.println(foundDonation);
		
		if(foundDonation.size() > 0) {
			return foundDonation;
		}
		return null;
	}

}
