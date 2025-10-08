import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Floors = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|바닥난방/급탕</h3><hr />
      </div>

      <ul className="shop-card">
        {Floors.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Floors.map((Floor) => (
            <li key={Floor.id} className="shop-item">
              <Link to={`/Floors/${Floor.id}`}>
                <img
                  src={Floor.image}
                  alt={Floor.description}
                  width="150"
                  height="150"
                />
                <div>{Floor.description}</div>
                <div>{Floor.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
