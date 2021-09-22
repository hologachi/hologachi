package com.hologachi.backend;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hologachi.backend.model.Ptcpt;
import com.hologachi.backend.repository.PtcptRepository;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class PtcptEntityTest {
	
	@Autowired
	private PtcptRepository ptcptRepository;
	
	Ptcpt saved = null;
	
	@Before
	public void init() 
	{
	}
	
	@Test
	public void 엔티티_조회_테스트() 
	{
		Optional<Ptcpt> foundPtcpt = ptcptRepository.findByPostPostIdAndUserUserId(1, 6);
		
		
		assertEquals(foundPtcpt.get().getPtcptId(), 10);

		
	}
	
}
