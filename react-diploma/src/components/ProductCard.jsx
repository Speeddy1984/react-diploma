import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="col-4">
    <div className="card catalog-item-card">
      <img src={product.images[0]} className="card-img-top img-fluid" alt={product.title} />
      <div className="card-body d-flex flex-column">
        <p className="card-text">{product.title}</p>
        <p className="card-text">{product.price} руб.</p>
        <Link to={`/catalog/${product.id}`} className="btn btn-outline-primary mt-auto">Заказать</Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
