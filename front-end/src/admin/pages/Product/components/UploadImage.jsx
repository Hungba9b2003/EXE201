import React, { useEffect, useState } from 'react';
import { Image, Upload, message, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadImage = ({ onUploadSuccess, product, accessToken }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (product && product.images) {
            const formattedFileList = product.images.map((url) => ({
                uid: url,
                name: url,
                status: 'done',
                url: url,
            }));
            setFileList(formattedFileList);
        }
    }, [product]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = async ({ file, fileList: newFileList }) => {
        if (file.status === 'uploading') {
            setFileList(newFileList);
            return;
        }

        if (file.status === 'done') {
            const uploadedUrls = newFileList
                .filter((f) => f.status === 'done')
                .map((f) => f.url || (f.response && f.response.url));

            // console.log('Uploaded URLs:', uploadedUrls); // 🔍 Kiểm tra danh sách URL

            onUploadSuccess(uploadedUrls);
        } else if (file.status === 'error') {
            message.error('Upload failed.');
        }

        setFileList(newFileList);
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();

        if (product?._id) {
            formData.append('productId', product._id);
        }
        formData.append('files', file);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/uploads/product',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            if (response.data.success && response.data.urls.length > 0) {
                const uploadedUrl = response.data.urls[0].url;
                file.status = 'done'; // ✅ Đánh dấu file đã upload thành công
                file.url = uploadedUrl; // ✅ Cập nhật URL của file
                file.response = { url: uploadedUrl }; // ✅ Định dạng chuẩn Ant Design
                onSuccess(response.data);

                // 🔹 Nếu chưa có productId, lưu URL vào state để gửi khi tạo sản phẩm
            } else {
                throw new Error('Upload response invalid');
            }
        } catch (error) {
            onError(error);
            message.error('Upload failed.');
        }
    };
    const handleRemove = (file) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa ảnh này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                try {
                    await axios.delete(`http://localhost:5000/api/uploads/product`, {
                        data: { imageUrl: file.url, productId: product?._id },
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    message.success('Xóa ảnh thành công');
                    const newFileList = fileList.filter((item) => item.uid !== file.uid);
                    setFileList(newFileList);
                    onUploadSuccess(newFileList.map((item) => item.url));
                } catch (error) {
                    message.error('Xóa ảnh thất bại');
                }
            },
        });

        return false;
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                customRequest={customRequest}
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Image
                style={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                }}
                src={previewImage}
            />
        </>
    );
};

export default UploadImage;
