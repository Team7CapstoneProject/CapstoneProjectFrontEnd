import React, { useEffect, useState } from "react";
import { Products } from "../";
import "./CSS/products.css";

const ProductsSearch = ({ allProducts }) => {
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  function searchProducts(searchValue) {
    if (searchValue !== "") {
      const filteredProducts = allProducts.filter((product) => {
        return Object.values(product)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  }

  const handleChange = (input) => {
    input.preventDefault();
    searchProducts(input.target.value);
  };

  return (
    <>
      <div className="productPage">
        <div>
          <form className="productSearchForm">
            <input className="productSearchInput" type="text" placeholder="Search in GuitarStop" onChange={handleChange} autoFocus/>
          </form>
        </div>
        <Products products={products} />
      </div>
    </>
  );
};

export default ProductsSearch;
