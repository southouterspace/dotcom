'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const MIN_NAME_LENGTH = 2;
const MIN_SUBJECT_LENGTH = 5;
const MIN_MESSAGE_LENGTH = 10;

const contactFormSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH, {
    message: `Name must be at least ${MIN_NAME_LENGTH} characters.`,
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(MIN_SUBJECT_LENGTH, {
    message: `Subject must be at least ${MIN_SUBJECT_LENGTH} characters.`,
  }),
  message: z.string().min(MIN_MESSAGE_LENGTH, {
    message: `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`,
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function ContactFormHeader() {
  return (
    <div className="mb-8">
      <h2 className="font-bold text-3xl tracking-tight">Contact Us</h2>
      <p className="mt-2 text-muted-foreground">
        Get in touch and we'll get back to you as soon as possible.
      </p>
    </div>
  );
}

function ContactFormStatus({
  status,
}: {
  status: 'idle' | 'success' | 'error';
}) {
  if (status === 'success') {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <div className="text-green-800 text-sm">
          Thank you for your message! We'll get back to you soon.
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-red-800 text-sm">
          Sorry, there was an error sending your message. Please try again.
        </div>
      </div>
    );
  }

  return null;
}

function useContactFormSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const submitForm = async (
    values: ContactFormValues,
    form: UseFormReturn<ContactFormValues>
  ) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitStatus, submitForm };
}

export function ContactForm() {
  const { isSubmitting, submitStatus, submitForm } = useContactFormSubmission();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    submitForm(values, form);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <ContactFormHeader />

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="What's this about?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[120px] resize-none"
                    placeholder="Tell us more about your inquiry..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide as much detail as possible so we can help you
                  better.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <ContactFormStatus status={submitStatus} />

          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
