import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Mediums = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|중소건물용 시스템 에어컨</h3><hr />
      </div>

      <ul className="shop-card">
        {Mediums.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Mediums.map((Medium) => (
            <li key={Medium.id} className="shop-item">
              <Link to={`/Mediums/${Medium.id}`}>
                <img
                  src={Medium.image}
                  alt={Medium.description}
                  width="150"
                  height="150"
                />
                <div>{Medium.description}</div>
                <div>{Medium.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
