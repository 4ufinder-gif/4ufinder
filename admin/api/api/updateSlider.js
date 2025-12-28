import { connectToDatabase } from './db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { id, image, title, link } = req.body;
      const conn = await connectToDatabase();
      await conn.execute(
        'UPDATE sliders SET image=?, title=?, link=? WHERE id=?',
        [image, title, link, id]
      );
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
