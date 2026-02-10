'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Leadership() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Leadership & Volunteering</h1>
          <p className="text-xl text-foreground/70 mx-auto">
            Experiences in community building, mentoring, and making a positive impact through leadership roles and volunteer initiatives.
          </p>
        </motion.div>
      </section>

      {/* Leadership Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6">
            {data.leadership.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-primary font-semibold text-sm mb-2">{item.organization}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{item.description}</p>

                  {/* Date */}
                  <p className="text-foreground/50 text-xs mb-4">{item.date}</p>

                  {/* View Details Button */}
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Link href={`/leadership/${item.id}`}>
                      View Details
                    </Link>
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
