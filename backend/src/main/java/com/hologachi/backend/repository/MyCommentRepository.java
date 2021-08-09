package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Comment;

@Repository
public interface MyCommentRepository extends JpaRepository<Comment, Integer>{
	public List<Comment> findByUser_UserId(int userId);
}
