package com.hologachi.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

	List<Post> findByUserUserId(int userId);

	Optional<Post> findByPostId(int postId);
}
