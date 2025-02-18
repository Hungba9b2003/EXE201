// import React from "react";
// import PropTypes from "prop-types";
// import "boxicons";
// import "../Footer/style.scss";
// import logo from '../../assets/logo/logo.jpg';

// function Footer(props) {
//   return (
//     <div className="wrapper__footer">
//       Footer
//       {/* <a href="/" className="wrapper__footer__logo">
//       <img src={logo} alt="logo"/>

//       </a>

//       <nav className="wrapper__footer__navbar">
//         <a style={{ "--i": 1 }} href="/" className="active">
//           HOME
//         </a>
//         <a style={{ "--i": 2 }} href="about">
//           NAM GIỚI
//         </a>
//         <a style={{ "--i": 3 }} href="reviews">
//           NỮ GIỚI
//         </a>
//         <a style={{ "--i": 4 }} href="featured">
//           VỀ CHÚNG TÔI
//         </a>
//         <a style={{ "--i": 5 }} href="contact">
//           BLOG
//         </a>
//       </nav>

//       <div className="wrapper__footer__social-media">
//         <a style={{ "--i": 1 }} href="https://www.youtube.com/@CurnonWatch">
//           <box-icon type="logo" name="youtube" color="#000"></box-icon>
//         </a>
//         <a style={{ "--i": 2 }} href="https://www.facebook.com/curnonwatch">
//           <box-icon
//             type="logo"
//             name="facebook-circle"
//             color="#000"
//           ></box-icon>
//         </a>
//         <a style={{ "--i": 3 }} href="https://www.instagram.com/curnonwatchcom/">
//           <box-icon type="logo" name="instagram-alt" color="#000"></box-icon>
//         </a>
//       </div> */}
//     </div>
//   )
// }

// Footer.propTypes = {}

// export default Footer

// src/components/Footer.js
import React from 'react';
import './style.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__section'>
                <div className='city'>
                    <box-icon
                        name='map'
                        type='solid'
                    ></box-icon>
                    <h4>Hà Nội</h4>
                </div>
                <p>Ngõ 255 Thôn 9 Thạch Hòa, Thạch Thất.</p>
            </div>

            <div className='footer__section'>
                <h4>Thú cưng</h4>
                <p>Đồ chơi</p>
                <p>Quần áo</p>
                <p>Vòng cổ</p>
                <p>Phụ kiện, trang trí theo yêu cầu</p>
            </div>
            <div className='footer__section'>
                <h4>VỀ CHÚNG TÔI</h4>
                <p>Cho doanh nghiệp</p>
                <p>Chính sách đổi trả</p>
                <p>Chính sách vận chuyển</p>
                <p>cskh@pawsome.com</p>
                <p>0974753094</p>
                <div className='wrapper__footer__social-media'>
                    <a
                        style={{ '--i': 1 }}
                        href='#'
                    >
                        <box-icon
                            type='logo'
                            name='youtube'
                            color='#000'
                        ></box-icon>
                    </a>
                    <a
                        style={{ '--i': 2 }}
                        href='https://www.facebook.com/profile.php?id=61572204730054'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <box-icon
                            type='logo'
                            name='facebook-circle'
                            color='#000'
                        ></box-icon>
                    </a>
                    <a
                        style={{ '--i': 3 }}
                        href='#'
                    >
                        <box-icon
                            type='logo'
                            name='instagram-alt'
                            color='#000'
                        ></box-icon>
                    </a>
                </div>
            </div>
            <div className='footer__newsletter'>
                <h4>Nhận thông tin mới nhất từ PAWSOME</h4>
                <input
                    type='text'
                    placeholder='Nhập số điện thoại'
                />
                <input
                    type='text'
                    placeholder='Nhập họ và tên'
                />
                <input
                    type='email'
                    placeholder='Nhập Email'
                />
                <button>Đăng ký ngay</button>
            </div>
        </footer>
    );
};

export default Footer;
