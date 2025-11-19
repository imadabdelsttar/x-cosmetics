"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) throw new Error("فشل تحميل المنتج");
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.id]);

  const whatsappNumber = "201555291882";

  const getWhatsappLink = () => {
    if (!product) return `https://wa.me/${whatsappNumber}`;

    let message = `مرحبا، أريد الاستفسار عن:\n${product.name}`;
    if (product.code) message += `\nالكود: ${product.code}`;
    if (product.price) message += `\nالسعر: ${product.price} جنيه`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

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

      {loading ? (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <p>جاري التحميل...</p>
        </div>
      ) : !product ? (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
            المنتج غير موجود
          </p>
          <a href="/" style={{ color: "#e91e63", textDecoration: "none" }}>
            العودة للرئيسية
          </a>
        </div>
      ) : (
        <>
          {/* العودة */}
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
          >
            <a
              href={
                product.category_slug
                  ? `/category/${product.category_slug}`
                  : "/"
              }
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
              <span>العودة لـ {product.category_name || "الرئيسية"}</span>
            </a>
          </div>

          {/* المنتج */}
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px 60px 20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "40px",
                  padding: "40px",
                }}
              >
                {/* صورة المنتج */}
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
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
                    <span style={{ color: "#ccc", fontSize: "80px" }}>📦</span>
                  )}
                </div>

                {/* معلومات المنتج */}
                <div>
                  <h2
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "20px",
                    }}
                  >
                    {product.name}
                  </h2>

                  {product.category_name && (
                    <div style={{ marginBottom: "20px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "#fce4ec",
                          color: "#e91e63",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "14px",
                        }}
                      >
                        {product.category_name}
                      </span>
                    </div>
                  )}

                  {product.price && (
                    <div style={{ marginBottom: "20px" }}>
                      <p
                        style={{
                          fontSize: "36px",
                          fontWeight: "bold",
                          color: "#e91e63",
                          margin: 0,
                        }}
                      >
                        {product.price} جنيه
                      </p>
                    </div>
                  )}

                  {product.code && (
                    <div style={{ marginBottom: "20px" }}>
                      <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>
                        <strong>كود المنتج:</strong> {product.code}
                      </p>
                    </div>
                  )}

                  {product.description && (
                    <div style={{ marginBottom: "30px" }}>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#333",
                          marginBottom: "10px",
                        }}
                      >
                        الوصف
                      </h3>
                      <p
                        style={{
                          fontSize: "16px",
                          color: "#666",
                          lineHeight: "1.6",
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* زر الشراء */}
                  <a
                    href={getWhatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#25D366",
                      color: "#fff",
                      padding: "18px 40px",
                      borderRadius: "30px",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "18px",
                      boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <MessageCircle size={24} />
                    <span>اشتري الآن عبر واتساب</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* زر واتساب فلوتينج */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
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
