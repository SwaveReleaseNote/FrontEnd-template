type Props = {
  fontSize?: string;
};

const LoadingComponent: React.FC<Props> = ({ fontSize = "3xl" }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px", // Optional: Add some border radius for a nicer look
      }}
    >
      <div className={`font-bold text-${fontSize} dark:text-white p-5`}>
        로딩중입니다...기다려주세요😊
      </div>
    </div>
  );
};

export default LoadingComponent;