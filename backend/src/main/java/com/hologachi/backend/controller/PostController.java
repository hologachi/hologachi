package com.hologachi.backend.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.Category2;
import com.hologachi.backend.model.Comment;
import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.CommentRepository;
import com.hologachi.backend.repository.PostRepository;
import com.hologachi.backend.repository.PtcptRepository;

@RequestMapping("/post")
@RestController
public class PostController {
	
	@Autowired
	PostRepository postRepository;
	@Autowired
	PtcptRepository ptcptRepository;
	@Autowired
	CommentRepository commentRepository;

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
	public void addRqst(@PathVariable int postId) {
		Ptcpt ptcpt = new Ptcpt();
		Post post = new Post();
		post.setPostId(postId);
		User user = new User();
		user.setUserId(1);
		
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
		post.get(0).setDeleted_by(0);
		
		postRepository.save(post.get(0));
	}
	
	// 공동구매 등록
	@RequestMapping("/register")
	public void addPost(@RequestBody Post post) {
		Date now = new Date(System.currentTimeMillis());
		post.setRgst_at(now);
		post.setUpdate_at(now);
		
		User user = new User();
		Category2 ctg = new Category2();
		user.setUserId(1);
		ctg.setCategory2Id(131);
		post.setUser(user);
		post.setCategory2(ctg);
		postRepository.save(post);
	}
	
	// 공동구매 정렬(최신, 댓글, 참가인원, 신청인원)
	@GetMapping("/timesort")
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
		post.get(0).setUpdate_at(now);
		
		Category2 ctg = new Category2();
		ctg.setCategory2Id(131);
		post.get(0).setCategory2(ctg);
		postRepository.save(post.get(0));
	}
	
	// 공동구매 댓글 작성
	@RequestMapping("/{postId}/cocreate")
	public void createComment(@RequestBody Comment comment, @PathVariable int postId) {
		Date now = new Date(System.currentTimeMillis());
		comment.setRgst_at(now);
		comment.setUpdate_at(now);
		
		User user = new User();
		user.setUserId(1);
		comment.setUser(user);
		Post post = new Post();
		post.setPostId(6);
		comment.setPost(post);
		comment.setStatus(1);
		comment.setOnly_sgster(0);
		commentRepository.save(comment);
	}
	
	// 공동구매 댓글 수정
	@RequestMapping("/{postId}/{commentId}/coupdate")
	public void updateComment(@RequestBody Comment newComment, @PathVariable int postId, @PathVariable int commentId) {
		Date now = new Date(System.currentTimeMillis());
		Comment comment = commentRepository.findByCommentId(commentId);
		System.out.println(comment);
		comment.setContent(newComment.getContent());
		comment.setUpdate_at(now);
		commentRepository.save(comment);
	}
	
	// 공동구매 댓글 삭제
	@RequestMapping("/{postId}/{commentId}/codelete")
	public void deleteComment(@PathVariable int postId, @PathVariable int commentId) {
		Comment comment = commentRepository.findByCommentId(commentId);
		comment.setStatus(0);
		
		commentRepository.save(comment);
	}
	
	// 공동구매 댓글 조회
	@RequestMapping("/{postId}/comment")
	public List<Comment> selectComment(@PathVariable int postId) {
		return commentRepository.findByPost_PostId(postId);
	}
}
