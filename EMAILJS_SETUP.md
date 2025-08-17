# EmailJS Setup Guide for Contact Form

## Current Status
✅ **Temporary Solution Active**: Contact form now opens both WhatsApp and email client
✅ **EmailJS Installed**: Ready for proper email service setup
⏳ **EmailJS Configuration**: Needs to be completed for direct email delivery

## How It Currently Works
When someone submits the contact form:
1. **WhatsApp opens** with a formatted message to your number (+234 902 702 1719)
2. **Email client opens** with a pre-filled email to chinonsokingsley854@gmail.com
3. **Success message** shows that both methods were triggered

## To Set Up Proper EmailJS (Recommended)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended)
4. Connect your Gmail account (chinonsokingsley854@gmail.com)
5. Note down the **Service ID** (e.g., "service_abc123")

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Portfolio Contact - {{project_type}}

Hello Ikonne,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Project Type: {{project_type}}
Subject: {{subject}}

Message:
{{message}}

---
Reply directly to this email to respond to the client.
Sent via Portfolio Contact Form
```

4. Note down the **Template ID** (e.g., "template_xyz789")

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., "user_abc123xyz")

### Step 5: Update Configuration
Replace the values in `src/services/emailService.js`:

```javascript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id_here',
  TEMPLATE_ID: 'your_template_id_here', 
  PUBLIC_KEY: 'your_public_key_here',
};
```

### Step 6: Update Contact Component
In `src/components/Contact.jsx`, uncomment and update the EmailJS code:

```javascript
// Replace the temporary solution with:
const result = await emailjs.send(
  EMAIL_CONFIG.SERVICE_ID,
  EMAIL_CONFIG.TEMPLATE_ID,
  templateParams,
  EMAIL_CONFIG.PUBLIC_KEY
);
```

## Benefits of EmailJS Setup
- ✅ **Direct email delivery** to your inbox
- ✅ **No dependency** on user's email client
- ✅ **Professional appearance** - no external apps opening
- ✅ **Email tracking** and analytics
- ✅ **Reliable delivery** with error handling

## Alternative Solutions
If you prefer not to use EmailJS:

1. **Formspree** (https://formspree.io/) - Similar service
2. **Netlify Forms** - If hosting on Netlify
3. **Backend API** - Custom Node.js/PHP backend
4. **Keep current solution** - WhatsApp + mailto works for now

## Testing
After setup, test the form with:
- Valid email addresses
- Different project types
- Long and short messages
- Mobile and desktop devices

## Support
If you need help with the setup, the current WhatsApp + email solution will work until you're ready to implement EmailJS.