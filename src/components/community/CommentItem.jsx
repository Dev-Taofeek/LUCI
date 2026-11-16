"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";

const STANCE_LABEL = { agree: "Agrees", disagree: "Disagrees", mixed: "It's complicated" };

export default function CommentItem({ comment, slug, isReply = false }) {
  const [replying, setReplying] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm">
        <span className="size-8 rounded-control bg-border-light flex items-center justify-center font-semibold text-maroon-deep">
          {comment.name.charAt(0).toUpperCase()}
        </span>
        <span className="font-semibold text-charcoal">{comment.name}</span>
        {comment.stance && (
          <span className="text-xs border border-border-mid rounded-control px-2 py-0.5 text-muted">
            {STANCE_LABEL[comment.stance]}
          </span>
        )}
        <span className="text-muted">
          · {new Date(comment.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>

      <p className="text-sm sm:text-base text-charcoal whitespace-pre-wrap break-words">{comment.body}</p>

      {!isReply && (
        <button
          onClick={() => setReplying((v) => !v)}
          className="text-sm font-semibold text-muted hover:text-maroon-deep w-fit"
        >
          {replying ? "Cancel" : "Reply"}
        </button>
      )}

      {replying && (
        <div className="mt-2">
          <CommentForm slug={slug} parentId={comment.id} compact onDone={() => setReplying(false)} />
        </div>
      )}
    </div>
  );
}