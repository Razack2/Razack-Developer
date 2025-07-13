export const dynamic = "force-dynamic"; 
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import validator from 'validator';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const subject = formData.get('subject')?.toString().trim();
    const message = formData.get('message')?.toString().trim();


    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (subject.length < 5 || message.length < 10) {
      return NextResponse.json(
        { error: 'Subject must be at least 5 characters and message at least 10.' },
        { status: 400 }
      );
    }

    const [existingRows] = await pool.execute(
      'SELECT * FROM contact_messages WHERE email = ?',
      [email]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        { success: false, error: 'This email has already submitted a message.' },
        { status: 409 }
      );
    }

    await pool.execute(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
