'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Certificates() {
  const { data, loading } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading || !data) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <div className="flex justify-center">
            <Award className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Certifications & Credentials
          </h1>
          <p className="text-xl text-foreground/70 mx-auto">
            Professional certifications and credentials earned through continuous learning and skill development.
          </p>
        </motion.div>
      </section>

      {/* Certificates Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
            {data.certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
              >
                {/* Certificate Image */}
                {cert.image && (
                  <div className="relative h-64 w-full bg-muted overflow-hidden">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Certificate Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-primary font-semibold text-sm mb-1">{cert.issuer}</p>
                  <p className="text-foreground/60 text-sm mb-6 flex-1">{cert.date}</p>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10 bg-transparent w-full"
                  >
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View Credential <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
