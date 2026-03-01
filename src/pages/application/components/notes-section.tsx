import type { GetApplicationByIdResponse } from "@/api/application/types";
import { useNoteRoutes } from "@/api/note/useNote";
import { Typography } from "@/components/typography";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ScrollText, Send, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

type NotesSectionProps = {
  notes: GetApplicationByIdResponse["notes"];
};

export function NotesSection({ notes }: NotesSectionProps) {
  const queryClient = useQueryClient();
  const { createNote, deleteNote } = useNoteRoutes();
  const { id } = useParams<{
    mode: string;
    id: string | undefined;
  }>();
  const [noteText, setNoteText] = useState("");

  const createNoteMutation = useMutation({
    mutationKey: ["create-note"],
    mutationFn: async () => {
      const data = await createNote(
        { date: new Date().toISOString(), text: noteText },
        id,
      );
      return data;
    },
    onSuccess: () => {
      toast("Note created successfully!", { position: "top-right" });
      queryClient.refetchQueries({ queryKey: ["get-application-by-id"] });
    },
    onError: () => {
      toast("Note creation failed, please try again.", {
        position: "top-right",
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationKey: ["delete-note"],
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      toast("Note deleted successfully", { position: "top-right" });
      queryClient.refetchQueries({ queryKey: ["get-application-by-id"] });
    },
    onError: () => {
      toast("Note deletion failed.", {
        position: "top-right",
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="p" className="font-bold text-xl">
        Notes
      </Typography>
      {notes.length ? (
        notes.map((note, index) => (
          <div
            className={`flex justify-between w-full pb-2 ${index !== notes.length - 1 && "border-b"}`}
          >
            <div className="flex gap-2 px-4 ">
              <div className="mt-4 mr-2">
                <ScrollText className="text-primary" size={15} />
              </div>
              <div>
                <Typography variant="muted">
                  {format(note.date, "MM/dd/yyyy - hh:mm a")}
                </Typography>
                <Typography>{note.text}</Typography>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-8 rounded-full text-destructive!"
                  variant={"ghost"}
                  size={"sm"}
                  type="button"
                >
                  <Trash />
                </Button>
              </AlertDialogTrigger>
              <ConfirmDeleteModal
                customText="Are you sure you want to delete this note?"
                handleDelete={() => deleteNoteMutation.mutate(note.id)}
              />
            </AlertDialog>
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center py-4">
          <Typography variant="muted">
            there are no notes registered on this application.
          </Typography>
        </div>
      )}
      <div className="flex w-full gap-2">
        <Input
          className="w-full"
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="add a note..."
        />
        <Button
          className="text-surface w-16"
          type="button"
          onClick={() => createNoteMutation.mutate()}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
