import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 5;

    let connection;
    try {
        connection = await db.getConnection();
        const [data] = await connection.query('SELECT * FROM news WHERE category = "video" LIMIT ?', [limit]);
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
