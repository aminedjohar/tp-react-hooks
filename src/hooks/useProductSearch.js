import { useState, useEffect } from 'react';

const LIMIT = 6;

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.daaif.net/products?delay=1000&page=${currentPage}&limit=${LIMIT}`);
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / LIMIT));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, reloadFlag]);

  const reload = () => setReloadFlag(flag => !flag);
  const nextPage = () => setCurrentPage(page => Math.min(page + 1, totalPages));
  const previousPage = () => setCurrentPage(page => Math.max(page - 1, 1));

  return {
    products,
    loading,
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  };
};

export default useProductSearch;