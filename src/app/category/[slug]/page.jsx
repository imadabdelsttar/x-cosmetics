"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CategoryPage({ params }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`/api/products?category=${params.slug}`);
        if (!response.ok) throw new Error("فشل تحميل المنتجات");
        const data = await response.json();
        setProducts(data.products);
        if (data.products.length > 0) {
          setCategory({
            name: data.products[0].category_name,
            slug: data.products[0].category_slug,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [params.slug]);

  const whatsappNumber = "201555291882";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fef5f0",
        fontFamily: "Arial",
      }}
    >
      {/* الهيدر */}
      <Navbar />

      {/* العودة للرئيسية */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#e91e63",
            textDecoration: "none",
            fontSize: "16px",
          }}
        >
          <ArrowRight size={20} />
          <span>العودة للرئيسية</span>
        </a>
      </div>

      {/* عنوان القسم */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px 30px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          {category ? category.name : "المنتجات"}
        </h2>
      </div>

      {/* المنتجات */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px 60px 20px",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p>جاري التحميل...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ fontSize: "18px", color: "#666" }}>
              لا توجد منتجات في هذا القسم حالياً
            </p>
            <a
              href="/"
              style={{
                color: "#e91e63",
                textDecoration: "none",
                marginTop: "15px",
                display: "inline-block",
              }}
            >
              تصفح الأقسام الأخرى
            </a>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "25px",
            }}
          >
            {products.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* صورة المنتج */}
                  <div
                    style={{
                      width: "100%",
                      height: "250px",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#ccc", fontSize: "48px" }}>
                        📦
                      </span>
                    )}
                  </div>

                  {/* معلومات المنتج */}
                  <div style={{ padding: "20px" }}>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "10px",
                        minHeight: "48px",
                      }}
                    >
                      {product.name}
                    </h3>
                    {product.price && (
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#e91e63",
                          margin: "10px 0",
                        }}
                      >
                        {product.price} جنيه
                      </p>
                    )}
                    {product.code && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#999",
                          marginTop: "8px",
                        }}
                      >
                        كود: {product.code}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* زر واتساب فلوتينج */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#25D366",
          color: "#fff",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          zIndex: 1000,
          textDecoration: "none",
        }}
      >
        <MessageCircle size={30} />
      </a>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
