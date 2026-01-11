import React from "react";

export default function Loading(props) {
  const text = props.text ? props.text : "載入中...";
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="spinner-border" role="status" aria-hidden="true"></div>
      <span>{text}</span>
    </div>
  );
}
