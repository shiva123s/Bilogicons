import nodemailer from 'nodemailer';

// Create transporter - uses env variables for SMTP config
function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

interface SendInviteEmailOptions {
    toEmail: string;
    supervisorName: string;
    supervisorEmail: string;
    labName: string;
    labId: string;
    inviteToken: string;
    appUrl: string;
}

export async function sendLabInviteEmail(opts: SendInviteEmailOptions): Promise<{ success: boolean; error?: string }> {
    // If no SMTP creds configured, log to console (dev mode) and return success
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('\n📧 [DEV MODE - Email not sent, would send:]');
        console.log(`  To: ${opts.toEmail}`);
        console.log(`  From: ${opts.supervisorName} <${opts.supervisorEmail}>`);
        console.log(`  Lab: ${opts.labName} (${opts.labId})`);
        console.log(`  Accept link: ${opts.appUrl}/lab/accept?token=${opts.inviteToken}&lab=${opts.labId}`);
        console.log('');
        return { success: true };
    }

    const acceptUrl = `${opts.appUrl}/lab/accept?token=${opts.inviteToken}&lab=${opts.labId}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f0f4f8; margin: 0; padding: 20px; }
    .card { background: white; border-radius: 16px; max-width: 560px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
    .header { background: linear-gradient(135deg, #0ea5e9, #8b5cf6); padding: 32px 32px 24px; text-align: center; }
    .logo { font-size: 28px; font-weight: 800; color: white; margin-bottom: 4px; }
    .header-sub { color: rgba(255,255,255,0.85); font-size: 14px; }
    .body { padding: 32px; }
    .lab-badge { display: inline-block; background: #e0f2fe; color: #0369a1; border-radius: 50px; padding: 6px 16px; font-size: 13px; font-weight: 700; margin-bottom: 20px; }
    h2 { font-size: 22px; font-weight: 700; color: #1e293b; margin: 0 0 12px; }
    p { color: #64748b; line-height: 1.6; margin: 0 0 16px; font-size: 15px; }
    .supervisor { background: #f8fafc; border-left: 3px solid #0ea5e9; padding: 12px 16px; border-radius: 8px; margin: 20px 0; font-size: 14px; color: #475569; }
    .accept-btn { display: block; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; text-decoration: none; text-align: center; padding: 16px 32px; border-radius: 12px; font-size: 17px; font-weight: 700; margin: 28px 0; box-shadow: 0 4px 14px rgba(14,165,233,0.4); }
    .features { background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .feature { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 14px; color: #475569; }
    .feature-icon { font-size: 18px; flex-shrink: 0; }
    .footer { border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; }
    .url-fallback { font-size: 11px; color: #94a3b8; word-break: break-all; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">🔬 Bilogicons</div>
      <div class="header-sub">Lab Collaboration Platform for Scientists</div>
    </div>
    <div class="body">
      <div class="lab-badge">🏫 ${opts.labName}</div>
      <h2>You've been invited to join a lab!</h2>
      <p>You've received an invitation to join <strong>${opts.labName}</strong> on Bilogicons, where you'll be able to access and share private SVG icons and workflow templates with your team.</p>
      
      <div class="supervisor">
        👤 Invited by <strong>${opts.supervisorName}</strong> (${opts.supervisorEmail})
      </div>

      <div class="features">
        <div class="feature"><span class="feature-icon">🖼️</span><span>Access all private icons uploaded by your lab members</span></div>
        <div class="feature"><span class="feature-icon">🗂️</span><span>View and share bioinformatics workflow templates</span></div>
        <div class="feature"><span class="feature-icon">⬇️</span><span>Download SVG icons for your figures and presentations</span></div>
        <div class="feature"><span class="feature-icon">📤</span><span>Upload your own icons to the lab's private library</span></div>
      </div>

      <a href="${acceptUrl}" class="accept-btn">✓ Accept Invitation &amp; Join Lab</a>

      <p style="font-size: 13px; color: #94a3b8; text-align: center;">
        This invitation will expire in 7 days. If you don't have a Bilogicons account yet, 
        <a href="${opts.appUrl}/auth/register" style="color: #0ea5e9;">register first</a> with this email address, then click the link above.
      </p>

      <div class="url-fallback">
        Or copy this link into your browser:<br>${acceptUrl}
      </div>
    </div>
    <div class="footer">
      © 2024 Bilogicons · Free Biological SVG Icons for Scientists<br>
      If you didn't expect this invitation, you can safely ignore this email.
    </div>
  </div>
</body>
</html>`;

    const text = `
You've been invited to join ${opts.labName} on Bilogicons!

Invited by: ${opts.supervisorName} (${opts.supervisorEmail})

Click the link below to accept:
${acceptUrl}

If you don't have a Bilogicons account, register at ${opts.appUrl}/auth/register using this email address first.

© 2024 Bilogicons
`;

    try {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: `"${opts.supervisorName} via Bilogicons" <${process.env.SMTP_USER}>`,
            replyTo: opts.supervisorEmail,
            to: opts.toEmail,
            subject: `${opts.supervisorName} invited you to join ${opts.labName} on Bilogicons`,
            text,
            html,
        });
        return { success: true };
    } catch (err: any) {
        console.error('Email send error:', err.message);
        return { success: false, error: err.message };
    }
}
