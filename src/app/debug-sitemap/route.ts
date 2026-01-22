
import { NextResponse } from 'next/server';
import sitemap from '../sitemap';

export async function GET() {
    try {
        const data = await sitemap({ id: 0 });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate sitemap', details: error }, { status: 500 });
    }
}
