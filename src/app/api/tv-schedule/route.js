import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : null;

    let connection;
    try {
        connection = await db.getConnection();
        
        // Формируем запрос в зависимости от наличия параметра limit
        const query = limit ? 'SELECT * FROM tv LIMIT ?' : 'SELECT * FROM tv';
        const values = limit ? [limit] : [];

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