import { ResponsiveDialog } from "@/components/responsive-dialog";
import { PostForm } from "./post-form";

interface NewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewPostDialog = ({ open, onOpenChange }: NewPostDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Post"
      description="Create a new post"
    >
      <PostForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
