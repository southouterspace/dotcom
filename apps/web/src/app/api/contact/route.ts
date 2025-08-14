import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const MIN_NAME_LENGTH = 2;
const MIN_SUBJECT_LENGTH = 5;
const MIN_MESSAGE_LENGTH = 10;

const contactFormSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH),
  email: z.string().email(),
  subject: z.string().min(MIN_SUBJECT_LENGTH),
  message: z.string().min(MIN_MESSAGE_LENGTH),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request data
    const validatedData = contactFormSchema.parse(body);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { message: 'Message received (email not configured)' },
        { status: 200 }
      );
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // You'll need to configure your own domain
      to: ['justin@southouterspace.com'],
      subject: `Contact Form: ${validatedData.subject}`,
      replyTo: validatedData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <h3>Message:</h3>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}

---
Submitted at: ${new Date().toISOString()}
      `.trim(),
    });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
