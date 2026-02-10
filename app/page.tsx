'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/ProjectCard';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data, loading } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading || !data) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const topProjects = data.projects.slice(0, 3);
  const topLeadership = data.leadership.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Name, Role, Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {data.name}
              </h1>
              <h2 className="text-2xl md:text-3xl text-primary font-semibold">
                {data.role}
              </h2>
            </div>

            <p className="text-lg text-foreground/70 leading-relaxed max-w-md italic">
              "{data.quote}"
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  {data.buttons.getInTouch}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
              >
                <a href={data.cvUrl} download className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {data.buttons.downloadCv}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden bg-muted shadow-lg"
          >
            <Image
              src="/images/pichsereyvathanak.JPG"
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Short Biography Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Short Biography</h2>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl">
            {data.about.intro}
          </p>
          <Button
            asChild
            variant="link"
            className="text-primary hover:text-primary/80 mt-4 px-0"
          >
            <Link href="/about" className="flex items-center gap-2">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Skills & Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">Skills & Technologies</h2>
            
            {/* Programming Languages */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-primary mb-6">Programming Languages</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {data.about.skills.programming.map((skill) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  const skillLogo = typeof skill === 'string' ? '' : (skill.logo || '');
                  return (
                    <motion.div
                      key={skillName}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center gap-3 p-4 rounded-lg bg-card hover:bg-muted transition"
                    >
                      {skillLogo && (
                        <img
                          src={skillLogo || "/placeholder.svg"}
                          alt={skillName}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <span className="text-sm font-medium text-foreground text-center">{skillName}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Data Tools */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-primary mb-6">Data Tools & Libraries</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {data.about.skills.dataTools.map((tool) => {
                  const toolName = typeof tool === 'string' ? tool : tool.name;
                  const toolLogo = typeof tool === 'string' ? '' : (tool.logo || '');
                  return (
                    <motion.div
                      key={toolName}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center gap-3 p-4 rounded-lg bg-card hover:bg-muted transition"
                    >
                      {toolLogo && (
                        <img
                          src={toolLogo || "/placeholder.svg"}
                          alt={toolName}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <span className="text-sm font-medium text-foreground text-center">{toolName}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-xl font-semibold text-primary mb-6">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {data.about.skills.softSkills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Top 3 Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-12">
            Featured Projects
          </motion.h2>

          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
            {topProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewDetailsText={data.buttons.viewDetails}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <Link href="/projects" className="flex items-center gap-2">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Leadership Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-12">
            Leadership & Impact
          </motion.h2>

          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
            {topLeadership.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/leadership/${item.id}`}>
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition">
                        {item.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-3">{item.organization}</p>
                      <p className="text-sm text-foreground/70 line-clamp-3 mb-4">{item.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <Link href="/leadership" className="flex items-center gap-2">
                View All Leadership <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
            <p className="text-lg opacity-90 mx-auto">
              Interested in collaborating or discussing data science projects? I'd love to hear from you.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/contact">
                {data.buttons.getInTouch}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
