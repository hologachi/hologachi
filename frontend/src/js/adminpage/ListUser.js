import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

class ListUser extends Component {
    
    state = {
        show: false,
    }

    translationIsAdmin(value) {
        switch(value) {
            case 0:
                return "일반 사용자";
                break;
            case 1:
                return "관리자";
                break;
            case -1:
                return "정지된 회원";
                break;
            default:
                return "알 수 없음";
        }   
    }

    handleClose = () => {
        this.setState(
            {show: false}
        );
    }

    handleShow = () => {
        this.setState(
            {show: true}
        );
    }

    render() {
        
        return (
            <div className="managerUser_body">
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
                                this.props.users && this.props.users.map(
                                    (user) => 
                                    <tr key = {user.userId}>
                                        <td><img className="smallUserProfile" src={user.profile}/></td>
                                        <td>{user.userId}</td>
                                        <td>{user.nickname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.sgst_rate} 점</td>
                                        <td>{user.rqst_rate} 점</td>
                                        <td>{this.translationIsAdmin(user.is_admin)}</td>
                                        <td><Button onClick={this.handleShow}>회원 권한 수정</Button></td>
                                        <td><Button>작성글 조회</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
           </div>
        )
    }
}

export default ListUser;