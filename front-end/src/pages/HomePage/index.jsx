import React from 'react';
import PropTypes from 'prop-types';
import '../HomePage/style.scss';
// import ImageProduct from '../assets/images/NewImageProduct.png'
import newImageProduct from '../../assets/images/product.png';

function HomePage(props) {
    return (
        <div
            style={{}}
            className='wrapper'
        >
            <section className='wrapper__home'>
                <div className='wrapper__home__content'>
                    <h1>PAWSOME </h1>
                    {/* <h3>Redefined !</h3> */}
                    <p>
                        ♥️ Khởi đầu của tình yêu thú cưng ♥️ Chào mừng đến với chúng tôi, doanh
                        nghiệp nhỏ mang tình yêu lớn. Với sứ mệnh giúp thú cưng của bạn trở nên đáng
                        yêu và thanh lịch, Pawsome cố gắng tạo ra những bộ sưu tập chất lượng, sang
                        trọng.
                    </p>
                    <a
                        href='products'
                        className='wrapper__home__content__button'
                    >
                        SHOP NOW
                    </a>
                </div>

                <div className='wrapper__home__image'>
                    <div className='wrapper__home__image__rhombus'>
                        <img
                            style={{ marginLeft: '60px', width: '90%' }}
                            src={newImageProduct}
                            alt='Detroit Watch Model 2'
                        />
                        {/* <img src="https://via.placeholder.com/1920x1080" alt="Car Dealing Experian" /> */}
                    </div>
                </div>

                <div className='wrapper__home__rhombus2'></div>
            </section>
        </div>
    );
}

HomePage.propTypes = {};

export default HomePage;
