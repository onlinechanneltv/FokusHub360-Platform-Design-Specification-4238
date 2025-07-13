/**
 * Email templates utility functions
 */

// Get email template from storage or database
const getEmailTemplate = async (templateName) => {
  // In a real app, this would fetch from database
  const templates = {
    welcome: {
      subject: 'Welcome to FokusHub360!',
      content: 'Dear {{user.name}}, Welcome to FokusHub360! We\'re excited to have you join our platform.'
    },
    password_reset: {
      subject: 'Reset Your Password',
      content: 'Dear {{user.name}}, You have requested to reset your password. Click the link below: {{resetLink}}'
    },
    focus_group_invitation: {
      subject: 'New Focus Group Opportunity',
      content: 'Hi {{participant.name}}, You\'ve been matched with a new focus group: {{focusGroup.title}}'
    }
  };
  
  return templates[templateName] || {
    subject: 'FokusHub360 Notification',
    content: 'This is a notification from FokusHub360.'
  };
};

// Send email using your email service
const sendEmail = async ({ to, subject, content }) => {
  // In a real app, this would use an email service like SendGrid, Mailgun, etc.
  console.log(`Sending email to ${to} with subject: ${subject}`);
  console.log(`Content: ${content}`);
  
  // Mock successful email send
  return { success: true };
};

// Send password reset email
export const sendPasswordResetEmail = async (email, token) => {
  try {
    // Get the password reset template
    const template = await getEmailTemplate('password_reset');
    
    // Replace variables in template
    const content = template.content
      .replace('{{resetLink}}', `${window.location.origin}/reset-password?token=${token}`)
      .replace('{{email}}', email);
    
    // Send email using your email service
    await sendEmail({
      to: email,
      subject: template.subject,
      content
    });
    
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Send welcome email
export const sendWelcomeEmail = async (user) => {
  try {
    const template = await getEmailTemplate('welcome');
    
    const content = template.content
      .replace('{{user.name}}', user.name)
      .replace('{{user.email}}', user.email);
    
    await sendEmail({
      to: user.email,
      subject: template.subject,
      content
    });
    
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

// Send focus group invitation
export const sendFocusGroupInvitation = async (participant, focusGroup) => {
  try {
    const template = await getEmailTemplate('focus_group_invitation');
    
    const content = template.content
      .replace('{{participant.name}}', participant.name)
      .replace('{{focusGroup.title}}', focusGroup.title)
      .replace('{{focusGroup.reward}}', focusGroup.reward)
      .replace('{{focusGroup.duration}}', focusGroup.duration)
      .replace('{{participationLink}}', `${window.location.origin}/participant/groups/${focusGroup.id}`);
    
    await sendEmail({
      to: participant.email,
      subject: template.subject,
      content
    });
    
    return true;
  } catch (error) {
    console.error('Error sending focus group invitation:', error);
    throw error;
  }
};