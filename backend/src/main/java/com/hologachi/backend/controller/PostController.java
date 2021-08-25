package com.hologachi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.PostRepository;
import com.hologachi.backend.repository.PtcptRepository;

@RequestMapping("/post")
@RestController
public class PostController {
	
	@Autowired
	PostRepository postRepository;
	@Autowired
	PtcptRepository ptcptRepository;

	// 모든 공동구매 목록
	@GetMapping("")
	public List<Post> findAll() {
		return postRepository.findAll();
	}
	
	// 공동구매 상세 글 내용 조회
	@RequestMapping("/{postId}")
	public List<Post> postFindByPostId(@PathVariable int postId) {
		return postRepository.findByPostId(postId);
	}
	
	// 공동구매 신청 취소
//	@RequestMapping("/{postId}/cancel")
//	public void updateRqstCancel(@PathVariable int postId) {
//		Ptcpt ptcpt = ptcptRepository.findByPost_PostId(postId);
//		ptcpt.setStep("cancel");
//		
//		ptcptRepository.save(ptcpt);
//	}
	
	// 공동구매 삭제
	@RequestMapping("/{postId}/delete")
	public void updatePostDelete(@PathVariable int postId) {
		List<Post> post = postRepository.findByPostId(postId);
		post.get(0).setStep("delete");
		post.get(0).setDeleted_by(0);
		
		postRepository.save(post.get(0));
	}
	
//	// 공동구매 등록
//	@GetMapping("/register")
//	public void addPost(@RequestBody Post post) {
//		User user = new User();
//		user.setUserId(1);
//		post.setUser(user);
//		postRepository.save(post);
//	}
	
	

//	@RequestMapping("/gb/gblist")
//	public List<Post> postFindAll() {
//		System.out.println(postRepository.findAll());
//		return postRepository.findAll();
//	}
//
//	@RequestMapping("/gb/gbdetail/{postId}")
//	public List<Post> postFindByUserId(@PathVariable int postId) {
//		return postRepository.findAll();
//	}
}
