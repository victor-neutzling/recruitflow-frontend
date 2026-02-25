import LogoBlack from "@/assets/vector/default-monochrome-black.svg";
import LogoWhite from "@/assets/vector/default-monochrome-white.svg";
import LogoFull from "@/assets/vector/default-monochrome.svg";

type LogoProps = {
  size: "sm" | "md" | "lg";
  color: "full" | "black" | "white";
};

export function Logo({ size, color }: LogoProps) {
  const sizeMap = {
    sm: 180,
    md: 300,
    lg: 480,
  };

  const colorMap = {
    full: LogoFull,
    black: LogoBlack,
    white: LogoWhite,
  };

  return (
    <img
      src={colorMap[color]}
      width={sizeMap[size]}
      height={sizeMap[size]}
      alt="Logo"
    />
  );
}
