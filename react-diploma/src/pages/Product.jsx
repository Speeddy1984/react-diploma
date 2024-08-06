import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/items/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <p className="text-center">Продукт не найден</p>;
  }
  const availableSizes = product.sizes.filter((size) => size.available);

  const handleAddToCart = () => {
    if (selectedSize) {
      const newItem = {
        id: product.id,
        title: product.title,
        size: selectedSize,
        price: product.price,
        quantity,
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += newItem.quantity;
      } else {
        cart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", cartCount);
      window.dispatchEvent(new Event("storage"));

      navigate("/cart");
    }
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src=".././img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>

          <section className="catalog-item">
            <h2 className="text-center">{product.title}</h2>
            <div className="row">
              <div className="col-5">
                <img
                  src={product.images[0]}
                  className="img-fluid"
                  alt={product.title}
                />
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{product.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{product.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{product.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{product.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{product.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{product.reason}</td>
                    </tr>
                    <tr>
                      <td>Цена</td>
                      <td>{product.price}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center">
                  <p>Размеры в наличии:</p>
                  {availableSizes.map((size) => (
                    <a
                      key={size.size}
                      className={`catalog-item-size ${
                        selectedSize === size.size ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize(size.size)}
                    >
                      {size.size}
                    </a>
                  ))}
                  <p>
                    Количество:
                    <span className="btn-group btn-group-sm pl-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-primary">
                        {quantity}
                      </span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      >
                        +
                      </button>
                    </span>
                  </p>
                </div>
                <button
                  className="btn btn-danger btn-block btn-lg"
                  disabled={!selectedSize}
                  onClick={handleAddToCart}
                >
                  В корзину
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Product;
