import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    setLoading(false);
  }, []);

  const handleRemove = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem(
      "cartCount",
      updatedCart.reduce((sum, item) => sum + item.quantity, 0)
    );
    window.dispatchEvent(new Event("storage"));
    setCart(updatedCart);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreement) {
      alert("Вы не согласились с правилами доставки.");
      return;
    }

    setSubmitting(true);

    const order = {
      owner: {
        phone,
        address,
      },
      items: cart.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      })),
    };

    axios
      .post("http://localhost:7070/api/order", order)
      .then(() => {
        setSuccess("Заказ оформлен успешно!");
        localStorage.removeItem("cart");
        localStorage.setItem("cartCount", 0);
        window.dispatchEvent(new Event("storage"));
        setCart([]);
      })
      .catch(() => {
        setSuccess("Ошибка при оформлении заказа");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src="./img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={`${item.id}-${item.size}`}>
                    <td scope="row">{index + 1}</td>
                    <td>
                      <a href={`/products/${item.id}.html`}>{item.title}</a>
                    </td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} руб.</td>
                    <td>{item.price * item.quantity} руб.</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemove(item.id, item.size)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="text-right">Общая стоимость</td>
                  <td>
                    {cart.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}{" "}
                    руб.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div
              className="card"
              style={{ maxWidth: "30rem", margin: "0 auto" }}
            >
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    id="phone"
                    placeholder="Ваш телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    id="address"
                    placeholder="Адрес доставки"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласен с правилами доставки
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-secondary"
                  disabled={submitting}
                >
                  {submitting ? "Оформляем..." : "Оформить"}
                </button>
                {success && <p>{success}</p>}
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Cart;
