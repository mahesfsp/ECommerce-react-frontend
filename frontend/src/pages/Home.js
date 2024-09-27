import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products?${searchParams}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <section id="products" className="container mt-5">
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => ( 
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
}
