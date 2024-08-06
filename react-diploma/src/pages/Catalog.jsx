import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get('search') || '';

  useEffect(() => {
    axios.get('http://localhost:7070/api/categories')
      .then(response => {
        setCategories([{ id: null, title: 'Все' }, ...response.data]);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    setSearchText(searchQuery); // Set search text from URL parameter
    fetchItems();
  }, [selectedCategory, searchQuery]);

  const fetchItems = (append = false) => {
    setLoading(true);
    let url = `http://localhost:7070/api/items?offset=${append ? offset : 0}`;
    if (selectedCategory) {
      url += `&categoryId=${selectedCategory}`;
    }
    if (searchQuery) {
      url += `&q=${searchQuery}`;
    }

    axios.get(url)
      .then(response => {
        setProducts(append ? [...products, ...response.data] : response.data);
        setOffset(append ? offset + response.data.length : response.data.length);
        setHasMoreItems(response.data.length === 6);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleCategoryChange = (event, categoryId) => {
    event.preventDefault();
    setSelectedCategory(categoryId);
    setOffset(0);
    fetchItems();
  };

  const handleLoadMore = () => {
    fetchItems(true);
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Поиск"
              />
            </div>
            <ul className="catalog-categories nav justify-content-center mb-3">
              {categories.map(category => (
                <li className="nav-item" key={category.id}>
                  <a
                    href="#"
                    className={`nav-link ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={(event) => handleCategoryChange(event, category.id)}
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
            {loading && <Loader />}
            {error && <p>Error: {error.message}</p>}
            <div className="row">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {hasMoreItems && (
              <div className="text-center mt-3">
                <button className="btn btn-outline-primary" onClick={handleLoadMore} disabled={loading}>
                  {loading ? 'Загрузка...' : 'Загрузить ещё'}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Catalog;
