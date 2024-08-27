import React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
// const contentStyle = {
//   padding: 50,
//   background: "rgba(0, 0, 0, 0.2)",
//   borderRadius: 4,
// };
// const content = <div style={contentStyle} />;

const Loader = () => {
  return (
    <div className="back fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white opacity-60 z-[9999]">
      <Flex gap="middle">
      <Spin indicator={<LoadingOutlined spin />} size="large"/>
      </Flex>
    </div>
  );
};

export default Loader;
