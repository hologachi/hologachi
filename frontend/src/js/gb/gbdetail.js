import React from 'react'
import productsData from "../ProductData";
import { useParams } from "react-router-dom"
import "../../css/detailcss/bootstrap.min.css";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import '../../css/detail.css'

const CommentExampleComment = () => (
  <Comment.Group minimal>
    <Header as='h3' dividing>
     댓글
    </Header>

    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>holo</Comment.Author>
        <Comment.Metadata>
          <span>어제 12:30AM</span>
        </Comment.Metadata>
        <Comment.Text>
          <p>무슨 디자인인가요?</p>
        </Comment.Text>
        <Comment.Actions>
          <a>답글 쓰기</a>
        </Comment.Actions>
      </Comment.Content>

      <Comment.Group>
        <Comment>
          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>ghffh</Comment.Author>
            <Comment.Metadata>
              <span>방금</span>
            </Comment.Metadata>
            <Comment.Text>2021 올림픽 축구공이에요</Comment.Text>
            <Comment.Actions>
              <a>답글 쓰기</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary id="replybtn"/>
    </Form>
  </Comment.Group>
)

function Board() {
  const { productId } = useParams()
  const thisProduct = productsData.find(prod => prod.id == productId)

  return (
    <div className="gbdetail">

      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img className="product__details__pic__item--large"
                    src={thisProduct.image} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{thisProduct.title}</h3>
                <div classNa="product__details__rating">
                </div>
                <div className="product__details__price"><strong>가격  </strong>{thisProduct.price}</div>
                <div className="product__details__price"><strong>공동구매 시작  </strong>{thisProduct.startdate}</div>
                <div className="product__details__price"><strong>공동구매 마감  </strong>{thisProduct.finishdate}</div>
                <div className="product__details__price"><strong>카테고리  </strong>{thisProduct.category}</div>
                <div className="product__details__price"><strong>목표 인원 </strong>{thisProduct.goalnum} </div>
                <div className="product__details__price"><a href={thisProduct.site}>구매 사이트 </a></div>
                  <div className="quantity">
                    <div className="pro-qty">
                      <button id="applybtn">신청하기</button>
                    </div>
                  </div>
                <a href="#" className="primary-btn"><FavoriteBorderIcon/></a>
                <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                  <CommentExampleComment/>
              </div>
            </div>
          </div>
        </div>
      </section>

      

    </div>
  )
}

function gbdetail() {
  return (
    <div className="gbdetail">
      <div className="gbdetail_body">
        <Board />
      </div>
    </div>
  )
}


export default gbdetail