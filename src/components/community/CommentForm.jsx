"use client";

import { useActionState, useEffect, useRef } from "react";
import { addComment } from "./actions";

const STANCES = [
  { value: "agree", label: "👍 Agree" },
  { value: "mixed", label: "🤔 It's complicated" },
  { value: "disagree", label: "👎 Disagree" },
];

export default function CommentForm({ slug, parentId = null, onDone, compact = false }) {
  const [state, action, pending] = useActionState(addComment, null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      onDone?.();
    }
  }, [state, onDone]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3">
      <input type="hidden" name="slug" value={slug} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {!compact && (
        <div className="flex flex-wrap gap-2">
          {STANCES.map((s) => (
            <label key={s.value} className="cursor-pointer">
              <input type="radio" name="stance" value={s.value} className="peer sr-only" />
              <span className="inline-block text-sm border border-border-mid rounded-control px-3 py-1.5 peer-checked:bg-maroon-deep peer-checked:text-white peer-checked:border-maroon-deep">
                {s.label}
              </span>
            </label>
          ))}
        </div>
      )}

      <input
        name="name"
        placeholder="Your name"
        maxLength={60}
        required
        className="border border-border-mid rounded-control px-3 py-2 text-sm"
      />
      <textarea
        name="body"
        placeholder={parentId ? "Write a reply…" : "Share your thoughts…"}
        rows={compact ? 3 : 4}
        maxLength={1500}
        required
        className="border border-border-mid rounded-control px-3 py-2 text-sm resize-y"
      />

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="self-start bg-maroon-deep text-white text-sm font-semibold rounded-control px-5 py-2 disabled:opacity-60"
      >
        {pending ? "Posting…" : parentId ? "Reply" : "Post comment"}
      </button>
    </form>
  );
}