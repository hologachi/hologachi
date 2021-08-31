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
          date: "2021-08-27",
          content: "참여하고 싶은데 각자 12개씩 나누는건가요?"
        }, {
          id: 2,
          writer: "홀로가치2",
          date: "2021-08-27",
          content: "배송 지역이 어디인가요?"
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

function removeBtn(e){
  e.preventDefault();
  var answer;
  answer = window.confirm(`댓글을 삭제하시겠습니까?`);
  if (answer == true) {
    
  }
}

function Singcomment({ comment }) {
  return (
    <div className="comment">
      <table>
        <tr id={comment.id}>
          <th id="writerName">{comment.writer}</th>
          <td id="content">{comment.content}</td>
          <td id="date">{comment.date}</td>
          <td><button id="removebtn" onClick={removeBtn}>삭제</button></td>
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
    var apply = document.getElementById('applybtn');
    const html = '신청취소';
    apply.innerHTML = html;
    apply.disabled = true;
    apply.style.backgroundColor = "black";
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

function contentDelete(e){
  e.preventDefault();
  var answer;
  answer = window.confirm(`글을 삭제 하시겠습니까?`);

  if (answer == true) {
    axios.post(`/post/${productId}/delete`);
    alert('삭제가 완료되었습니다.');
    window.location.href="/home";
  }
}

// 첫 번째 렌더링을 마친 후 실행
useEffect(
  () => {
    axios({
      url: `/post/${productId}`,
      method: 'GET'
    }).then((res) => {
      callback(res.data);
    })
  }, []
);
  return (
    <div className="gbdetail">
      <section className="product-details spad">
        <div className="container">
        {Object.values(testStr).map(product => (
          <div className="row" id="product">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img className="product__details__pic__item--large"
                    src={product.image} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" id="productDetail">
              <div className="product__details__text">
                <strong><span id="titleText">{product.title}</span></strong><br /><br />
                <div className="product__details__rating">
                </div>
                <ul id="infoList">
                <li><strong className="left">공동구매 상태 {'>>'} </strong><span id="stepSta">{product.step}</span></li><hr />
                  <li><strong className="left"></strong><span id="nicknameText">{product.user.nickname}</span>님이 진행합니다😀
                  {/* <button id="contentDeletebtn" onClick={contentDelete}>글 삭제</button> */}
                  </li><br />
                  <li id="priceText"><strong className="left"></strong>{product.price}원</li><br />
                  <li><strong className="left">공동구매 기간 🗓 </strong><span id="dateMoment">{moment(product.rgstAt).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('YYYY-MM-DD')}</span></li><br />
                  <li><strong className="left">목표 인원은 </strong><span id="matchingNum">{product.matching}명</span></li><br />
                  <li><strong className="left">카테고리  : </strong>{product.category2.name}</li><hr />
                  <li><button className="urlBtn" onClick={() => window.open(`https://${product.url}`, '_blank')}>구매 사이트</button></li><hr />
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
          ))}
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