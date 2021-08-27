package com.hologachi.backend.controller;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SearchUserVO {

	private String nickname;
	private String email;
	private int is_admin;
}
