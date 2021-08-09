package com.hologachi.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="TBL_CATEGORY2")
public class Category2 {
	
	@Id @GeneratedValue
	private int category2_id;
	private String name;
	
//	@ManyToOne
//	@JoinColumn(name="CATEGORY1_ID")
//	private Category1 category1;
	
}
