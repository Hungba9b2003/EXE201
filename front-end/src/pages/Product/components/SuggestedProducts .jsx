import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
// import ProductCard from './ProductCard'; // Component để hiển thị sản phẩm

const SuggestedProducts = ({ productId }) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
    const accessToken = localStorage.getItem('access_token');
  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}/suggestions`
        , {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
            },
        });
        debugger
        
        setSuggestedProducts(response.data);
      } catch (error) {
        console.error('Error fetching suggested products:', error);
      }
    };

    fetchSuggestedProducts();
  }, [productId]);

  return (
    <div className="suggested-products" style={{marginTop:"100px"}}>
      <h3>Có thể bạn cũng thích</h3>
      <div className="product-list">
        {suggestedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
