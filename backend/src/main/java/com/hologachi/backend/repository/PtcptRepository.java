package com.hologachi.backend.repository;

//import java.util.List;
import java.util.Optional;

//import com.hologachi.backend.model.ChatRoom;
//import com.hologachi.backend.model.Post;
//import com.hologachi.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hologachi.backend.model.Ptcpt;

@Repository
public interface PtcptRepository extends JpaRepository<Ptcpt, Integer> {

	@Query("select ptcptId from Ptcpt where post.postId=:postId and user.userId=:userId")
	public int findByPost_PostId(int postId, int userId);

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

 	Optional<Ptcpt> findByPtcptId(int ptcptId);

 	Optional<Ptcpt> findByPostPostIdAndUserUserId(int postId, int userId);

}
