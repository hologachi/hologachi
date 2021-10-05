package com.hologachi.backend.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.hologachi.backend.model.*;
import com.hologachi.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequestMapping("/post")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
	
	@Autowired
	PostRepository postRepository;
	@Autowired
	PtcptRepository ptcptRepository;
	@Autowired
	MyRequestRepository myRequestRepository;
	@Autowired
	MyBookmarkRepository myBookmarkRepository;

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
	@RequestMapping("/{postId}/cancel")
	public void updateRqstCancel(@PathVariable int postId, @RequestParam("userId") int userId) {
		int ptcpt = ptcptRepository.findByPost_PostId(postId, userId);
		System.out.println(ptcpt);
//		ptcpt.setStep("cancel");

		ptcptRepository.deleteById(ptcpt);
	}
	
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
	public void addPost(@RequestBody Post post, @RequestParam("userId") int userId) {
		Date now = new Date(System.currentTimeMillis());
		post.setRgstAt(now);
		post.setUpdateAt(now);
		
		User user = new User();
		Category2 ctg = new Category2();
		user.setUserId(userId);
		ctg.setCategory2Id(131);
		post.setUser(user);
		post.setCategory2(ctg);
		post.setStep("request");
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
	@GetMapping("/search/{keyword}")
	public List<Post> searchPost(@PathVariable String keyword) {
		return postRepository.searchByTitle(keyword);
	}

	// 공동구매 자동종료
//	@GetMapping("/autofinish")
//	public List<Post> autofinishPost() {
//		return postRepository.finishPost();
//	}
	
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

	// 공동구매 중복 신청 방지
	@GetMapping("/requestpost")
	public List<Ptcpt> requestPostFindByUserId(@RequestParam("userId") int userId) {
//		int userId = 3;
		return myRequestRepository.findByUser_UserId(userId);
	}

	// 북마크 추가
	@RequestMapping("/bookmark/{postId}/add")
	public void addBookmark(@PathVariable("postId") int postId, @RequestParam("userId") int userId) {
		Bookmark bookmark = new Bookmark();
		User user = new User();
		user.setUserId(userId);
		bookmark.setUser(user);

		Post post = new Post();
		post.setPostId(postId);
		bookmark.setPost(post);
		myBookmarkRepository.save(bookmark);
	}

	// 북마크 삭제
	@RequestMapping("/bookmark/{postId}/delete")
	public void deleteBookmark(@PathVariable int postId, @RequestParam("userId") int userId) {
		int bookmark = myBookmarkRepository.findByBookmark_BookmarkId(postId, userId);
		System.out.println(bookmark);
		myBookmarkRepository.deleteById(bookmark);
	}

	// 나의 북마크
	@GetMapping("/bookmark")
	public List<Bookmark> bookmarkFindByUserId(@RequestParam("userId") int userId) {
		return myBookmarkRepository.findByUser_UserId(userId);
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
