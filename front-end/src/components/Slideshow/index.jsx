import React, { Children } from 'react';
import { Carousel } from 'antd';
import slide0 from '../../assets/slide/slide0.JPG';
import slide1 from '../../assets/slide/slide1.jpg';
import slide2 from '../../assets/slide/slide2.jpg';
import slide3 from '../../assets/slide/slide3.jpg';
import slide4 from '../../assets/slide/slide4.jpg';
import slide5 from '../../assets/slide/slide5.jpg';
import slide6 from '../../assets/slide/slide6.jpg';
import slide7 from '../../assets/slide/slide7.jpg';
import slide8 from '../../assets/slide/slide8.JPG';
import slide9 from '../../assets/slide/slide9.jpg';
import slide10 from '../../assets/slide/slide10.jpg';
import slide11 from '../../assets/slide/slide11.jpg';
import slide13 from '../../assets/slide/slide13.jpg';
import slide12 from '../../assets/slide/slide12.jpg';
const imageList = [
    {
        key: '1',
        name: 'silde1',
        children: [
            {
                key: '1-1',
                src: slide0,
                alt: 'Image 1',
            },
            {
                key: '1-2',
                src: slide1,
                alt: 'Image 2',
            },
            {
                key: '1-3',
                src: slide2,
                alt: 'Image 3',
            },
            {
                key: '1-4',
                src: slide3,
                alt: 'Image 4',
            },
            {
                key: '1-5',
                src: slide4,
                alt: 'Image 5',
            },
            {
                key: '1-6',
                src: slide5,
                alt: 'Image 12',
            },
            {
                key: '1-7',
                src: slide6,
                alt: 'Image 13',
            },
        ],
    },
    {
        key: '2',
        name: 'silde2',
        children: [
            {
                key: '1-8',
                src: slide0,
                alt: 'Image 6',
            },
            {
                key: '1-9',
                src: slide1,
                alt: 'Image 7',
            },
            {
                key: '1-10',
                src: slide2,
                alt: 'Image 8',
            },
            {
                key: '1-11',
                src: slide3,
                alt: 'Image 9',
            },
            {
                key: '1-12',
                src: slide4,
                alt: 'Image 10',
            },
            {
                key: '1-13',
                src: slide5,
                alt: 'Image 11',
            },
            {
                key: '1-14',
                src: slide6,
                alt: 'Image 12',
            },
        ],
    },
];

const Slideshow = () => {
    return (
        <Carousel
            autoplay
            autoplaySpeed={1500}
            arrows
            draggable
            waitForAnimate
            speed={2000}
        >
            {imageList.map((boxSlide, index) => (
                <div key={boxSlide.key}>
                    <div key={boxSlide.key}>
                        {boxSlide.children && (
                            <div style={{ display: 'flex' }}>
                                {boxSlide.children.map((image, index2) => (
                                    <>
                                        <img
                                            key={image.key}
                                            src={image.src}
                                            alt={image.alt}
                                            style={{
                                                width: '261px',
                                                height: '313px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Slideshow;
