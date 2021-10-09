package com.hologachi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer>{

}