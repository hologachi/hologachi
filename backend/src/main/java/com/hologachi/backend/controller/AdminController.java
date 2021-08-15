package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserRepository userRepository;


//	관리자페이지 조회(로그인 요구)
	
	
//	모든 회원 조회(아이디, 닉네임, 이메일, 이미지, suggestRate, requestRate, isAdmin)
	@GetMapping("/mUser")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
//	회원 검색(닉네임, 이메일, isAdmin)
	@PostMapping("/mUser")
	public List<User> searchTheUsers(@RequestBody SearchUserVO searchUserForm) {
		System.out.println(searchUserForm.toString());
//		return userRepository.findAllUserSearch();
		return null;
	}
	
//	회원 정지(isAdming -1로 처리)
//	회원 작성글 조회
//	공동구매 글 조회(모든 항목)
//	공동구매 글 삭제
//	댓글 조회
//	댓글 삭제
//	공동구매 조회(모든 항목)
//	공동구매 삭제
//	카테고리 조회
//	카테고리 삭제
//	카테고리 수정
//	카테고리 추가

}
