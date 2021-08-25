package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.User;

@Repository
public interface ProfileRepository extends JpaRepository<User, Integer> {
	public List<User> findByUserId(int id);
}
