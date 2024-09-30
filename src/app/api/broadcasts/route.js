import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : null;
    const id = searchParams.get('id') ? parseInt(searchParams.get('id'), 10) : null;

    let connection;
    try {
        connection = await db.getConnection();
        
        let query = 'SELECT * FROM broadcasts';
        const values = [];

        // Если указан параметр id, ищем запись по id
        if (id) {
            query += ' WHERE id = ?';
            values.push(id);
        }

        // Если указан параметр limit и нет параметра id, добавляем ограничение по лимиту
        if (limit && !id) {
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