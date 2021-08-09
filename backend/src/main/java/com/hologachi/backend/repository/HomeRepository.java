package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.HomePost;

@Repository
public interface HomeRepository extends JpaRepository<HomePost, Integer> {
	public List<HomePost> findAll();
}
