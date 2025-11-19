import sql from "@/app/api/utils/sql";

// الحصول على جميع الكاتيجوريز
export async function GET(request) {
  try {
    const categories = await sql`
      SELECT * FROM categories ORDER BY name ASC
    `;
    return Response.json({ categories });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "فشل تحميل الكاتيجوريز" }, { status: 500 });
  }
}
