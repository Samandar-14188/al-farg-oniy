import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: "Yangiliklarni yuklashda xatolik" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, image, date } = body;

    if (!title) {
      return NextResponse.json({ error: "Yangilik sarlavhasi kiritilishi shart!" }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const formattedDate = date || new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' });

    const post = await prisma.post.create({
      data: {
        title,
        slug: generatedSlug,
        excerpt: excerpt || title,
        content: content || title,
        image: image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        date: formattedDate
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: "Yangilik yaratishda xatolik" }, { status: 500 });
  }
}
