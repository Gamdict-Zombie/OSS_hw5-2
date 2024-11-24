import React, { useEffect } from "react"; // useEffect 추가
import "./App.css";
import { Routes, Route, BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import Mainbody from "./components/mainbody";
import Showindex from "./components/showindex";
import EditModal from "./components/editmodal";
import AddModal from "./components/modal";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const location = useLocation(); // React Router의 location 훅 사용
  const navigate = useNavigate(); // navigate 훅 사용

  // 초기 페이지로 리다이렉트
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/list"); // 기본 경로를 "/list"로 이동
    }
  }, [location, navigate]);

  const state = location.state;

  return (
    <div className="App">
      <Routes location={state?.background || location}>
        <Route path="/detail" element={<AddModal />} />
        <Route path="/update/:id" element={<EditModal />} />
        <Route path="/" element={<Mainbody />}>
          <Route path="/list" element={<Showindex />} />
        </Route>
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
