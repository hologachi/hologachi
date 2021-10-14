package com.hologachi.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Entity
@Table(name="TBL_CHAT_PTCPTS")
public class ChatPtcpts {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="CHAT_PTCPTS_ID")
	private int chatPtcptsId;
	
//	@ManyToOne(optional = false)
//    @JoinTable(name = "TBL_CHATROOM"
//    		, joinColumns = @JoinColumn(name = "CHATROOM_ID")
////    		, inverseJoinColumns = @JoinColumn(name = "CHATROOM_ID")
//    )
	@Column(name="CHATROOM_ID")
    private int chatRoomId;
	
	@Column(name="USER_ID")
	private int userId;
	
}
