import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

class ListGBCategory extends Component {

    render() {
        return (
            <div className="manageCategory_body">
                <div className="cateogoryList">
                    <Table striped bordered hover>
                        <thead>
                        <th>카테고리 목록</th>
                            <tr>
                                <th>대분류</th>
                                <th>중분류</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.categories && this.props.categories.map(
                                    (category) => 
                                    <tr key = {category.id}>
                                        <td>{category.cat1}</td>
                                        <td>{category.cat2}</td>
                                        <td><Button onClick={() => alert('click')}>카테고리 삭제</Button></td>
                                        <td><Button onClick={() => alert('click')}>카테고리 수정</Button></td>
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


export default ListGBCategory;