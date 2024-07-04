import { NextResponse } from 'next/server';
import db from '../../../libs/db.js';

export async function GET() {
    try {
        const [data] = await db.query('SELECT * FROM news');
        return NextResponse.json(data)
    }
    catch(err) {
        console.log(err);
    }
}