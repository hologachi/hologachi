import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class SearchUser extends Component {
    
    render() {
        return (
            <div className="userSearch">
                    <form action="/admin/mUser" method="POST">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <td>닉네임</td>
                                    <td>이메일</td>
                                    <td>권한</td>
                                    <td><button type="submit">검색</button></td>
                                </tr>   
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="type" placeholder="홍길동" name="nickname" /></td>
                                    <td><input type="type" placeholder="test@test.com" name="email" /></td>
                                    <td>
                                        <input type="radio" id="0" name="is_admin" value="0" />
                                        <label htmlFor="0">사용자</label>

                                        <input type="radio" id="1" name="is_admin" value="1"/>
                                        <label htmlFor="1">관리자</label>

                                        <input type="radio" id="-1" name="is_admin" value="-1"/>
                                        <label htmlFor="-1">정지된 회원</label>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                </div>

        );
    }
}


export default SearchUser;