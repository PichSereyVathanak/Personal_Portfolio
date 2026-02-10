'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react'; // Import Github component
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  viewDetailsText: string;
  index: number;
}

export function ProjectCard({ project, viewDetailsText, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* Date */}
        <p className="text-foreground/50 text-xs mb-4">{project.date}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            asChild
            variant="default"
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Link href={`/projects/${project.id}`}>
              {viewDetailsText}
            </Link>
          </Button>
          {project.githubLink && (
            <Button
              variant="outline"
              size="sm"
              className="px-3 bg-transparent"
              asChild
            >
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
