import { NextResponse } from 'next/server';
import db from '@/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : null;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1;
    const offset = (page - 1) * (limit || 30);
    const categories = searchParams.get('category') ? searchParams.get('category').split(',').map(cat => `%${cat.trim()}%`) : [];
    const tags = searchParams.get('tags') ? searchParams.get('tags').split(',').map(tag => `%${tag.trim()}%`) : [];
    const id = searchParams.get('id'); // Получаем id из параметров запроса

    let connection;
    try {
        connection = await db.getConnection();
        let query = 'SELECT * FROM news';
        let queryParams = [];

        // Если есть id, ищем по нему
        if (id) {
            query += ' WHERE id = ?';
            queryParams.push(id);
        } else if (categories.length > 0 || tags.length > 0) {
            const conditions = [];

            if (categories.length > 0) {
                const categoryConditions = categories.map(() => `category LIKE ?`).join(' OR ');
                conditions.push(`(${categoryConditions})`);
                queryParams.push(...categories);
            }

            if (tags.length > 0) {
                const tagConditions = tags.map(() => `tags LIKE ?`).join(' OR ');
                conditions.push(`(${tagConditions})`);
                queryParams.push(...tags);
            }

            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' OR ')}`;
            }
        }

        if (limit !== null) {
            query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);
        } else {
            query += ' ORDER BY id DESC';
        }

        const [data] = await connection.query(query, queryParams);
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