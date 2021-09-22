package com.hologachi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.ChatPtcpts;

@Repository
public interface ChatPtcptsRepository extends JpaRepository<ChatPtcpts, Integer>{

}
