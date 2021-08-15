import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class ListGBPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [{id:1, registerId:"홍길동", registerAt:"210710", 
                updateAt:"210711", title:"공동구매 해요~!", content:"친환경 빨대 공동구매해요", 
                matching:"3", deadline:"211130", deletedBy:"-1",
                category:"001" }]
        }
    }

    deletedByTranslate(value) {
        switch(value) {
            case 0:
                return "작성자";
            case 1:
                return "관리자";
            case -1:
                return "미삭제";
            default:
                return "알 수 없음";
        }   
    }

    render() {
        return (
            <div className="managePost_body">
                <div className="postList">
                    <Table striped bordered hover>
                        <thead>
                        <th>공동구매 글 목록</th>
                            <tr>
                                <th>제안자</th>
                                <th>등록일</th>
                                <th>수정일</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>모집 인원 수</th>
                                <th>신청기한</th>
                                <th>삭제한 사람</th>
                                <th>글 카테고리</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.posts.map(
                                    post => 
                                    <tr key = {post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.registerId}</td>
                                        <td>{post.registerAt}</td>
                                        <td>{post.title}</td>
                                        <td>{post.content}</td>
                                        <td>{post.matching}</td>
                                        <td>{post.deadline}</td>
                                        <td>{this.deletedByTranslate(post.deletedBy)}</td>
                                        <td>{post.category}</td>
                                        <td><button>글 삭제</button></td>
                                        <td><button>댓글 조회</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
           </div>
        );
    }
}


export default ListGBPost;