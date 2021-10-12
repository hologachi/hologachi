package com.hologachi.backend.controller;

import java.util.List;

import com.hologachi.backend.model.Post;
import com.hologachi.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.HomePost;
import com.hologachi.backend.repository.HomeRepository;

@RestController
public class HomeController {

	@Autowired
	HomeRepository homeRepository;
	@Autowired
	PostRepository postRepository;


//	@RequestMapping("/home")
//	public List<HomePost> findAll() {
//		System.out.println(homeRepository.findAll());
//		return homeRepository.findAll();
//	}

	@GetMapping("/home/{loc}")
	public List<Post> locPost(@PathVariable String loc) {
		return postRepository.locItem(loc);
	}

}