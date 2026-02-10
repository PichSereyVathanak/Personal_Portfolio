'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`relative font-medium transition ${
        isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'
      }`}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mt-1" />
      )}
    </Link>
  );
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, data } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data) return null;

  const nav = data.nav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link href="/" className="hover:opacity-80 transition">
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="rounded"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" label={nav.home} isActive={pathname === '/'} />
            <NavLink href="/about" label={nav.about} isActive={pathname === '/about'} />
            <NavLink href="/projects" label={nav.projects} isActive={pathname === '/projects'} />
            <NavLink href="/leadership" label={nav.leadership} isActive={pathname === '/leadership'} />
            <NavLink href="/certificates" label={nav.certificates} isActive={pathname === '/certificates'} />
            <NavLink href="/contact" label={nav.contact} isActive={pathname === '/contact'} />
          </div>

          {/* Mobile Menu + Theme and Language Toggles */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-primary/10"
            >
              {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hover:bg-primary/10"
              title={language === 'en' ? 'Switch to Khmer' : 'Switch to English'}
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-semibold ml-1">{language.toUpperCase()}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-1/2">
                <SheetTitle>Navigation</SheetTitle>
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition ${
                      pathname === '/' ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                    }`}
                  >
                    {nav.home}
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition ${
                      pathname === '/about' ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                    }`}
                  >
                    {nav.about}
                  </Link>
                  <Link
                    href="/projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition ${
                      pathname === '/projects' ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                    }`}
                  >
                    {nav.projects}
                  </Link>
                  <Link
                    href="/leadership"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition ${
                      pathname === '/leadership' ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                    }`}
                  >
                    {nav.leadership}
                  </Link>
                  <Link
                    href="/certificates"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition ${
                      pathname === '/certificates' ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                    }`}
                  >
                    {nav.certificates}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition ${
                      pathname === '/contact' ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                    }`}
                  >
                    {nav.contact}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
