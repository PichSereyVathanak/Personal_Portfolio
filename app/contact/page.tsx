'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export default function Contact() {
  const { data, loading } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading || !data) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const { social, email, phone, location } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get In Touch</h1>
          <p className="text-xl text-foreground/70 mx-auto">
            I'd love to hear from you. Whether you have a question or just want to say hello, feel free to reach out.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-12">
          {/* Left: Social Links & Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-foreground/60 text-sm">Email</p>
                  <a href={`mailto:${email}`} className="text-primary hover:text-primary/80 font-semibold">
                    {email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-6">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-foreground/60 text-sm">Phone</p>
                  <a href={`tel:${phone}`} className="text-primary hover:text-primary/80 font-semibold">
                    {phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-foreground/60 text-sm">Location</p>
                  <p className="text-foreground font-semibold">{location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
                  aria-label="Telegram"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div variants={itemVariants} className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send Me a Message</h2>
            <ContactForm
              email={email}
              name={data.name}
              successMessage={data.buttons.success}
              sendButtonText={data.buttons.send}
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
