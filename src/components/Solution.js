import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Solutions = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|환기 솔루션</h3><hr />
      </div>

      <ul className="shop-card">
        {Solutions.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Solutions.map((Solution) => (
            <li key={Solution.id} className="shop-item">
              <Link to={`/Solutions/${Solution.id}`}>
                <img
                  src={Solution.image}
                  alt={Solution.description}
                  width="150"
                  height="150"
                />
                <div>{Solution.description}</div>
                <div>{Solution.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
