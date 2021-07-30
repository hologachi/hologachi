import React, { Component } from 'react';

class SearchUser extends Component {
    
    render() {
        return (
            <div className="userSearch">
                    <form>
                        <table>
                            <tr>
                                <td>아이디</td>
                                <td>닉네임</td>
                                <td>권한</td>
                                <td rowspan="2"><button type="submit">검색</button></td>
                            </tr>
                            <tr>
                                <td><input type="type" name="id" /></td>
                                <td><input type="type" name="nickname" /></td>
                                <td>
                                    <input type="radio" id="0" name="isAdmin" value="0"/>
                                    <label for="0">사용자</label>

                                    <input type="radio" id="1" name="isAdmin" value="1"/>
                                    <label for="1">관리자</label>

                                    <input type="radio" id="-1" name="isAdmin" value="-1"/>
                                    <label for="-1">정지된 회원</label>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>

        );
    }
}


export default SearchUser;