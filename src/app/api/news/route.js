import { NextResponse } from 'next/server';
import db from '@/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : null;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1;
    const offset = (page - 1) * (limit || 30);
    
    // Получаем категории и теги
    const categories = searchParams.get('category') ? searchParams.get('category').split(',').map(cat => `%${cat.trim()}%`) : [];
    const categoriesEn = searchParams.get('categoryEn') ? searchParams.get('categoryEn').split(',').map(catEn => `%${catEn.trim()}%`) : [];
    const tags = searchParams.get('tags') ? searchParams.get('tags').split(',').map(tag => `%${tag.trim()}%`) : [];
    const tagsEn = searchParams.get('tagsEn') ? searchParams.get('tagsEn').split(',').map(tagEn => `%${tagEn.trim()}%`) : [];
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
        } else if (categories.length > 0 || categoriesEn.length > 0 || tags.length > 0 || tagsEn.length > 0) {
            const conditions = [];

            // Поиск по русскоязычным категориям
            if (categories.length > 0) {
                const categoryConditions = categories.map(() => `category LIKE ?`).join(' OR ');
                conditions.push(`(${categoryConditions})`);
                queryParams.push(...categories);
            }

            // Поиск по англоязычным категориям
            if (categoriesEn.length > 0) {
                const categoryEnConditions = categoriesEn.map(() => `categoryEn LIKE ?`).join(' OR ');
                conditions.push(`(${categoryEnConditions})`);
                queryParams.push(...categoriesEn);
            }

            // Поиск по русскоязычным тегам
            if (tags.length > 0) {
                const tagConditions = tags.map(() => `tags LIKE ?`).join(' OR ');
                conditions.push(`(${tagConditions})`);
                queryParams.push(...tags);
            }

            // Поиск по англоязычным тегам
            if (tagsEn.length > 0) {
                const tagEnConditions = tagsEn.map(() => `tagsEn LIKE ?`).join(' OR ');
                conditions.push(`(${tagEnConditions})`);
                queryParams.push(...tagsEn);
            }

            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' OR ')}`;
            }
        }

        // Лимит и смещение для пагинации
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