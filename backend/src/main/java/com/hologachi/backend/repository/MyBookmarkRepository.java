package com.hologachi.backend.repository;

import java.util.List;
import java.util.Optional;

import com.hologachi.backend.model.Ptcpt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Bookmark;

@Repository
public interface MyBookmarkRepository extends JpaRepository<Bookmark, Integer> {
	public List<Bookmark> findByUser_UserId(int userId);

	@Query("select bookmarkId from Bookmark where post.postId=:postId and user.userId=:userId")
	public int findByBookmark_BookmarkId(int postId, int userId);
}
