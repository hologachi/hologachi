package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Bookmark;

@Repository
public interface MyBookmarkRepository extends JpaRepository<Bookmark, Integer> {
	public List<Bookmark> findByUser_UserId(int userId);
}
