import { SpinnerCircularFixed } from "spinners-react";
export default function LoadingButton(props) {
  const { color, secondaryColor } = props;
  return (
    <SpinnerCircularFixed
      style={{ marginLeft: "5px" }}
      size={20}
      thickness={250}
      speed={180}
      color={color}
      secondaryColor={secondaryColor}
    />
  );
}
