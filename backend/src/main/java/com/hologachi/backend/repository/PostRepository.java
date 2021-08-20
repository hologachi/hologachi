package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
	public List<Post> findByPostId(int postId);
}
