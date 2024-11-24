import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useParams } from 'react-router-dom';
import "./main.css";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';

const EditModal = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const updateServiceApi = `https://67296beb6d5fa4901b6d15ca.mockapi.io/Services/${id || ""}`;
  const location = useLocation();
  const receivedData = location.state?.data;
  const titleRef = useRef(null);
  const starsRef = useRef(null);
  const horoRef = useRef(null);
  const priceRef = useRef(null);
  const [show, setShow] = useState(false);
  const [service, setService] = useState({
    title: "",
    stars: "",
    horo: "",
    price: "",
  });

  useEffect(() => {
    if (receivedData) {
      const fetchData = async () => {
        try {
          const selected = await axios.get(updateServiceApi);
          setService(selected.data);
        } catch (err) {
          console.error("Error:", err);
        }
      };
  
      setShow(true);
      fetchData();
    }
  }, [receivedData, updateServiceApi]);
  

  const handleClose = () => {
    setShow(false);
    if(window.history.length > 1){
      Navigate(-1);
    } else {
      Navigate("/list");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await axios.put(updateServiceApi, service);
      console.log("Service updated successfully!", response.data);

      alert("서비스가 수정되었습니다.");
      handleClose();
    } catch (error) {
      console.error("Error updating service:", error.response || error.message);
    }
  };

  const validate = () => {
    const errors = {};
    if (!titleRef.current.value.trim()) errors.title = "제목을 입력해주세요.";
    if (!starsRef.current.value || starsRef.current.value < 0 || starsRef.current.value > 5)
      errors.stars = "평점은 0에서 5 사이여야 합니다.";
    if (!horoRef.current.value || horoRef.current.value < 1) errors.horo = "평가 갯수는 1개 이상이어야 합니다.";
    if (!priceRef.current.value || priceRef.current.value <= 0) errors.price = "가격은 0보다 커야 합니다.";
    if (Object.keys(errors).length > 0) {
      console.error(errors);
      alert("유효성 검사에 실패했습니다. 모든 필드를 올바르게 입력하세요.");
      if (errors.title) titleRef.current.focus();
      else if (errors.stars) starsRef.current.focus();
      else if (errors.horo) horoRef.current.focus();
      else if (errors.price) priceRef.current.focus();
    }
    return errors;
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>서비스 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="formwrap" onSubmit={handleSubmit}>
              <div className="divinputwrap nodivwith">
                <div className="inputwrap nodivwith">
                  <span id="titleSpan" className="labelwrap">
                    제목
                  </span>
                  <div className="inputinnercss">
                    <input
                      ref={titleRef}
                      id="title"
                      name="title"
                      type="text"
                      className="inputcss"
                      placeholder="서비스를 잘 드러낼 수 있는 제목을 입력해주세요"
                      value={service.title}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="divinputwrap divwith2">
                <div className="inputwrap nodivwith">
                  <span id="starSpan" className="labelwrap">
                    평점
                  </span>
                  <div className="inputinnercss background-colorgray">
                    <input
                      ref={starsRef}
                      id="stars"
                      name="stars"
                      type="number"
                      className="inputcss"
                      step="0.1"
                      placeholder="5"
                      value={service.stars}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="divinputwrap divwith2">
                <div className="inputwrap nodivwith">
                  <span id="horospan" className="labelwrap">
                    평가 갯수
                  </span>
                  <div className="inputinnercss">
                    <input
                      ref={horoRef}
                      id="horo"
                      name="horo"
                      type="number"
                      className="inputcss"
                      value={service.horo}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <span className="priceunit">개</span>
                </div>
              </div>
              <div className="divinputwrap nodivwith">
                <div className="inputwrap nodivwith">
                  <span id="priceSpan" className="labelwrap">
                    가격
                  </span>
                  <div className="inputinnercss">
                    <input
                      ref={priceRef}
                      id="price"
                      name="price"
                      type="number"
                      className="inputcss"
                      placeholder="입력해주세요"
                      value={service.price}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <span className="priceunit">$</span>
                </div>
              </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditModal;