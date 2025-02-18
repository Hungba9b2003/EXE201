import React from 'react';
import PropTypes from 'prop-types';
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
                                    src='https://curnonwatch.com/wp-content/uploads/2024/04/ANN_8573-Edit.jpg'
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
                                    src='https://curnonwatch.com/wp-content/uploads/2024/04/8_310076-Edit.jpeg'
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
