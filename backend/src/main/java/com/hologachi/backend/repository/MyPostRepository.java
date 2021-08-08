package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Post;

@Repository
public interface MyPostRepository extends JpaRepository<Post, Integer> {
	public List<Post> findByUser_UserId(int userId);
}
