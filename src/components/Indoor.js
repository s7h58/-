import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Indoors = [] }) {
  return (
    <div className="Indoor">
      <div className="shop-header">
        <h3>|대형건물용 시스템 에어컨 - 실내기</h3><hr />
      </div>

      <ul className="shop-card">
        {Indoors.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Indoors.map((Indoor) => (
            <li key={Indoor.id} className="shop-item">
              <Link to={`/Indoors/${Indoor.id}`}>
                <img
                  src={Indoor.image}
                  alt={Indoor.description}
                  width="150"
                  height="150"
                />
                <div>{Indoor.description}</div>
                <div>{Indoor.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
