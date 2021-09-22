package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.ChatRoom;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer>{

	List<ChatRoom> findByUsersUserId(int userId);

}
