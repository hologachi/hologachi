import React, { useState, useEffect } from 'react';
// import productsData from "../ProductData";
import { useParams } from "react-router-dom"
import "../../css/detailcss/bootstrap.min.css";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../../css/detail.css'
import axios from "axios";
import DatePicker from "react-datepicker";
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

function removeBtn(e) {
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

const Modal = (props) => {
  const { open, close, header } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
          </header>
          <main>
            {props.children}
          </main>
          <footer>
            <button id="close" onClick={close}>취소</button>
            <button id="modalModifybtn" onClick={modify}> 수정하기 </button>
          </footer>
        </section>
      ) : null}
    </div>
  )
}

function modify() {
  alert("수정이 완료되었습니다.");
  window.location.reload();
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
  const [isLogined, setIsLogined] = useState(window.sessionStorage.getItem('userId'))

  useEffect(() => { // useEffect 적용!
  }, [isLogined]);

  const [testStr, setTestStr] = useState('');
  const [requestStr, setRequestStr] = useState('');

  // const t = Object.values(testStr).map(product => product.title).toString();
  // const [title, setTitle] = useState(t)
  // // // console.log(Object.values(testStr).map(product => (product.title)));
  // // console.log(Object.values(testStr).map(product => (product.title))[0]);

  // const onChangeTitle = (e) => {
  //   setTitle(e.target.value);
  // }
  const [startDate, setStartDate] = useState(new Date());

  // const [price, setPrice] = useState('');

  // const onChangePrice = (e) => {
  //   setPrice(e.target.value);
  // }
  // const [content, setContent] = useState('');

  // const onChangeContent = (e) => {
  //   setContent(e.target.value);
  // }
 
const products = Object.values(testStr).map(product => 
  product.title
)
console.log(products.join());

console.log(products.title);
 const [inputs, setInputs] = useState({
   title: products.join(),
  content:"dfsf",
  price:5000
 })
 const { title, content, price } = inputs;

 const onChange = (e) => { 
   setInputs(e.target.value); 
  }

  function callback(str) {
    setTestStr(str);
  }

  function callbackReq(str) {
    setRequestStr(str);
  }

  useEffect(
    () => {
      axios({
        url: `/post/requestpost`,
        method: 'GET',
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
      }).then((res) => {
        callbackReq(res.data);
      })
    }, []
  );

  function apply(e) {
    e.preventDefault();
    var answer;
    answer = window.confirm(`신청하시겠습니까?`);

    if (answer == true) {
      // console.log(window.sessionStorage.getItem('userId'));
      axios({
        url: `/${productId}/request`,
        method: 'post',
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
        baseURL: 'http://localhost:8080/post',
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(function () {
        alert("신청이 완료되었습니다.")
        var applyContainer = document.getElementById('applyContainer');
        const html = '<button id="applyCancel" value="applycancel">신청취소</button>';
        applyContainer.innerHTML = html;
        applyContainer.style.backgroundColor = "black";
        document.getElementById('applyCancel').onclick = applyCancel;
      }).catch(error => {
        console.log(error.response)
      });
    }
  }

  function applyCancel(e) {
    e.preventDefault();

    var answer;
    answer = window.confirm(`취소하시겠습니까?`);

    if (answer == true) {
      axios({
        url: `/${productId}/cancel`,
        method: 'post',
        baseURL: 'http://localhost:8080/post',
        headers: { "Access-Control-Allow-Origin": "*" },
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
      }).then(function () {
        alert("신청 취소되었습니다.")
        var applyContainer = document.getElementById('applyContainer');
        const html = '<button id="apply" value="apply">신청하기</button>';
        applyContainer.innerHTML = html;
        applyContainer.style.backgroundColor = "#0b58cc";
        document.getElementById('apply').onclick = apply;
      }).catch(error => {
        console.log(error.response)
      });
    }
  }

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  function contentDelete(e) {
    e.preventDefault();
    var answer;
    answer = window.confirm(`글을 삭제 하시겠습니까?`);

    if (answer == true) {
      axios.post(`/post/${productId}/delete`);
      alert('삭제가 완료되었습니다.');
      window.location.href = "/home";
    }
  }

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

  var arr = Object.values(requestStr).map(product => (product.post.postId));

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
                  <ul id="infoList">
                    <li><span id="stepSta">{product.step}</span></li><hr />
                    <li><strong className="left"></strong><span id="nicknameText">{product.user.nickname}</span>님이 진행합니다
                    </li><br />
                    <li id="priceText"><strong className="left"></strong>{product.price}원</li><br />
                    <li><strong className="left">🗓 </strong><span id="dateMoment">{moment(product.rgstAt).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('YYYY-MM-DD')}</span></li><br />
                    <li><strong className="left">목표 인원 </strong><span id="matchingNum">{product.matching}명</span></li><br />
                    <li><strong className="left">카테고리  : </strong>{product.category2.name}</li><hr />
                    <li><button className="urlBtn" onClick={() => window.open(`https://${product.url}`, '_blank')}>구매 사이트</button></li><hr />
                  </ul>
                  {window.sessionStorage.getItem('nickname') == product.user.nickname && <div><button id="contentModifybtn" onClick={openModal}>수정하기</button><button id="contentDeletebtn" onClick={contentDelete}>삭제하기</button></div>}
                  <Modal open={modalOpen} close={closeModal} header="수정하기">
                    <table className="tablecss table">
                      <tr>
                        <th>제목</th>
                        <td>
                          <input type="text" value={title} onChange={onChange} placeholder="제목" />
                        </td>
                      </tr>
                      <tr>
                        <th>마감일</th>
                        <td>
                        <DatePicker selected={startDate} minDate={moment().toDate()} onChange={(date) => setStartDate(date)} style={{width:"70%"}}/>
                        </td>
                      </tr>
                      <tr>
                        <th>가격</th>
                        <td>
                          <input type="text" value={price} onChange={onChange} placeholder="가격" />
                        </td>
                      </tr>
                      <tr>
                        <th>설명</th>
                        <td>
                          <textarea type="text" value={content} onChange={onChange} placeholder="설명" />
                        </td>
                      </tr>
                    </table>
                  </Modal>
                  <div className="quantity">
                    <div className="pro-qty">
                      <div id="applyContainer">
                        {product.step == "request" && isLogined && window.sessionStorage.getItem('nickname') !== product.user.nickname && <div>
                          <div id="applybtn">
                            {arr.includes(Object.values(testStr).map(product => product.postId)[0]) && <button id="applyCancel" value="applyCancel" onClick={applyCancel} >신청취소</button>
                            }
                            {!arr.includes(Object.values(testStr).map(product => product.postId)[0]) && <button id="apply" value="apply" onClick={apply} >신청하기</button>
                            }
                          </div>
                          <a href="#" className="heart-icon" onClick={bookmarkbtn} id="likebtn"><FavoriteBorderIcon /></a>
                          <a href="#" className="heart-icon" onClick={bookmarkremove} id="likebtn2" style={{ display: "none" }}><FavoriteIcon /></a>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12" id="commentContainer">
                <div className="product__details__tab">
                  <div>
                    <span>상품 설명</span>
                    <p>{product.content}</p>
                  </div><hr />
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