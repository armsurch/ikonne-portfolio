// EmailJS Configuration
// To set up EmailJS for your contact form:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Create an email service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Service ID, Template ID, and Public Key
// 6. Replace the values below

export const EMAIL_CONFIG = {
  SERVICE_ID:'service_ndbd5ok', // Replace with your EmailJS Service ID
  TEMPLATE_ID:'template_m2jedl5', // Replace with your EmailJS Template ID
  PUBLIC_KEY:'TZZsaKnv0oeOiymkO',   // Replace with your EmailJS Public Key
};

// Email template variables that will be sent:
// - from_name: Contact person's name
// - from_email: Contact person's email
// - phone: Contact person's phone (optional)
// - subject: Email subject
// - project_type: Type of project inquiry
// - message: The actual message
// - to_email: Your email (chinonsokingsley854@gmail.com)

// Example EmailJS template:
/*
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
Sent via Portfolio Contact Form
*/