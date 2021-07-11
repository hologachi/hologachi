import React, { Component } from 'react';

class ListUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [{id:1, nickname:"홍길동", email:"test@test.com", image:"https://source.unsplash.com/random", suggestRate:20, requestRate:10, isAdmin:1 }]
        }
    }

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
                    <table>
                        <thead>
                        <th>회원 목록</th>
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
                                this.state.users.map(
                                    user => 
                                    <tr key = {user.id}>
                                        <td><img className="smallUserProfile" src={user.profile}/></td>
                                        <td>{user.id}</td>
                                        <td>{user.nickname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.suggestRate} 점</td>
                                        <td>{user.requestRate} 점</td>
                                        <td>{this.isAdminTranslate(user.isAdmin)}</td>
                                        <td><button>회원 권한 수정</button></td>
                                        <td><button>작성글 조회</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
           </div>
        );
    }
}


export default ListUser;