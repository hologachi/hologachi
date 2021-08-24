import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class ListGBPost extends Component {

    translationDeletedBy(value) {
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
                    <h4>공동구매 글</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
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
                                this.props.gbPosts && Object.values(this.props.gbPosts).map(
                                    (gbPost, i) => (
                                    <tr key = {i}>
                                        <td>{gbPost.post_id}</td>
                                        <td>{gbPost.user.nickname}</td>
                                        <td>{gbPost.rgst_at}</td>
                                        <td>{gbPost.update_at}</td>
                                        <td>{gbPost.title}</td>
                                        <td>{gbPost.content}</td>
                                        <td>{gbPost.matching}</td>
                                        <td>{gbPost.deadline}</td>
                                        <td>{this.translationDeletedBy(gbPost.deleted_by)}</td>
                                        <td>{gbPost.category}</td>
                                        <td><Button>글 삭제</Button></td>
                                        <td><Button>댓글 조회</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
           </div>
        )
    }
}

export default ListGBPost;