import React from 'react';
import { Paper } from '@material-ui/core';
import { Typography } from 'antd';

function ProductPolicyReturn() {
    return (
        <Paper
            elevation={0}
            style={{ padding: '15px' }}
        >
            <Typography
                variant='h5'
                style={{ fontFamily: 'monospace', fontWeight: '600' }}
            >
                Chính sách đổi và trả hàng
            </Typography>
            <Typography style={{ marginTop: '10px' }}>
                <strong>Địa chỉ đổi và trả hàng:</strong>
                <br />
                Pawsome - 0334834775 - Thôn Kim Bông, xã Tân Xã, huyện Thạch Thất, thành phố Hà Nội
            </Typography>

            <Typography style={{ marginTop: '10px' }}>
                <strong>Trường hợp có thể đổi và trả hàng:</strong>
                <ul>
                    <li>Trong vòng 7 ngày kể từ ngày nhận được hàng hóa.</li>
                    <li>
                        Nếu hàng hóa và dịch vụ nhận được không đúng với nội dung đã được ghi rõ
                        hoặc quảng cáo, có thể yêu cầu đổi trả trong vòng 1 tháng kể từ ngày nhận
                        hàng hoặc trong vòng 30 ngày kể từ ngày biết được sự việc đó.
                    </li>
                </ul>
            </Typography>

            <Typography style={{ marginTop: '10px' }}>
                <strong>Trường hợp không thể đổi và trả hàng:</strong>
                <ul>
                    <li>
                        Hàng hóa bị hư hỏng hoặc mất mát do lỗi của người tiêu dùng (trừ khi chỉ làm
                        hỏng bao bì để kiểm tra nội dung).
                    </li>
                    <li>Giá trị hàng hóa giảm đáng kể do việc sử dụng hoặc tiêu thụ một phần.</li>
                    <li>
                        Giá trị hàng hóa giảm đáng kể đến mức khó bán lại do thời gian sử dụng trước
                        đó.
                    </li>
                    <li>Hình thức của sản phẩm bị hư hỏng.</li>
                </ul>
            </Typography>

            <Typography style={{ marginTop: '10px', color: 'red', fontWeight: 'bold' }}>
                <strong>Lưu ý:</strong> Nếu khách hàng thay đổi ý định và muốn đổi hoặc trả hàng,
                chi phí vận chuyển hàng hoàn trả sẽ do khách hàng chịu (bao gồm cả việc đổi màu sắc,
                đổi kích thước, v.v.).
            </Typography>
        </Paper>
    );
}

ProductPolicyReturn.propTypes = {};
export default ProductPolicyReturn;
