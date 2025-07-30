"use client";

import { useState } from "react";
import { toastError, toastSuccess } from "../Toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

export default function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendFeedback = async () => {
    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append("message", feedbackText);

      const res = await fetch("http://127.0.0.1:9007/feedback", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to send feedback");

      toastSuccess("Feedback submitted. Thank you!");
      setFeedbackText("");
      setOpen(false);
    } catch (err) {
      toastError("Failed to send feedback.");
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
      >
        Feedback
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              Report bugs, incorrect results, or share your experience.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            placeholder="Example: The result is inaccurate compared to the actual location..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="h-40"
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setFeedbackText("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSendFeedback} disabled={isSending}>
              {isSending ? "Sending..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
