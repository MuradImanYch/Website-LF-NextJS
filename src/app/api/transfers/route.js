import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : null; // Если нет limit, используем null

    let connection;
    try {
        connection = await db.getConnection();

        // Условно добавляем LIMIT в запрос
        const query = limit ? 'SELECT * FROM transferlistall LIMIT ?' : 'SELECT * FROM transferlistall';
        const [data] = limit
            ? await connection.query(query, [limit])  // Если есть limit, передаем его в query
            : await connection.query(query);  // Если нет limit, просто выполняем запрос без параметров
        
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