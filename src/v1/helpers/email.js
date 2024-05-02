import nodemailer from 'nodemailer';
import pug from 'pug';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { convert } from 'html-to-text';
import { config } from './../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mailTransport = null;

export default sendEmail = async (template, subject, data) => {
    try {
        // Check if mailTransport is not initialized or has been closed
        if (!mailTransport || mailTransport?.closed) {
            mailTransport = nodemailer.createTransport({
                host: config.mail_host,
                port: config.mail_port,
                auth: {
                    user: config.mail_username,
                    pass: config.mail_password,
                }
            });
        }
        // Render HTML based on a pug template
        const html = pug.renderFile(path.join(__dirname, `./../views/emails/${template}.pug`), data);

        // Define email options
        const emailOptions = {
            from: config.mail_from_address,
            to: data.email,
            subject: subject,
            html,
            text: convert(html) // Convert HTML to plain text for compatibility
        };

        // Send email
        await mailTransport.sendMail(emailOptions);
    } catch (error) {
        throw new Error('Failed to send email');
    }
};
// await sendEmail(template, subject, data)

export class Email {
    constructor() {
        // Check if mailTransport is not initialized or has been closed
        if (!mailTransport || mailTransport?.closed) {
            mailTransport = nodemailer.createTransport({
                host: config.mail_host,
                port: config.mail_port,
                auth: {
                    user: config.mail_username,
                    pass: config.mail_password,
                }
            });
        }
        // Return this instance for consistency
        return mailTransport;
    }

    // Send the actual template
    async send(template, subject, data) {
        try {
            // Render HTML based on a pug template
            const html = pug.renderFile(path.join(__dirname, `./../views/emails/${template}.pug`), data);

            // Define email options
            const emailOptions = {
                from: config.mail_from_address,
                to: data.email,
                subject: subject,
                html,
                text: convert(html) // Convert HTML to plain text for compatibility
            };

            // Send email
            await mailTransport.sendMail(emailOptions);
        } catch (error) {
            throw new Error('Failed to send email');
        }
    }
}

// new Email.send(template, subject, data)
