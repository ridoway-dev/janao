'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import NoticeTicker from '@/components/NoticeTicker';
import HeroSection from '@/components/HeroSection';
import ClassSelector from '@/components/ClassSelector';
import BookGrid from '@/components/BookGrid';
import BookDetailModal from '@/components/BookDetailModal';
import BookReaderModal from '@/components/BookReaderModal';
import NoticeBoard from '@/components/NoticeBoard';
import CategoryBrowser from '@/components/CategoryBrowser';
import BookmarkDrawer from '@/components/BookmarkDrawer';
import Footer from '@/components/Footer';
import { BOOKS_DATA, Book } from '@/data/nctbData';
import { notify } from '@/utils/notifier';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [activeModalBook, setActiveModalBook] = useState<Book | null>(null);
  const [activeReadingBook, setActiveReadingBook] = useState<Book | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isBookmarkDrawerOpen, setIsBookmarkDrawerOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load saved bookmarks from localStorage
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

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const isRemoving = prev.includes(id);
      const updated = isRemoving ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('janao_bookmarked_ids', JSON.stringify(updated));
        const book = BOOKS_DATA.find((b) => b.id === id);
        const name = book?.titleBn || 'বইটি';
        notify({
          type: isRemoving ? 'info' : 'success',
          title: isRemoving ? 'বুকমার্ক সরানো হয়েছে' : 'বুকমার্কে যোগ হয়েছে!',
          description: isRemoving
            ? `"${name}" বুকমার্ক তালিকা থেকে রিমুভ করা হয়েছে।`
            : `"${name}" আপনার পছন্দের তালিকায় সংরক্ষিত হয়েছে।`,
          duration: 3000,
        });
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

  const bookmarkedBooks = BOOKS_DATA.filter((b) => bookmarkedIds.includes(b.id));

  return (
    <div id="main" className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 font-sans w-full max-w-full overflow-x-hidden min-w-0">
      
      {/* 1. Header Navigation */}
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

      {/* 3. Hero & Search */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearChange={(year) => {
          setSelectedYear(year);
          const elem = document.querySelector('#books-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        searchInputRef={searchInputRef}
      />

      {/* 4. Class Quick Selector Grid */}
      <ClassSelector
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 5. Main Books List / Grid */}
      <BookGrid
        books={BOOKS_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
        onOpenBookModal={(book) => setActiveModalBook(book)}
        onOpenReader={(book) => setActiveReadingBook(book)}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
        selectedYear={selectedYear}
      />

      {/* 6. Notices, Recent Posts & Previous Years Archive */}
      <NoticeBoard
        onSelectYear={(year) => {
          setSelectedYear(year);
          setSelectedCategory('all');
          setSelectedClass('all');
        }}
      />

      {/* 7. Other Categories */}
      <CategoryBrowser
        onSelectCategoryFilter={(catName) => {
          setSearchQuery(catName);
          const elem = document.querySelector('#books-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 8. Clean Editorial Footer */}
      <Footer />

      {/* Book Detail Modal */}
      <BookDetailModal
        book={activeModalBook}
        onClose={() => setActiveModalBook(null)}
        isBookmarked={activeModalBook ? bookmarkedIds.includes(activeModalBook.id) : false}
        onToggleBookmark={toggleBookmark}
        onOpenReader={(book) => setActiveReadingBook(book)}
      />

      {/* Interactive Online Book Reader Modal */}
      <BookReaderModal
        book={activeReadingBook}
        onClose={() => setActiveReadingBook(null)}
        isBookmarked={activeReadingBook ? bookmarkedIds.includes(activeReadingBook.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      {/* Bookmark Drawer */}
      <BookmarkDrawer
        isOpen={isBookmarkDrawerOpen}
        onClose={() => setIsBookmarkDrawerOpen(false)}
        bookmarkedBooks={bookmarkedBooks}
        onRemoveBookmark={toggleBookmark}
        onSelectBook={(book) => {
          setActiveReadingBook(book);
        }}
        onClearAll={handleClearAllBookmarks}
      />

    </div>
  );
}
