import sql from "@/app/api/utils/sql";

// الحصول على منتج واحد
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id}
    `;

    if (result.length === 0) {
      return Response.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return Response.json({ product: result[0] });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "فشل تحميل المنتج" }, { status: 500 });
  }
}

// تحديث منتج
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();

    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${paramCount}`);
      values.push(updates.name);
      paramCount++;
    }
    if (updates.category_id !== undefined) {
      fields.push(`category_id = $${paramCount}`);
      values.push(updates.category_id);
      paramCount++;
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramCount}`);
      values.push(updates.description);
      paramCount++;
    }
    if (updates.price !== undefined) {
      fields.push(`price = $${paramCount}`);
      values.push(updates.price);
      paramCount++;
    }
    if (updates.code !== undefined) {
      fields.push(`code = $${paramCount}`);
      values.push(updates.code);
      paramCount++;
    }
    if (updates.image_url !== undefined) {
      fields.push(`image_url = $${paramCount}`);
      values.push(updates.image_url);
      paramCount++;
    }

    if (fields.length === 0) {
      return Response.json(
        { error: "لا توجد بيانات للتحديث" },
        { status: 400 },
      );
    }

    const queryText = `UPDATE products SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    values.push(id);

    const result = await sql(queryText, values);

    if (result.length === 0) {
      return Response.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return Response.json({ product: result[0] });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "فشل تحديث المنتج" }, { status: 500 });
  }
}

// حذف منتج
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await sql`
      DELETE FROM products WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "فشل حذف المنتج" }, { status: 500 });
  }
}
