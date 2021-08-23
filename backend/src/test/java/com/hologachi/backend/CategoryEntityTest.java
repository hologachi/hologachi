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
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Before
	public void init() 
	{
		categoryRepository.save(new Category("test","test"));
		categoryRepository.save(new Category(2, "test", 2,"test"));
	}
	
	@Test
	public void 엔티티_제대로_됐나_테스트() 
	{
		Category category = categoryRepository.findByCat2("test");
		
		assertEquals(category.getCat1(), "test");
		assertEquals(category.getCat2(), "test");
	}
	
	@Test
	public void 카테고리_삭제_테스트() 
	{	
		int[] temp = {2};
		
		long beforeDelete = categoryRepository.count();
		
		categoryRepository.deleteById2In(temp);
		
		long afterDelete = categoryRepository.count();
		
		assertEquals(beforeDelete, afterDelete + 1);
	}
	
}
