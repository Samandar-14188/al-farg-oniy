import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: "Kurslarni yuklashda xatolik" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, description, price, duration, level, image, featured, slug } = body;

    if (!title || !price) {
      return NextResponse.json({ error: "Sarlavha va narx kiritilishi shart!" }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const course = await prisma.course.create({
      data: {
        title,
        slug: generatedSlug,
        category: category || "Dasturlash",
        description: description || "",
        price,
        duration: duration || "6 oy",
        level: level || "Boshlang'ich",
        image: image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        featured: Boolean(featured),
        curriculum: JSON.stringify([])
      }
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: "Kurs yaratishda xatolik" }, { status: 500 });
  }
}
