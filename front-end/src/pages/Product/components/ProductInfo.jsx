import { Box, makeStyles, Modal, Typography } from '@material-ui/core';
import { Button } from 'antd';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartsApi from '../../../api/cartApi';
import orderApi from '../../../api/ordersApi';
import userApi from '../../../api/userApi';
import { discountPercentage, formatPrice } from '../../../utils/common';
import { addToCart, setCartItems } from '../../Cart/cartSlice';

ProductInfo.propTypes = {
    product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    dialSize: {
        marginTop: theme.spacing(3), // Thêm khoảng cách phía trên
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    descriptionBox: {
        fontFamily: 'monospace',
    },
    descriptionTitle: {
        fontWeight: '800',
        fontFamily: 'monospace',
        fontSize: '20px',
        // borderBottom: `1px solid ${theme.palette.grey[300]}`,
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        marginTop: '10px',
    },
    description: {
        fontFamily: 'monospace',
        fontSize: '20px',
    },
    priceBox: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        margin: ' 15px 0px',
    },
    salePrice: {
        marginRight: theme.spacing(1),
        fontSize: '18px',
        fontFamily: 'monospace',
        fontWeight: '600',
    },
    originalPrice: {
        marginRight: theme.spacing(1),
        fontSize: '18px',
        fontFamily: 'monospace',
        textDecoration: 'line-through',
        color: '#807D7C',
    },
    promotionPercent: {
        color: '#dc4136',
        fontSize: '18px',
        fontFamily: 'monospace',
        fontWeight: '500',
    },
    sizeName: {
        justifyContent: 'conter',
        fontFamily: 'monospace',
        fontSize: '24px',
    },
    payment: {
        margin: ' 15px 0px',
    },
    policy: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '.5rem',
        gap: '.8rem',
        // borderTop: `1px solid ${theme.palette.grey[300]}`,

        '& > span': {
            color: '#807D7C',
            fontFamily: 'monospace',
            fontSize: '20px',
        },
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

function ProductInfo({ product = {} }) {
    const [selectedSize, setSelectedSize] = useState('');
    const classes = useStyles();
    const { name, description, salePrice, originalPrice, _id, images, sizes } = product;
    const userId = localStorage.getItem('userId');
    const promotionPercent = discountPercentage(originalPrice, salePrice);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState([]);
    const shippingInfo = {
        size: selectedSize,
        receiver: userInfo.displayName,
        phone: userInfo.contactPhone,
        address: userInfo.address,
        addressDetail: userInfo.addressDetail,
        isInCart: false,
    };
    const [error, setError] = useState('');

    // Fake data for test pay now
    // ============================================================================================================================
    // const shippingInfo = {
    //     receiver:"Pham Thanh Son",
    //     phone: "0982201057",
    //     address: "Thanh Tri , Ha Noi",
    //     addressDetail : "so 6 , day D , Ngu Hiep",
    //     isInCart: false
    // }
    // ============================================================================================================================
    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };
    useEffect(() => {
        if (!userId) {
            setError('No user ID found in local storage');
            return;
        }
        (async () => {
            try {
                const userInfo = await userApi.getInfo(userId);
                setUserInfo(userInfo);
            } catch (error) {
                setError('Failed to fetch account info');
            }
        })();
    }, [userId]);

    // Payload add to cart
    // ============================================================================================================================
    const productId = _id ? _id.toString() : '';
    const quantity = 1;
    const payload = { userId, productId, size: selectedSize, quantity };
    // ============================================================================================================================
    const handleAddToCart = async () => {
        if (!userId) {
            setOpenModal(true);
            return;
        }
        try {
            await cartsApi.add(payload);
            const cartList = await cartsApi.getAll(userId);

            // Cập nhật Redux store với danh sách giỏ hàng mới
            dispatch(setCartItems(cartList));

            enqueueSnackbar('Đã thêm vào giỏ hàng', { variant: 'success' });
        } catch (error) {
            console.error('Add to cart failed:', error);
            enqueueSnackbar('Đã xảy ra lỗi!', { variant: 'error' });
        }
    };

    // Payload pay now
    // ============================================================================================================================
    const price = salePrice;
    const urlImage = images[0];
    const products = [{ productId, price, quantity, urlImage }];
    const payloadPay = { userId, products, shippingInfo };
    // ============================================================================================================================
    const handleBuyNow = async () => {
        if (!userId) {
            setOpenModal(true);
            return;
        }
        try {
            const req = await orderApi.add(payloadPay);
            navigate(`/orders?id=${req.orderExist._id}`);
        } catch (error) {
            enqueueSnackbar('Đã xảy ra lỗi! Vui lòng thử lại sau.', { variant: 'error' });
        }
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleNavigate = () => {
        navigate('/login');
    };

    return (
        <Box className={classes.root}>
            {/* Tên sản phẩm  */}
            <Typography
                component='h1'
                variant='h3'
                className={classes.name}
            >
                {name}
            </Typography>
            {/* Box giá sản phẩm */}
            <Box className={classes.priceBox}>
                <Box
                    component='span'
                    className={classes.salePrice}
                >
                    {formatPrice(salePrice)}
                </Box>
                {promotionPercent > 0 && (
                    <>
                        <Box
                            component='span'
                            className={classes.originalPrice}
                        >
                            {formatPrice(originalPrice)}
                        </Box>
                        <Box
                            component='span'
                            className={classes.promotionPercent}
                        >
                            {` ${promotionPercent}%`}
                        </Box>
                    </>
                )}
            </Box>
            {/* Box chọn size mặt đồng hồ */}
            <Box className='dialSize'>
                <Typography className='sizeName'>Size:</Typography>
                <Box
                    className='size'
                    style={{ display: 'flex', gap: '10px', marginTop: '10px' }}
                >
                    {product.sizes?.map((item) => (
                        <Button
                            key={item.size}
                            variant={selectedSize === item.size ? 'contained' : 'outlined'}
                            color='primary'
                            disabled={item.quantity === 0}
                            onClick={() => handleSizeChange(item.size)}
                            style={{
                                minWidth: '50px',
                                textTransform: 'none',
                                backgroundColor: selectedSize === item.size ? '#000' : '#fff',
                                color: selectedSize === item.size ? '#fff' : '#000',
                                border: item.quantity === 0 ? '1px solid #aaa' : '1px solid #000',
                                opacity: item.quantity === 0 ? 0.5 : 1,
                                cursor: item.quantity === 0 ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {item.size}
                        </Button>
                    ))}
                </Box>
            </Box>
            {/* Box chọn Mua ngay hoặc add to cart */}
            <Box className={classes.payment}>
                <Button
                    type='primary'
                    onClick={handleBuyNow}
                    style={{
                        marginRight: '10px',
                        background: 'black',
                        borderRadius: '0px',
                        fontFamily: 'monospace',
                    }}
                >
                    Mua ngay
                </Button>
                <Button
                    type='primary'
                    onClick={handleAddToCart}
                    style={{
                        marginRight: '10px',
                        background: 'white',
                        color: 'black',
                        border: '1px solid black',
                        fontWeight: 'bold',
                        borderRadius: '0px',
                        fontFamily: 'monospace',
                    }}
                >
                    Thêm vào giỏ hàng
                </Button>
            </Box>
            {/* Box chính sách mua hàng  */}
            <Box>
                <Box className={classes.policy}>
                    <box-icon name='refresh'></box-icon>
                    <Box component='span'>ĐỔI TRẢ MIỄN PHÍ trong 15 ngày</Box>
                </Box>
                <Box className={classes.policy}>
                    <box-icon name='package'></box-icon>
                    <Box component='span'>FREE SHIPPING đơn hàng &gt; 500K</Box>
                </Box>
                <Box className={classes.policy}>
                    <box-icon name='check-shield'></box-icon>
                    <Box component='span'>Lỗi 1 đổi 1 (Với lỗi từ Nhà sản xuất)</Box>
                </Box>
            </Box>
            {/* Box thông tin sản phẩm  */}
            <Box className={classes.descriptionBox}>
                <Typography className={classes.descriptionTitle}>THÔNG TIN</Typography>
                <Typography
                    variant='body2'
                    className={classes.description}
                >
                    {description}
                </Typography>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby='modal-title'
                aria-describedby='modal-description'
            >
                <div className={classes.modal}>
                    <Typography
                        variant='h5'
                        id='modal-title'
                        style={{ fontFamily: 'monospace' }}
                    >
                        Vui lòng đăng nhập để tiếp tục
                    </Typography>
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                        }}
                    >
                        <Button
                            style={{
                                borderRadius: '0px',
                                height: '32px',
                                width: '100px',
                                fontFamily: 'monospace',
                            }}
                            onClick={handleCloseModal}
                        >
                            Đóng
                        </Button>
                        <Button
                            style={{
                                borderRadius: '0px',
                                height: '32px',
                                width: '100px',
                                background: 'black',
                                color: '#fff',
                                fontFamily: 'monospace',
                            }}
                            onClick={handleNavigate}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </div>
            </Modal>
        </Box>
    );
}

export default ProductInfo;
