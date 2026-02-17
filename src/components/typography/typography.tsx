import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "p" | "muted";

type TypographyProps = React.HTMLAttributes<HTMLElement> & {
  variant?: Variant;
  as?: React.ElementType;
};

const variantStyles: Record<Variant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-text-primary",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight text-text-primary",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-text-primary",
  p: "leading-7 text-text-primary",
  muted: "text-sm text-muted",
};

const defaultElement: Record<Variant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  p: "p",
  muted: "p",
};

export function Typography({
  variant = "p",
  as,
  className,
  ...props
}: TypographyProps) {
  const Component = as || defaultElement[variant];

  return (
    <Component className={cn(variantStyles[variant], className)} {...props} />
  );
}
