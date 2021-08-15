import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class ListUser extends Component {

    isAdminTranslate(value) {
        switch(value) {
            case 0:
                return "사용자";
            case 1:
                return "관리자";
            case -1:
                return "정지된 회원";
            default:
                return "알 수 없음";
        }   
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
                                        <td>{this.isAdminTranslate(user.isAdmin)}</td>
                                        <td><button>회원 권한 수정</button></td>
                                        <td><button>작성글 조회</button></td>
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


export default ListUser;