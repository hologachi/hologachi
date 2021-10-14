import { React, useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Table, Button, Modal } from 'react-bootstrap';
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AdminNav from "./adminNav"
import AdminSearch from "./adminSearch"
import AdminService from '../services/AdminService'; //백엔드 연결

function ManageUser() {

    const [users, setUsers] = useState(null);
    // const [userList, setUserList] = useState(null);
    const [userPost, setUserPost] = useState(null);

    const columns = [{
        dataField: 'image',
        text: '',
        formatter: ImageFormatter
      }, {
        dataField: 'userId',
        text: 'ID'
      }, {
        dataField: 'nickname',
        text: '닉네임'
      }, {
        dataField: 'email',
        text: '이메일'	
      }, {
        dataField: 'dealRate',
        text: '평점'	
      }, {
        dataField: 'dealCount',
        text: '거래횟수'	
      }, {
        dataField: 'isAdmin',
        text: '권한', 
        formatter: IsAdminFormatter
      }, {
          dataField: '회원권한 수정',
          text: '회원권한 수정',
          formatter: IsAdminModalButtonFormatter
      }, {
          dataField: '작성글 조회',
          text: '작성글 조회',
          formatter: PostModalButtonFormatter
      }
    ];		

    function ImageFormatter(cell, row) {
        return (
            <img className="smallUserProfile" src={cell} alt="없음"/>
        );
    }

    function IsAdminFormatter(cell, row) {
        switch(cell) {
            case 0:
                return "일반 사용자";
            case 1:
                return "관리자";
            case -1:
                return "정지된 회원";
            default:
                return "알 수 없음";
        }   
    };

    function IsAdminModalButtonFormatter(cell, row) {
        return (
            <Button variant="secondary" onClick={() => {
                setForm({id: row.userId, nickname: row.nickname, new_auth: row.isAdmin}); 
                setAuthGroup({[row.isAdmin]: true});
                handleModalAdminShow();
            }}>권한 수정</Button>
        );
    };

    function PostModalButtonFormatter(cell, row) {
        return (
            <Button variant="secondary" onClick={() => {
                setForm({id: row.userId, nickname: row.nickname, new_auth: row.isAdmin}); 
                loadUserPost(row.userId); 
                handleModalPostShow();
            }}>작성글 조회</Button>
        );
    } 

    useEffect(
        () => {
            loadUsers();
        }, []
    );

    const loadUsers = () => {
        // 회원 전체 조회 
        AdminService.getAllUsers().then((res) => {
            setUsers(res.data);
        }) 
    };

    const loadUserPost = (userId) => {
        // 회원 작성글 조회 
        AdminService.getTheUsersPost(userId).then((res) => {
            setUserPost(res.data);
        })  
    };

    const handleUpdateAuth = (id, new_auth) => {
        if(id !== undefined && id !== '') {
            // 회원 권한 수정
            AdminService.updateAuth(id, new_auth).then((res) => {
                loadUsers();
            }) 
            alert('사용자 권한을 수정했습니다.');
        } else {
            alert('사용자 권한 수정 요청을 실패했습니다.');
        }
    };

    const [form, setForm] = useState({
        id: '', //권한 변경할 유저 아이디
        nickname: '', //권한 변경할 유저 닉네임
        new_auth: '',
    });
    const { id, nickname, new_auth } = form;
    const new_authChange = (e) => {
        const nextForm = {
            ...form,
            new_auth: e.target.value
        };
        setForm(nextForm);
        // console.log(new_auth);
    };

    const [authGroup, setAuthGroup] = useState({
        '0': false,
        '1': false,
        '-1': false
    });
    const reset_authGroupChange = () => {
        const nextAuthGroup = {
            '0': false,
            '1': false,
            '-1': false
        };
        setForm(nextAuthGroup);
        // console.log(nextAuthGroup);
    };

    const handleRadio = (e) => {
        setAuthGroup({
            [e.target.value]: [e.target.checked]
        })
    };

    const [showModalAdmin, setShowModalAdmin] = useState(false);
    const [showModalPost, setShowModalPost] = useState(false);

    const translationIsAdmin = (value) => {
        switch(value) {
            case 0:
                return "일반 사용자";
            case 1:
                return "관리자";
            case -1:
                return "정지된 회원";
            default:
                return "알 수 없음";
        }   
    };

    const translationDeletedBy = (value) => {
        switch(value) {
            case 0:
                return <td>작성자</td>;
            case 1:
                return <td>관리자</td>;
            case -1:
                return <td>미삭제</td>;
            default:
                return <td>알 수 없음</td>;
        }   
    };

    const handleModalAdminClose = () => {
        setShowModalAdmin(false);
    };
    const handleModalAdminShow = () => {
        setShowModalAdmin(true);
    };

    const handleModalPostClose = () => {
        setShowModalPost(false);
    };

    const handleModalPostShow = () => {
        setShowModalPost(true);
    };

    return (
        <div className="AdminPage">
        <div className="wrapper">
            <AdminNav />
            
            <div className="userList">
                <h2>회원관리</h2>
                <AdminSearch />
                {   users && <BootstrapTable keyField='userId' data={ users } columns={ columns } striped hover condensed wrapperClasses="table-responsive" pagination={ paginationFactory() }/> }

                {/* 권한 수정 관련 모달 */}
                <Modal show={showModalAdmin} onHide={handleModalAdminClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{nickname} 님의 새로운 권한을 선택해주세요.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ul>
                        <ol>
                            <label>
                                <input type="radio" name="authGroup" value='0' checked={authGroup[0]} onChange={(e) => {handleRadio(e); new_authChange(e);}} />
                                {translationIsAdmin(0)}
                            </label>
                        </ol>
                        <ol>
                            <label>
                                <input type="radio" name="authGroup" value='1' checked={authGroup[1]} onChange={(e) => {handleRadio(e); new_authChange(e);}} />
                                {translationIsAdmin(1)}
                            </label>
                        </ol>
                        <ol>
                            <label>
                                <input type="radio" name="authGroup" value='-1' checked={authGroup[-1]} onChange={(e) => {handleRadio(e); new_authChange(e);}} />
                                {translationIsAdmin(-1)}
                            </label>
                        </ol>
                    </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalAdminClose}>
                            취소
                        </Button>
                        <Button variant="secondary" onClick={() => {handleUpdateAuth(id, new_auth); reset_authGroupChange(); handleModalAdminClose();}}>
                            수정
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* 작성글 조회 모달 */}
                <Modal show={showModalPost} onHide={handleModalPostClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">{nickname} 님이 작성한 글입니다.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>등록일</th>
                                <th>수정일</th>
                                <th>제목</th>
                                <th>모집 인원 수</th>
                                <th>신청기한</th>
                                <th>삭제한 사람</th>
                                <th>글 카테고리</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            userPost && userPost.length === 0 && 
                                <td colSpan='8'> 작성한 글이 없습니다</td>
                        }
                        {
                            userPost && Object.values(userPost).map(
                                (gbPost, i) => (
                                <tr key = {i}>
                                    <td>{gbPost.postId}</td>
                                    <td>{gbPost.rgstAt}</td>
                                    <td>{gbPost.updateAt}</td>
                                    <td>{gbPost.title}</td>
                                    <td>{gbPost.matching}</td>
                                    <td>{gbPost.deadline}</td>
                                    <td>{translationDeletedBy(gbPost.deletedBy)}</td>
                                    <td>{gbPost.category2.category1.name} {'>'} {gbPost.category2.name}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalPostClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
        </div>
    );
 };

 export default ManageUser;