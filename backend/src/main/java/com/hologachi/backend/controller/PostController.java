package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.*;
import com.hologachi.backend.repository.*;

@RestController
public class PostController {
	
	@Autowired
	PostRepository postRepository;

	@RequestMapping("/gb/gblist")
	public List<Post> postFindAll() {
		System.out.println(postRepository.findAll());
		return postRepository.findAll();
	}

	@RequestMapping("/gb/gbdetail/{postId}")
	public List<Post> postFindByUserId(@PathVariable int postId) {
		return postRepository.findAll();
	}
}
