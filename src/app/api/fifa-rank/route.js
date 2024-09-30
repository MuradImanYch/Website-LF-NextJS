import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : null;
    const country = searchParams.get('country'); // Получаем параметр country из URL

    let connection;
    try {
        connection = await db.getConnection();
        
        let query = 'SELECT * FROM fifaranking';
        let values = [];

        // Добавляем условие WHERE, если передан параметр country
        if (country) {
            query += ' WHERE name = ?';
            values.push(country);
        }

        // Добавляем ограничение по лимиту, если передан параметр limit
        if (limit) {
            query += ' LIMIT ?';
            values.push(limit);
        }

        const [data] = await connection.query(query, values);
        return NextResponse.json(data);
    }
    catch(err) {
        console.error(err);
        return NextResponse.error(err);
    }
    finally {
        if (connection) connection.release();
    }
}