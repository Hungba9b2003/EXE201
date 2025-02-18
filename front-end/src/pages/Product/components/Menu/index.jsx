import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import menuApi from "../../../../api/menuApi";

function MenuItemLeft({onChange}) {
  const [data, setData]= useState([])
  useEffect(() => {
    (async () => {
      try {
        const data = await menuApi.getAll();
        setData(data);
      } catch (error) {
        console.log('Failed to fetch carts list', error);
      }
    })();
  }, [])

  // const handleOnClick = (e) => {
  //   const str = e.key;
  //   const result = str.split(' ');
  //   if (onChange) {
  //     onChange(result);
  //   }
  // };
  const handleOnClick = (e) => {
    const str = e.key;
    const result = str.split(' ');
    if (onChange) {
      // Xử lý kết quả để chỉ lấy typeId nếu cả categoryId và typeId đều có
      const [typeId] = result.slice(-1);
      onChange([result[0], typeId]);
    }
  };
  
  const menuItem = data.map((menu) => {
    return {
      key: menu._id.toString(),
      icon: <AppstoreOutlined />,
      label: menu.name,
      children: menu.categories.map((category) => {
        return {
          key: `categoryId ${category._id.toString()} `,
          label: category.name,
          onTitleClick: handleOnClick,
          children: category.types.map((type) => {
            return {
              key:`typeId ${type._id.toString()}`,
              label: type.name,
            };
          }),
        };
      }),
    };
  });

  return <Menu mode="inline" style={{ width: '100%' , background:'white' }} items={menuItem} onClick={handleOnClick} />;
};
export default MenuItemLeft
