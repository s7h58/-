import React from "react";
import { Link } from "react-router-dom";

function ProductList({ Dwellings = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|주거용 시스템 에어컨</h3><hr />
      </div>

      <ul className="shop-card">
        {Dwellings.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          Dwellings.map((Dwelling) => (
            <li key={Dwelling.id} className="shop-item">
              <Link to={`/Dwellings/${Dwelling.id}`}>
                <img
                  src={Dwelling.image}
                  alt={Dwelling.description}
                  width="150"
                  height="150"
                />
                <div>{Dwelling.description}</div>
                <div>{Dwelling.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
