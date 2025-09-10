import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import SearchAndFilters from '@/components/SearchAndFilters';
import ProductList from '@/components/ProductList';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import BannerCarousel from '@/components/BannerCarousel';
import ChatBot from '@/components/ChatBot';
import AuthPage from '@/components/Auth/AuthPage';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { useAuth } from '@/hooks/useAuth';


const Index = () => {
  const { loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const handleSearchChange = (term: string) => {
    console.log('📝 Index - Search term changed:', term);
    setSearchTerm(term);
    // When user starts typing, reset category to search in all products
    if (term.trim() !== '' && selectedCategory !== 'all') {
      console.log('🔄 Index - Resetting category to "all" for search');
      setSelectedCategory('all');
    }
  };
  
  const handleCategoryChange = (category: string) => {
    console.log('📝 Index - Category changed:', category);
    setSelectedCategory(category);
  };

  // Show loading screen while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <h2 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
            KECINFORSTORE
          </h2>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (showAuth) {
    return <AuthPage onBack={() => setShowAuth(false)} />;
  }

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />;
  }

  
  // Check if user is searching or has selected a category
  const isSearching = searchTerm.trim() !== '' || selectedCategory !== 'all';
  
  return (
    <div className="min-h-screen bg-background">
      <Header
        onAuthClick={() => {
          console.log('🔑 Index - Auth clicked');
          setShowAuth(true);
        }}
        onAdminClick={() => {
          console.log('👑 Index - Admin clicked');
          setShowAdmin(true);
        }}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      
      {isSearching ? (
        // Search results page - clean white background with only products
        <div className="bg-white min-h-screen">
          <main className="container mx-auto px-4 py-8">        
            <ProductList
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          </main>
        </div>
      ) : (
        // Home page with all sections
        <>
          <BannerCarousel />
          <FeaturedProducts />
          <CategoriesSection onCategorySelect={handleCategoryChange} />
        </>
      )}
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;