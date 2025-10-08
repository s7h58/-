import React from "react";
import { Link } from "react-router-dom";

function ProductList({ products = [] }) {
  return (
    <div className="Shop">
      <div className="shop-header">
        <h3>|제품안내</h3><hr />
        <div className="shop-menu">
          <div className="shop-menuli">
            <Link to="/big">대형건물용 시스템 에어컨</Link>
          </div>
          <div className="shop-menuli">
            <Link to="/Medium">중소건물용 시스템 에어컨</Link>
          </div>
          <div className="shop-menuli">
            <Link to="/Dwelling">주거용 시스템 에어컨</Link>
          </div>
          <div className="shop-menuli">
            <Link to="/Floor">바닥난방/급탕</Link>
          </div>
          <div className="shop-menuli">
            <Link to="/Solution">환기 솔루션</Link>
          </div>
          <div className="shop-menuli">
            <Link to="/Center">중앙공조</Link>
          </div>
        </div>
      </div>

      <ul className="shop-card">
        {products.length === 0 ? (
          <li>등록된 제품이 없습니다.</li>
        ) : (
          products.map((product) => (
            <li key={product.id} className="shop-item">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.description}
                  width="150"
                  height="150"
                />
                <div>{product.description}</div>
                <div>{product.price.toLocaleString()}원</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
