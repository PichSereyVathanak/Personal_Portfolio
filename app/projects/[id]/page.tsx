'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProjectDetail() {
  const { data, loading } = useLanguage();
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading || !data) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const project = data.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
        <Button asChild>
          <Link href="/projects">Back to Projects</Link>
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
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.githubLink && (
              <Button asChild variant="outline" className="border-primary text-primary bg-transparent">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveLink && (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Project Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-96 rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Problem Statement */}
          {project.problemStatement && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Problem Statement</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {project.problemStatement}
              </p>
            </motion.div>
          )}

          {/* Detailed Description */}
          {project.detailedDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {project.detailedDescription}
              </p>
            </motion.div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
            <h2 className="text-3xl font-bold">Interested in this project?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Feel free to check out the code or contact me to discuss more about my work.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {project.githubLink && (
                <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
