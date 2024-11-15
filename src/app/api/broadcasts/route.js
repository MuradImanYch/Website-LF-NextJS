import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : null;
    const url = searchParams.get('url') ? searchParams.get('url') : null;

    let connection;
    try {
        connection = await db.getConnection();
        
        let query = 'SELECT * FROM broadcasts';
        const values = [];

        // Если указан параметр url, ищем запись по url
        if (url) {
            query += ' WHERE url = ?';
            values.push(url);
        }

        // Если указан параметр limit и нет параметра url, добавляем ограничение по лимиту
        if (limit && !url) {
            query += ' LIMIT ?';
            values.push(limit);
        }

        const [data] = await connection.query(query, values);
        return NextResponse.json(data);
    }
    catch (err) {
        console.error(err);
        return NextResponse.error(err);
    }
    finally {
        if (connection) connection.release();
    }
}