export async function sendTelegramAlert(leadData: {
  name: string;
  phone: string;
  age?: number | string | null;
  courseName: string;
  branchName: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `
🔥 <b>YANGI ARIZA - AL-FARG'ONIY ACADEMY</b>

👤 <b>Ism:</b> ${leadData.name}
📞 <b>Tel:</b> <code>${leadData.phone}</code>
🎂 <b>Yosh:</b> ${leadData.age || 'Kiritilmadi'}
📚 <b>Kurs:</b> ${leadData.courseName}
🏢 <b>Filial:</b> ${leadData.branchName}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}
  `.trim();

  if (!token || !chatId) {
    console.log('[TELEGRAM ALERT MOCK LOG]:\n' + text);
    return { success: true, mocked: true };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    const json = await res.json();
    return { success: res.ok, response: json };
  } catch (error) {
    console.error('Telegram API error:', error);
    return { success: false, error };
  }
}
