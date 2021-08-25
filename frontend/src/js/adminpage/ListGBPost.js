import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

class ListGBPost extends Component {
    
    state = {
        showModalC: false, // 댓글 모달 상태
        postTitle: '', // 댓글 조회한 글 제목 정보
    }

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
    translationStep(value) {
        switch(value) {
            case 'request':
                return "요청중";
            case 'delete':
                return "삭제";
            case 'proceed':
                return "공동구매진행중";
            case 'finish':
                return "종료"
            default:
                return "알 수 없음";
        }   
    }
    translationCommentStatus(value) {
        switch(value) {
            case 0:
                return "삭제";
            case 1:
                return "미삭제";
            default:
                return "알 수 없음";
        }   
    }

    translationCommentOnlySgst(value) {
        switch(value) {
            case 0:
                return "전체공개";
            case 1:
                return "작성자에게만 공개";
            default:
                return "알 수 없음";
        }   
    }

    handleClose(modal) { // 모달 닫기
        this.setState(
            {[modal]: false}
        );
    }

    handleShow(modal) { // 모달 보이기
        this.setState(
            {[modal]: true}
        );
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
                                <th>신청인원수 / 모집인원수</th>
                                <th>신청기한</th>
                                <th>진행상태</th>
                                <th>삭제한 사람</th>
                                <th>카테고리<br/>(대분류-소분류)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.gbPosts && Object.values(this.props.gbPosts).map(
                                    (gbPost, i) => (
                                    <tr key = {i}>
                                        <td>{gbPost.postId}</td>
                                        <td>{gbPost.user.nickname}</td>
                                        <td>{gbPost.rgst_at}</td>
                                        <td>{gbPost.update_at}</td>
                                        <td>{gbPost.title}</td>
                                        <td>{gbPost.content}</td>
                                        <td>/{gbPost.matching}</td>
                                        <td>{gbPost.deadline}</td>
                                        <td>{this.translationStep(gbPost.step)}</td>
                                        <td>{this.translationDeletedBy(gbPost.deleted_by)}</td>
                                        <td>{gbPost.category2.category1.cat1} {'>'} {gbPost.category2.cat2}</td>
                                        <td><Button onClick={() => this.props.handleDeletePost(gbPost.postId)}>글 삭제</Button></td>
                                        <td><Button onClick={() => {
                                                this.props.loadComments(gbPost.postId); 
                                                this.setState({postTitle: gbPost.title}); 
                                                this.handleShow('showModalC');
                                            }}>댓글 조회</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                    {/* 댓글 조회용 모달 */}
                    <Modal show={this.state.showModalC} onHide={() => {this.handleClose('showModalC');}}>
                        <Modal.Header closeButton>
                            <Modal.Title> {'<'}{this.state.postTitle}{'>'} 에 작성된 댓글입니다.</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>작성자</th>
                                <th>등록일</th>
                                <th>수정일</th>
                                <th>내용</th>
                                <th>공개여부</th>
                                <th>삭제여부</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.comments && Object.values(this.props.comments).map(
                                    (comment, i) => (
                                    <tr key = {i}>
                                        <td>{i+1}</td>
                                        <td>{comment.user.nickname}</td>
                                        <td>{comment.rgst_at}</td>
                                        <td>{comment.update_at}</td>
                                        <td>{comment.content}</td>
                                        <td>{this.translationCommentOnlySgst(comment.only_sgster)}</td>
                                        <td>{this.translationCommentStatus(comment.status)}</td>
                                        <td><Button onClick={() => this.props.handleDeleteComment(comment.post.postId, comment.commentId)}>댓글 삭제</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </Table>
                        {this.props.comments && <p>댓글 총 {this.props.comments.length} 개</p>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {this.handleClose('showModalC');}}>
                                취소
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
           </div>
        )
    }
}

export default ListGBPost;