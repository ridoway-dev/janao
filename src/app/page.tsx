'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import NoticeTicker from '@/components/NoticeTicker';
import HeroSection from '@/components/HeroSection';
import ClassSelector from '@/components/ClassSelector';
import BookGrid from '@/components/BookGrid';
import BookDetailModal from '@/components/BookDetailModal';
import NoticeBoard from '@/components/NoticeBoard';
import CategoryBrowser from '@/components/CategoryBrowser';
import BookmarkDrawer from '@/components/BookmarkDrawer';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { BOOKS_DATA, Book } from '@/data/nctbData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [activeModalBook, setActiveModalBook] = useState<Book | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isBookmarkDrawerOpen, setIsBookmarkDrawerOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load bookmarks from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('janao_bookmarked_ids');
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
      }
      try {
        localStorage.setItem('janao_bookmarked_ids', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
    try {
      localStorage.removeItem('janao_bookmarked_ids');
    } catch (e) {
      console.error(e);
    }
  };

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        focusSearchInput();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const bookmarkedBooks = BOOKS_DATA.filter((b) => bookmarkedIds.includes(b.id));

  return (
    <div id="main" className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* 1. Header with navigation & theme toggle */}
      <Header
        onSearchFocus={focusSearchInput}
        savedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarkDrawerOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedClass('all');
        }}
      />

      {/* 2. Notice Ticker */}
      <NoticeTicker
        onSelectNotice={() => {
          const elem = document.querySelector('#notices');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Hero Section with Live Search and Trust Stats */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearChange={(year) => {
          setSelectedYear(year);
          // If searching or filtering, bring to books
          const elem = document.querySelector('#books-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        searchInputRef={searchInputRef}
      />

      {/* 4. Quick Class Selector Grid (elevating competitor's numeric pill selector) */}
      <ClassSelector
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 5. Main Books Grid & Filters */}
      <BookGrid
        books={BOOKS_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
        onOpenBookModal={(book) => setActiveModalBook(book)}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
        selectedYear={selectedYear}
      />

      {/* 6. Notices, Routines & Result Board */}
      <NoticeBoard
        onSelectYear={(year) => {
          setSelectedYear(year);
          setSelectedCategory('all');
          setSelectedClass('all');
        }}
      />

      {/* 7. Category Browser */}
      <CategoryBrowser
        onSelectCategoryFilter={(catName) => {
          setSearchQuery(catName);
          const elem = document.querySelector('#books-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 8. Frequently Asked Questions (FAQ) */}
      <FAQSection />

      {/* 9. Footer */}
      <Footer />

      {/* Book Detail / Download Modal */}
      <BookDetailModal
        book={activeModalBook}
        onClose={() => setActiveModalBook(null)}
        isBookmarked={activeModalBook ? bookmarkedIds.includes(activeModalBook.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      {/* Bookmark Drawer */}
      <BookmarkDrawer
        isOpen={isBookmarkDrawerOpen}
        onClose={() => setIsBookmarkDrawerOpen(false)}
        bookmarkedBooks={bookmarkedBooks}
        onRemoveBookmark={toggleBookmark}
        onSelectBook={(book) => {
          setActiveModalBook(book);
        }}
        onClearAll={handleClearAllBookmarks}
      />

    </div>
  );
}
