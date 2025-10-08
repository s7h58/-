import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiKakaotalk } from "react-icons/si";
import "../App.css";

const FloatingButtons = () => {
  return (
    <div className="floating-container">
      <a href="tel:010-3035-2244" className="floating-btn phone">
        <FaPhoneAlt size={20} />
      </a>
      <a href="mailto:leeeo4744@gmail.com" className="floating-btn email">
        <MdEmail size={22} />
      </a>
      <a
        href="https://pf.kakao.com/_yourkakaolink"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn kakao"
      >
        <SiKakaotalk size={22} />
      </a>
    </div>
  );
};

export default FloatingButtons;
