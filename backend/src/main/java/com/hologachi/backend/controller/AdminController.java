package com.hologachi.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Locale.Category;

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
import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.Category1Repository;
import com.hologachi.backend.repository.Category2Repository;
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
	@PostMapping("/mUser/update/{id}")
	public ResponseEntity<User> searchTheUsers(@PathVariable int id, @RequestBody int new_auth) {
		Optional<User> temp = userRepository.findById(id);
		
		if(!temp.isPresent()) { // 없는 사람인 경우 
			return ResponseEntity.ok(null);
		} 
		
		User user = temp.get();
		user.setIs_admin(new_auth);

		User updatedUser = userRepository.save(user);
		
		return ResponseEntity.ok(updatedUser);
	}
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
	public List<Category2> getAllGBCategory() {
		return category2Repository.findAll();
	}
//	카테고리 추가(일대다 구조로 구현하지 않음)
	@PostMapping("/mGBCategory/add")
	public Category2 createGBCategory(@RequestBody CategoryVO data) {
		System.out.println(data.getCat1() + "와 " + data.getCat2());
		
		Category1 category1 = category1Repository.save(new Category1(data.getCat1())); // 카테고리1 추가 
		
		Category2 category2 = new Category2(category1, data.getCat2());  
		return category2Repository.save(category2); // 카테고리 2 추가
	}
//	카테고리 하나 삭제
	@GetMapping("/mGBCategory/delete/{id2}")
	public void deleteGBCategory(@PathVariable("id2") int id2) {
		Optional<Category2> category = category2Repository.findById2(id2); // 해당 카테고리 존재하는지 확인 
		
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
	public ResponseEntity<Category2> updateGBCategories(@PathVariable("id2") int id2, @RequestBody CategoryVO data) {
		Optional<Category2> temp = category2Repository.findById2(id2);
		
		if(!temp.isPresent()) { // 없는 카테고리인 경우 
			return ResponseEntity.ok(null);
		} 
		 
		Category2 category = temp.get();
		category.setCat2(data.getCat2());
		category.getCategory1().setCat1(data.getCat1());

		Category2 updatedCategory = category2Repository.save(category);
		
		return ResponseEntity.ok(updatedCategory);
	}
	

}
