package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.Bookmark;
import com.hologachi.backend.model.Comment;
import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.MyBookmarkRepository;
import com.hologachi.backend.repository.MyCommentRepository;
import com.hologachi.backend.repository.MyPostRepository;
import com.hologachi.backend.repository.MyRequestRepository;
import com.hologachi.backend.repository.ProfileRepository;

@RequestMapping("/mypage")
@RestController
public class MypageController {
	
	@Autowired
	ProfileRepository profileRepository;
	@Autowired
	MyPostRepository myPostRepository;
	@Autowired
	MyRequestRepository myRequestRepository;
	@Autowired
	MyCommentRepository myCommentRepository;
	@Autowired
	MyBookmarkRepository myBookmarkRepository;
	
	// 프로필
	@GetMapping("/mypage/profile")
	public List<User> userFindByUserId() {
		int userId = 3;
		return profileRepository.findByUserId(userId);
	}
	
	// 내가 작성한 글
	@GetMapping("/mypost")
	public List<Post> postFindByUserId() {
		int userId = 1;
		return myPostRepository.findByUser_UserId(userId);
	}
	
	// 내가 신청한 글
	@GetMapping("/myrequest")
	public List<Ptcpt> requestFindByUserId() {
		int userId = 3;
		return myRequestRepository.findByUser_UserId(userId);
	}
	
	// 내가 작성한 댓글
	@GetMapping("/mycomment")
	public List<Comment> commentFindByUserId() {
		int userId = 1;
		return myCommentRepository.findByUser_UserId(userId);
	}
	
	// 나의 북마크
	@GetMapping("/bookmark")
	public List<Bookmark> bookmarkFindByUserId() {
		int userId = 1;
		return myBookmarkRepository.findByUser_UserId(userId);
	}

}
