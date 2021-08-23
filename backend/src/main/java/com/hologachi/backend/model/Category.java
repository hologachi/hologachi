package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="TBL_CATEGORY1")
@SecondaryTable(name="TBL_CATEGORY2", 
	pkJoinColumns = @PrimaryKeyJoinColumn(name = "CATEGORY1_ID"))
@Getter
@Setter
@NoArgsConstructor
public class Category {

	@Id
	@Column(table = "TBL_CATEGORY1", name = "CATEGORY1_ID", columnDefinition="INT")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id1;
	
	@Column(table = "TBL_CATEGORY1", name = "NAME")
	private String cat1;
	
	@Column(table = "TBL_CATEGORY2", name = "CATEGORY2_ID", columnDefinition="INT")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id2;
	
	@Column(table = "TBL_CATEGORY2", name = "NAME")
	private String cat2;
	
	public Category(String cat1, String cat2) {
		super();
		this.cat1 = cat1;
		this.cat2 = cat2;
	}
	
}
