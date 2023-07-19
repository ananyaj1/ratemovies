import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
router.post('/', async (req, res) => {
    const { feed, email } = req.body;
  
    const msgSend = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.SENDGRID_EMAIL,
      subject: 'Feedback from RateMovies User',
      text: feed,
    };
  
    const msgConfirm = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'Your Feedback has been sent!',
      text: 'Thank you for submitting feedback for RateMovies. We appreciate your input, and will get back to you shortly!',
    };
  
    try {
      await sgMail.send(msgSend);
      console.log('Feedback email sent successfully');
  
      try {
        await sgMail.send(msgConfirm);
        console.log('Confirm email sent successfully');
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).json({ error: 'Failed to send confirmation email' });
        return;
      }
  
      res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error sending feedback email:', error);
      res.status(500).json({ error: 'Failed to send feedback email' });
    }
  });

export default router;