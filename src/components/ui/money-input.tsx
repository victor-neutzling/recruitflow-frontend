import * as React from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";

type MoneyInputProps = {
  value?: number;
  onChange?: (value: number | "") => void;
  id: string;
  placeholder: string;
};

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ value, onChange, id, placeholder }, ref) => {
    return (
      <NumericFormat
        placeholder={placeholder}
        getInputRef={ref}
        value={value}
        customInput={Input}
        thousandSeparator=","
        decimalSeparator="."
        prefix="$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        onValueChange={(values) => {
          if (values.floatValue === undefined) {
            onChange?.(0);
          } else {
            onChange?.(values.floatValue);
          }
        }}
        id={id}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
