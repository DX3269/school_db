import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';d
import path from 'path';

async function getDbConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false,
    }
  });
}

export async function GET() {
  try {
    const db = await getDbConnection();
    const [rows] = await db.execute('SELECT * FROM schools ORDER BY id DESC');
    await db.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database fetch error:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    if (!imageFile) {
        return NextResponse.json({ message: 'Image file is required.' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public/schoolImages');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(imageFile.name);
    const filename = `${uniqueSuffix}${fileExtension}`;
    const imagePath = path.join(uploadDir, filename);
    
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(imagePath, buffer);
    
    const imageUrl = `/schoolImages/${filename}`;

    const db = await getDbConnection();
    const query = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.execute(query, [name, address, city, state, contact, imageUrl, email_id]);
    await db.end();
    return NextResponse.json({ message: 'School added successfully' }, { status: 201 });
  } catch (error)
  {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
  }
}