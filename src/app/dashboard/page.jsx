"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, ArrowLeft, Lock } from "lucide-react";
import useUpload from "@/utils/useUpload";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [upload, { loading: uploading }] = useUpload();

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    code: "",
    image_url: "",
  });

  useEffect(() => {
    const auth = localStorage.getItem("dashboard_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem("dashboard_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
      loadData();
    } else {
      setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  }

  function handleLogout() {
    localStorage.removeItem("dashboard_auth");
    setIsAuthenticated(false);
  }

  async function loadData() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData.products);
      setCategories(categoriesData.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      description: product.description || "",
      price: product.price || "",
      code: product.code || "",
      image_url: product.image_url || "",
    });
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("فشل الحذف");
      await loadData();
    } catch (error) {
      console.error(error);
      alert("فشل حذف المنتج");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category_id: parseInt(formData.category_id),
          price: formData.price ? parseFloat(formData.price) : null,
        }),
      });

      if (!response.ok) throw new Error("فشل الحفظ");

      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        category_id: "",
        description: "",
        price: "",
        code: "",
        image_url: "",
      });
      await loadData();
    } catch (error) {
      console.error(error);
      alert("فشل حفظ المنتج");
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url, error } = await upload({ buffer: file });
      if (error) {
        alert("فشل رفع الصورة");
        return;
      }
      setFormData({ ...formData, image_url: url });
    } catch (error) {
      console.error(error);
      alert("فشل رفع الصورة");
    }
  }

  // صفحة تسجيل الدخول
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fef5f0",
          fontFamily: "Arial",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                backgroundColor: "#fce4ec",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            >
              <Lock size={40} color="#e91e63" />
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              لوحة التحكم
            </h1>
            <p style={{ color: "#666", fontSize: "16px" }}>X-Cosmetics</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                اسم المستخدم
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>

            {loginError && (
              <div
                style={{
                  backgroundColor: "#ffebee",
                  color: "#c62828",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#e91e63",
                color: "#fff",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              تسجيل الدخول
            </button>
          </form>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <a
              href="/"
              style={{
                color: "#e91e63",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              العودة للموقع
            </a>
          </div>
        </div>
      </div>
    );
  }

  // لوحة التحكم الرئيسية
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* الهيدر */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              margin: 0,
            }}
          >
            لوحة التحكم
          </h1>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#e91e63",
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={20} />
              <span>الموقع</span>
            </a>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#999",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              تسجيل الخروج
            </button>
            {!showForm && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingProduct(null);
                  setFormData({
                    name: "",
                    category_id: "",
                    description: "",
                    price: "",
                    code: "",
                    image_url: "",
                  });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#e91e63",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                <Plus size={20} />
                <span>إضافة منتج</span>
              </button>
            )}
          </div>
        </div>

        {/* النموذج */}
        {showForm && (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  اسم المنتج *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  القسم *
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                  }}
                >
                  <option value="">اختر القسم</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    السعر (جنيه)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      fontSize: "16px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    الكود
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      fontSize: "16px",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  صورة المنتج
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                  }}
                />
                {uploading && (
                  <p style={{ marginTop: "10px", color: "#666" }}>
                    جاري رفع الصورة...
                  </p>
                )}
                {formData.image_url && (
                  <div style={{ marginTop: "15px" }}>
                    <img
                      src={formData.image_url}
                      alt="معاينة"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#e91e63",
                    color: "#fff",
                    padding: "12px 32px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {editingProduct ? "حفظ التعديلات" : "إضافة المنتج"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    setFormData({
                      name: "",
                      category_id: "",
                      description: "",
                      price: "",
                      code: "",
                      image_url: "",
                    });
                  }}
                  style={{
                    backgroundColor: "#999",
                    color: "#fff",
                    padding: "12px 32px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* قائمة المنتجات */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            المنتجات ({products.length})
          </h2>

          {products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", padding: "40px" }}>
              لا توجد منتجات. ابدأ بإضافة منتج جديد!
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#f5f5f5",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      الصورة
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      الاسم
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      القسم
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      السعر
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      الكود
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: "12px" }}>
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#f5f5f5",
                              borderRadius: "6px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            📦
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "12px" }}>{product.name}</td>
                      <td style={{ padding: "12px" }}>
                        {product.category_name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {product.price ? `${product.price} جنيه` : "-"}
                      </td>
                      <td style={{ padding: "12px" }}>{product.code || "-"}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            onClick={() => handleEdit(product)}
                            style={{
                              backgroundColor: "#2196f3",
                              color: "#fff",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <Edit2 size={16} />
                            <span>تعديل</span>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            style={{
                              backgroundColor: "#f44336",
                              color: "#fff",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <Trash2 size={16} />
                            <span>حذف</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
