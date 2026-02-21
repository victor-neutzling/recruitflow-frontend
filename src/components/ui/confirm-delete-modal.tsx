import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ConfirmDeleteModalProps = {
  handleDelete: () => void;
  customText?: string;
};

export function ConfirmDeleteModal({
  handleDelete,
  customText = "Are you sure you want to delete this application?",
}: ConfirmDeleteModalProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{customText}</AlertDialogTitle>
        <AlertDialogDescription>
          this action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant={"destructive"} onClick={handleDelete}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
