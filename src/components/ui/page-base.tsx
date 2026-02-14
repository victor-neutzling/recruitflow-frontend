import { type ReactNode } from "react";

type PageBaseProps = {
  children: ReactNode;
};

export default function PageBase({ children }: PageBaseProps) {
  return (
    <div className="min-h-screen w-full flex">
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
