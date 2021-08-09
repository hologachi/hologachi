package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.*;
import com.hologachi.backend.repository.*;

@RestController
public class PostController {
	
	@Autowired
	PostRepository postRepository;
	
	
}
