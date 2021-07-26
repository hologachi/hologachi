package dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import domain.Category;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDto {
	private String nm;
	private String labelNm; 
	private int orderNo;
	
	public Category toEntity(){
        return Category.builder()
        		.nm(nm)
        		.labelNm(labelNm)
        		.orderNo(orderNo)
                .build();
    }
}