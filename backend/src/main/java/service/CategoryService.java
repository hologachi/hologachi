package service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.CategoryDto;
import repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<CategoryDto> getCategories(){
		return categoryRepository.findAll().stream().map(category -> modelMapper.map(category, CategoryDto.class)).collect(Collectors.toList());
	}
	
	public CategoryDto newCategories(CategoryDto categoryDto) {
		return modelMapper.map(categoryRepository.save(categoryDto.toEntity()), CategoryDto.class);
	}
	
	public String getCategoryLabelNm(String nm) {
		return categoryRepository.findByNm(nm).getLabelNm();
	}
}