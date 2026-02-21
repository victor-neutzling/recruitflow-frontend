import { useState } from "react";
import { Typography } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";

interface DescriptionWithReadMoreProps {
  description?: string;
  limit?: number;
}

export function Description({
  description,
  limit = 100,
}: DescriptionWithReadMoreProps) {
  const [isReadMoreEnabled, setIsReadMoreEnabled] = useState(false);

  if (!description) {
    return (
      <div className="w-full flex justify-center">
        <Typography>No description provided.</Typography>
      </div>
    );
  }

  if (description.length <= limit) {
    return (
      <div className="w-full flex flex-col justify-center">
        <Typography className="w-full">{description}</Typography>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full flex flex-col items-center">
        {isReadMoreEnabled ? (
          <>
            <Typography className="text-sm">{description}</Typography>
            <div className="w-full border-b mt-2" />
            <Button variant="link" onClick={() => setIsReadMoreEnabled(false)}>
              read less
            </Button>
          </>
        ) : (
          <>
            <Typography className="text-sm">
              {description.slice(0, limit) + "..."}
            </Typography>
            <div className="w-full border-b mt-2" />
            <Button variant="link" onClick={() => setIsReadMoreEnabled(true)}>
              read more
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
