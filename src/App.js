import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo_off from "./image/logo_off.png";
import logo_on from "./image/logo_on.png";
import search from "./image/free-icon-search-149852.png";
import banner1 from "./image/baner01.jpg";
import banner2 from "./image/baner02.jpg";
import banner3 from "./image/baner03.jpg";
import Slider from "./components/Slider";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import CartShop from './components/CartShop';
import MapPage from "./components/MapPage";
import Medium from "./components/Medium";
import Mediums from './data/Mediums.json';
import Big from "./components/Big";
import Bigs from './data/Bigs.json';
import Dwelling from "./components/Dwelling";
import Solution from "./components/Solution";
import Solutions from './data/Solutions.json';
import Dwellings from './data/Dwellings.json';
import Floor from "./components/Floor";
import Center from "./components/Center";
import Indoor from "./components/Indoor";
import Outdoor from "./components/Outdoor";
import Centers from './data/Centers.json';
import Floors from './data/Floors.json';
import Shop from "./pages/Shop";
import ProductDetail from './pages/ProductDetail';
import products from './data/products.json';
import Indoors from './data/Indoors.json';
import Outdoors from './data/Outdoors.json';
import Login from "./pages/Login";
import Register from "./pages/Register";
import FloatingButtons from "./pages/FloatingButtons";
import Onling from "./pages/Onling";
import page1 from "./image/page1.jpg";
import "./App.css";

function Home() {
  return (
    <div className="banner-right">
      <Slider />
      <div className="banner">
        <div className="banner-item">
          <Link to="/Shop"><img src={banner1} className="banner-img" alt="banner1" /></Link>
        </div>
        <div className="banner-item"><img src={banner2} className="banner-img" alt="banner2" /></div>
        <div className="banner-item"><img src={banner3} className="banner-img" alt="banner3" /></div>
      </div>
      <div className="banner-sub">
        <h3>빠른 상담이 필요하신가요?</h3>
        <p>전문 상담원이 신속하게 도와드립니다.</p>
        <a href="tel:01030352244">📞 바로 전화하기</a>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="page1">
      <img src={page1} className="page-img" alt="page1" />
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]); // 장바구니 상태
  const addToCart = (item) => {
    setCartItems((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  return (
    <Router>
      <div className="App">
        {/* 헤더 */}
        <div className="App-header">
          <div className="header">
            <nav className="left">
              <Link to="/Login">로그인</Link> |{" "}
              <Link to="/Register">회원가입</Link>
            </nav>
            <nav className="right">
              <Link to="/cart">🛒장바구니({cartItems.length})</Link> |{" "}
              <Link to="/myshop">마이샵</Link> |{" "}
              <Link to="/com">커뮤니티</Link>|{" "}
              <Link to="/Q&A">상품Q&A</Link>
            </nav>
          </div>
        </div>
        {/* 로고 + 검색 */}
        <div className="App-inner">
          <div className="logo">
            <Link to="/Home">
              <img src={logo_off} className="App-logo" alt="logo_off" />
              <img src={logo_on} className="App-logo" alt="logo_on" />
            </Link>
          </div>
          <div className="search">
            <form id="searchForm" action="search.html" method="get">
              <input type="search" id="searchInput" name="q" placeholder="검색어를 입력하세요" />
              <button type="submit"><img src={search} className="search-img" alt="검색" /></button>
            </form>
          </div>
        </div>
        {/* 내비게이션 */}
        <nav className="mainnav" aria-label="main navigation">
          <div className="container" id="menu-menu">
            <Menu />
            <div className="q-btn-1" id="intro">
              <Link to="/page">인사말</Link>
            </div>
            <div className="q-btn-1" id="intro">
              <Link to="/Shop">제품안내</Link>
            </div>
            <div className="q-btn-1" id="intro">
              <Link to="/cases">설치사례</Link>
            </div>
            <div className="q-btn-1" id="intro">
              <Link to="/Onling">온라인문의</Link>
            </div>
            <div className="q-btn-1" id="intro">
              <Link to="/link">찾아오시는길</Link>
            </div>
          </div>
        </nav>

        {/* 메인 컨텐츠 */}
        <div className="wrap">
          <div className="container-1">
            <div className="banner-left">
              <aside className="sidebar">
                <div className="cat-box">
                  <div className="cat-title">인기상품</div>
                  <ul className="cat-list">
                    <li>
                      <a href="#">
                        <Link to="/link">대형건물용 실외기 GHP</Link>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Link to="/link">천장형 실내기_무풍 4Way</Link>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Link to="/link">천장형 실내기_1 Way</Link>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Link to="/link">싱글_360</Link>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Link to="/link">중대형 에어컨 냉난방 스탠다드 APN-SG583H</Link>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Link to="/link">중앙공조</Link>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="left-quick">
                  <div className="q-btn">
                    <div>INTRO</div>
                    <Link to="/page" className="small">인사말</Link>
                  </div>
                  <div className="q-btn">
                    <div>PRODUCT</div>
                    <Link to="/Shop" className="small">제품안내</Link>
                  </div>
                  <div className="q-btn">
                    <div>Q & A</div>
                    <Link to="/Onling" className="small">온라인문의</Link>
                  </div>
                  <div className="q-btn">
                    <div>MAP</div>
                    <Link to="/link" className="small">오시는길</Link>
                  </div>
                </div>
                <div>
                  <FloatingButtons />
                </div>
              </aside>
            </div>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/Shop" element={<Shop products={products} />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/page" element={<Page />} />
              <Route path="/Onling" element={<Onling />} />
              <Route path="/Big" element={<Big Bigs={Bigs} />} />
              <Route path="/Floor" element={<Floor Floors={Floors} />} />
              <Route path="/Center" element={<Center Centers={Centers} />} />
              <Route path="/Solution" element={<Solution Solutions={Solutions} />} />
              <Route path="/Dwelling" element={<Dwelling Dwellings={Dwellings} />} />
              <Route path="/Indoor" element={<Indoor Indoors={Indoors} />} />
              <Route path="/Outdoor" element={<Outdoor Outdoors={Outdoors} />} />
              <Route path="/Medium" element={<Medium Mediums={Mediums} />} />
              <Route path="/link" element={<MapPage />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/cart" element={<CartShop cartItems={cartItems} address={address} setAddress={setAddress} />} />
              <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            </Routes>
          </div>

        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
