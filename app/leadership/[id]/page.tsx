'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LeadershipDetail() {
  const { data, loading } = useLanguage();
  const params = useParams();
  const leadershipId = parseInt(params.id as string);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading || !data) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const leadership = data.leadership.find((l) => l.id === leadershipId);

  function renderDescription(desc?: string | string[]) {
    if (!desc) return null;
    if (Array.isArray(desc)) {
      return (
        <ul className="list-disc list-inside text-foreground/70">
          {desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      );
    }

    const text = String(desc || '').trim();
    const parts = text.split(/\r?\n|•|\u2022|\s-\s|^-\s*/).map(s => s.trim()).filter(Boolean);
    if (parts.length > 1) {
      return (
        <ul className="list-disc list-inside text-foreground/70">
          {parts.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      );
    }

    return <p className="text-lg text-foreground/70 leading-relaxed">{text}</p>;
  }

  if (!leadership) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Experience Not Found</h1>
        <Button asChild>
          <Link href="/leadership">Back to Leadership</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            asChild
            variant="ghost"
            className="mb-8 text-primary hover:text-primary/80"
          >
            <Link href="/leadership" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Leadership
            </Link>
          </Button>

          <div className="flex items-start gap-4 mb-8">
            <Award className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {leadership.title}
              </h1>
              <p className="text-xl text-foreground/70">{leadership.organization}</p>
              <p className="text-sm text-foreground/50 mt-2">{leadership.date}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {leadership.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Leadership Images Gallery */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-foreground">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(leadership.images && leadership.images.length > 0 ? leadership.images : [leadership.image]).map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative h-48 rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${leadership.title} ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              {leadership.description}
            </p>
          </motion.div>

          {/* Detailed Description */}
          {leadership.detailedDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">What I Did</h2>
              {renderDescription(leadership.detailedDescription)}
            </motion.div>
          )}

          {/* Impact */}
          {leadership.impact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-primary/20 rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Impact
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {leadership.impact}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Interested in collaboration?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Let's connect and discuss how we can work together to make a positive impact.
            </p>
            <Button
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
