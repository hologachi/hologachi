package com.hologachi.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	Optional<User> findByGoogleId(String googleId);

}
