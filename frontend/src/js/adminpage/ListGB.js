import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class ListGB extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gbs: [{id:1, postId:1, requesterId:1, 
                step:"신청", rateSuggester:10, rateRequester:5 }]
        }
    }

    render() {
        return (
            <div className="manageGB_body">
                <div className="GBList">
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
                                this.state.gbs.map(
                                    gb => 
                                    <tr key = {gb.id}>
                                        <td>{gb.id}</td>
                                        <td>{gb.postId}</td>
                                        <td>{gb.requesterId}</td>
                                        <td>{gb.step}</td>
                                        <td>{gb.rateSuggester}</td>
                                        <td>{gb.rateRequester}</td>
                                        <td><button>공동구매 삭제</button></td>
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