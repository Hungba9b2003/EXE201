import React from "react";
import { Card, List, Button } from "antd";
import "./PostList.scss"; // Import file SCSS của bạn

const { Meta } = Card;

const data = [
    {
      id: 1,
      title: "Top 10 Đồng Hồ Sang Trọng",
      description: "Khám phá những mẫu đồng hồ sang trọng hàng đầu trong năm 2024.",
      imageUrl: "https://curnonwatch.com/blog/wp-content/uploads/2023/03/Aesthetic-la-gi-1024x576.jpg",
    },
    {
      id: 2,
      title: "Cách Bảo Quản Đồng Hồ Cơ",
      description: "Hướng dẫn chi tiết về cách bảo quản đồng hồ cơ để giữ được độ bền.",
      imageUrl: "https://curnonwatch.com/blog/wp-content/uploads/2023/02/qua-tot-nghiep-1024x576.jpg",
    },
    {
      id: 3,
      title: "Xu Hướng Đồng Hồ Thời Trang 2024",
      description: "Những xu hướng đồng hồ thời trang đang gây sốt trong năm nay.",
      imageUrl: "https://curnonwatch.com/blog/wp-content/uploads/2023/03/Phoi-do-voi-quan-jeans-500x300.jpg",
    },
    {
      id: 4,
      title: "Lịch Sử Của Đồng Hồ Rolex",
      description: "Tìm hiểu về lịch sử của thương hiệu đồng hồ nổi tiếng Rolex.",
      imageUrl: "https://curnonwatch.com/blog/wp-content/uploads/2023/03/phoi-do-voi-cardigan-500x300.jpg",
    },
    {
      id: 5,
      title: "Đồng Hồ Thể Thao Tốt Nhất",
      description: "Danh sách những đồng hồ thể thao tốt nhất cho người đam mê vận động.",
      imageUrl: "https://curnonwatch.com/blog/wp-content/uploads/2022/08/cac-hang-dong-ho-noi-tieng-2-1024x576.jpg",
    },
    {
      id: 6,
      title: "Tại Sao Nên Chọn Đồng Hồ Automatic?",
      description: "Lợi ích của việc sử dụng đồng hồ automatic so với đồng hồ quartz.",
      imageUrl: "https://curnonwatch.com/blog/wp-content/uploads/2022/04/Paul.Sneakpeek-1024x769.jpg",
    },
  ];
  

const PostList = () => {
  return (
    <div className="post-list">
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={item.title} src={item.imageUrl} />}
              actions={[<Button type="primary" style={{background:'black'}}>Xem Chi Tiết</Button>]}
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PostList;
