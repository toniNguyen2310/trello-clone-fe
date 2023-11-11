import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound(props) {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang bạn đang tìm kiếm có thể đã bị xóa,
         thay đổi link hoặc chưa bao giờ tồn tại."
      extra={
        <Button
          style={{ background: "#ffffff", color: "#072754" }}
          type="primary"
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </Button>
      }
    />
  );
}

export default NotFound;
