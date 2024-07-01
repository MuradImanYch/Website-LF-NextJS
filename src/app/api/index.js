import db from '../../utils/db';

export default function handler(req, res) {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json(results);
      console.log('w')
    });
  }