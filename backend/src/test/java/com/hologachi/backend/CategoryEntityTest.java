package com.hologachi.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hologachi.backend.model.Category1;
import com.hologachi.backend.model.Category2;
import com.hologachi.backend.repository.Category2Repository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class CategoryEntityTest {
	
	@Autowired
	private Category2Repository category2Repository;
	
	@Before
	public void init() 
	{
		Category2 category = new Category2(new Category1("test"), "test");
		category2Repository.save(category);
	}
	
	@Test
	public void 엔티티_저장_테스트() 
	{
		Category2 category = category2Repository.findByName("test");

		assertEquals(category.getCategory1().getName(), "test");
	}
	
//	@Test
//	public void 카테고리_삭제_테스트() 
//	{	
//		Category2 category = categoryRepository.findByCat2("test");
//		int id = category.getId2();
//		
//		long beforeDelete = categoryRepository.count();
//		
//		categoryRepository.deleteById2(id);
//		
//		long afterDelete = categoryRepository.count();
//		
//		assertEquals(beforeDelete, afterDelete + 1);
//	}
	
}
