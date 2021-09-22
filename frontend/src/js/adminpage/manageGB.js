import React, { Component } from 'react';
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGB from "./ListGB"
import AdminService from '../services/AdminService'; //백엔드 연결

class manageGB extends Component {
    state = {
        gbs: [],
    }

    componentDidMount() {
        this.loadGBs();
    }

    loadGBs = () => {
        // 공동구매 전체 조회 
        AdminService.getAllGBs().then((res) => {
            this.setState(
                { gbs: res.data }
            );

            // console.log(this.state.gbs);
        })   
    }

    handleStopPtcpt = (ptcptId) => {
        // 공동구매 삭제
        AdminService.stopTheGB(ptcptId).then((res) => {
            this.loadGBs();

            // console.log(this.state.gbs);
        })   
    }

    render() {
        return (
            <div className="MGB">
                <div className="wrapper">
                <AdminNav />
                <ListGB 
                    gbs={this.state.gbs}
                    handleStopPtcpt={this.handleStopPtcpt}
                />
                </div>
            </div>
        )
    }
 }
 export default manageGB;