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
import CommentIcon from '@mui/icons-material/Comment';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import s from 'react-aws-s3';

const Modal = (props) => {
  const { open, header } = props;
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          {header}
          <main id="modalMain">
            {props.children}
          </main>
        </section>
      ) : null}
    </div>
  )
}

function Board() {
  const { productId } = useParams()
  const [isLogined, setIsLogined] = useState(window.sessionStorage.getItem('userId'))

  // console.log(window.sessionStorage.getItem('userId'));

  useEffect(() => { // useEffect 적용!
  }, [isLogined]);

  const [testStr, setTestStr] = useState('');
  const [requestStr, setRequestStr] = useState('');
  const [bookStr, setBookedStr] = useState('');
  const [commentStr, setCommentStr] = useState('');

  const [deadline, setDeadline] = useState("");
  const [title, setTitle] = useState()
  const [price, setPrice] = useState()
  const [url, setUrl] = useState()
  const [content, setContent] = useState()
  const [matching, setMatching] = useState();


  function bookmarkbtn() {
    axios({
      url: `/bookmark/${productId}/add`,
      method: 'post',
      params: {
        userId: window.sessionStorage.getItem('userId')
      },
      baseURL: 'http://localhost:8080/post',
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then(function () {
      window.location.reload();
    }).catch(error => {
      console.log(error.response)
    });
  }

  function bookmarkremove() {
    axios({
      url: `/bookmark/${productId}/delete`,
      method: 'post',
      params: {
        userId: window.sessionStorage.getItem('userId')
      },
      baseURL: 'http://localhost:8080/post',
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then(function () {
      window.location.reload();
    }).catch(error => {
      console.log(error.response)
    });
  }

  function handelChangeTitle(e) {
    setTitle(e.target.value)
  }
  function handelChangePrice(e) {
    setPrice(e.target.value)
  }
  function handelChangeUrl(e) {
    setUrl(e.target.value)
  }
  function handelChangeContent(e) {
    setContent(e.target.value)
  }
  function handelChangeMatching(e) {
    setMatching(e.target.value)
  }

  const modifyContent = () => {
    axios({
      url: `/${productId}/update`,
      method: 'post',
      data: {
        title: title,
        content: content,
        price: price,
        matching: matching,
        url: url,
        deadline: deadline
      },
      baseURL: 'http://localhost:8080/post',
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then(function () {
      alert("수정되었습니다.")
      window.location.reload();
    }).catch(error => {
      console.log(error.response)
    });

  };

  function callback(str) {
    setTestStr(str);
  }

  function callbackReq(str) {
    setRequestStr(str);
  }

  function callbackBooked(str) {
    setBookedStr(str);
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

  useEffect(
    () => {
      axios({
        url: `/post/bookmark`,
        method: 'GET',
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
      }).then((res) => {
        callbackBooked(res.data);
      })
    }, []
  );

  useEffect(
    () => {
      axios({
        url: `/post/${productId}/comment`,
        method: 'GET',
      }).then((res) => {
        setCommentStr(res.data);
      })
    }, []
  );

  function addComment(e) {
    e.preventDefault();
    let value = document.querySelector('#new-comment-content').value;
    if (value !== '') {
      axios({
        url: `/${productId}/cocreate`,
        method: 'post',
        data: {
          content: value
        },
        params: {
          userId: window.sessionStorage.getItem('userId')
        },
        baseURL: 'http://localhost:8080/post',
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(function () {
        window.location.reload();
      }).catch(error => {
        console.log(error.response)
      });
    } else {
      alert('입력된 댓글이 없습니다.')
    }
    document.querySelector('#new-comment-content').value = '';

  }

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

  function removeBtn(commentId) {
    // console.log(commentId);
    var answer;
    answer = window.confirm(`댓글을 삭제하시겠습니까?`);
    if (answer == true) {
      axios({
        url: `/${productId}/${commentId}/codelete`,
        method: 'post',
        baseURL: 'http://localhost:8080/post',
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(function () {
        window.location.reload();
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

  function chatLink() {
    window.location.href = "/chatList"
  }

  let imageArr = Object.values(testStr).map(product => (product.image.split(" ")));

  // console.log(requestStr);
  let arr = Object.values(requestStr).map(product => (product.post.postId));
  let userStep = Object.values(requestStr).map(product => (product.step));
  // console.log(userStep);
  let bookarr = Object.values(bookStr).map(product => (product.post.postId));
  // console.log(bookarr);
  let imgSlide = imageArr[0];
  // console.log(imageArr[0]);

  const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {imgSlide.map((slideImage, index)=> (
            <div key={index}>
            {slideImage !== null && <>
            <img className="product__details__pic__item--large" 
                      src={slideImage} alt="" id="productImg" />
                      <span>{slideImage.caption}</span></>}
            </div>
          ))} 
        </Slide>
      </div>
    )
}

  return (
    <div className="gbdetail">
      <section className="product-details spad">
        <div className="container">
          {Object.values(testStr).map(product => (
            <div className="row" id="product">
              <div className="col-lg-6 col-md-6">
              <Slideshow/>
              </div>
              <div className="col-lg-6 col-md-6" id="productDetail">
                <div className="product__details__text">
                  <strong className="left"></strong><div id="nicknameText" align="left">{product.user.nickname}</div>
                  <div id="titleText" >{product.title}</div><br />
                  <ul id="infoList">
                    <li align="left"><strong className="left"><span className="leftLabel">상태 </span></strong><span id="stepSta" align="left">{product.step}</span></li><br />
                    <li align="left"><strong className="left"><span className="leftLabel">가격 </span></strong><span id="priceText">{product.price}원</span></li><br />
                    <li align="left"><strong className="left"><span className="leftLabel">기간 </span></strong><span id="dateMoment">{moment(product.rgstAt).format('YYYY-MM-DD')} ~ {moment(product.deadline).format('YYYY-MM-DD')}</span></li><br />
                    <li align="left"><strong className="left"><span className="leftLabel">목표 </span></strong><span id="dateMoment">{product.matching}명</span></li><br />
                    <li align="left"><strong className="left"><span className="leftLabel">지역 </span></strong><p id="location">{product.location}</p></li><br />
                    <li align="left"><button className="urlBtn" onClick={() => window.open(`https://${product.url}`, '_blank')}>구매 사이트</button></li>
                  </ul>
                  {window.sessionStorage.getItem('email') == product.user.email && <div><button id="contentModifybtn" onClick={openModal}>수정하기</button><button id="contentDeletebtn" onClick={contentDelete}>삭제하기</button></div>}
                  <Modal open={modalOpen} className="modal-body">
                    <table className="tablecss table">
                      <tr id="tableTitle">
                        <th>제목</th>
                        <td>
                          <input type="text" defaultValue={product.title} onChange={handelChangeTitle} placeholder="제목" />
                        </td>
                      </tr>
                      <tr>
                        <th>마감일</th>
                        <td>
                          <DatePicker type="date" selected={deadline} minDate={moment().toDate()} onChange={(date) => setDeadline(date)} style={{ width: "70%" }} placeholderText="마감일을 선택해주세요" />
                        </td>
                      </tr>
                      <tr>
                        <th>가격</th>
                        <td>
                          <input type="number" defaultValue={product.price} onChange={handelChangePrice} placeholder="가격" />
                        </td>
                      </tr>
                      <tr>
                        <th>인원</th>
                        <td>
                          <input type="number" defaultValue={product.matching} onChange={handelChangeMatching} placeholder="인원" />
                        </td>
                      </tr>
                      <tr>
                        <th>상품 구매 주소</th>
                        <td>
                          <input type="text" defaultValue={product.url} onChange={handelChangeUrl} placeholder="URL" />
                        </td>
                      </tr>
                      <tr>
                        <th>설명</th>
                        <td>
                          <textarea type="text" defaultValue={product.content} onChange={handelChangeContent} placeholder="설명" />
                        </td>
                      </tr>
                    </table>
                    <footer id="modalFooter">
                      <button id="close" onClick={closeModal}>취소</button>
                      <button id="modalModifybtn" onClick={modifyContent}> 수정하기 </button>
                    </footer>
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
                          <div id="bookmarkContainer">
                            {!bookarr.includes(Object.values(testStr).map(product => product.postId)[0]) && <a href="#" className="heart-icon" onClick={bookmarkbtn} id="likebtn"><FavoriteBorderIcon /></a>}
                            {bookarr.includes(Object.values(testStr).map(product => product.postId)[0]) && <a href="#" className="heart-icon" onClick={bookmarkremove} id="likebtn2"><FavoriteIcon /></a>}
                          </div>
                        </div>}
                        <div id="chatDiv">
                          {userStep[0] == "agree" && product.step == "proceed" && arr.includes(Object.values(testStr).map(product => product.postId)[0]) && <button align="left" id="chat" value="chat" onClick={chatLink}>채팅</button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12" id="commentContainer">
                <div className="product__details__tab">
                  <div>
                    <span>상품 설명</span>
                    <p id="productContent">{product.content}</p>
                  </div><hr />
                </div>
              </div>
            </div>
          ))}
          <div id="commentTitle"><CommentIcon /> 댓글</div><br /><br />
          {Object.values(commentStr).map(comment => (
            <div className="comment">
              <table>
                <tr id={comment.commentId}>
                  <th id="writerName">{comment.user.nickname}</th>
                  <td id="content">{comment.content}</td>
                  <td id="date">{moment(comment.update_at).format('YYYY-MM-DD')}</td>
                  {window.sessionStorage.getItem('email') == comment.user.email && <td><button id="commentModibtn" >수정</button><button id="removebtn" onClick={() => removeBtn(comment.commentId)}>삭제</button></td>}
                </tr>
              </table>
            </div>
          ))}
          {window.sessionStorage.getItem('nickname') !== null && <div id="writing-area">
            <h5 id="nickname">{window.sessionStorage.getItem('nickname')}</h5>
            <textarea id="new-comment-content" placeholder="댓글을 입력하세요"></textarea>
            <button id="submit-new-comment" onClick={addComment}>댓글쓰기</button>
          </div>}
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