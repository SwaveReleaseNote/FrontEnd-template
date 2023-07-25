import React from "react";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "30vh", // Set the desired height
        backgroundColor: "#f0f0f0", // Set the background color
        borderRadius: "8px", // Optional: Add some border radius for a nicer look
      }}
    >
      <div style={{ fontSize: "3vh", fontWeight: "bold" }}>
        로딩중입니다... 기다려주세요😊
      </div>
    </div>
  );
};

export default LoadingComponent;