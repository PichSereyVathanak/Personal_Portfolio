'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { ProjectCard } from '@/components/ProjectCard';
import { useEffect, useState } from 'react';

export default function Projects() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Projects & Portfolio</h1>
          <p className="text-xl text-foreground/70 mx-auto">
            A collection of data science and machine learning projects showcasing my expertise in model development, data analysis, and real-world problem-solving.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewDetailsText={data.buttons.viewDetails}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
