package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.Category;
import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.CategoryRepository;
import com.hologachi.backend.repository.PostRepository;
import com.hologachi.backend.repository.PtcptRepository;
import com.hologachi.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private PtcptRepository ptcptRepository;
	@Autowired
	private CategoryRepository categoryRepository;


//	관리자페이지 조회(로그인 요구)
	
	
//	1. 회원관리 
//	회원 조회(모든 항목)
	@GetMapping("/mUser")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
//	회원 검색(with 닉네임, 이메일, isAdmin)
	@PostMapping("/mUser")
	public List<User> searchTheUsers(@RequestBody SearchUserVO searchUserForm) {
		System.out.println(searchUserForm.toString());
//		return userRepository.findAllUserSearch();
		return null;
	}
	
//	회원 권한 수정 
//	회원 작성글 조회
	
//	2. 공동구매 글 관리 
//	공동구매 글 조회(모든 항목)
	@GetMapping("/mGBPost")
	public List<Post> getAllGBPost() {
		return postRepository.findAll();
	}
//	공동구매 글 삭제
//	댓글 조회
//	댓글 삭제
	
//	3. 공동구매 관리 
//	공동구매 조회(모든 항목)
	@GetMapping("/mGB")
	public List<Ptcpt> getAllGB() {
		return ptcptRepository.findAll();
	}
//	공동구매 삭제
	
//	4. 카테고리 관리 
//	카테고리 조회(모든 항목) 
	@GetMapping("/mGBCategory")
	public List<Category> getAllGBCategory() {
		return categoryRepository.findAll();
	}
//	카테고리 삭제
//	카테고리 수정
//	카테고리 추가

}
