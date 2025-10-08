// CartShop.js
import React from "react";
import { useEffect } from "react";


const CartShop = ({ cartItems = [], address = "", setAddress = () => { } }) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    document.body.appendChild(script);
  }, []);    

  return (
    <div className="Shop-1">
      <h3>🛒 장바구니 ({cartItems.length})</h3>
      <div className="cartShop">
        {cartItems.map((item) => (
          <li key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <img
              src={item.image}
              alt={item.description}
              style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "10px" }}
            />
            <div>
              <div>{item.description}</div>
              <div>{item.price.toLocaleString()}원 × {item.quantity}</div>
            </div>
          </li>
        ))}
        {cartItems.length > 0 && (
          <div className="total">총 금액: {totalPrice.toLocaleString()} 원</div>
        )}
        <div className="parcel">
          <label>
            배송 주소:
            <input
              className="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력하세요"
            />
          </label>
        </div>
        <button
          className="payment"
          onClick={() => {
            if (!address) {
              alert("배송 주소를 입력해주세요.");
            } else {
              alert(`결제가 완료되었습니다!\n배송 주소: ${address}`);
              // 실제 결제 처리는 여기에 추가!
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default CartShop;
