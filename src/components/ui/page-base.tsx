import { type ReactNode } from "react";

type PageBaseProps = {
  children: ReactNode;
};

export default function PageBase({ children }: PageBaseProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#F6F7F6]">
      <div className="flex-1 items-center">{children}</div>
    </div>
  );
}
