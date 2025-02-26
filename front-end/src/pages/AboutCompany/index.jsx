import React from 'react';
// import PropTypes from 'prop-types';
import '../AboutCompany/style.scss';

function AboutCompany(props) {
    return (
        <div>
            {/* Container 1 */}
            <div className='aban'>
                <div className='aban__wrap'>
                    <div className='aban__bg'>
                        <img
                            style={{ height: 'fitContent' }}
                            src='https://aglobal.vn/upload/images/th%E1%BB%9Di%20trang%20th%C3%BA%20c%C6%B0ng%20cao%20c%E1%BA%A5p.jpg'
                            alt='About Company'
                        />
                    </div>
                    <div className='container'>
                        <div className='aban__inner'>
                            <div
                                className='aban__ctn'
                                data-aos='zoom-in'
                            >
                                <span className='aban__text'>/bau - săm/</span>
                                <h1 className='aban__title'>Chào bạn, chúng tôi là PAWSOME!</h1>
                                <p className='aban__desc'>
                                    Chúng tôi biến sản phẩm phụ kiện cho thú cưng không thể thiếu
                                    trở thành những biểu tượng tinh thần đầy cảm hứng, đồng thời
                                    cung cấp dịch vụ may chỉnh sửa theo yêu cầu, để thúc đẩy thế hệ
                                    trẻ Việt Nam không ngừng tiến lên phía trước.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Container 2 */}
            <div className='aban2'>
                <div className='aban2__flex'>
                    <div className='aban2__left1'>
                        <div className='aban2__desc'>
                            <h2 className='aban2__title '>TẠI SAO KHÔNG?</h2>
                            <div className='aban2__desc2 '>
                                <p>
                                    Đó là câu hỏi của chúng tôi khi bắt đầu.
                                    <span className='fw-6'>
                                        Và cũng là tinh thần “Why not” chúng tôi khát khao truyền
                                        tải
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='aban2__right1'>
                        <div className='aban2__img'>
                            <div className='aban2__box'>
                                <img
                                    src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/480681922_122111190902740157_4220105789282415779_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF60pWf8v-WE83FYasF1nlfBIWxur4qe1QEhbG6vip7VN2U--c81Au9CcF8Plgs-q-dm6oJZuIev7K08tD_LL5A&_nc_ohc=j1Up9NOGFh0Q7kNvgF10Yfg&_nc_oc=Adhf1dbxLC_lFOsiPc-Xzl9J5A9_kqx5DUxWETxPehtfhO6JoSeMn3wSkChrQgpAbIU&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=A0pFgbVjm5dBu9lPDbBFOTV&oh=00_AYBNyWZlxjb7V22RRSF--HZdTWcFalSBaj034kVvoOJ64w&oe=67C42F66'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='aban2__flex'
                    style={{ height: '500px' }}
                >
                    <div
                        className='aban2__left2'
                        style={{ height: '500px' }}
                    >
                        <div
                            className='aban2__img'
                            data-aos='zoom-in'
                            style={{ height: '500px' }}
                        >
                            <div
                                className='aban2__box'
                                style={{ height: '500px' }}
                            >
                                <img
                                    style={{ height: 'fitContent' }}
                                    src='https://cdn.tgdd.vn/Files/2021/04/19/1344707/top-dia-chi-shop-ban-quan-ao-cho-cho-meo-dep-de-thuong-nhat-202104191853258895.jpg'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className='aban2__right2'>
                        <div
                            className='aban2__desc'
                            data-aos='fade-up'
                        >
                            <h2 className='aban2__title f-title fw-7 t-center'>PAWSOME</h2>
                            <div className='aban2__desc2 fw-5 t16 t-center mona-content'>
                                <div>
                                    <div>
                                        <span>
                                            Mỗi sản phẩm phụ kiện thú cưng của chúng tôi không chỉ
                                            là một thiết kế, mà còn là sự kết tinh của nhiệt huyết,
                                            khát khao và sáng tạo từ những người trẻ Việt Nam. Với
                                            dịch vụ may đo và chỉnh sửa theo yêu cầu, chúng tôi tin
                                            rằng tinh thần ‘Why not’ sẽ luôn đồng hành, truyền cảm
                                            hứng và giúp bạn cùng thú cưng tận hưởng những khoảnh
                                            khắc đặc biệt mỗi ngày.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AboutCompany.propTypes = {};

export default AboutCompany;
