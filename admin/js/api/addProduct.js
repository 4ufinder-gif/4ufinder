import { connectToDatabase } from './db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, category, price, image, description } = req.body;

    const conn = await connectToDatabase();
    const [result] = await conn.execute(
      'INSERT INTO products (name, category, price, image, description) VALUES (?, ?, ?, ?, ?)',
      [name, category, price, image, description]
    );

    res.status(200).json({ success: true, id: result.insertId });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
