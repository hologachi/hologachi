package com.hologachi.backend.repository;

import java.util.List;

import com.hologachi.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Ptcpt;

@Repository
public interface MyRequestRepository extends JpaRepository<Ptcpt, Integer> {
	public List<Ptcpt> findByUser_UserId(int userId);
	
	public List<Ptcpt> findByPost_PostId(int postId);
	
	public Ptcpt findByPtcptId(int ptcptId);

}
