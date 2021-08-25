package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import domain.Category;

public interface CategoryRepository extends JpaRepository<Category, String> {
	Category findByNm(String nm);
}