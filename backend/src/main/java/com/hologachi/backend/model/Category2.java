package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="TBL_CATEGORY2")
public class Category2 {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CATEGORY2_ID")
	private int category2Id;
	
	@Column(name = "NAME", nullable=false)
	private String name;

 	@ManyToOne
 	@JoinColumn(name = "CATEGORY1_ID")
 	private Category1 category1;

	
	public Category2(Category1 category1, String name) { // 대분류 이름, 소분류 이름 
		this.category1 = category1;
		this.name = name;
	}


	public Category2() {
		// TODO Auto-generated constructor stub
	}
	
}
