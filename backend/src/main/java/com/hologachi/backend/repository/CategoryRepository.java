package com.hologachi.backend.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

	@Transactional
	Category findByCat2(String cat2);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Category WHERE id2 = :id2")
	Category deleteById2(@Param(value = "id2")int id2);
	
	@Transactional
//	@Modifying
	@Query("DELETE FROM Category WHERE id2 in :id2")
	public Category deleteById2In(@Param(value = "id2") int[] id2);

	Category findById2In(int[] temp);

	

	
}
