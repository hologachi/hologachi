package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
	public Comment findByCommentId(int commentId);
}
