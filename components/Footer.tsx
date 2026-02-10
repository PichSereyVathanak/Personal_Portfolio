'use client';

import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function Footer() {
  const { data } = useLanguage();

  if (!data) return null;

  const { social, email } = data;

  return (
    <footer className="bg-card border-t border-border py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${email}`}
              className="text-foreground/70 hover:text-primary transition"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href={social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition"
              aria-label="Telegram"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>

          {/* Center - Copyright */}
          <div className="text-center text-sm text-foreground/60">
            <p>&copy; 2026 {data.name}. All rights reserved.</p>
            <p>Built with passion for data science and innovation.</p>
          </div>

          {/* Right Side - Contact Info */}
          <div className="text-right text-sm text-foreground/60">
            <p>{data.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
