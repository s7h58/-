import React from "react";
import footerIcon from "../image/free-icon-phone-94915.png";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <ul className="footer-links">
          <li><a href="#">회사정보</a></li>|
          <li><a href="#">개인정보처리방침</a></li>|
          <li><a href="#">이메일무단수집거부</a></li>|
          <li><a href="#">찾아오시는길</a></li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p className="company-info">
          상호명: <strong>경기냉난시스템</strong> | 대표자: <strong>이도운</strong> | 주소: 경기도 화성시 효행로1265번길 84
        </p>
        <div className="footer-icon">
          <a href="#">
            <img src={footerIcon} alt="footer-icon" />
            <b>010-3035-2244</b>
          </a>
        </div>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} 경기냉난시스템. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
