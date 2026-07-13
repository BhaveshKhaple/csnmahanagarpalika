import { NextResponse } from 'next/server';
// import { getDocument } from '@/lib/firebase/firestore'; 
// import { verifyCaptcha } from '@/lib/utils/captcha';

// Simple in-memory rate limiting for this endpoint
// In production, use Redis (e.g. Upstash) or Firebase Realtime Database
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { complaintNumber, mobileNumber, captchaToken } = body;

    if (!complaintNumber || !mobileNumber) {
      return NextResponse.json(
        { error: 'Complaint number and mobile number are required.' },
        { status: 400 }
      );
    }

    // Example captcha verification if integrated:
    // if (captchaToken && !(await verifyCaptcha(captchaToken))) {
    //   return NextResponse.json({ error: 'Invalid CAPTCHA.' }, { status: 400 });
    // }

    // Mock response for now as Firestore is mocked in the frontend
    // In real implementation, we would query Firestore:
    // const complaint = await getDocument('complaints', complaintNumber);
    // if (!complaint || complaint.guestPhone !== mobileNumber) {
    //   return NextResponse.json({ error: 'Not found or unauthorized.' }, { status: 404 });
    // }
    
    return NextResponse.json({
      success: true,
      message: 'This is a mocked response. Real implementation would query Firestore using admin SDK.'
    });

  } catch (error) {
    console.error('Error tracking complaint:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
