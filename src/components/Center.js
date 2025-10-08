import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Centers = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|바닥난방/급탕</h3><hr />
      </div>

      <ul className="shop-card">
        {Centers.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Centers.map((Center) => (
            <li key={Center.id} className="shop-item">
              <Link to={`/Centers/${Center.id}`}>
                <img
                  src={Center.image}
                  alt={Center.description}
                  width="150"
                  height="150"
                />
                <div>{Center.description}</div>
                <div>{Center.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
