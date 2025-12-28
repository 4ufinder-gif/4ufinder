import { connectToDatabase } from './db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const conn = await connectToDatabase();
      const [orders] = await conn.execute(`
        SELECT o.id, u.fullname, p.name AS product_name, o.quantity, o.total_price, o.status
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN products p ON o.product_id = p.id
        ORDER BY o.id DESC
      `);
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
