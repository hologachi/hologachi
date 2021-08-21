package com.hologachi.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.hologachi.backend.model.Category;
import com.hologachi.backend.repository.CategoryRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class CategoryEntityTest {
	String temp = "가전제품";
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Before
	public void init() 
	{
		Category category = categoryRepository.save(new Category(2, "가전제품", 2, "노트북"));
	}
	
	@Test
	public void 엔티티_제대로_됐나_테스트() 
	{
		Category category = categoryRepository.findById2(2);
		assertEquals(category.getCat1(), "가전제품");
		assertEquals(category.getCat2(), "노트북");
	}
	
//	@Test
//	public void 카테고리_삭제_테스트() 
//	{
//		int[] ids = {30, 31};
//		
//		Category category = categoryRepository.deleteAllById(ids);
//		
//		assertEquals(category.getId(), "가전제품");
//		assertEquals(category.getCat2(), "노트북");
//	}
	
}
