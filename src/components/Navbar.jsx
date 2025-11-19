"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Facebook, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) return;
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      }
    }
    loadCategories();
  }, []);

  const whatsappNumber = "201555291882";
  const whatsappMessage = "مرحبا، أريد الاستفسار عن المنتجات";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* الصف الأول: اللوجو + معلومات التواصل */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#e91e63",
                margin: 0,
              }}
            >
              X-Cosmetics
            </h1>
          </a>
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#25D366",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={20} />
              <span>واتساب</span>
            </a>
            <a
              href="tel:01555291882"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#333",
                textDecoration: "none",
              }}
            >
              <Phone size={20} />
              <span>01555291882</span>
            </a>
            <a
              href="https://www.facebook.com/xcosmeticseg/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#1877f2",
                textDecoration: "none",
              }}
            >
              <Facebook size={20} />
              <span>فيسبوك</span>
            </a>
          </div>
        </div>

        {/* الصف الثاني: القائمة */}
        <nav
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "15px",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#333",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            الرئيسية
          </a>

          {/* قائمة المنتجات */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setShowProductsMenu(true)}
            onMouseLeave={() => setShowProductsMenu(false)}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: "#333",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              المنتجات
              <ChevronDown size={16} />
            </button>

            {showProductsMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  borderRadius: "8px",
                  minWidth: "250px",
                  marginTop: "10px",
                  padding: "10px 0",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    style={{
                      display: "block",
                      padding: "12px 20px",
                      color: "#333",
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#fef5f0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#333",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            اتصل بنا
          </a>
        </nav>
      </div>
    </header>
  );
}
