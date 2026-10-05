'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sun, Moon, Bookmark, Menu, X, BookOpen } from 'lucide-react';

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
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
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

  const navItems = [
    { id: 'all', label: 'সকল বই', href: '#books-section' },
    { id: 'primary', label: 'প্রাথমিক', href: '#categories' },
    { id: 'secondary', label: 'মাধ্যমিক', href: '#categories' },
    { id: 'ibtedai', label: 'ইবতেদায়ি', href: '#categories' },
    { id: 'dakhil', label: 'দাখিল', href: '#categories' },
    { id: 'college', label: 'উচ্চ মাধ্যমিক', href: '#categories' },
    { id: 'notices', label: 'নোটিশ ও সিলেবাস', href: '#notices' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Authentic Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-emerald-700 flex items-center justify-center text-white font-bold text-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                janao<span className="text-emerald-700 dark:text-emerald-400">.click</span>
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                NCTB Books 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id !== 'notices') {
                      onSelectCategory(item.id);
                    }
                    const elem = document.querySelector(item.href);
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSearchFocus}
              className="px-2.5 py-1.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded border border-gray-300 dark:border-gray-700 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">খুঁজুন</span>
            </button>

            <button
              onClick={onOpenBookmarks}
              className="px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded border border-gray-300 dark:border-gray-700 flex items-center gap-1.5"
              title="বুকমার্ক করা বই"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">সংরক্ষিত</span>
              {savedCount > 0 && (
                <span className="px-1 text-[10px] font-bold bg-amber-500 text-white rounded">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded border border-gray-300 dark:border-gray-700"
              title={isDark ? "হোয়াইট মোড" : "ডার্ক মোড"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded border border-gray-300 dark:border-gray-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id !== 'notices') {
                    onSelectCategory(item.id);
                  }
                  const elem = document.querySelector(item.href);
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
