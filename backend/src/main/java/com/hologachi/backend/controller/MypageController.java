package com.hologachi.backend.controller;

import java.lang.reflect.Array;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hologachi.backend.model.Bookmark;
import com.hologachi.backend.model.ChatPtcpts;
import com.hologachi.backend.model.ChatRoom;
import com.hologachi.backend.model.Comment;
import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.ChatPtcptsRepository;
import com.hologachi.backend.repository.ChatRoomRepository;
import com.hologachi.backend.repository.MyBookmarkRepository;
import com.hologachi.backend.repository.MyCommentRepository;
import com.hologachi.backend.repository.MyPostRepository;
import com.hologachi.backend.repository.MyRequestRepository;
import com.hologachi.backend.repository.ProfileRepository;
import com.hologachi.backend.service.EmailService;

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
	
	@Autowired
	EmailService emailService;
	@Autowired
	ChatRoomRepository chatRoomRepository;
	@Autowired
	ChatPtcptsRepository chatPtcptRepository;
	
	
	// 프로필
	@GetMapping("/mypage/profile")
	public List<User> userFindByUserId(@RequestParam("userId") int userId) {
//		int userId = 3;
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
	public ArrayList rqsterFindByPtcptId(@PathVariable("postId") int postId, @PathVariable("ptcptId") int ptcptId) {
		User user =  myRequestRepository.findByPtcptId(ptcptId).getUser();
		String nickname = user.getNickname();
		String dealRate = user.getDealRate();
		int dealCount = user.getDealCount();
		String image = user.getImage();
		HashMap map = new HashMap();
		map.put("nickname",nickname);
		map.put("dealRate",dealRate);
		map.put("dealCount",dealCount);
		map.put("image",image);
		ArrayList list = new ArrayList();
		list.add(map);
		return list;
	}
	
	// 작성한 글 신청 수락 처리
	@RequestMapping("/mypost/{postId}/{ptcptId}/agree")
	public void updateRqstAgree(@PathVariable("postId") int postId, @PathVariable("ptcptId") int ptcptId) {
		Ptcpt p = myRequestRepository.findByPtcptId(ptcptId);
		
		//채팅방 생성 
		Date now = new Date(); // 현재 시각 
		ChatRoom newChatRoom = chatRoomRepository.save(new ChatRoom(p.getPost().getTitle(), now, postId));
		
		System.out.println(newChatRoom.toString());
		
//		제안자 채팅방에 추가
		Optional<Post> post = myPostRepository.findById(postId);
		if(post.isPresent()) {
			chatPtcptRepository.save(ChatPtcpts.builder()
					.chatRoomId(newChatRoom.getChatroomId())
					.userId(post.get().getUser().getUserId()).build()); 
		}
		
		//요청자 채팅방에 추가
		chatPtcptRepository.save(ChatPtcpts.builder()
				.chatRoomId(newChatRoom.getChatroomId())
				.userId(p.getUser().getUserId()).build());  
		
		//채팅방 이메일 보내기 
		String chatRoomURL = "http://localhost:3000/chat/" + newChatRoom.getChatroomId();
		emailService.sendChatroomAlertEmail(p.getUser().getEmail(), p.getUser().getNickname(), p.getPost().getTitle(), chatRoomURL);
		
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
	public List<Ptcpt> requestFindByUserId(@RequestParam("userId") int userId) {
//		int userId = 3;
		return myRequestRepository.findByUser_UserId(userId);
	}

	
	// 신청한 글의 제시자 프로필
	@GetMapping("/myrequest/{ptcptId}")
	public Ptcpt sgsterFindByPtcptId(@PathVariable int ptcptId) {
		return myRequestRepository.findByPtcptId(ptcptId);
	}
	
	// 내가 작성한 댓글
	@GetMapping("/mycomment")
	public List<Comment> commentFindByUserId(@RequestParam("userId") int userId) {
//		int userId = 1;
		return myCommentRepository.findByUser_UserId(userId);
	}
	
	// 나의 북마크
	@GetMapping("/bookmark")
	public List<Bookmark> bookmarkFindByUserId(@RequestParam("userId") int userId) {
//		int userId = 1;
		return myBookmarkRepository.findByUser_UserId(userId);
	}

	// 북마크 삭제
	@RequestMapping("/bookmark/{bookmarkId}/delete")
	public void deleteBookmark(@PathVariable("bookmarkId") int bookmarkId) {
		myBookmarkRepository.deleteById(bookmarkId);
	}

	// 개인정보 수정
	@RequestMapping("/privacy/modify")
	public void modifyPrivacy(@RequestParam("userId") int userId, @RequestParam String modifyNickname) {
		List<User> user = profileRepository.findByUserId(userId);
		user.get(0).setNickname(modifyNickname);
		profileRepository.save(user.get(0));
	}
	
}
