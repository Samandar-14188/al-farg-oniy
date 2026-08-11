import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();

    const updated = await prisma.branch.update({
      where: { id },
      data: body
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating branch:', error);
    return NextResponse.json({ error: "Filial ma'lumotlarini yangilashda xatolik" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.branch.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting branch:', error);
    return NextResponse.json({ error: "Filialni o'chirishda xatolik" }, { status: 500 });
  }
}
