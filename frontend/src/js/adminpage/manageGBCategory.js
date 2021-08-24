import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Hint } from 'react-autocomplete-hint';
import Header from "../main/header";
import Footer from "../main/footer";
import AdminNav from "./adminNav"
import '../../css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminService from '../services/AdminService'; //백엔드 연결


class manageGBCategory extends Component {
    state = {
        categories: [], // 카테고리 데이터
        showModalA: false, //Add 모달 상태
        hintData1: [], // 대분류 자동완성 데이터
        hintData2: [], // 소분류 자동완성 데이터
        addCat1: '', // 추가할 카테고리 대분류
        addCat2: '', // 추가할 카테고리 소분류
        // delete 관련
        // ids: [], // 삭제할 카테고리2 id 배열
        // update 관련 
        showModalU: false, //Update 모달 상태
        updateId2: '', // 수정할 id2
        updateCat1: '', // 수정할 카테고리 대분류
        updateCat2: '', // 수정할 카테고리 소분류
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = () => {
        // 공동구매 전체 조회 
        AdminService.getAllCategories().then((res) => {
            this.setState(
                { categories: res.data }
            );
            // console.log(this.state.categories);
        }) 
        
    }

    handleAddCat = (e) => { // 카테고리 추가

        let addCat1 = this.state.addCat1;
        let addCat2 = this.state.addCat2;

        // console.log(addCat1);
        // console.log(addCat2);

        if(addCat1 !== '' && addCat2 !== '') {
            let category = {cat1: addCat1, cat2: addCat2};
            // console.log(category);
            
            AdminService.createCategory(category).then((_res) => {
                alert('카테고리 추가가 요청되었습니다');
                this.loadCategories();
            });
        } else {
            alert('카테고리 추가 요청이 실패하였습니다');
        }
        
        this.clear();
        this.handleClose(e, 'showModalA');
    }
    
    handleDelete(event, id2) { // 카테고리 삭제 
        // if(Array.isArray(ids) && ids.length !== 0) {

        //     console.log(ids);
        //     ids.map(function(item) {
        //         return parseInt(item, 10);
        //     })

        //     AdminService.deleteCategories(ids).then((_res) => {
                
        //     });
        //     alert('카테고리 관련 수정이 요청되었습니다');
        // } else {
        //     alert('삭제할 카테고리를 선택하십시오');
        // }

        // console.log(id2);
        if(id2 !== null && id2 !== '') {
            AdminService.deleteCategory(id2).then((_res) => {
                this.loadCategories();
            });
            alert('카테고리 관련 삭제가 요청되었습니다.');
            
        } else {
            alert('카테고리 관련 삭제 요청이 실패하였습니다.');
        }
        
    }

    handleUpdate = (e) => { // 카테고리 수정
        let id2 = this.state.updateId2;
        let category = {cat1: this.state.updateCat1, cat2: this.state.updateCat2};

        // console.log(id2);
        // console.log(category);

        if(id2 !== null && id2 !== '') {
            AdminService.updateCategory(id2, category).then((_res) => {
                this.loadCategories();
            });
            alert('카테고리 관련 수정이 요청되었습니다.');
            
        } else {
            alert('카테고리 관련 수정 요청이 실패하였습니다.');
        } 

        this.clear();
        this.handleClose(e, 'showModalU');
    }


    handleClose(event, modal) { // 모달 닫기
        this.setState(
            {[modal]: false}
        );
    }

    handleShow(event, modal) { // 모달 보이기
        this.setState(
            {[modal]: true}
        );
    }
    
    // handleCheck = (e) => { // 삭제할 항목 선택 및 취소 
    //     let choose = e.target.value; 
    //     console.log(choose)
    //     let result = this.state.ids.findIndex((element, index, array) => element == choose);
    //     console.log(result)
    //     if(result == -1) {
    //         this.state.ids.push(choose)
    //     } else {
    //         this.state.ids.splice(result, 1)
    //     }
    //     clearIds()
    //     console.log(this.state.ids)
    // }
    
    clear = () => {
        this.setState({
            addCat1: '',
            addCat2: '',
            updateCat1: '',
            updateCat2: '',
        });
    }


    render() {
        // 대분류 힌트 데이터 생성
        this.state.categories && this.state.categories.map(
            (category) => 
                this.state.hintData1.push(category.category1.cat1)
        )
        // 소분류 힌트 데이터 생성
        this.state.categories && this.state.categories.map(
            (category) => 
                this.state.hintData2.push(category.cat2)
        )

        return (
            <div className="MGBCategory">
                <Header />
                <AdminNav />

                <div className="categoryList">
                    <h4>카테고리 목록</h4>
                    {/* <form onSubmit={() => {this.state.handleDelete()}}> */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>대분류</th>
                                <th>중분류</th>
                                <th></th>
                                <th></th>
                                {/* <th>삭제할 항목 선택</th> */}
                            </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.categories && this.state.categories.map(
                                (category) => 
                                <tr key = {category.id2}>
                                    <td>{category.category1.cat1}</td>
                                    <td>{category.cat2}</td>
                                    <td><Button onClick={(event) => {this.handleShow(event, 'showModalU'); this.setState({updateId2: category.id2, updateCat1: category.category1.cat1, updateCat2: category.cat2})}}>수정</Button></td>
                                    <td><Button onClick={(event) => this.handleDelete(event, category.id2)}>삭제</Button></td>    
                                    {/* <td><input type="checkbox" onChange={this.handleCheck} value={category.id2}></input></td> */}
                                </tr>
                            )
                        }
                        <tr>
                            <td colSpan="3">
                                <Button onClick={(event) => this.handleShow(event, 'showModalA')}>카테고리 추가</Button>
                            </td>
                            <td>
                                {/* <Button onClick={() => this.state.handleDelete(this.state.ids)}>선택 항목 삭제</Button> */}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    {/* </form> */}

                    {/* 추가용 모달 */}
                    <Modal show={this.state.showModalA} onHide={(event) => this.handleClose(event, 'showModalA')}>
                        <Modal.Header closeButton>
                            <Modal.Title>카테고리를 추가하세요</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul>
                                <li>
                                    대분류 : 
                                    <Hint options={this.state.hintData1} allowTabFill>
                                        <input id="addCat1"  value={this.state.addCat1} onChange={(e) => this.setState({addCat1: e.target.value})} ></input>
                                    </Hint>
                                </li>
                                <li>
                                    소분류 : 
                                    <Hint options={this.state.hintData2} allowTabFill>
                                        <input name="addCat2" value={this.state.addCat2} onChange={(e) => this.setState({addCat2: e.target.value})} ></input>
                                    </Hint>
                                </li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={(event) => this.handleClose(event, 'showModalA')}>닫기</Button>
                            <Button onClick={this.handleAddCat}>추가</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* 수정용 모달 */}
                    <Modal show={this.state.showModalU} onHide={(event) => this.handleClose(event, 'showModalU')}>
                        <Modal.Header closeButton>
                            <Modal.Title>카테고리를 수정하세요</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul>
                                <li>
                                    대분류 : 
                                    <Hint options={this.state.hintData1} allowTabFill>
                                        <input name="updateCat1" value={this.state.updateCat1} onChange={(e) => this.setState({updateCat1: e.target.value})} ></input>
                                    </Hint>
                                </li>
                                <li>
                                    소분류 : 
                                    <Hint options={this.state.hintData2} allowTabFill>
                                        <input name="updateCat2" value={this.state.updateCat2} onChange={(e) => this.setState({updateCat2: e.target.value})} ></input>
                                    </Hint>
                                </li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={(event) => this.handleClose(event, 'showModalU')}>닫기</Button>
                            <Button onClick={this.handleUpdate}>수정</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                
                <Footer />
            </div>
        )
    }
 }
 export default manageGBCategory