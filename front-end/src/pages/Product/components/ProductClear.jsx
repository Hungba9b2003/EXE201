// import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductClear = () => {
    return (
        <Container>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                height='80vh'
                style={{ marginTop: '10px' }}
            >
                {/* <ShoppingCartIcon style={{ fontSize: 100, color: '#ccc' }} /> */}
                <img
                    src='https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/480641541_122111190914740157_4987058906278223923_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHeZZFo_J4v58P-Hwueh9qPNRgGS0KrmPw1GAZLQquY_Bhb6PlQvjXEJ7zWbqEewjo5uEamqYezz-cNtRGjKwdN&_nc_ohc=V4k5yVYWBpYQ7kNvgGwTvvX&_nc_oc=AdgkCdb9k2q_pXywhoOutzKAARgjEBbOE8CLo8NSSFGNKHvCd0lrlJqJ-uTOpa9ZrwA&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=Ao9kwYAnxJdplUd4Jdt0ruD&oh=00_AYA7bYZY_DEy30sCJ_bOFno4MBrKAlxH3Ap7Avr_459A0A&oe=67C26610'
                    alt='empty'
                    className='empty__img'
                    width='160'
                    height='160'
                />
                <Typography
                    variant='h4'
                    component='h1'
                    gutterBottom
                >
                    Không tìm thấy sản phẩm nào phù hợp
                </Typography>
                {/* <Typography variant="body1" color="textSecondary" gutterBottom>
                    Thêm sản phẩm vào giỏ hàng để xem chúng ở đây.
                </Typography> */}
                <Button
                    variant='contained'
                    color='primary'
                    href='/products'
                    style={{
                        background: 'black',
                        color: 'white',
                        borderRadius: '0px',
                        marginTop: '10px',
                        fontFamily: 'monospace',
                    }}
                >
                    Quay lại
                </Button>
            </Box>
        </Container>
    );
};

export default ProductClear;
