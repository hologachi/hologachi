import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class ListGB extends Component {

    translationStep(value) {
        switch(value) {
            case "agree":
                return "수락";
            case "cancel":
                return "취소";
            case "reject":
                return "거절";
            case "finish":
                return "완료";
            case "stop":
                return "중지";
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
                            <th>공동구매 글 제목</th>
                            <th>제안자</th>
                            <th>요청자</th>
                            <th>요청자가 매긴 제시자 평점</th>
                            <th>제시자가 매긴 요청자 평점</th>
                            <th>진행 단계</th>
                        </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.gbs && Object.values(this.props.gbs).map(
                                    (gb, i) => 
                                    <tr key = {i}>
                                        <td>{gb.ptcptId}</td>
                                        <td>{gb.post.title}</td>
                                        <td>{gb.post.user.nickname}</td>
                                        <td>{gb.user.nickname}</td>
                                        <td>{gb.rateSgster || '미등록'}</td>
                                        <td>{gb.rateRqster || '미등록'}</td>
                                        <td>{this.translationStep(gb.step)}</td>
                                        <td><Button onClick={() => this.props.handleStopPtcpt(gb.ptcptId)}>공동구매 중지</Button></td>
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