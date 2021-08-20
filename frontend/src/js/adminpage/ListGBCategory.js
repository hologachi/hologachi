import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
// import { Hint } from 'react-autocomplete-hint';

class ListGBCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            show: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) { // 카테고리 수정 및 삭제 
        alert('카테고리 관련 수정이 요청되었습니다: ' + this.state.value);
        event.preventDefault();
    }

    handleAddCat(event) {

    }

    handleClose = () => {
        this.setState(
            {show: false}
        );
    }

    handleShow = () => {
        this.setState(
            {show: true}
        );
    }

    render() {
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
                        <Modal.Header closeButton>
                        <Modal.Title>카테고리 추가</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            카테고리를 추가하세요
                            <form onSubmit={this.handleAddCat}>
                                <ul>
                                    <li>
                                        대분류 : 
                                        <select>
                                            <option value="직접입력">직접입력</option>
                                            {
                                                this.props.categories && this.props.categories.map(
                                                (category) => 
                                                    <option value={category.cat1}>{category.cat1}</option>
                                                )
                                            }
                                        </select>
                                    </li>
                                    <li>
                                        소분류 : 
                                        <select>
                                            <option value="직접입력">직접입력</option>
                                            {
                                                this.props.categories && this.props.categories.map(
                                                (category) => 
                                                    <option value={category.cat2}>{category.cat2}</option>
                                                )
                                            }
                                        </select>
                                    </li>
                                </ul>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
           </div>
        );
    }
}


export default ListGBCategory;