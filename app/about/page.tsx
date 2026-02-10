'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { Award, Briefcase, BookOpen } from 'lucide-react';

export default function About() {
  const { data, loading } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading || !data) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const { about } = data;

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

  function renderDescription(desc?: string | string[]) {
    if (!desc) return null;
    if (Array.isArray(desc)) {
      return (
        <ul className="list-disc list-inside text-foreground/70 mt-2">
          {desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      );
    }

    const text = String(desc || '').trim();
    // split on newlines, bullet markers (•) or hyphens
    const parts = text.split(/\r?\n|•|\u2022|\s-\s|^-\s*/).map(s => s.trim()).filter(Boolean);

    if (parts.length > 1) {
      return (
        <ul className="list-disc list-inside text-foreground/70 mt-2">
          {parts.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      );
    }

    return <p className="text-foreground/70 mt-2">{text}</p>;
  }

  return (
    <div className="space-y-24">
      {/* Hero Section with Name, Role, Quote */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {data.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-4">
              {data.role}
            </h2>
          </div>
          <p className="text-lg text-foreground/70 italic mx-auto">
            "{data.quote}"
          </p>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">About Me</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">{about.bio}</p>
        </motion.div>
      </section>

      {/* Education */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            Education
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-6">
            {about.education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                    <p className="text-primary font-semibold">{edu.institution}</p>
                  </div>
                  <span className="text-foreground/60 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-foreground/70 mb-2">{edu.field}</p>
                {renderDescription((edu as any).description || (edu as any).detailedDescription)}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Experience */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-primary" />
            Experience
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-6">
            {about.experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-foreground/60 text-sm">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {renderDescription((exp as any).description || (exp as any).detailedDescription)}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Skills & Technologies */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-foreground mb-8">
            Skills & Technologies
          </motion.h2>

          {/* Programming Languages */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-6">Programming Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {about.skills.programming.map((skill, i) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                const skillLogo = typeof skill === 'string' ? '' : (skill.logo || '');
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 p-3 sm:p-4 rounded-lg bg-card hover:bg-muted transition"
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
          <div>
            <h3 className="text-xl font-semibold text-primary mb-6">Data Tools & Libraries</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {about.skills.dataTools.map((tool, i) => {
                const toolName = typeof tool === 'string' ? tool : tool.name;
                const toolLogo = typeof tool === 'string' ? '' : (tool.logo || '');
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 p-3 sm:p-4 rounded-lg bg-card hover:bg-muted transition"
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
              {about.skills.softSkills.map((skill, i) => (
                <motion.div
                  key={i}
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
        </motion.div>
      </section>
    </div>
  );
}
