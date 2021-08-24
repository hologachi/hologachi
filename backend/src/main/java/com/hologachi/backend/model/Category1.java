package com.hologachi.backend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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

	@Id @GeneratedValue
	@Column(name = "CATEGORY1_ID")
	private int id1;
	@Column(name = "NAME")
	private String cat1;
	
	public Category1(String cat1) {
		this.cat1 = cat1;
	}
}
