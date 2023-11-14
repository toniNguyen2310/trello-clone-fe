import React, { useState } from "react";
import { Button, Spin } from "antd";

function Loading(props) {
  const { spinning } = props;

  return <Spin spinning={spinning} size="large" fullscreen />;
}

export default Loading;
