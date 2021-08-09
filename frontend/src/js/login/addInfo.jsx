import '../../css/login.css';
import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

class AddInfo extends Component {

    render() {

        return (
            <div className="addInfo">
                <Header />
                
                <div className="infoForm">
                    <form>
                        <table>
                            <tr>
                                <td>별명</td>
                                <td><input type="text" name="nickname" /></td>
                            </tr>
                            <tr>
                                <td>생일</td>
                                <td><input type="date" name="birthday" /></td>
                            </tr>
                            <tr>
                                <td colspan="2"><button type="submit">회원가입</button></td>
                            </tr>
                        </table>
                    </form>
                </div>

                <Footer />
            </div>
        )
    }
}

export default AddInfo