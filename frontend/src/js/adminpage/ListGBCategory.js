import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Hint } from 'react-autocomplete-hint';

class ListGBCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            show: false, //모달 상태
            cat1: '', // 추가할 카테고리 대분류
            cat2: '', // 추가할 카테고리 소분류
            hintData1: [], // 대분류 자동완성 데이터
            hintData2: [], // 소분류 자동완성 데이터
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    makeHintData = () => {
        
    }

    handleSubmit(event) { // 카테고리 수정 및 삭제 
        alert('카테고리 관련 수정이 요청되었습니다');
        event.preventDefault();
    }

    handleAddCat = () => { // 카테고리 추가
        
        alert('카테고리 추가가 요청되었습니다');
    }

    handleClose = () => { // 모달 닫기
        this.setState(
            {show: false}
        );
    }

    handleShow = () => { // 모달 보이기
        this.setState(
            {show: true}
        );
    }

    render() {
        this.props.categories && this.props.categories.map(
            (category) => 
                this.state.hintData1.push(category.cat1)
        )
        this.props.categories && this.props.categories.map(
            (category) => 
                this.state.hintData2.push(category.cat2)
        )

        return (
            <div className="manageCategory_body">
                <div className="cateogoryList">
                    <h4>카테고리 목록</h4>
                    <form onSubmit={this.handleSubmit}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>대분류</th>
                                <th>중분류</th>
                                <th></th>
                                <th>삭제할 항목 선택</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            this.props.categories && this.props.categories.map(
                                (category) => 
                                <tr key = {category.id}>
                                    <td>{category.cat1}</td>
                                    <td>{category.cat2}</td>
                                    <td><Button onClick={() => alert('click')}>카테고리 수정</Button></td>
                                    <td><input type="checkbox" label={category.cat2} id={category.cat2}></input></td>
                                </tr>
                            )
                        }
                        <tr>
                            <td colSpan="3">
                                <Button onClick={this.handleShow}>카테고리 추가</Button>
                            </td>
                            <td>
                                <Button onClick={() => alert('click')}>카테고리 삭제</Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    </form>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <form onSubmit={this.handleAddCat}>
                        <Modal.Header closeButton>
                        <Modal.Title>카테고리를 추가하세요</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <ul>
                                    <li>
                                        대분류 : 
                                        <Hint options={this.state.hintData1} allowTabFill>
                                            <input id="cat1" value={this.state.cat1} onChange={e => this.setState({cat1: e.target.value})} ></input>
                                        </Hint>
                                    </li>
                                    <li>
                                        소분류 : 
                                        <Hint options={this.state.hintData2} allowTabFill>
                                            <input id="cat2" value={this.state.cat2} onChange={e => this.setState({cat2: e.target.value})} ></input>
                                        </Hint>
                                    </li>
                                </ul>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>닫기</Button>
                        <Button type="submit" value="Submit">추가</Button>
                        </Modal.Footer>
                        </form>
                    </Modal>
                </div>
           </div>
        );
    }
}


export default ListGBCategory;