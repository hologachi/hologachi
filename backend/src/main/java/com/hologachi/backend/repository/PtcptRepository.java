package com.hologachi.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.*;

@Repository
public interface PtcptRepository extends JpaRepository<Ptcpt, Integer> {

	Optional<Ptcpt> findByPtcptId(int parseInt);
}
