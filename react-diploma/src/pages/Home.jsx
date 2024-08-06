import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import CatalogHome from "./CatalogHome";

const Home = () => {
  const [topSales, setTopSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:7070/api/top-sales")
      .then((response) => {
        setTopSales(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src="/img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {loading && <Loader />}
            {error && <p>Error: {error.message}</p>}
            <div className="row">
              {topSales.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
          <CatalogHome />
        </div>
      </div>
    </main>
  );
};

export default Home;
