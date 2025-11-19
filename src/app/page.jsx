"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("فشل تحميل الكاتيجوريز");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const whatsappNumber = "201555291882";
  const whatsappMessage = "مرحبا، أريد الاستفسار عن المنتجات";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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

      {/* البنر */}
      <div
        style={{
          backgroundColor: "#e91e63",
          color: "#fff",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            أحدث منتجات التجميل
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "25px" }}>
            جودة عالية | أسعار منافسة | توصيل سريع
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#fff",
              color: "#e91e63",
              padding: "15px 40px",
              borderRadius: "30px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            تسوق الآن
          </a>
        </div>
      </div>

      {/* العنوان */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          textAlign: "center",
          borderBottom: "1px solid #eee",
        }}
      >
        <p style={{ margin: 0, color: "#666" }}>
          📍 العنوان: ٢٤ ش علوي – متفرع من ش الإذاعة – جليم – الإسكندرية
        </p>
      </div>

      {/* الكاتيجوريز */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}
      >
        <h3
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "30px",
            textAlign: "center",
            color: "#333",
          }}
        >
          تسوق حسب القسم
        </h3>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>جاري التحميل...</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "30px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    textAlign: "center",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    border: "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.borderColor = "#e91e63";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#333",
                      margin: 0,
                    }}
                  >
                    {category.name}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

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
