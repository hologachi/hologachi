package com.hologachi.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Ptcpt;

@Repository
public interface PtcptRepository extends JpaRepository<Ptcpt, Integer> {
	public Ptcpt findByPost_PostId(int postId);
	
//	@Query(value="select *\r\n"
//			+ "from TBL_PTCPT\r\n"
//			+ "group by post_id\r\n"
//			+ "order by count(*) desc", nativeQuery=true)
//	public List<Ptcpt> searchRqstCount();
// =======
// import java.util.Optional;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.hologachi.backend.model.*;

// @Repository
// public interface PtcptRepository extends JpaRepository<Ptcpt, Integer> {

 	Optional<Ptcpt> findByPtcptId(int parseInt);

}
