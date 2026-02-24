import { createContext, useState, useEffect, useContext } from "react";

const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  async function fetchListOfProducts() {
    setLoading(true);
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result) {
      setProductList(result?.products);
      setLoading(false);
    } else {
      setLoading(false);
      setProductList([]);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ loading, productList }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

export default ProductProvider;
