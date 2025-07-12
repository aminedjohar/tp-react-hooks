import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm, translations }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  
  const {
    products,
    loading,
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  } = useProductSearch();
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{translations.loading}</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {translations.error}: {error}
      <button className="btn btn-secondary ms-3" onClick={reload}>
        {translations.reload || 'Recharger'}
      </button>
    </div>
  );

  // Filter products by searchTerm (case-insensitive, on title)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes((searchTerm || '').toLowerCase())
  );
  
  return (
    <div>
      {/* Reload Button */}
      <div className="mb-3 text-end">
        <button className="btn btn-secondary" onClick={reload}>
          {translations.reload || 'Recharger'}
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{translations.price}: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <button className="page-link" onClick={previousPage} disabled={currentPage === 1}>
              {translations.previous || 'Précédent'}
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              {translations.page || 'Page'} {currentPage} {translations.of || 'sur'} {totalPages}
            </span>
          </li>
          <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
            <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
              {translations.next || 'Suivant'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;