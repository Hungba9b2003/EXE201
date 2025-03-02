import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import { formatPrice } from '../../../utils/common';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/get-all');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setVisible(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setVisible(true);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <img
                    src={images?.[0] || 'https://via.placeholder.com/50'}
                    alt='product'
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ fontWeight: 600, color: '#333' }}>{text}</span>,
        },
        {
            title: 'Giá nguyên bản (VND)',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
            render: (text) => (
                <span style={{ color: '#ff0000', textDecoration: 'line-through' }}>
                    {formatPrice(text)}
                </span>
            ),
        },
        {
            title: 'Giá bán (VND)',
            dataIndex: 'salePrice',
            key: 'salePrice',
            render: (text) => (
                <span style={{ color: 'black', fontWeight: 600 }}>{formatPrice(text)}</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button
                        type='link'
                        style={{
                            color: 'white',
                            background: 'black',
                            borderRadius: 0,
                            marginBottom: 10,
                            marginRight: 10,
                        }}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type='link'
                        style={{
                            color: 'black',
                            background: 'white',
                            borderRadius: 0,
                            marginBottom: 10,
                            border: '1px solid black',
                        }}
                        danger
                        onClick={() => handleDelete(record._id)}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Button
                    onClick={handleAdd}
                    style={{ color: 'white', background: 'black', borderRadius: 0 }}
                >
                    Thêm sản phẩm mới
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={products}
                rowKey='_id'
            />
            <Modal
                title={selectedProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <ProductForm
                    product={selectedProduct}
                    onClose={() => {
                        setVisible(false);
                        fetchProducts();
                    }}
                    accessToken={accessToken}
                />
            </Modal>
        </div>
    );
};

export default ProductManagement;
