# EmailJS Configuration Checklist

## 🔍 Your Current Configuration
- **Service ID**: `service_l3rynyo`
- **Template ID**: `template_m2jedl5`  
- **Public Key**: `TZZsaKnv0oeOiymkO`

## ✅ Step-by-Step Verification

### 1. Check EmailJS Dashboard Access
- [ ] Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [ ] Log in with your account
- [ ] Verify you can see your services and templates

### 2. Verify Email Service (service_l3rynyo)
- [ ] Go to **Email Services** tab
- [ ] Find service with ID `service_l3rynyo`
- [ ] Check if status is **Active** (green)
- [ ] If Gmail service, check if it shows "Connected"

### 3. Verify Email Template (template_m2jedl5)
- [ ] Go to **Email Templates** tab
- [ ] Find template with ID `template_m2jedl5`
- [ ] Check if status is **Active**
- [ ] Verify template contains these variables:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{phone}}`
  - `{{subject}}`
  - `{{project_type}}`
  - `{{message}}`
  - `{{to_email}}`

### 4. Check Public Key
- [ ] Go to **Account** → **General**
- [ ] Verify Public Key matches: `TZZsaKnv0oeOiymkO`
- [ ] If different, update `emailService.js`

### 5. Domain Security Settings
- [ ] Go to **Account** → **Security**
- [ ] Check **Allowed Domains** section
- [ ] Add these domains if not present:
  - `localhost:5173` (for development)
  - Your Vercel domain (e.g., `yoursite.vercel.app`)
  - `*` (wildcard - for testing only)

## 🔧 Common Issues & Fixes

### Issue 1: Gmail Service Disconnected
**Symptoms**: Error 412 or "insufficient authentication scopes"
**Fix**:
1. Go to Email Services
2. Click on your Gmail service
3. Click "Reconnect"
4. Make sure to check "Send email on your behalf"

### Issue 2: Template Variables Mismatch
**Symptoms**: Blank emails or template errors
**Fix**: Update your EmailJS template to match exactly:

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

### Issue 3: Service/Template Not Found
**Symptoms**: 404 errors
**Fix**:
1. Double-check IDs in EmailJS dashboard
2. Make sure services/templates are active
3. Update `emailService.js` if IDs changed

## 🧪 Test Your Configuration

### Browser Console Test
1. Open your website
2. Press F12 → Console
3. Paste and run:

```javascript
// Test EmailJS
emailjs.send('service_l3rynyo', 'template_m2jedl5', {
  from_name: 'Test User',
  from_email: 'test@example.com',
  phone: '+234 123 456 7890',
  subject: 'Test Email',
  project_type: 'Testing',
  message: 'This is a test message.',
  to_email: 'chinonsokingsley854@gmail.com'
}, 'TZZsaKnv0oeOiymkO')
.then(result => {
  console.log('✅ SUCCESS:', result);
  alert('Email sent successfully!');
})
.catch(error => {
  console.error('❌ ERROR:', error);
  alert('Error: ' + error.text);
});
```

## 📊 Error Code Reference

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 400 | Bad Request | Check Service/Template IDs |
| 401 | Unauthorized | Check Public Key |
| 404 | Not Found | Service/Template doesn't exist |
| 412 | Precondition Failed | Reconnect Gmail service |
| 422 | Unprocessable Entity | Check template variables |

## 🚀 If All Else Fails

### Option 1: Create New Service
1. Create new Gmail service in EmailJS
2. Get new Service ID
3. Update `emailService.js`

### Option 2: Create New Template
1. Create new template with exact variables above
2. Get new Template ID
3. Update `emailService.js`

### Option 3: Use Alternative
- Keep current fallback system (WhatsApp + mailto)
- Consider Formspree or Netlify Forms
- Set up custom backend API

## 📞 Current Fallback Status
✅ **Your form works regardless** - if EmailJS fails:
- WhatsApp opens with formatted message
- Email client opens with pre-filled email
- User sees success message
- You still receive all contact attempts

The form is bulletproof! 🛡️