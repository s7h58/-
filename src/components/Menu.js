import React, { useState } from "react";
import hamburger from "../image/free-icon-hamburger-5135168.png";
import cross from "../image/free-icon-cross-mark-8369334.png";
import { Link } from "react-router-dom";
import "../App.css";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="menu-container">
      <div className="menu-btn">
        <li>
          <button onClick={toggleMenu} className="menu-toggle-btn">
            <img
              src={isOpen ? cross : hamburger}
              className={isOpen ? "cross-icon" : "hamburger-icon"}
              alt="menu-icon"
            />
            카테고리 전체보기
          </button>
        </li>
      </div>

      {isOpen && (
        <div className="menu-btn-hide">
          <li>
            <ul className="sub-menu">
              <li><a href="#">
                <Link to="/big">대형건물용 시스템 에어컨</Link>
              </a></li>
              <li className="sub-menu-big">
                <span>Outdoor
                  <ul className="sub-menu-size">
                    <li>
                      <a href="#">
                        <Link to="/Indoor">실내기</Link>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Link to="/Outdoor">실외기</Link>
                      </a>
                    </li>
                  </ul>
                </span>
              </li>
              <li><a href="#">
                <Link to="/Medium">중소건물용 시스템 에어컨</Link>
              </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/Dwelling">주거용 시스템 에어컨</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/Floor">바닥난방/급탕</Link>
                </a>
              </li>
              <li
              ><a href="#">
                  <Link to="/Solution">환기 솔루션</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/Center">중앙공조</Link>
                </a>
              </li>
            </ul>
          </li>
        </div>
      )}
    </div>
  );
}

export default Menu;
