import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, apartment, message } = await req.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Chybí povinné údaje." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.seznam.cz",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,   // info@jedlova-plzen.cz
        pass: process.env.SMTP_PASS,   // heslo k emailu
      },
    });

    // ── Email makléřkám ──────────────────────────────────────────────────────
    await transporter.sendMail({
      from:    `"BD Jedlová — web" <${process.env.SMTP_USER}>`,
      to:      "info@jedlova-plzen.cz",
      replyTo: email,
      subject: `Nový dotaz z webu${apartment ? ` — ${apartment}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #252220;">
          <div style="background: #252220; padding: 24px 32px;">
            <h1 style="margin:0; color: #fff; font-size: 18px; font-weight: 400; letter-spacing: 0.1em;">
              BD JEDLOVÁ — nový dotaz z webu
            </h1>
          </div>
          <div style="padding: 32px; background: #faf8f5; border: 1px solid #e8e4de;">
            <table style="width:100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #888; font-size: 12px; width: 140px; letter-spacing: 0.1em; text-transform: uppercase;">Jméno</td>
                <td style="padding: 10px 0; font-size: 15px; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #e8e4de;">
                <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Telefon</td>
                <td style="padding: 10px 0; font-size: 15px;"><a href="tel:${phone}" style="color: #9E4822;">${phone}</a></td>
              </tr>
              <tr style="border-top: 1px solid #e8e4de;">
                <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">E-mail</td>
                <td style="padding: 10px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #9E4822;">${email}</a></td>
              </tr>
              ${apartment ? `
              <tr style="border-top: 1px solid #e8e4de;">
                <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Zájem o</td>
                <td style="padding: 10px 0; font-size: 15px; color: #9E4822; font-weight: 600;">${apartment}</td>
              </tr>` : ""}
              ${message ? `
              <tr style="border-top: 1px solid #e8e4de;">
                <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Zpráva</td>
                <td style="padding: 10px 0; font-size: 15px; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</td>
              </tr>` : ""}
            </table>
          </div>
          <div style="padding: 16px 32px; font-size: 11px; color: #aaa;">
            Odesláno z webu jedlova-plzen.cz
          </div>
        </div>
      `,
    });

    // ── Potvrzovací email zákazníkovi ────────────────────────────────────────
    await transporter.sendMail({
      from:    `"BD Jedlová" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: "Přijali jsme váš dotaz — BD Jedlová",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #252220;">
          <div style="background: #252220; padding: 24px 32px;">
            <h1 style="margin:0; color: #fff; font-size: 18px; font-weight: 400; letter-spacing: 0.1em;">
              BD JEDLOVÁ
            </h1>
          </div>
          <div style="padding: 32px; background: #faf8f5; border: 1px solid #e8e4de;">
            <p style="font-size: 15px; line-height: 1.8;">Dobrý den, <strong>${name}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.8;">
              děkujeme za váš zájem o prémiové bydlení v BD Jedlová. Váš dotaz jsme obdrželi
              a ozveme se vám co nejdříve — zpravidla do 24 hodin.
            </p>
            ${apartment ? `<p style="font-size: 14px; color: #9E4822; font-weight: 600;">Váš zájem: ${apartment}</p>` : ""}
            <hr style="border: none; border-top: 1px solid #e8e4de; margin: 24px 0;">
            <p style="font-size: 13px; color: #888; line-height: 1.8;">
              V případě dotazů nás kontaktujte:<br>
              <a href="tel:+420723117023" style="color: #9E4822;">+420 723 117 023</a> — Ing. Zuzana Benedyktová<br>
              <a href="tel:+420606064961" style="color: #9E4822;">+420 606 064 961</a> — Milada Indráková<br>
              <a href="mailto:info@jedlova-plzen.cz" style="color: #9E4822;">info@jedlova-plzen.cz</a>
            </p>
          </div>
          <div style="padding: 16px 32px; font-size: 11px; color: #aaa;">
            BD Jedlová · Jedlová, 301 00 Plzeň · <a href="https://jedlova-plzen.cz" style="color: #aaa;">jedlova-plzen.cz</a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/contact]", msg);
    return NextResponse.json({ error: "Nepodařilo se odeslat zprávu.", detail: msg }, { status: 500 });
  }
}
