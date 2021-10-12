package com.hologachi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Donation;
import com.hologachi.backend.model.DonationSite;
import com.hologachi.backend.model.User;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Integer>{

	List<Donation> findByUserUserId(Integer integer);

}
