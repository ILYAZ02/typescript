import React, { useContext, useEffect } from "react";
import {ModalContext} from "../Context";

const ProductList: React.FC = () => {
    const {getProduct, searchProducts } = useContext(ModalContext);

    useEffect(() => {
        getProduct();
    }, []);

    const handleSearch = (query: string) => {
        searchProducts(query);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search products"
                onChange={(e) => handleSearch(e.target.value)} />

        </div>
    );
};

export default ProductList;
