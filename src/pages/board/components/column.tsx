import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Typography } from "@/components/typography/typography";
import { CirclePlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapStatusNames } from "@/utils/map-status-names";
import { statusColorMap } from "@/utils/status-color-map";

type ColumnProps = {
  children: React.ReactNode;
  id: string;
};

export function Column({ children, id }: ColumnProps) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: "draggableCard",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div className="flex! flex-col gap-2  w-64 items-center border rounded-2xl shadow self-start pb-2 bg-surface">
      <div className="w-full flex justify-between items-center border-b px-2 py-2">
        <div className="flex flex-row justify-center items-center gap-4 ml-2">
          <div className={`w-4 h-4 ${statusColorMap[id]} rounded-full`} />
          <Typography
            variant="p"
            className="text-text-primary font-medium text-sm mb-0.5"
          >
            {mapStatusNames[id]}
          </Typography>
        </div>
        <Button variant={"ghost"} className="w-8 h-8 rounded-lg m-0">
          <CirclePlus size={16} className="text-text-secondary" />
        </Button>
      </div>
      <div ref={ref} className="flex! flex-col gap-2  w-60 min-h-12">
        {children}
      </div>
      <Button className="w-60" size={"sm"}>
        <Plus color="#FFFFFF" />
        Add new application
      </Button>
    </div>
  );
}
