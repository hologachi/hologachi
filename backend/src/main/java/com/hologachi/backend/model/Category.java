package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

import lombok.Builder;
//import lombok.Getter;
//import lombok.Setter;

@Entity
@Table(name="TBL_CATEGORY1")
@SecondaryTable(name="TBL_CATEGORY2", 
	pkJoinColumns = @PrimaryKeyJoinColumn(name = "CATEGORY1_ID"))
//@Getter
//@Setter
public class Category {

	@Id
	@Column(table = "TBL_CATEGORY1", name = "CATEGORY1_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id1;
	@Column(table = "TBL_CATEGORY1", name = "NAME")
	private String cat1;
	@Column(table = "TBL_CATEGORY2", name = "CATEGORY2_ID")
	private int id2;
	@Column(table = "TBL_CATEGORY2", name = "NAME")
	private String cat2;
	
	public Category() {
		super();
	}
	public Category(int id1, String cat1, int id2, String cat2) {
		super();
		this.id1 = id1;
		this.cat1 = cat1;
		this.id2 = id2;
		this.cat2 = cat2;
	}

	public int getId1() {
		return id1;
	}
	public void setCat1_id(int id1) {
		this.id1 = id1;
	}
	public int getId2() {
		return id2;
	}
	public void setid2(int id2) {
		this.id2 = id2;
	}
	public String getCat1() {
		return cat1;
	}
	public void setCat1(String cat1) {
		this.cat1 = cat1;
	}
	public String getCat2() {
		return cat2;
	}
	public void setCat2(String cat2) {
		this.cat2 = cat2;
	}
	
	
}
