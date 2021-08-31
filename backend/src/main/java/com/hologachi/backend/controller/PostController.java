package com.hologachi.backend.controller;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hologachi.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.hologachi.backend.model.Category2;
import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.PostRepository;
import com.hologachi.backend.repository.PtcptRepository;

@RequestMapping("/post")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
	
	// 공동구매 신청
	@RequestMapping("{postId}/request")
	public void addRqst(@PathVariable int postId, @RequestParam("userId") int userId) {
		Ptcpt ptcpt = new Ptcpt();
		Post post = new Post();
		post.setPostId(postId);
		User user = new User();
		user.setUserId(userId);
		
		ptcpt.setPost(post);
		ptcpt.setUser(user);
		ptcpt.setStep("request");
		ptcptRepository.save(ptcpt);
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
		post.get(0).setDeletedBy(0);
		
		postRepository.save(post.get(0));
	}
	
	// 공동구매 등록
	@RequestMapping("/register")
	@JsonProperty("post")
	public void addPost(@RequestBody Post post) {
		Date now = new Date(System.currentTimeMillis());
		post.setRgstAt(now);
		post.setUpdateAt(now);
		
		User user = new User();
		Category2 ctg = new Category2();
		user.setUserId(1);
		ctg.setCategory2Id(131);
		post.setUser(user);
		post.setCategory2(ctg);
		postRepository.save(post);
	}
	
	// 공동구매 정렬(최신, 댓글, 참가인원, 신청인원)
	@RequestMapping("/timesort")
	public List<Post> timeSort() {
		return postRepository.findAll(Sort.by(Sort.Direction.DESC, "postId"));
	}
	
	// 공동구매 정렬(참가인원 적은 순)
	@GetMapping("/matchingsort")
	public List<Post> matchingSort() {
		return postRepository.findAll(Sort.by(Sort.Direction.ASC, "matching"));
	}
	
	// 공동구매 검색
	@GetMapping("/search")
	public List<Post> searchPost(@RequestParam String keyword) {
		return postRepository.searchByTitle(keyword);
	}
	
//	@GetMapping("/requestsort")
//	public List<Ptcpt> searchRqstSort() {
//		return ptcptRepository.searchRqstCount();
//	}
	
	// 공동구매 수정
	@RequestMapping("/{postId}/update")
	public void updatePost(@RequestBody Post newPost, @PathVariable int postId) {
		List<Post> post = postRepository.findByPostId(postId);
		post.get(0).setTitle(newPost.getTitle());
		post.get(0).setContent(newPost.getContent());
		post.get(0).setMatching(newPost.getMatching());
		post.get(0).setDeadline(newPost.getDeadline());
		post.get(0).setPrice(newPost.getPrice());
		post.get(0).setUrl(newPost.getUrl());
		
		Date now = new Date(System.currentTimeMillis());
		post.get(0).setUpdateAt(now);
		
		Category2 ctg = new Category2();
		ctg.setCategory2Id(131);
		post.get(0).setCategory2(ctg);
		postRepository.save(post.get(0));
	}
	

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
