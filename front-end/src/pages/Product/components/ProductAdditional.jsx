import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import productsApi from '../../../api/productApi';

function ProductAdditional(props) {
  const [data, setData] = useState({});
  const params = useParams();
  const id = params.productId;

  useEffect(() => {
    (async () => {
      try {
        const response = await productsApi.get(id);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const columns = [
    {
      title: 'Thông số',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const dataSource = [
    { key: 'Kích thước mặt', value: data.dialSize },
    { key: 'Màu mặt', value: data.dialColor },
    { key: 'Mặt kính', value: data.glassMaterial },
    { key: 'Loại máy', value: data.movementType },
    { key: 'Chất liệu dây', value: data.strapMaterial },
    { key: 'Kích cỡ dây', value: data.strapSize },
    { key: 'Độ dày', value: data.thickness },
    { key: 'Chống nước', value: data.waterResistance },
  ];

  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        showHeader={true}
        bordered
      />
    </Paper>
  );
}

ProductAdditional.propTypes = {};

export default ProductAdditional;
