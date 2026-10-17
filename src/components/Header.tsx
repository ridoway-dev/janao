'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Sun, 
  Moon, 
  Bookmark, 
  Menu, 
  X, 
  BookOpen, 
  Home, 
  Sparkles, 
  Bell, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  ChevronRight,
  Calculator,
  Compass
} from 'lucide-react';
import BookmarkDrawer from './BookmarkDrawer';
import { BOOKS_DATA, Book } from '@/data/nctbData';

interface HeaderProps {
  onSearchFocus?: () => void;
  savedCount?: number;
  onOpenBookmarks?: () => void;
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
}

export default function Header({
  onSearchFocus,
  savedCount = 0,
  onOpenBookmarks,
  selectedCategory = 'all',
  onSelectCategory,
}: HeaderProps = {}) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSavedCount, setLocalSavedCount] = useState(savedCount);
  const [internalBookmarkOpen, setInternalBookmarkOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }

      const bookmarks = JSON.parse(localStorage.getItem('janao_bookmarked_ids') || '[]');
      setBookmarkedIds(bookmarks);
      if (bookmarks.length > 0) {
        setLocalSavedCount(bookmarks.length);
      }
    } catch (e) {
      console.error(e);
    }
  }, [savedCount]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchClick = () => {
    if (onSearchFocus) {
      onSearchFocus();
    } else {
      window.location.href = '/#main-book-search';
    }
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileSearchQuery.trim()) return;
    setMobileMenuOpen(false);
    window.location.href = `/?q=${encodeURIComponent(mobileSearchQuery.trim())}#books-section`;
  };

  const handleBookmarksClick = () => {
    if (onOpenBookmarks) {
      onOpenBookmarks();
    } else {
      setInternalBookmarkOpen(true);
    }
  };

  const removeInternalBookmark = (id: string) => {
    const updated = bookmarkedIds.filter((item) => item !== id);
    setBookmarkedIds(updated);
    setLocalSavedCount(updated.length);
    try {
      localStorage.setItem('janao_bookmarked_ids', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

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
    { label: 'বই', href: '/books/' },
    { label: '২০২৭ বই', href: '/books/2027/' },
    { label: 'পরীক্ষা ও রুটিন', href: '/notices/' },
    { label: 'ফলাফল', href: '/results/' },
    { label: 'ভর্তি', href: '/admission/' },
    { label: 'চাকরি', href: '/jobs/' },
    { label: 'মাদ্রাসা', href: '/madrasa/ebtedayi/' },
    { label: 'সিলেবাস', href: '/syllabus/' },
  ];

  const appNavHub = [
    { title: 'পাঠ্যবই লাইব্রেরি', desc: '১ম থেকে ১২শ শ্রেণির মূল বই', href: '/books/', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
    { title: '২০২৭ পাঠ্যবই ট্র্যাকার', desc: 'আসন্ন শিক্ষাবর্ষ প্রকাশনা আপডেট', href: '/books/2027/', icon: Sparkles, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60', badge: 'নতুন' },
    { title: 'পরীক্ষার রুটিন ২০২৭', desc: 'এসএসসি ও এইচএসসি সময়সূচি', href: '/notices/ssc-routine-2027/', icon: Bell, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60' },
    { title: 'বোর্ড ফলাফল ও মেধা তালিকা', desc: 'এসএসসি, এইচএসসি ও বৃত্তি রেজাল্ট', href: '/results/', icon: FileText, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60' },
    { title: 'বিশ্ববিদ্যালয় ও ভর্তি', desc: 'পাবলিক, জাতীয় বিশ্ববিদ্যালয় ও মেডিকেল', href: '/admission/', icon: GraduationCap, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60' },
    { title: 'চাকরি ও ক্যারিয়ার', desc: 'সরকারি চাকরি সার্কুলার ও বিসিএস', href: '/jobs/', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60' },
    { title: 'মাদ্রাসা পাঠ্যবই', desc: 'ইবতেদায়ী ও দাখিল স্তরের বই', href: '/madrasa/ebtedayi/', icon: Compass, color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60' },
    { title: 'শিক্ষা ও চাকরি টুলস', desc: 'GPA হিসাব ও বয়স ক্যালকুলেটর', href: '/tools/', icon: Calculator, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60' },
  ];

  const internalBookmarkedBooks = BOOKS_DATA.filter((b) => bookmarkedIds.includes(b.id));

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-200/90 dark:border-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Authentic Brand Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                  janao<span className="text-emerald-700 dark:text-emerald-400">.online</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                  শিক্ষা, চাকরি, ভর্তি ও তথ্য
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (PC) */}
            <nav className="hidden lg:flex items-center space-x-0.5 text-sm font-medium">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
                      isActive
                        ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/70 dark:bg-emerald-950/50'
                        : 'text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop & Mobile Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={handleSearchClick}
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center gap-1.5 transition active:scale-95"
                title="অনুসন্ধান করুন"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">খুঁজুন</span>
              </button>

              <button
                onClick={handleBookmarksClick}
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center gap-1.5 transition relative active:scale-95"
                title="বুকমার্ক করা বই"
                aria-label="সংরক্ষিত বই"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">সংরক্ষিত</span>
                {localSavedCount > 0 && (
                  <span className="px-1 text-[9px] sm:text-[10px] font-bold bg-amber-500 text-white rounded">
                    {localSavedCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 transition active:scale-95"
                title={isDark ? "হোয়াইট মোড" : "ডার্ক মোড"}
                aria-label="থিম পরিবর্তন"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700 transition active:scale-95"
                aria-label="অ্যাপ ড্রয়ার মেনু খুলুন"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Modern Mobile App Drawer / Sheet (Slide-in from Right/Bottom) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div 
            className="w-full max-w-[85vw] sm:max-w-sm h-full bg-white dark:bg-[#0f172a] shadow-2xl flex flex-col justify-between border-l border-gray-200 dark:border-gray-800 animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0 bg-gray-50/70 dark:bg-gray-900/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-900 dark:text-white leading-none">
                    janao<span className="text-emerald-700 dark:text-emerald-400">.online</span>
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                    এডুকেশন ও ক্যারিয়ার হাব
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick In-Drawer Search */}
            <div className="p-3 border-b border-gray-100 dark:border-gray-800/80">
              <form onSubmit={handleMobileSearchSubmit} className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  placeholder="বই বা শ্রেণির নাম খুঁজুন..."
                  className="w-full pl-9 pr-14 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-xs rounded-lg focus:outline-emerald-600"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-emerald-700 text-white rounded text-[11px] font-semibold"
                >
                  খুঁজুন
                </button>
              </form>
            </div>

            {/* App Nav Hub List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 no-scrollbar">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 block mb-1">
                প্রধান মেনু ও বিভাগসমূহ
              </span>

              {appNavHub.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition active:scale-98 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold leading-snug">{item.title}</span>
                          {item.badge && (
                            <span className="text-[8px] bg-amber-500 text-white font-black px-1 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer (Theme & Settings) */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/60 shrink-0 flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400 font-medium">থিম পরিবর্তন:</span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-1.5 font-semibold text-xs shadow-xs"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>লাইট মোড</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-gray-700" />
                    <span>ডার্ক মোড</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fallback Bookmark Drawer for inner pages */}
      {!onOpenBookmarks && (
        <BookmarkDrawer
          isOpen={internalBookmarkOpen}
          onClose={() => setInternalBookmarkOpen(false)}
          bookmarkedBooks={internalBookmarkedBooks}
          onRemoveBookmark={removeInternalBookmark}
          onSelectBook={(book) => {
            window.location.href = `/books/${book.classLevel}/${book.slug}/`;
          }}
          onClearAll={() => {
            try {
              localStorage.removeItem('janao_bookmarked_ids');
            } catch (e) {}
            setBookmarkedIds([]);
            setLocalSavedCount(0);
            setInternalBookmarkOpen(false);
          }}
        />
      )}

      {/* 🚀 Mobile App Bottom Navigation Bar — Strictly Hidden on PC (lg:hidden) */}
      <nav 
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-t border-gray-200/90 dark:border-gray-800/90 lg:hidden shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-safe transition-transform"
      >
        <div className="grid grid-cols-5 h-16 items-center px-1 max-w-md mx-auto select-none">
          
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl active:scale-90 transition-all ${
              pathname === '/'
                ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${pathname === '/' ? 'bg-emerald-100/80 dark:bg-emerald-950/70' : ''}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">হোম</span>
          </Link>

          {/* 2. Books Library */}
          <Link
            href="/books/"
            className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl active:scale-90 transition-all ${
              pathname?.startsWith('/books') && !pathname?.startsWith('/books/2027')
                ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${pathname?.startsWith('/books') && !pathname?.startsWith('/books/2027') ? 'bg-emerald-100/80 dark:bg-emerald-950/70' : ''}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">পাঠ্যবই</span>
          </Link>

          {/* 3. 2027 Tracker - Highlighted Special Button */}
          <Link
            href="/books/2027/"
            className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl active:scale-90 transition-all ${
              pathname?.startsWith('/books/2027')
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'text-gray-500 dark:text-gray-400 hover:text-amber-600'
            }`}
          >
            <div className="relative">
              <div className={`p-1 rounded-lg transition-colors ${pathname?.startsWith('/books/2027') ? 'bg-amber-100 dark:bg-amber-950/70' : ''}`}>
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-2 text-[8px] font-black bg-amber-500 text-white px-1 py-0.2 rounded-full shadow-xs">
                নতুন
              </span>
            </div>
            <span className="text-[10px] leading-none">২০২৭ বই</span>
          </Link>

          {/* 4. Routine & Notices */}
          <Link
            href="/notices/"
            className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl active:scale-90 transition-all ${
              pathname?.startsWith('/notices') || pathname?.startsWith('/syllabus') || pathname?.startsWith('/results')
                ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${pathname?.startsWith('/notices') || pathname?.startsWith('/syllabus') || pathname?.startsWith('/results') ? 'bg-emerald-100/80 dark:bg-emerald-950/70' : ''}`}>
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">রুটিন/নোটিশ</span>
          </Link>

          {/* 5. Bookmarks */}
          <button
            onClick={handleBookmarksClick}
            className="flex flex-col items-center justify-center gap-1 py-1 rounded-xl active:scale-90 transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="সংরক্ষিত বইসমূহ"
          >
            <div className="relative p-1 rounded-lg">
              <Bookmark className="w-5 h-5 text-amber-600" />
              {localSavedCount > 0 && (
                <span className="absolute -top-1 -right-1.5 text-[9px] font-black bg-amber-500 text-white min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {localSavedCount > 9 ? '9+' : localSavedCount}
                </span>
              )}
            </div>
            <span className="text-[10px] leading-none">সংরক্ষিত</span>
          </button>

        </div>
      </nav>
    </>
  );
}
