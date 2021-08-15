import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class ListGBCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [{mainCatId:1, mainCatName:"가전제품", subCatId:1, subCatName:"선풍기" }]
        }
    }

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
                                this.state.categories.map(
                                    category => 
                                    <tr key = {category.subCatId}>
                                        <td>{category.mainCatName}</td>
                                        <td>{category.subCatName}</td>
                                        <td><button onClick={() => alert('click')}>카테고리 삭제</button></td>
                                        <td><button onClick={() => alert('click')}>카테고리 수정</button></td>
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