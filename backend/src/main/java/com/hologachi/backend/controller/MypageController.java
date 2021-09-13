package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
	public List<Post> postFindByUserId(@RequestParam("userId") int userId) {
//		int userId = 1;
		return myPostRepository.findByUser_UserId(userId);
	}
	
	// 작성한 글의 신청자 목록
	@RequestMapping("/mypost/{postId}")
	public List<Ptcpt> ptcptFindByPostId(@PathVariable int postId) {
		return myRequestRepository.findByPost_PostId(postId);
	}
	
	// 작성한 글의 신청자 프로필
	@RequestMapping("/mypost/{postId}/{ptcptId}")
	public Ptcpt rqsterFindByPtcptId(@PathVariable("postId") int postId, @PathVariable("ptcptId") int ptcptId) {
		return myRequestRepository.findByPtcptId(ptcptId);
	}
	
	// 작성한 글 신청 수락 처리
	@RequestMapping("/mypost/{postId}/{ptcptId}/agree")
	public void updateRqstAgree(@PathVariable("postId") int postId, @PathVariable("ptcptId") int ptcptId) {
		Ptcpt p = myRequestRepository.findByPtcptId(ptcptId);
		p.setStep("agree");
		myRequestRepository.save(p);
	}
	
	// 작성한 글 신청 거절 처리
	@RequestMapping("/mypost/{postId}/{ptcptId}/reject")
	public void updateRqstReject(@PathVariable("postId") int postId, @PathVariable("ptcptId") int ptcptId) {
		Ptcpt p = myRequestRepository.findByPtcptId(ptcptId);
		p.setStep("reject");
		myRequestRepository.save(p);
	}
	
	// 작성한 글 진행 처리
	@RequestMapping("/mypost/{postId}/proceed")
	public void updateProceed(@PathVariable("postId") int postId) {
		Post post = myPostRepository.findByPostId(postId);
		post.setStep("proceed");
		
		myPostRepository.save(post);
	}
	
	// 내가 신청한 글
	@GetMapping("/myrequest")
	public List<Ptcpt> requestFindByUserId() {
		int userId = 3;
		return myRequestRepository.findByUser_UserId(userId);
	}

	
	// 신청한 글의 제시자 프로필
	@GetMapping("/myrequest/{ptcptId}")
	public Ptcpt sgsterFindByPtcptId(@PathVariable int ptcptId) {
		return myRequestRepository.findByPtcptId(ptcptId);
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
	
	// 북마크 삭제
	@RequestMapping("/bookmark/{bookmarkId}/delete")
	public void deleteBookmark(@PathVariable("bookmarkId") int bookmarkId) {
		myBookmarkRepository.deleteById(bookmarkId);
	}
	
}
