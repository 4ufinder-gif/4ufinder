import { connectToDatabase } from './db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const conn = await connectToDatabase();
      const [products] = await conn.execute('SELECT * FROM products ORDER BY id DESC');
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
