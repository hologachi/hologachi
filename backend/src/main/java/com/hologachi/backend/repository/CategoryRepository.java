package com.hologachi.backend.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

	@Transactional
	Category findById2(int id);

//	@Transactional
//	@Modifying
//	@Query("delete form Category")
//	Category deleteAllById(int[] ids);
}
