package com.hologachi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface Category1Repository extends JpaRepository<Category1, Integer> {

	
}
