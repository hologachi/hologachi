import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const ListUser = (props) => {
    const [form, setForm] = useState({
        id: '', //권한 변경할 유저 아이디
        nickname: '', //권한 변경할 유저 닉네임
        new_auth: '',
    })
    const { id, nickname, new_auth } = form;
    const new_authChange = (e) => {
        const nextForm = {
            ...form,
            new_auth: e.target.value
        };
        setForm(nextForm);
        // console.log(new_auth);
    }

    const [authGroup, setAuthGroup] = useState({
        '0': false,
        '1': false,
        '-1': false
    })
    const reset_authGroupChange = () => {
        const nextAuthGroup = {
            '0': false,
            '1': false,
            '-1': false
        };
        setForm(nextAuthGroup);
        // console.log(nextAuthGroup);
    }

    const handleRadio = (e) => {
        setAuthGroup({
            [e.target.value]: [e.target.checked]
        })
    };

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
                return "작성자";
            case 1:
                return "관리자";
            case -1:
                return "미삭제";
            default:
                return "알 수 없음";
        }   
    };


    const [showModalAdmin, setShowModalAdmin] = useState(false);
    const [showModalPost, setShowModalPost] = useState(false);

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
        <div className="userList">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>아이디</th>
                        <th>닉네임</th>
                        <th>이메일</th>
                        <th>제시자로써 평점</th>
                        <th>요청자로써 평점</th>
                        <th>권한</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.users && props.users.map(
                        (user) => 
                        <tr key = {user.userId}>
                            <td><img className="smallUserProfile" src={''}/></td>
                            <td>{user.userId}</td>
                            <td>{user.nickname}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.sgst_rate} 점 <br />
                                <Button onClick={() => {
                                    setForm({id: user.userId, nickname: user.nickname, new_auth: user.is_admin}); 
                                    props.loadUserPost(user.userId); 
                                    handleModalPostShow();
                                }}>작성글 조회</Button>
                            </td>
                            <td>{user.rqst_rate} 점</td>
                            <td>
                                {translationIsAdmin(user.is_admin)} <br />
                                <Button onClick={() => {
                                    setForm({id: user.userId, nickname: user.nickname, new_auth: user.is_admin}); 
                                    setAuthGroup({[user.is_admin]: true});
                                    handleModalAdminShow();
                                }}>회원 권한 수정</Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
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
                    <Button variant="primary" onClick={() => {props.handleUpdateAuth(id, new_auth); reset_authGroupChange(); handleModalAdminClose();}}>
                        수정
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 작성글 조회 모달 */}
            <Modal show={showModalPost} onHide={handleModalPostClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{nickname} 님이 작성한 글입니다.</Modal.Title>
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
                        props.userPost && props.userPost.length === 0 && 
                            <td colSpan='8'> 작성한 글이 없습니다</td>
                    }
                    {
                        props.userPost && Object.values(props.userPost).map(
                            (gbPost, i) => (
                            <tr key = {i}>
                                <td>{gbPost.post_id}</td>
                                <td>{gbPost.rgst_at}</td>
                                <td>{gbPost.update_at}</td>
                                <td>{gbPost.title}</td>
                                <td>{gbPost.matching}</td>
                                <td>{gbPost.deadline}</td>
                                <td>{translationDeletedBy(gbPost.deleted_by)}</td>
                                <td>{gbPost.category}</td>
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
    )
};

export default ListUser;