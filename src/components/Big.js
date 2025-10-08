import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Bigs = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|대형건물용 시스템 에어컨</h3><hr />
      </div>
      <div className="shop-menu">
        <div className="shop-menuli">
          <Link to="/Indoor">실내기</Link>
        </div>
        <div className="shop-menuli">
          <Link to="/Outdoor">실외기</Link>
        </div>
      </div>
      <ul className="shop-card">
        {Bigs.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Bigs.map((Big) => (
            <li key={Big.id} className="shop-item">
              <Link to={`/Bigs/${Big.id}`}>
                <img
                  src={Big.image}
                  alt={Big.description}
                  width="150"
                  height="150"
                />
                <div>{Big.description}</div>
                <div>{Big.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
