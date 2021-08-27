package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

	public List<Post> findByPostId(int postId);
	
	@Query("select p from Post p where p.title LIKE %:keyword%")
	public List<Post> searchByTitle(String keyword);

 	List<Post> findByUserUserId(int userId);

// 	Optional<Post> findByPostId(int postId);
}
