package com.hologachi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

	Category findById(int id);
}
