package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.HomePost;

@Repository
public interface HomeRepository extends JpaRepository<HomePost, Integer> {
//	public List<HomePost> findAll();

//	@Query("select p from Post p where p.location = :loc")
//	public List<HomePost> locItem(String loc);
}
