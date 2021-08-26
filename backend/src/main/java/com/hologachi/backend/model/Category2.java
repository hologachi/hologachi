package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="TBL_CATEGORY2")
public class Category2 {
	
	@Id @GeneratedValue
	@Column(name="category2_id")
	private int category2Id;
	private String name;
	
//	@ManyToOne
//	@JoinColumn(name="CATEGORY1_ID")
//	private Category1 category1;
	
}
