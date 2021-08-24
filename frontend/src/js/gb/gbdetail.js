import React, { useState, useEffect } from 'react';
// import productsData from "../ProductData";
import { useParams } from "react-router-dom"
import "../../css/detailcss/bootstrap.min.css";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../../css/detail.css'
import axios from "axios";
import moment from 'moment';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          id: 1,
          writer: "홀로가치1",
          date: "2021-01-01",
          content: "안녕"
        }, {
          id: 2,
          writer: "홀로가치2",
          date: "2021-01-02",
          content: "안녕2"
        },
      ]
    }
    this.addComment = this.addComment.bind(this);
  }
  addComment() {
    let value = document.querySelector('#new-comment-content').value;
    if (value !== '') {
      this.setState({
        comments: [...this.state.comments, {
          id: this.state.comments.length + 1,
          writer: "홀로가치",
          date: new Date().toISOString().slice(0, 10),
          content: value
        }]
      })
    } else {
      alert('입력된 댓글이 없습니다.')
    }
    document.querySelector('#new-comment-content').value = '';
  }
  render() {
    return (
      <div id="root">
        <div>
          <ul id="comments">
            {
              this.state.comments.map(comment => {
                return <Singcomment key={comment.id} comment={comment} />
              })
            }
          </ul>
          <div id="writing-area">
            <h5 id="nickname">홀로가치</h5>
            <textarea id="new-comment-content" placeholder="댓글을 입력하세요"></textarea>
            <button id="submit-new-comment" onClick={this.addComment}>댓글쓰기</button>
          </div>
        </div>
      </div>
    )
  }
}

function Singcomment({ comment }) {
  return (
    <div className="comment">
      <table>
        <tr>
          <th id="writerName">{comment.writer}</th>
          <td id="content">{comment.content}</td>
          <td id="date">{comment.date}</td>
          <td><button id="replybtn">답글달기</button></td>
        </tr>
      </table>
    </div>
  )
}

function apply(e) {
  e.preventDefault();
  var answer;
  answer = window.confirm(`신청하시겠습니까?`);

  if (answer == true) {
    var apply = document.getElementById('apply');
    const html = `<button id="applycancel" className="disabled">신청 완료</button>`;
    apply.innerHTML = html;
  }
}

function bookmarkremove() {
  document.getElementById("likebtn2").style.display = "none";
  document.getElementById("likebtn").style.display = "block";
}
function bookmarkbtn() {
  document.getElementById("likebtn").style.display = "none";
  document.getElementById("likebtn2").style.display = "block";
}

function Board() {
  const { productId } = useParams()

// 요청받은 정보를 담아줄 변수 선언
const [testStr, setTestStr] = useState('');
console.log(testStr);

// 변수 초기화
function callback(str) {
  setTestStr(str);
}

// 첫 번째 렌더링을 마친 후 실행
useEffect(
  () => {
    axios({
      url: `/post/postDetail/${productId}`,
      method: 'GET'
    }).then((res) => {
      callback(res.data);
    })
  }, []
);

  const thisProduct = Object.values(testStr).find(prod => prod.post_id == productId)

  return (
    <div className="gbdetail">
      <section className="product-details spad">
        <div className="container">
          <div className="row" id="product">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img className="product__details__pic__item--large"
                    src="#" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" id="productDetail">
              <div className="product__details__text">
                <h3>{thisProduct.title}</h3>
                <div classNa="product__details__rating">
                </div>
                <ul>
                  <li><strong className="left">가격  </strong>{thisProduct.price}</li><hr />
                  <li><strong className="left">공동구매 시작  </strong>{thisProduct.startdate}</li><hr />
                  <li><strong className="left">공동구매 마감  </strong>{thisProduct.finishdate}</li><hr />
                  <li><strong className="left">카테고리  </strong>{thisProduct.category}</li><hr />
                  <li><strong className="left">목표 인원 </strong>{thisProduct.goalnum}</li><hr />
                  <li><a href={thisProduct.site}>구매 사이트 </a></li><hr />
                </ul>
                <div className="quantity">
                  <div className="pro-qty">
                    <div id="apply">
                      <button id="applybtn" onClick={apply}>신청하기</button>
                      <a href="#" className="heart-icon" onClick={bookmarkbtn} id="likebtn"><FavoriteBorderIcon /></a>
                      <a href="#" className="heart-icon" onClick={bookmarkremove} id="likebtn2" style={{ display: "none" }}><FavoriteIcon /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12" id="commentContainer">
              <div className="product__details__tab">
                <Comment />
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