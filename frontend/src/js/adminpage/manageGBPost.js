import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Table, Button, Modal } from 'react-bootstrap';
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminService from '../services/AdminService'; //백엔드 연결

function ManageGBPost() {

    const [gbPosts, setGbPosts] = useState([]);
    const [showModalC, setShowModalC] = useState(false); // 댓글 모달 상태
    const [comments, setComments] = useState([]);
    const [postTitle, setPostTitle] = useState(''); // 댓글 조회한 글 제목 정보

    const columns = [{
        dataField: 'postId',
        text: '글 ID'
      }, {
        dataField: 'user.nickname',
        text: '제안자'
      }, {
        dataField: 'rgstAt',
        text: '등록일'
      }, {
        dataField: 'updateAt',
        text: '수정일'	
      }, {
        dataField: 'category',
        text: '카테고리',
        formatter: CategoryFormatter	
      }, {
        dataField: 'title',
        text: '제목'	
      }, {
        dataField: 'matching',
        text: '모집인원수'
      }, {
          dataField: 'deadline',
          text: '신청기한'
      }, {
          dataField: 'step',
          text: '진행상태',
          formatter: TranslationStep
      }, {
          dataField: 'deletedBy',
          text: '삭제한 사람',
          formatter: TranslationDeletedBy
      }, {
        dataField: '',
        text: '댓글 조회',
        formatter: ReadCommentsButtonFormatter
      }, {
        dataField: '',
        text: '글 삭제',
        formatter: DeletePostButtonFormatter
    }
    ];		

    function CategoryFormatter(cell, row) {
        return row.category2.category1.name  + '>' + row.category2.name;
    }

    function ReadCommentsButtonFormatter(cell, row) {
        return (<Button variant="secondary" onClick={() => {
            LoadComments(row.postId); 
            setPostTitle(row.title); 
            setShowModalC(true);
        }}>댓글 조회</Button>);
    }

    function DeletePostButtonFormatter(cell, row) {
        return (<Button variant="secondary" onClick={() => HandleDeletePost(row.postId)}>글 삭제</Button>);
    }

    useEffect(
        () => {
            LoadGBPosts();
        }, []
    );

    const LoadGBPosts = () => {
        // 공동구매 글 전체 조회 
        AdminService.getAllGBPosts().then((res) => {
            setGbPosts(res.data);
            console.log(res.data);
        }) 
        
    }

    const HandleDeletePost = (postId) => {
        // 공동구매 글 삭제 
        AdminService.deleteTheGBPost(postId).then((res) => {
            LoadGBPosts();
        }) 
    }

    const LoadComments = (postId) => {
        // 공동구매 댓글 조회
        AdminService.getTheComments(postId).then((res) => {
            setComments(res.data);
        }) 
    }

    const HandleDeleteComment = (postId, commentId) => {
        // 공동구매 글 삭제 
        AdminService.deleteTheComment(commentId).then((res) => {
            LoadComments(postId);
        }) 
    }

    function TranslationDeletedBy(value) {
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

    function TranslationStep(value) {
        switch(value) {
            case 'request':
                return "요청중";
            case 'proceed':
                return "공동구매진행중";
            case 'finish':
                return "종료"
            default:
                return "알 수 없음";
        }   
    }

    function TranslationCommentStatus(value) {
        switch(value) {
            case 0:
                return "삭제";
            case 1:
                return "미삭제";
            default:
                return "알 수 없음";
        }   
    }

    function TranslationCommentOnlySgst(value) {
        switch(value) {
            case 0:
                return "전체공개";
            case 1:
                return "작성자에게만 공개";
            default:
                return "알 수 없음";
        }   
    }

    return (
        <div className="MPost">
        <div className="wrapper">
            <AdminNav />
            <div className="managePost_body">
                <div className="postList">
                    <br/>
                    <h2>공동구매 글</h2>
                    <br/>
                    {   gbPosts && <BootstrapTable keyField='postId' data={ gbPosts } columns={ columns } striped hover condensed wrapperClasses="table-responsive" pagination={ paginationFactory() }/> }

                    {/* 댓글 조회용 모달 */}
                    <Modal show={showModalC} onHide={() => setShowModalC(false)} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg"> {'<'}{postTitle}{'>'} 에 작성된 댓글입니다.</Modal.Title>
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
                                comments && Object.values(comments).map(
                                    (comment, i) => (
                                    <tr key = {i}>
                                        <td>{i+1}</td>
                                        <td>{comment.user.nickname}</td>
                                        <td>{comment.rgstAt}</td>
                                        <td>{comment.updateAt}</td>
                                        <td>{comment.content}</td>
                                        <td>{TranslationCommentOnlySgst(comment.onlySgster)}</td>
                                        <td>{TranslationCommentStatus(comment.status)}</td>
                                        <td><Button onClick={() => HandleDeleteComment(comment.post.postId, comment.commentId)}>댓글 삭제</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </Table>
                        {comments && <p>댓글 총 {comments.length} 개</p>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModalC(false)}>
                                취소
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
           </div>

           </div>
           </div>
        );

 }

 export default ManageGBPost;