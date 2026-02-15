import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSortable } from "@dnd-kit/react/sortable";

type CardProps = {
  id: string;
  index: number;
  column: string;
  cardData: {
    name: string;
    stuff: string;
  };
};

export function DraggableCard({ id, index, column, cardData }: CardProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "draggableCard",
    accept: "draggableCard",
    group: column,
  });

  return (
    <Card className="draggableCard" ref={ref} dataDragging={isDragging}>
      <CardHeader>
        <CardTitle>{cardData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{cardData.stuff}</CardDescription>
      </CardContent>
    </Card>
  );
}
