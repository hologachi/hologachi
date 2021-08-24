package com.hologachi.backend.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface CategoryRepository extends JpaRepository<Category2, Integer> {

	@Transactional
	Category2 findByCat2(String cat2);
	
	@Transactional
	Optional<Category2> findById2(int id2);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Category2 WHERE id2 = :id2")
	void deleteById2(@Param(value = "id2")int id2);
//	
//	@Transactional
//	@Modifying
//	@Query("DELETE FROM Category WHERE id2 in :id2")
//	public Category deleteById2In(@Param(value = "id2") int[] id2);
	
}
