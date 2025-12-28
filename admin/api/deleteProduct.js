import { connectToDatabase } from './db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const conn = await connectToDatabase();
      await conn.execute('DELETE FROM products WHERE id=?', [id]);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
