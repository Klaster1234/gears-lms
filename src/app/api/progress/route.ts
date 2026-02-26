import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/progress — load user's progress from DB
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const progress = await prisma.userProgress.findUnique({
      where: { userId: session.user.id },
    });

    if (!progress) {
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data: progress.progressData });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// PUT /api/progress — save user's progress to DB
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { progressData, certificateName, certificateEarned } = body;

    await prisma.userProgress.upsert({
      where: { userId: session.user.id },
      update: {
        progressData,
        certificateName: certificateName || null,
        certificateDate: certificateEarned ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        progressData,
        certificateName: certificateName || null,
        certificateDate: certificateEarned ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
