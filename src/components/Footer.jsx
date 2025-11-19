export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "30px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#e91e63",
          }}
        >
          X-Cosmetics
        </h3>
        <p style={{ marginBottom: "10px" }}>
          📍 ٢٤ ش علوي – متفرع من ش الإذاعة – جليم – الإسكندرية
        </p>
        <p style={{ marginBottom: "20px" }}>📞 01555291882</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <span style={{ color: "#ccc" }}>عن الشركة</span>
          <span style={{ color: "#666" }}>|</span>
          <a
            href="https://wa.me/201555291882"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ccc", textDecoration: "none" }}
          >
            تواصل معنا
          </a>
          <span style={{ color: "#666" }}>|</span>
          <span style={{ color: "#ccc" }}>سياسة الخصوصية</span>
          <span style={{ color: "#666" }}>|</span>
          <span style={{ color: "#ccc" }}>سياسة الاستبدال</span>
        </div>
      </div>
    </footer>
  );
}
