import React, { useState } from 'react'
import '../../css/privacy.css'
import '../../css/modal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

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
                    {/* <footer>
                        <button id="close" onClick={close}>취소</button>
                        <button id="modalModifybtn" onClick={modify}> 수정하기 </button>
                    </footer> */}
                </section>
            ) : null}
        </div>
    )
}

function modify(nickname){
    axios({
        url: `/privacy/modify`,
        method: 'post',
        params: {
          userId: window.sessionStorage.getItem('userId'),
          modifyNickname: nickname
        },
        baseURL: 'http://localhost:8080/mypage',
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(function () {
        alert("수정이 완료되었습니다.");
    window.location.reload();
      }).catch(error => {
        console.log(error.response)
      });
}

function Privacy() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const [textNick, setNick] = useState('');

    const onChangeNick = (e) => {
        setNick(e.target.value);
    }

    return (
        <div className="privacy">
            <h2>닉네임 수정</h2><br />

            <table className="tablecss table">
                <tr>
                    <th>닉네임</th>
                    <td>{window.sessionStorage.getItem('nickname')}</td>
                </tr>
            </table>
            <button id="modifybtn" onClick={openModal}>수정하기</button>
           
            <Modal open={modalOpen} close={closeModal} header="수정하기">
            <table className="tablecss table">
                <tr>
                    <th>닉네임</th>
                    <td><input type="text" value={textNick} onChange={onChangeNick} placeholder="닉네임" defaultValue={window.sessionStorage.getItem('nickname')} /></td>
                </tr>
            </table>
            <footer>
                        <button id="close" onClick={closeModal}>취소</button>
                        <button id="modalModifybtn" onClick={() => modify(textNick)}> 수정하기 </button>
                    </footer>
            </Modal>
        </div>
    )
}

export default Privacy
