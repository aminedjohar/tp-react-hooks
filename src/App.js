import React, { createContext, useState, useContext } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import { LanguageContext } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';

export const ThemeContext = createContext();

const translations = {
  fr: {
    title: "Catalogue de Produits",
    searchPlaceholder: "Rechercher un produit...",
    price: "Prix",
    loading: "Chargement...",
    error: "Erreur"
  },
  en: {
    title: "Product Catalog",
    searchPlaceholder: "Search for a product...",
    price: "Price",
    loading: "Loading...",
    error: "Error"
  }
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [language, setLanguage] = useState('fr');
  const langContext = { language, setLanguage };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={langContext}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">{translations[language].title}</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </header>
          <main>
            <ProductSearch setDebouncedTerm={setDebouncedTerm} placeholder={translations[language].searchPlaceholder} />
            <ProductList searchTerm={debouncedTerm} translations={translations[language]} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
