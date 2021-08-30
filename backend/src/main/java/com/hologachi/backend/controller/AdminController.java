package com.hologachi.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hologachi.backend.model.Category1;
import com.hologachi.backend.model.Category2;
import com.hologachi.backend.model.Comment;
import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.Category1Repository;
import com.hologachi.backend.repository.Category2Repository;
import com.hologachi.backend.repository.CommentRepository;
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
	private Category1Repository category1Repository;
	@Autowired
	private Category2Repository category2Repository;
	@Autowired
	private CommentRepository commentRepository;

	
//	관리자페이지 조회(로그인 요구)
	
	
//	1. 회원관리 
//	회원 조회(모든 항목)
	@GetMapping("/mUser")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
//	회원 검색(with 닉네임, 이메일, isAdmin)
//	@PostMapping("/mUser")
//	public List<User> searchTheUsers(@RequestBody SearchUserVO searchUserForm) {
//		System.out.println(searchUserForm.toString());
//		return userRepository.findAllUserSearch();
//		return null;
//	}
	
//	회원 권한 수정 
	@PostMapping("/mUser/update/{id}/{new_auth}")
	public ResponseEntity<User> searchTheUsers(@PathVariable int id, @PathVariable String new_auth) {
		System.out.println(id + ": " + new_auth);
		Optional<User> temp = userRepository.findById(id);
		
		if(!temp.isPresent()) { // 없는 사람인 경우 
			return ResponseEntity.ok(null);
		} 
		
		User user = temp.get();
		user.setIsAdmin(Integer.parseInt(new_auth));

		User updatedUser = userRepository.save(user);
		
		return ResponseEntity.ok(updatedUser);
	}
//	회원 작성글 조회
	@GetMapping("/mUser/{userId}/posts")
	public List<Post> getTheUsersPost(@PathVariable int userId) {
		return postRepository.findByUserUserId(userId);
	}
	
//	2. 공동구매 글 관리 
//	공동구매 글 조회(모든 항목)
	@GetMapping("/mGBPost")
	public List<Post> getAllGBPost() {
		return postRepository.findAll();
	}
//	공동구매 글 삭제
	@PostMapping("/mGBPost/delete")
	public void deleteTheGBPosts(@RequestBody Map<String, Integer> data) {
//		System.out.println(data.get("postId"));
		List<Post> foundPost = postRepository.findByPostId(data.get("postId"));
//		if(foundPost.isPresent()) {
//			Post updatePost = foundPost.get();
//			updatePost.setDeletedBy(1);
//			postRepository.save(updatePost);
//		}
		foundPost.get(0).setDeletedBy(1);
		postRepository.save(foundPost.get(0));
	}
//	댓글 조회
	@GetMapping("/mGBPost/comment/{postId}")
	public List<Comment> getAllComment(@PathVariable int postId) {
		return commentRepository.findByPostPostId(postId);
	}
//	댓글 삭제
	@PostMapping("/mGBPost/comment/delete")
	public void deleteTheComment(@RequestBody Map<String, String> data) {
//		System.out.println(data.get("commentId"));
		Optional<Comment> foundComment = commentRepository.findByCommentId(Integer.parseInt(data.get("commentId")));
		
		if(foundComment.isPresent()) {
			Comment deletedComment = foundComment.get();
			deletedComment.setStatus(0);
			
			commentRepository.save(deletedComment);
		}
	}
	
//	3. 공동구매 관리 
//	공동구매 조회(모든 항목)
	@GetMapping("/mGB")
	public List<Ptcpt> getAllGB() {
		return ptcptRepository.findAll();
	}
//	공동구매 중지
	@PostMapping("/mGB/stop")
	public void stopTheGB(@RequestBody Map<String, String> data) {
		System.out.println(data.get("ptcptId"));
		Optional<Ptcpt> foundGB = ptcptRepository.findByPtcptId(Integer.parseInt(data.get("ptcptId")));
		
		if(foundGB.isPresent()) {
			Ptcpt stopComment = foundGB.get();
			stopComment.setStep("stop");
			
			ptcptRepository.save(stopComment);
		}
	}
	
//	4. 카테고리 관리 
//	카테고리 조회(모든 항목) 
	@GetMapping("/mGBCategory")
	public List<Category2> getAllGBCategory() {
		return category2Repository.findAll();
	}
//	카테고리 추가(일대다 구조로 구현하지 않음)
	@PostMapping("/mGBCategory/add")
	public Category2 createGBCategory(@RequestBody Map<String, String> data) {
		System.out.println(data.get("cat1") + "와 " + data.get("cat2"));
		
		Category1 category1 = category1Repository.save(new Category1(data.get("cat1"))); // 카테고리1 추가 
		
		Category2 category2 = new Category2(category1, data.get("cat2"));  
		return category2Repository.save(category2); // 카테고리 2 추가
	}
//	카테고리 하나 삭제
	@GetMapping("/mGBCategory/delete/{id2}")
	public void deleteGBCategory(@PathVariable("id2") int id2) {
		Optional<Category2> category = category2Repository.findByCategory2Id(id2); // 해당 카테고리 존재하는지 확인 
		
		if(category.isPresent()) {
			category2Repository.delete(category.get());
		}
	}
//	카테고리 여러 개 삭제 
//	@PostMapping("/mGBCategory/delete")
//	public Category2 deleteGBCategories(@RequestBody int[] id2s) {
//		Integer[] temp = Arrays.stream(id2s).boxed().toArray(Integer[]::new); // Integer 배열로 바꾸기 
//		return categoryRepository.deleteById2In(id2s);
//	}
//	카테고리 수정
	@PostMapping("/mGBCategory/update/{id2}")
	public ResponseEntity<Category2> updateGBCategories(@PathVariable("id2") int id2, @RequestBody Map<String, String> data) {
		Optional<Category2> temp = category2Repository.findByCategory2Id(id2);
		
		if(!temp.isPresent()) { // 없는 카테고리인 경우 
			return ResponseEntity.ok(null);
		} 
		 
		Category2 category = temp.get();
		category.setName(data.get("cat2"));
		category.getCategory1().setName(data.get("cat1"));

		Category2 updatedCategory = category2Repository.save(category);
		
		return ResponseEntity.ok(updatedCategory);
	}
	

}
