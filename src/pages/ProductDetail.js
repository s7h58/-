// ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  const [activeTab, setActiveTab] = useState("page-1");
  const [mainIndex, setMainIndex] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    // ✅ 로그인한 경우 → DB에 바로 저장
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...currentCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    fetch(`http://localhost:5000/cart/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: updatedCart }),
    });
  } else {
    // ✅ 로그인 안 한 경우 → localStorage에 임시 저장
    const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...guestCart, product]));
  }

  useEffect(() => {
    setActiveTab("page-1");
    setMainIndex(0);
  }, [id]);

  if (!product) {
    return <div style={{ padding: 20 }}>❌ 상품을 찾을 수 없습니다. (id: {id})</div>;
  }

  const detailImages = product.detailImages?.length
    ? product.detailImages.slice(0, 100)
    : product.image
      ? [product.image]
      : [];

  const guideImage = product.guideImage || product.purchaseImage || null;

  return (
    <div className="data-card">
      {/* 상단 기본 상품 정보 */}
      <div className="data-i">
        <img
          className="data-img"
          src={product.image}
          alt={product.description}
          width="350"
        />
        <div className="dataitem">
          <h2 className="data-title">{product.description}</h2>
          <p className="data-price">₩{product.price.toLocaleString()}원</p>
          <p className="data-specs">
            상세설명: {product.details || "상세 설명이 없습니다."}
          </p>
          <button className="data-btn" onClick={() => addToCart(product)}>
            장바구니에 담기
          </button>

        </div>
      </div>
      {/* 탭 */}
      <div className="os">
        <p
          className={`tab ${activeTab === "page-1" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("page-1");
            setMainIndex(0);
          }}
        >
          상품상세정보
        </p>
        <p
          className={`tab ${activeTab === "page-2" ? "active" : ""}`}
          onClick={() => setActiveTab("page-2")}
        >
          상품구매안내
        </p>
        <p
          className={`tab ${activeTab === "page-3" ? "active" : ""}`}
          onClick={() => setActiveTab("page-3")}
        >
          관련상품
        </p>
        <p
          className={`tab ${activeTab === "page-4" ? "active" : ""}`}
          onClick={() => setActiveTab("page-4")}
        >
          상품후기
        </p>
        <p
          className={`tab ${activeTab === "page-5" ? "active" : ""}`}
          onClick={() => setActiveTab("page-5")}
        >
          상품문의
        </p>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="tab-content">
        {/* 상품상세정보 */}
        {activeTab === "page-1" && (
          <section className="detail-gallery">
            {detailImages.length > 0 ? (
              <>
                <div className="main-wrap">
                  <img
                    className="detail-main"
                    src={detailImages[mainIndex]}
                    alt={`${product.description} 상세 ${mainIndex + 1}`}
                    loading="lazy"
                  />
                </div>

                <div className="thumbs" role="tablist">
                  {detailImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`썸네일 ${idx + 1}`}
                      className={`thumb ${idx === mainIndex ? "active" : ""}`}
                      onClick={() => setMainIndex(idx)}
                      loading="lazy"
                    />
                  ))}
                </div>

                <div className="counter">
                  {mainIndex + 1} / {detailImages.length}
                </div>
              </>
            ) : (
              <p>상세 이미지가 없습니다.</p>
            )}
          </section>
        )}

        {/* 상품구매안내 */}
        {activeTab === "page-2" && (
          <section className="purchase-guide">
            <h3>상품구매안내</h3>
            {guideImage ? (
              <img
                src={guideImage}
                alt="구매 안내"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <p>구매 안내 이미지가 없습니다.</p>
            )}
            <div className="buy-notes">
              <p>- 배송 / 반품 / AS 안내 등을 적습니다.</p>
            </div>
          </section>
        )}

        {activeTab === "page-3" && (
          <section>
            <h3>관련상품</h3>
            <p>관련상품 리스트</p>
          </section>
        )}
        {activeTab === "page-4" && (
          <section>
            <h3>상품후기</h3>
            <p>후기 목록</p>
          </section>
        )}
        {activeTab === "page-5" && (
          <section>
            <h3>상품문의</h3>
            <p>문의 작성 폼</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
