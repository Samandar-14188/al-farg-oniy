import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Al-Farg’oniy Academy database...');

  // Clear existing data
  await prisma.lead.deleteMany();
  await prisma.course.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.post.deleteMany();

  // Create Branches
  const branches = await Promise.all([
    prisma.branch.create({
      data: {
        name: "Uchko'prik Filiali",
        address: "Uchko'prik t., Mustaqillik ko'chasi 45-uy (Markaziy bog' ro'parasida)",
        phone: "+998 90 123 45 67",
        hours: "08:00 - 20:00 (Du - Sha)",
        mapLink: "https://maps.google.com/?q=Uchkoprik",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12140!2d70.91!3d40.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMyJzI0LjAiTiA3MMKwNTQnMzYuMCJF!5e0!3m2!1suz!2s!4v1600000000000!5m2!1suz!2s",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      }
    }),
    prisma.branch.create({
      data: {
        name: "Yangiqo'rg'on Filiali",
        address: "Yangiqo'rg'on t., Al-Farg'oniy shoh ko'chasi 12-uy (Hokimiyat binosi yoni)",
        phone: "+998 91 234 56 78",
        hours: "08:00 - 20:00 (Du - Sha)",
        mapLink: "https://maps.google.com/?q=Yangiqorgan",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12140!2d71.60!3d41.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEwJzQ4LjAiTiA3McKwMzYnMDAuMCJF!5e0!3m2!1suz!2s!4v1600000000000!5m2!1suz!2s",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
      }
    }),
    prisma.branch.create({
      data: {
        name: "Buvayda Filiali",
        address: "Buvayda t., Yangiobod q., Ibn Sino ko'chasi 8-uy (Markaziy shifoxona yoni)",
        phone: "+998 93 345 67 89",
        hours: "08:00 - 20:00 (Du - Sha)",
        mapLink: "https://maps.google.com/?q=Buvayda",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12140!2d70.78!3d40.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM0JzNDLjgiTiA3MMKwNDYnNDguMCJF!5e0!3m2!1suz!2s!4v1600000000000!5m2!1suz!2s",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
      }
    })
  ]);

  // Create Courses
  await Promise.all([
    prisma.course.create({
      data: {
        slug: "full-stack-web-dasturlash",
        title: "Full-Stack Web Dasturlash",
        category: "Dasturlash",
        description: "Zamonaviy veb-saytlar va murakkab tizimlarni yaratishni o'rganing. HTML, CSS, JavaScript, React, Next.js, Node.js va PostgreSQL.",
        price: "650 000 so'm / oy",
        duration: "8 oy",
        level: "Boshlang'ich va O'rta",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        featured: true,
        curriculum: JSON.stringify([
          { module: "1-Modul", title: "HTML5, CSS3, Responsive Design & Tailwind CSS" },
          { module: "2-Modul", title: "JavaScript ES6+, DOM Manipulyatsiyasi & Async Programming" },
          { module: "3-Modul", title: "React.js, Hooks, State Management & Tailwind UI" },
          { module: "4-Modul", title: "Next.js 14 App Router, Server Components & SEO" },
          { module: "5-Modul", title: "Node.js, Express, REST API & GraphQL" },
          { module: "6-Modul", title: "Prisma ORM, PostgreSQL & Real-world Database Architecture" },
          { module: "7-Modul", title: "Full-Stack Portfolio loyihalar: E-commerce va CRM tizimlari" }
        ])
      }
    }),
    prisma.course.create({
      data: {
        slug: "python-va-suniy-intellekt",
        title: "Python va Sun'iy Intellekt (AI)",
        category: "Dasturlash",
        description: "Python tilining asoslaridan tortib Sun'iy Intelekt va Telegram botlar yaratishgacha bo'lgan chuqurlashtirilgan dastur.",
        price: "600 000 so'm / oy",
        duration: "6 oy",
        level: "Boshlang'ich",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        featured: true,
        curriculum: JSON.stringify([
          { module: "1-Modul", title: "Python sintaksisi, Ma'lumotlar tuzilmalari va OOP" },
          { module: "2-Modul", title: "Algoritmlar va Ma'lumotlar bazasi (SQLite, PostgreSQL)" },
          { module: "3-Modul", title: "Aiogram 3.x yordamida Professional Telegram Botlar" },
          { module: "4-Modul", title: "Django / FastAPI web frameworklari" },
          { module: "5-Modul", title: "AI Prompt Engineering va OpenAI API bilan ishlash" }
        ])
      }
    }),
    prisma.course.create({
      data: {
        slug: "english-ielts-intensive",
        title: "English & IELTS 7.5+ Intensive",
        category: "Chet tillari",
        description: "Xalqaro standartlar asosida ingliz tilida erkin so'zlashish va IELTS imtihonidan 7.5+ ball olish kafolati.",
        price: "450 000 so'm / oy",
        duration: "6 oy",
        level: "Barcha darajalar",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
        featured: true,
        curriculum: JSON.stringify([
          { module: "1-Modul", title: "General English & Grammar Essentials" },
          { module: "2-Modul", title: "Speaking & Pronunciation Masterclass" },
          { module: "3-Modul", title: "IELTS Listening & Reading Strategies" },
          { module: "4-Modul", title: "IELTS Writing Task 1 & Task 2 Mastery" },
          { module: "5-Modul", title: "Mock Exams va shaxsiy feedback sessiyalari" }
        ])
      }
    }),
    prisma.course.create({
      data: {
        slug: "graphic-ux-ui-design",
        title: "Graphic & UX/UI Dizayn",
        category: "Dizayn",
        description: "Adobe Photoshop, Illustrator va Figma orqali zamonaviy grafikalar hamda veb/mobil ilovalar interfeysini loyihalash.",
        price: "550 000 so'm / oy",
        duration: "5 oy",
        level: "Boshlang'ich",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
        featured: false,
        curriculum: JSON.stringify([
          { module: "1-Modul", title: "Dizayn nazariyasi, Ranglar va Tipografika" },
          { module: "2-Modul", title: "Adobe Photoshop va Illustrator bilan ishlash" },
          { module: "3-Modul", title: "UX Tadqiqotlar va Wireframe tuzish" },
          { module: "4-Modul", title: "Figma yordamida UX/UI Dizayn va Prototiplash" }
        ])
      }
    }),
    prisma.course.create({
      data: {
        slug: "kompyuter-savodxonligi-it-star",
        title: "IT-Savatxonlik & Office Pro",
        category: "IT-Savatxonlik",
        description: "Noldan kompyuter imkoniyatlarini o'rganish, Word, Excel, PowerPoint, Internet xavfsizligi va tez yozish ko'nikmalari.",
        price: "350 000 so'm / oy",
        duration: "2 oy",
        level: "Noldan",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        featured: false,
        curriculum: JSON.stringify([
          { module: "1-Modul", title: "Kompyuter tuzilishi va Windows operatsion tizimi" },
          { module: "2-Modul", title: "Microsoft Word va Professional Hujjatlar" },
          { module: "3-Modul", title: "Microsoft Excel: Formulalar va Grafiklar" },
          { module: "4-Modul", title: "PowerPoint taqdimotlar va Internet Savodxonligi" }
        ])
      }
    })
  ]);

  // Create Teachers
  await Promise.all([
    prisma.teacher.create({
      data: {
        name: "Rustambek Olimov",
        role: "Senior Web Developer",
        specialty: "Full-Stack Web (React, Next.js, Node.js)",
        experience: "6 yillik tajriba",
        rating: 4.95,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        bio: "Xalqaro loyihalarda ishlagan dasturchi. 300 dan ortiq muvaffaqiyatli shogirdlar ustozidir."
      }
    }),
    prisma.teacher.create({
      data: {
        name: "Malika Ro'ziyeva",
        role: "IELTS Master Instructor (Overall 8.5)",
        specialty: "English & IELTS Preparation",
        experience: "5 yillik tajriba",
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        bio: "Buyuk Britaniyadagi CELTA sertifikatiga ega mutaxassis. Yuzlab o'quvchilari 7.0+ ball natijaga erishgan."
      }
    }),
    prisma.teacher.create({
      data: {
        name: "Shahzodbek Xoshimov",
        role: "Senior Graphic & UX/UI Designer",
        specialty: "UI/UX & Branding Design",
        experience: "4 yillik tajriba",
        rating: 4.90,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        bio: "Top kompaniyalarda brending va raqamli dizayn bo'yicha yetakchi dizayner bo'lib faoliyat yuritgan."
      }
    }),
    prisma.teacher.create({
      data: {
        name: "Azizbek Botirov",
        role: "Python & AI Specialist",
        specialty: "Python, Django, AI Botlar",
        experience: "4 yillik tajriba",
        rating: 4.89,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        bio: "Telegram platformasi uchun yirik avtomatlashtirilgan botlar va ma'lumotlar tahlili loyihalari muallifi."
      }
    })
  ]);

  // Create Sample News Posts
  await Promise.all([
    prisma.post.create({
      data: {
        title: "Al-Farg'oniy Academy o'quvchilari xalqaro IT sertifikatlariga ega bo'lishdi!",
        slug: "xalqaro-it-sertifikatlar",
        excerpt: "Bugun akademiyamizning Web Dasturlash yo'nalishi bitiruvchilariga tantanali ravishda xalqaro sertifikatlar topshirildi.",
        content: "Al-Farg'oniy Academy ta'lim sifati va amaliy ko'nikmalarga e'tibor qaratib kelmoqda. Navbatdagi bitiruvchilarimiz amaliy portfoliosini muvaffaqiyatli topshirishdi va xalqaro IT kompaniyalarda amaliyot o'tash imkoniyatini qo'lga kiritishdi.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        date: "04 Avgust, 2026"
      }
    }),
    prisma.post.create({
      data: {
        title: "Yangiqo'rg'on filialida bepul ochiq darslar haftaligi!",
        slug: "yangigorgan-bepul-ochiq-darslar",
        excerpt: "Zamonaviy kasblarni bepul sinab ko'rish imkoniyati! Barcha xohlovchilarni ochiq darslarimizga taklif etamiz.",
        content: "Yangiqo'rg'on filialimizda ingliz tili, dasturlash va grafik dizayn fanlaridan bepul master-klasslar tashkil etilmoqda. Joylar soni cheklangan, ro'yxatdan o'tishga shoshiling!",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
        date: "01 Avgust, 2026"
      }
    })
  ]);

  // Create Initial Sample Leads
  await Promise.all([
    prisma.lead.create({
      data: {
        name: "Javohir Karimov",
        phone: "+998 90 555 12 34",
        age: 19,
        courseName: "Full-Stack Web Dasturlash",
        branchName: "Uchko'prik Filiali",
        status: "Yangi"
      }
    }),
    prisma.lead.create({
      data: {
        name: "Nigora Sulaymonova",
        phone: "+998 93 777 88 99",
        age: 17,
        courseName: "English & IELTS 7.5+ Intensive",
        branchName: "Yangiqo'rg'on Filiali",
        status: "Aloqada"
      }
    })
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
