import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Outdoors = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|대형건물용 시스템 에어컨 - 실외기</h3><hr />
      </div>

      <ul className="shop-card">
        {Outdoors.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Outdoors.map((Outdoor) => (
            <li key={Outdoor.id} className="shop-item">
              <Link to={`/Outdoors/${Outdoor.id}`}>
                <img
                  src={Outdoor.image}
                  alt={Outdoor.description}
                  width="150"
                  height="150"
                />
                <div>{Outdoor.description}</div>
                <div>{Outdoor.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
