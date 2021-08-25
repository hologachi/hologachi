package com.hologachi.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Getter
@Entity
@Table(name="TBL_POST")
public class Post {
	
	@Id @GeneratedValue
	private int post_id;
	
	@ManyToOne
	@JoinColumn(name="sgster_id")
	private User user;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date rgst_at;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date update_at;
	private String title;
	private String content;
	private int matching;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date deadline;
	private int deleted_by;
	
	@ManyToOne
	@JoinColumn(name="CATEGORY2_ID")
	private Category2 category2;
	private String step;
	private int price;
	private String url;

	public int getPost_id() {
		return post_id;
	}

	public void setPost_id(int post_id) {
		this.post_id = post_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getRgst_at() {
		return rgst_at;
	}

	public void setRgst_at(Date rgst_at) {
		this.rgst_at = rgst_at;
	}

	public Date getUpdate_at() {
		return update_at;
	}

	public void setUpdate_at(Date update_at) {
		this.update_at = update_at;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getMatching() {
		return matching;
	}

	public void setMatching(int matching) {
		this.matching = matching;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public int getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}

	public Category2 getCategory2() {
		return category2;
	}

	public void setCategory2(Category2 category2) {
		this.category2 = category2;
	}

	public String getStep() {
		return step;
	}

	public void setStep(String step) {
		this.step = step;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	
	
}
