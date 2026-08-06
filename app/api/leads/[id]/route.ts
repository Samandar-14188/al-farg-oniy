import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json(
      { error: "Tizimga kirish huquqingiz yo'q! (401 Unauthorized)" },
      { status: 401 }
    );
  }

  try {
    const { id } = params;
    const body = await request.json();

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: body
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: "Arizani yangilashda xatolik" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json(
      { error: "Tizimga kirish huquqingiz yo'q! (401 Unauthorized)" },
      { status: 401 }
    );
  }

  try {
    const { id } = params;
    await prisma.lead.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: "Arizani o'chirishda xatolik" },
      { status: 500 }
    );
  }
}
