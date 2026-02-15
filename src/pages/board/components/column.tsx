import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

type ColumnProps = {
  children: React.ReactNode;
  id: string;
};

export function Column({ children, id }: ColumnProps) {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "draggableCard",
    collisionPriority: CollisionPriority.Low,
  });

  const style = isDropTarget ? { background: "#00000030" } : undefined;

  return (
    <div
      className="flex flex-col gap-4 bg-accent w-36 Column"
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}
