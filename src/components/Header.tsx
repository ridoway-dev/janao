'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  Download,
  Bell
} from 'lucide-react';

interface HeaderProps {
  onSearchFocus: () => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function Header({
  onSearchFocus,
  savedCount,
  onOpenBookmarks,
  selectedCategory,
  onSelectCategory,
}: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { id: 'all', label: 'হোম', href: '#main' },
    { id: 'primary', label: 'প্রাথমিক', href: '#categories' },
    { id: 'secondary', label: 'মাধ্যমিক', href: '#categories' },
    { id: 'ibtedai', label: 'ইবতেদায়ি', href: '#categories' },
    { id: 'dakhil', label: 'দাখিল', href: '#categories' },
    { id: 'college', label: 'উচ্চ মাধ্যমিক', href: '#categories' },
    { id: 'notices', label: 'নোটিশ ও রুটিন', href: '#notices' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    janao<span className="text-emerald-500">.click</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-md border border-emerald-300/60 dark:border-emerald-800/60">
                    ২০২৬
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  সকল শ্রেণির পাঠ্যবই ও নোটিশ পোর্টাল
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium">
            {navLinks.map((link) => {
              const isActive = selectedCategory === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id !== 'notices') {
                      onSelectCategory(link.id);
                    }
                    const elem = document.querySelector(link.href);
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-2 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search trigger */}
            <button
              id="header-search-btn"
              onClick={onSearchFocus}
              className="p-2 sm:px-3 sm:py-2 text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl border border-slate-200 dark:border-slate-700/60 transition flex items-center gap-2 text-xs"
              title="বই খুঁজুন (Search)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-medium">অনুসন্ধান...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                /
              </kbd>
            </button>

            {/* Bookmarks Counter Button */}
            <button
              id="header-bookmark-btn"
              onClick={onOpenBookmarks}
              className="relative p-2 sm:px-3 sm:py-2 text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700/60 transition flex items-center gap-1.5 text-xs"
              title="সংরক্ষিত বই"
            >
              <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              <span className="hidden sm:inline font-medium">বুকমার্ক</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-amber-500 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              id="header-theme-toggle"
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id !== 'notices') {
                      onSelectCategory(link.id);
                    }
                    const elem = document.querySelector(link.href);
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 text-left text-sm rounded-lg text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 font-medium transition"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <span>জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">janao.click</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
