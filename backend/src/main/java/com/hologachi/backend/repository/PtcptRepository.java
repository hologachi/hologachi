package com.hologachi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Post;
import com.hologachi.backend.model.Ptcpt;

@Repository
public interface PtcptRepository extends JpaRepository<Ptcpt, Integer> {
	public Ptcpt findByPost_PostId(int postId);
}
