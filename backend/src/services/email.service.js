import nodemailer from 'nodemailer';

const MAIL_FROM = process.env.MAIL_FROM || 'KingKen Global <no-reply@kingken-global.local>';
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:5173';

let transporterPromise;

function hasSmtpConfig() {
    return Boolean(process.env.SMTP_HOST);
}

async function getTransporter() {
    if (!transporterPromise) {
        transporterPromise = Promise.resolve(
            hasSmtpConfig()
                ? nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: Number(process.env.SMTP_PORT || 587),
                    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
                    auth: process.env.SMTP_USER
                        ? {
                            user: process.env.SMTP_USER,
                            pass: process.env.SMTP_PASS,
                        }
                        : undefined,
                })
                : nodemailer.createTransport({
                    jsonTransport: true,
                }),
        );
    }

    return transporterPromise;
}

async function sendEmail({ to, subject, text, html }) {
    if (!to) {
        return { skipped: true, reason: 'No recipient email available on authenticated user/document.' };
    }

    try {
        const transporter = await getTransporter();
        const info = await transporter.sendMail({
            from: MAIL_FROM,
            to,
            subject,
            text,
            html,
        });

        if (!hasSmtpConfig()) {
            console.info('[mail:dev-json]', info.message);
        }

        return { skipped: false, info };
    } catch (error) {
        console.error('[mail:error]', error);
        return { skipped: true, reason: 'Mail send failed but request flow continued safely.' };
    }
}

/* ── Shared branded email wrapper ── */
function brandedHtml({ title, badge, badgeColor, body }) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:10px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12)">

        <!-- Header -->
        <tr>
          <td style="background:#12213a;padding:28px 32px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.12em;text-transform:uppercase">KINGKEN GLOBAL</div>
                  <div style="font-size:10px;font-weight:600;color:#c9a84c;letter-spacing:0.22em;text-transform:uppercase;margin-top:2px">TRAVEL AGENCY LTD.</div>
                </td>
                <td align="right">
                  <div style="font-size:10px;color:#c9a84c99;letter-spacing:0.08em">www.kingkenglobal.com.ng</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Gold divider -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#c9a84c,#e0c070,#c9a84c)"></td></tr>

        <!-- Title bar -->
        <tr>
          <td style="background:#1a2e5a;padding:18px 32px">
            <span style="font-size:17px;font-weight:700;color:#ffffff;letter-spacing:0.04em">${title}</span>
            ${badge ? `<span style="display:inline-block;margin-left:12px;padding:3px 12px;background:${badgeColor || '#c9a84c'};color:#12213a;border-radius:20px;font-size:11px;font-weight:700;vertical-align:middle;letter-spacing:0.06em">${badge}</span>` : ''}
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:28px 32px;font-size:14px;color:#1e2a40;line-height:1.7">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#12213a;padding:16px 32px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:11px;color:#c9a84c99;line-height:1.6">
                  <div>RC 8382972 · Plot 104, Apartment 4, Emmanuel Adiele Street Off Mike Akhigbe, Jabi-Abuja.</div>
                  <div>+2347043953085 · <a href="mailto:info@kingkenglobal.com.ng" style="color:#c9a84c;text-decoration:none">info@kingkenglobal.com.ng</a></div>
                </td>
                <td align="right" style="font-size:10px;color:#c9a84c55;letter-spacing:0.06em">DO NOT REPLY</td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendUploadReceivedEmail({ to, documents }) {
    const items = Array.isArray(documents) ? documents : [];
    const typeList = items.map((doc) => doc.type).join(', ') || 'documents';
    const subject = '[KingKen Global] Documents received — under review';
    const text = [
        'Your documents were received and are now under review.',
        `Documents: ${typeList}`,
        `Count: ${items.length}`,
        `Portal: ${APP_BASE_URL}`,
        'KingKen Global Travel Agency Ltd. | info@kingkenglobal.com.ng',
    ].join('\n');

    const body = `
      <p>Dear Applicant,</p>
      <p>We have successfully received your documents and they are now <strong>under review</strong> by our team.</p>
      <table cellpadding="0" cellspacing="0" style="margin:16px 0;background:#f0f4ff;border-radius:8px;padding:16px;width:100%">
        <tr><td style="font-size:13px;color:#1a2e5a"><strong>Documents submitted:</strong> ${typeList}</td></tr>
        <tr><td style="font-size:13px;color:#1a2e5a;padding-top:6px"><strong>Total files:</strong> ${items.length}</td></tr>
      </table>
      <p>You will be notified by email once your documents have been reviewed. If you have any questions, reply to this message or contact us directly.</p>
      <p style="margin-top:24px">
        <a href="${APP_BASE_URL}" style="display:inline-block;padding:10px 24px;background:#c9a84c;color:#12213a;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;letter-spacing:0.04em">View Portal</a>
      </p>
      <p style="color:#888;font-size:12px;margin-top:24px">Best regards,<br><strong style="color:#1a2e5a">KingKen Global Travel Agency Ltd.</strong></p>
    `;

    return sendEmail({ to, subject, text, html: brandedHtml({ title: 'Documents Received', badge: 'UNDER REVIEW', badgeColor: '#c9a84c', body }) });
}

export async function sendDocumentReviewedEmail({ to, documentId, documentType, status }) {
    const isApproved = status === 'APPROVED';
    const subject = isApproved
        ? '[KingKen Global] Your document has been approved ✓'
        : '[KingKen Global] Action required — document update needed';

    const text = [
        isApproved ? 'Your document has been approved.' : 'Your document requires attention.',
        `Document type: ${documentType}`,
        `Document ID: ${documentId}`,
        `Status: ${status}`,
        `Portal: ${APP_BASE_URL}`,
        'KingKen Global Travel Agency Ltd. | info@kingkenglobal.com.ng',
    ].join('\n');

    const statusColor = isApproved ? '#16a34a' : '#dc2626';
    const body = `
      <p>Dear Applicant,</p>
      <p>${isApproved
            ? 'We are pleased to inform you that your document has been <strong>approved</strong> by our team.'
            : 'Our team has reviewed your document and it <strong>requires attention</strong>. Please re-submit the corrected document at your earliest convenience.'
        }</p>
      <table cellpadding="0" cellspacing="0" style="margin:16px 0;background:#f0f4ff;border-radius:8px;padding:16px;width:100%">
        <tr><td style="font-size:13px;color:#1a2e5a;padding-bottom:6px"><strong>Document type:</strong> ${documentType}</td></tr>
        <tr><td style="font-size:13px;color:#1a2e5a;padding-bottom:6px"><strong>Document ID:</strong> <code style="background:#e8ecf5;padding:1px 6px;border-radius:4px">${documentId}</code></td></tr>
        <tr><td style="font-size:13px"><strong>Status:</strong> <span style="color:${statusColor};font-weight:700">${status}</span></td></tr>
      </table>
      ${isApproved
            ? '<p>No further action is required for this document. Our team will proceed with your application.</p>'
            : '<p>Please log in to the portal to upload a replacement document and ensure it meets all requirements.</p>'
        }
      <p style="margin-top:24px">
        <a href="${APP_BASE_URL}" style="display:inline-block;padding:10px 24px;background:#c9a84c;color:#12213a;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;letter-spacing:0.04em">Open Portal</a>
      </p>
      <p style="color:#888;font-size:12px;margin-top:24px">Best regards,<br><strong style="color:#1a2e5a">KingKen Global Travel Agency Ltd.</strong></p>
    `;

    const badge = isApproved ? 'APPROVED' : 'REJECTED';
    const badgeColor = isApproved ? '#16a34a' : '#dc2626';

    return sendEmail({ to, subject, text, html: brandedHtml({ title: 'Document Review Update', badge, badgeColor, body }) });
}
