import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import UploadImage from './UploadImage';

const { Option } = Select;

const ProductForm = ({ product, onClose, accessToken }) => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = React.useState([]);
    const [sizes, setSizes] = React.useState([]);

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
            setImageUrls(product.images || []);
            setSizes(product.sizes || []);
        } else {
            form.resetFields();
        }
    }, [product]);

    const handleUploadSuccess = (urls) => {
        setImageUrls(urls); // ✅ Thêm ảnh mới vào danh sách
    };

    const handleSizeChange = (selectedSizes) => {
        const updatedSizes = selectedSizes.map((size) => ({
            size,
            quantity: sizes.find((s) => s.size === size)?.quantity || 0,
        }));
        setSizes(updatedSizes);
    };

    const handleQuantityChange = (size, quantity) => {
        setSizes((prevSizes) => prevSizes.map((s) => (s.size === size ? { ...s, quantity } : s)));
    };

    const onFinish = async (values) => {
        try {
            const productData = {
                ...values,
                images: Array.isArray(imageUrls) ? imageUrls : [imageUrls], // ✅ Đảm bảo là mảng
                sizes,
            };
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            if (product) {
                await axios.put(
                    `http://localhost:5000/api/products/${product._id}`,
                    productData,
                    config,
                );
            } else {
                await axios.post('http://localhost:5000/api/products', productData, config);
            }
            onClose();
        } catch (error) {
            if (error.response) {
                console.log('Error data:', error.response.data);
                console.log('Error status:', error.response.status);
                console.log('Error headers:', error.response.headers);
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };

    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
        >
            <Form.Item
                name='images'
                label='Ảnh sản phẩm'
            >
                <UploadImage
                    onUploadSuccess={handleUploadSuccess}
                    product={product}
                    accessToken={localStorage.getItem('access_token')}
                />
            </Form.Item>
            <Form.Item
                name='name'
                label='Tên sản phẩm'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='description'
                label='Mô tả ngắn'
                rules={[{ required: true }]}
            >
                <Input.TextArea style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='descriptionFull'
                label='Mô tả đầy đủ'
                rules={[{ required: true }]}
            >
                <Input.TextArea style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='originalPrice'
                label='Giá gốc'
                rules={[{ required: true }]}
            >
                <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item
                name='salePrice'
                label='Giá khuyến mãi'
                rules={[{ required: true }]}
            >
                <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item
                name='material'
                label='Chất liệu'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='color'
                label='Màu sắc'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='pattern'
                label='Họa tiết'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='season'
                label='Mùa sử dụng'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='waterResistance'
                label='Chống nước'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='closureType'
                label='Kiểu đóng'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='stretch'
                label='Độ co giãn'
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='sizes'
                label='Kích thước & Số lượng'
                rules={[{ required: true }]}
            >
                <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    onChange={handleSizeChange}
                    value={sizes.map((s) => s.size)}
                >
                    <Option value='S'>S</Option>
                    <Option value='M'>M</Option>
                    <Option value='L'>L</Option>
                    <Option value='XL'>XL</Option>
                    <Option value='XXL'>XXL</Option>
                </Select>
                {sizes.map(({ size, quantity }) => (
                    <Form.Item
                        key={size}
                        label={`Số lượng ${size}`}
                    >
                        <InputNumber
                            min={0}
                            value={quantity}
                            onChange={(value) => handleQuantityChange(size, value)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                ))}
            </Form.Item>
            <Form.Item
                name='category'
                label='Loại sản phẩm'
                rules={[{ required: true }]}
            >
                <Select style={{ width: '100%' }}>
                    <Option value='dog'>Chó</Option>
                    <Option value='cat'>Mèo</Option>
                    <Option value='other'>Khác</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Lưu
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;
