
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import UploadImage from './UploadImage';

const { Option } = Select;

const ProductForm = ({ product, onClose, accessToken }) => {
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = React.useState([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
      setImageUrls(product.images || []);
    } else {
      form.resetFields();
    }
  }, [product]);

  const handleUploadSuccess = (urls) => {
    setImageUrls(urls);
  };

  const onFinish = async (values) => {
    try {
      const productData = {
        ...values,
        images: imageUrls,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (product) {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, productData, config);
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
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item name='images' label='Ảnh sản phẩm'>
        <UploadImage onUploadSuccess={handleUploadSuccess} product={product} accessToken={accessToken} />
      </Form.Item>
      <Form.Item name='name' label='Tên sản phẩm' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='description' label='Giới thiệu ngắn gọn sản phẩm' rules={[{ required: true }]}>
        <Input.TextArea style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='descriptionFull' label='Giới thiệu đầy đủ sản phẩm' rules={[{ required: true }]}>
        <Input.TextArea style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='originalPrice' label='Giá gốc' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='salePrice' label='Giá sau khi được giảm' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='dialSize' label='Size mặt đồng hồ' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='thickness' label='Độ dày mặt kính' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='dialColor' label='Màu mặt đồng hồ' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='movementType' label='Loại máy (cơ/pin)' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='strapSize' label='Kích cỡ dây' rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='waterResistance' label='Chống nước' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='glassMaterial' label='Mặt kính' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='strapMaterial' label='Chất liệu dây' rules={[{ required: true }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='typeId' label='Loại sản phẩm' rules={[{ required: true }]}>
        <Select style={{ width: '100%' }}>
          <Option value='66968db78675a1be4a653de4'>Kashmir</Option>
          <Option value='6696a0da8675a1be4a653e1f'>Weimar</Option>
          <Option value='6696a2ce8675a1be4a653e24'>Colosseum</Option>
          <Option value='6696a5e18675a1be4a653e27'>Jackson</Option>
          <Option value='6696a6258675a1be4a653e29'>Detroit</Option>
          <Option value='6696a62e8675a1be4a653e2b'>Futura</Option>
          <Option value='6696a63f8675a1be4a653e2d'>Whitesands</Option>
          <Option value='6696a64e8675a1be4a653e2f'>G-Forks</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
