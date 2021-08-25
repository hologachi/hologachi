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
        console.log(new_auth);
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
        console.log(nextAuthGroup);
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

    const [showModalAdmin, setSetModalAdmin] = useState(false);

    const handleModalAdminClose = () => {
        setSetModalAdmin(false);
    };

    const handleModalAdminShow = () => {
        setSetModalAdmin(true);
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
                                <Button>작성글 조회</Button>
                            </td>
                            <td>{user.rqst_rate} 점</td>
                            <td>
                                {translationIsAdmin(user.is_admin)} <br />
                                <Button onClick={() => {
                                    handleModalAdminShow(); 
                                    setForm({id: user.userId, nickname: user.nickname, new_auth: user.is_admin}); 
                                    setAuthGroup({[user.is_admin]: true});
                                }}>회원 권한 수정</Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            
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
        </div>
    )
};

export default ListUser;