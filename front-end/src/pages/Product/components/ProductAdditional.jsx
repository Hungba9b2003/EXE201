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
    const formatSizes = (sizes) => {
        if (!sizes || sizes.length === 0) return 'Không có dữ liệu';
        return sizes.map((item) => `${item.size}`).join(', ');
    };
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
        { key: 'Kích thước', value: formatSizes(data.sizes) },
        { key: 'Chất liệu', value: data.material },
        { key: 'Màu sắc', value: data.color },
        { key: 'Họa tiết', value: data.pattern },
        { key: 'Mùa phù hợp', value: data.season },
        { key: 'Chống nước', value: data.waterResistance },
        { key: 'Kiểu đóng', value: data.closureType },
        { key: 'Độ co giãn', value: data.stretch },
    ];

    return (
        <Paper
            elevation={0}
            style={{ padding: '15px' }}
        >
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
