// EmailJS Test Utility
// Run this in browser console to test your EmailJS configuration

import emailjs from '@emailjs/browser';

export const testEmailJS = async () => {
  console.log('🧪 Testing EmailJS Configuration...');
  
  const testParams = {
    from_name: 'Test User',
    from_email: 'test@example.com',
    phone: '+234 123 456 7890',
    subject: 'Test Email',
    project_type: 'Testing',
    message: 'This is a test message to verify EmailJS configuration.',
    to_email: 'chinonsokingsley854@gmail.com'
  };

  const config = {
    SERVICE_ID: 'service_l3rynyo',
    TEMPLATE_ID: 'template_m2jedl5',
    PUBLIC_KEY: 'TZZsaKnv0oeOiymkO'
  };

  console.log('📧 Test Parameters:', testParams);
  console.log('⚙️ EmailJS Config:', config);

  try {
    // Initialize EmailJS
    emailjs.init(config.PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');

    // Send test email
    const result = await emailjs.send(
      config.SERVICE_ID,
      config.TEMPLATE_ID,
      testParams,
      config.PUBLIC_KEY
    );

    console.log('🎉 SUCCESS! Email sent:', result);
    console.log('✅ Status:', result.status);
    console.log('✅ Text:', result.text);
    
    return { success: true, result };
  } catch (error) {
    console.error('❌ FAILED! EmailJS Error:', error);
    console.error('❌ Error Status:', error.status);
    console.error('❌ Error Text:', error.text);
    console.error('❌ Full Error:', error);
    
    // Provide specific error guidance
    if (error.status === 400) {
      console.log('💡 Suggestion: Check your Service ID and Template ID');
    } else if (error.status === 401) {
      console.log('💡 Suggestion: Check your Public Key');
    } else if (error.status === 404) {
      console.log('💡 Suggestion: Service or Template not found');
    } else if (error.status === 412) {
      console.log('💡 Suggestion: Gmail service needs reconnection');
    }
    
    return { success: false, error };
  }
};

// Browser console test function
window.testEmailJS = testEmailJS;