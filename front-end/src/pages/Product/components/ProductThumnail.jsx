import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'


ProductThumnail.propTypes = {
    product : PropTypes.object
}


function ProductThumnail({product}) {
    const thumbnailUrl = product.images[0] 
    // Chờ Api image từ BE
    //=====================================================================================================
    // ? `http://localhost:5000/${product?.images[0]}`
    ? `${product?.images[0]}`
    : 'https://via.placeholder.com/444'
    // const thumbnailUrl = "https://curnonwatch.com/wp-content/uploads/2024/06/NGO06970-1-e1717429748128.jpg"
  return (
    <Box>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  )
}

export default ProductThumnail
