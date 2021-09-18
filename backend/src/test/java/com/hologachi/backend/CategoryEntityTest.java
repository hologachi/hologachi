package com.hologachi.backend;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hologachi.backend.model.ChatRoom;
import com.hologachi.backend.model.User;
import com.hologachi.backend.repository.ChatRoomRepository;
import com.hologachi.backend.repository.UserRepository;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class CategoryEntityTest {
	
	@Autowired
	private ChatRoomRepository chatRoomRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Before
	public void init() 
	{
		
	}
	
	@Test
	public void 엔티티_조회_테스트() 
	{
		List<ChatRoom> chatrRoom = chatRoomRepository.findByUsersUserId(6);
		Optional<User> user = userRepository.findById(6);

		assertEquals(chatrRoom.get(0).getUsers().get(0).getUserId(), user.get().getUserId());
	}
	
}
