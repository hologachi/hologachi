import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

class ListGB extends Component {

    translationStep(value) {
        switch(value) {
            case "agree":
                return "수락";
                break;
            case "cancel":
                return "취소";
                break;
            case "reject":
                return "거절";
                break;
            case "finish":
                return "완료";
                break;
            default:
                return "알 수 없음";
        }   
    }

    render() {
        return (
            <div className="manageGB_body">
                <div className="GBList">
                    <h4>공동구매 목록</h4>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>공동구매 ID</th>
                            <th>공동구매 글</th>
                            <th>제안자 아이디</th>
                            <th>진행 단계</th>
                            <th>요청자가 매긴 제시자 평점</th>
                            <th>제시자가 매긴 요청자 평점</th>
                        </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.gbs && Object.values(this.props.gbs).map(
                                    (gb, i) => 
                                    <tr key = {i}>
                                        <td>{gb.ptcptId}</td>
                                        <td>{gb.post.title}</td>
                                        <td>{gb.user.nickname}</td>
                                        <td>{this.translationStep(gb.step)}</td>
                                        <td>{gb.rateSuggester}</td>
                                        <td>{gb.rateRequester}</td>
                                        <td><Button>공동구매 삭제</Button></td>
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


export default ListGB;