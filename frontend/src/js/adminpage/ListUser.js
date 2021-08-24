import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const ListUser = (props) => {
    const [form, setForm] = useState({
        user: '', //권한 변경할 유저 닉네임
        new_auth: '',
    })
    const { user, new_auth } = form;
    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(nextForm);
    }
    const onClick = () => {
        alert(user + '님의 권한은 ' + new_auth);
        setForm({
            user: '',
            new_auth: ''
        });
    };
    const onKeyPress = e => {
        if(e.key === 'Enter') {
            onClick();
        }
    };

    const [showModalAdmin, setSetModalAdmin] = useState(false);

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

    const handleClose = (event, modal) => {
        setSetModalAdmin(false);
    };

    const handleShow = (event, modal) => {
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
                            <td>{user.sgst_rate} 점</td>
                            <td>{user.rqst_rate} 점</td>
                            <td>{translationIsAdmin(user.is_admin)}</td>
                            <td><Button onClick={e => handleShow(e, 'showModalAdmin')}>회원 권한 수정</Button></td>
                            <td><Button>작성글 조회</Button></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            
            <Modal show={showModalAdmin} onHide={(event) => handleClose(event, 'showModalAdmin')}>
                <Modal.Header closeButton>
                    <Modal.Title>{user} 님의 새로운 권한을 선택해주세요.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="radio" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(event) => handleClose(event, 'showModalAdmin')}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={(event) => {handleClose(event, 'showModalAdmin');}}>
                        수정
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default ListUser;