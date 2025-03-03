// ============================================================================================================
import { Pagination } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productsApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import './style.scss';
import slideImage from '../../../assets/images/Slide4.png';
import Slideshow from '../../../components/Slideshow';
import { Typography } from '@material-ui/core';
import ProductClear from '../components/ProductClear';
import ProductType from '../components/Type/ProductType';
import categoryApi from '../../../api/categoryApi';

function ListPage(props) {
    const [productList, setProductList] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 16,
            _sort: params._sort || 'asc',
        };
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(JSON.stringify(queryParams) + 'oke');
                const data = await productsApi.getAll(queryParams);
                setProductList(data.rows);
                setTotalProducts(data.totalProducts);
            } catch (error) {
                console.log('Failed to get all products:', error);
            }
        };
        fetchData();
    }, [queryParams]);

    const handleSortChange = (newSortValue) => {
        const filters = {
            ...queryParams,
            _sort: newSortValue,
        };

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleFiltersChange = (newFilters) => {
        const filters = {
            ...queryParams,
            ...newFilters,
        };

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        });
    };
    const handleCategoryChange = (newCategoryGender) => {
        const filters = {
            ...queryParams,
            category: newCategoryGender,
        };

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        });
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '60px' }}>
            <div className='wrapper__product'>
                <div className='wrapper__product__filter'>
                    <ProductFilter
                        filters={queryParams}
                        onChange={handleFiltersChange}
                    />
                </div>
                <div className='wrapper__product__productList'>
                    {/* <div className='wrapper__product__productList_type'>
                        <ProductType
                            filters={queryParams}
                            onChange={handleCategoryChange}
                        />
                    </div> */}
                    <div
                        className='wrapper__product__productList__filterViewer'
                        style={{ display: 'flex', marginBottom: '10px' }}
                    >
                        <FilterViewer
                            filters={queryParams}
                            onChange={handleFiltersChange}
                        />
                        <ProductSort
                            currentSort={queryParams._sort}
                            onChange={handleSortChange}
                        />
                    </div>
                    <div className='wrapper__product__productList__products'>
                        {productList && productList.length > 0 ? (
                            <>
                                <ProductList data={productList} />
                                <Pagination
                                    className='custom-pagination'
                                    align='center'
                                    current={Number.parseInt(queryParams._page)}
                                    total={totalProducts}
                                    pageSize={queryParams._limit}
                                    onChange={(page) => handleFiltersChange({ _page: page })}
                                />
                            </>
                        ) : (
                            <ProductClear />
                        )}
                    </div>
                </div>
            </div>

            <div className='wrapper__middle'>
                <Typography
                    variant='h5'
                    style={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                >
                    BE PART OF PAWSOME
                </Typography>
                <Typography style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                    Sự thoải mái của thú cưng, niềm vui của bạn
                </Typography>
            </div>
            <Slideshow />
        </div>
    );
}

ListPage.propTypes = {
    // Define prop types if any
};

export default ListPage;
