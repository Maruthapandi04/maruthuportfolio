const db = require("../Config/db");
const transporter = require("../Config/mailer.js");

exports.sendContactMail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // 1️⃣ Save to database
        await db.query(
            "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
            [name, email, subject, message]
        );

        // 2️⃣ Email to YOU (admin notification)
        const adminMail = {
            from: process.env.EMAIL_USER,
            to: "amaruthupandi04@gmail.com", // Your portfolio email
            subject: `📢 JOB OPPORTUNITY: ${subject} from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: 'Segoe UI', Arial, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8; padding:30px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                                    <!-- Header with job opportunity tag -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:20px; border-radius:10px 10px 0 0; text-align:center;">
                                            <h1 style="color:#ffffff; margin:0; font-size:24px;">🎯 NEW JOB OPPORTUNITY!</h1>
                                            <p style="color:#ffffff; margin:5px 0 0 0; opacity:0.9;">A company wants to hire you</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:30px;">
                                            <!-- Company/Person Details Card -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fc; border-radius:8px; margin-bottom:25px;">
                                                <tr>
                                                    <td style="padding:20px;">
                                                        <h2 style="color:#2c3e50; margin:0 0 15px 0; border-bottom:2px solid #667eea; padding-bottom:10px;">📋 Hiring Details</h2>
                                                        
                                                        <table width="100%" cellpadding="8" cellspacing="0" border="0">
                                                            <tr>
                                                                <td width="100" style="color:#666; font-weight:bold;">👤 Contact Person:</td>
                                                                <td style="color:#333;">${name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="color:#666; font-weight:bold;">📧 Company Email:</td>
                                                                <td style="color:#333;"><a href="mailto:${email}" style="color:#667eea; text-decoration:none;">${email}</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="color:#666; font-weight:bold;">📝 Position/Subject:</td>
                                                                <td style="color:#333;"><strong style="background:#e8f0fe; padding:3px 10px; border-radius:15px;">${subject}</strong></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- Message Card -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff3e0; border-left:4px solid #ff9800; border-radius:5px; margin-bottom:25px;">
                                                <tr>
                                                    <td style="padding:20px;">
                                                        <h3 style="color:#2c3e50; margin:0 0 10px 0;">💬 Their Message:</h3>
                                                        <p style="color:#555; line-height:1.6; margin:0; font-size:15px;">
                                                            ${message}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- Quick Stats -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td width="33%" style="padding:5px;">
                                                        <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color:#e3f2fd; border-radius:5px; text-align:center;">
                                                            <tr><td style="font-size:20px;">⏰</td></tr>
                                                            <tr><td style="color:#1976d2; font-weight:bold;">${new Date().toLocaleDateString()}</td></tr>
                                                        </table>
                                                    </td>
                                                    <td width="33%" style="padding:5px;">
                                                        <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color:#e8f5e8; border-radius:5px; text-align:center;">
                                                            <tr><td style="font-size:20px;">📊</td></tr>
                                                            <tr><td style="color:#388e3c; font-weight:bold;">New Lead</td></tr>
                                                        </table>
                                                    </td>
                                                    <td width="33%" style="padding:5px;">
                                                        <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color:#fce4ec; border-radius:5px; text-align:center;">
                                                            <tr><td style="font-size:20px;">⭐</td></tr>
                                                            <tr><td style="color:#c2185b; font-weight:bold;">Hiring</td></tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- Action Buttons -->
                                            <table width="100%" cellpadding="20" cellspacing="0" border="0" style="margin-top:25px;">
                                                <tr>
                                                    <td align="center">
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                                <td style="background-color:#667eea; border-radius:5px; padding:12px 25px;">
                                                                    <a href="mailto:${email}?subject=Re: ${subject}&body=Dear ${name}%2C%0A%0AThank you for reaching out regarding the ${subject} position. I am very interested in this opportunity and would love to discuss further.%0A%0ABest regards%2C%0AMaruthu Pandi" style="color:#ffffff; text-decoration:none; font-weight:bold;">📧 REPLY NOW</a>
                                                                </td>
                                                                <td width="15"></td>
                                                                <td style="background-color:#4caf50; border-radius:5px; padding:12px 25px;">
                                                                    <a href="#" style="color:#ffffff; text-decoration:none; font-weight:bold;">📅 SCHEDULE</a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>

                                            <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />
                                            
                                            <p style="font-size:12px; color:#999; text-align:center; margin:0;">
                                                This hiring inquiry was sent through your portfolio website.<br>
                                                Response time target: Within 24 hours
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        // 3️⃣ Auto-reply email to the hiring company
        const userMail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `🎉 Thank You for Hiring Interest - Maruthu Pandi`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0; padding:0; background-color:#f0f2f5; font-family: 'Segoe UI', Arial, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5; padding:40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:15px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
                                    <!-- Hero Section with Thank You -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px 30px; border-radius:15px 15px 0 0; text-align:center;">
                                            <h1 style="color:#ffffff; margin:0; font-size:36px; font-weight:bold;">Thank You! 🎉</h1>
                                            <p style="color:#ffffff; margin:15px 0 0 0; font-size:18px; opacity:0.95;">for considering me for your opportunity</p>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td style="padding:35px;">
                                            <!-- Welcome Message -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
                                                <tr>
                                                    <td>
                                                        <h2 style="color:#2c3e50; margin:0 0 5px 0;">Dear ${name},</h2>
                                                        <p style="color:#555; font-size:16px; line-height:1.6; margin:10px 0 0 0;">
                                                            I'm <strong style="color:#667eea;">Maruthu Pandi</strong>, and I'm genuinely excited to receive your hiring inquiry regarding:
                                                        </p>
                                                        <div style="background-color:#f8f9fa; padding:15px; border-radius:8px; margin:15px 0; border-left:4px solid #667eea;">
                                                            <p style="margin:0; color:#333; font-size:16px;"><strong>Position/Subject:</strong> ${subject}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- Company Recognition Card -->
                                            <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background: linear-gradient(145deg, #f6f9fc 0%, #edf2f7 100%); border-radius:10px; margin-bottom:30px;">
                                                <tr>
                                                    <td>
                                                        <h3 style="color:#2c3e50; margin:0 0 15px 0; display:flex; align-items:center;">
                                                            <span style="font-size:24px; margin-right:10px;">🏢</span> About Your Company
                                                        </h3>
                                                        <p style="color:#555; margin:0; line-height:1.6;">
                                                            Thank you for reaching out from <strong>${email}</strong>. I'm very interested in learning more about your company and how I can contribute to your team as a Full Stack Developer.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- What Happens Next - Professional Timeline -->
                                            <h3 style="color:#2c3e50; margin:30px 0 20px 0;">📋 Next Steps</h3>
                                            
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td width="50" valign="top" style="padding:0 0 20px 0;">
                                                        <table width="36" height="36" cellpadding="0" cellspacing="0" border="0" style="background-color:#667eea; border-radius:50%;">
                                                            <tr><td align="center" valign="middle" style="color:#ffffff; font-weight:bold; font-size:18px;">1</td></tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0 0 20px 20px;">
                                                        <h4 style="color:#2c3e50; margin:0 0 5px 0;">Immediate Review</h4>
                                                        <p style="color:#666; margin:0; font-size:14px;">I'll review your opportunity details within the next 12-24 hours</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50" valign="top" style="padding:0 0 20px 0;">
                                                        <table width="36" height="36" cellpadding="0" cellspacing="0" border="0" style="background-color:#4caf50; border-radius:50%;">
                                                            <tr><td align="center" valign="middle" style="color:#ffffff; font-weight:bold; font-size:18px;">2</td></tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0 0 20px 20px;">
                                                        <h4 style="color:#2c3e50; margin:0 0 5px 0;">Portfolio & Resume Review</h4>
                                                        <p style="color:#666; margin:0; font-size:14px;">I'll prepare my relevant experience and projects matching your requirements</p>
                                                    </td>
                                                </tr>
                                            </table>

                                            
                                            <!-- Contact Information -->
                                            <table width="100%" cellpadding="20" cellspacing="0" border="0" style="margin-top:25px;">
                                                <tr>
                                                    <td align="center" style="border-top:2px solid #edf2f7; padding-top:25px;">
                                                        <p style="color:#2c3e50; font-size:18px; margin:0 0 10px 0;">
                                                            <strong>Maruthu Pandi</strong>
                                                        </p>
                                                        <p style="color:#667eea; font-size:16px; margin:5px 0;">
                                                            ⭐ Full Stack Web Developer
                                                        </p>
                                                        <p style="color:#888; margin:15px 0 0 0; font-size:14px;">
                                                            📧 amaruthupandi04@gmail.com | 📱 +91 8870671827<br>
                                                        </p>
                                                            <span style="color:#667eea;">⚡ Available for immediate joining ⚡</span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        // Send both emails
        await transporter.sendMail(adminMail);
        await transporter.sendMail(userMail);

        res.status(200).json({
            success: true,
            message: "Thank you message sent to the hiring company successfully!"
        });

    } catch (error) {
        console.error("Error in sendContactMail:", error);
        res.status(500).json({
            success: false,
            message: "Server error occurred while processing your request"
        });
    }
};