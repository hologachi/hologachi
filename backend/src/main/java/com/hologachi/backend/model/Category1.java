package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Entity
@Table(name="TBL_CATEGORY1")
public class Category1 {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CATEGORY1_ID")
	private int category1Id;
	
	@Column(name = "NAME", nullable=false)
	private String name;
	
	
	public Category1(String name) {
		this.name = name;
	}
}
