import sql from "@/app/api/utils/sql";

// الحصول على جميع المنتجات أو المنتجات حسب الكاتيجوري
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");

    let products;

    if (categorySlug) {
      products = await sql`
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE c.slug = ${categorySlug}
        ORDER BY p.created_at DESC
      `;
    } else {
      products = await sql`
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.created_at DESC
      `;
    }

    return Response.json({ products });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "فشل تحميل المنتجات" }, { status: 500 });
  }
}

// إضافة منتج جديد
export async function POST(request) {
  try {
    const { name, category_id, description, price, code, image_url } =
      await request.json();

    if (!name || !category_id) {
      return Response.json(
        { error: "الاسم والكاتيجوري مطلوبان" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO products (name, category_id, description, price, code, image_url)
      VALUES (${name}, ${category_id}, ${description || null}, ${price || null}, ${code || null}, ${image_url || null})
      RETURNING *
    `;

    return Response.json({ product: result[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "فشل إضافة المنتج" }, { status: 500 });
  }
}
