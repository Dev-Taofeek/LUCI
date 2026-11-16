import { listComments } from "@/lib/comments";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default async function CommentSection({ slug }) {
  const comments = await listComments(slug);
  const total = comments.reduce((n, c) => n + 1 + c.replies.length, 0);

  const counts = { agree: 0, mixed: 0, disagree: 0 };
  comments.forEach((c) => c.stance && counts[c.stance]++);
  const voted = counts.agree + counts.mixed + counts.disagree;

  return (
    <section id="community" className="flex flex-col gap-6 border-t border-border-mid pt-8 mt-4">
      <h2 className="text-xl sm:text-2xl">Community ({total})</h2>

      {voted > 0 && (
        <div className="flex h-2 rounded-full overflow-hidden bg-border-light" aria-label="Community sentiment">
          <span style={{ width: `${(counts.agree / voted) * 100}%` }} className="bg-green-600" />
          <span style={{ width: `${(counts.mixed / voted) * 100}%` }} className="bg-amber-400" />
          <span style={{ width: `${(counts.disagree / voted) * 100}%` }} className="bg-red-500" />
        </div>
      )}

      <div className="rounded-card border border-border-mid p-4 sm:p-5">
        <h3 className="text-base font-semibold mb-3">What do you think?</h3>
        <CommentForm slug={slug} />
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-muted">No comments yet. Be the first to share your view.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {comments.map((c) => (
            <li key={c.id} className="flex flex-col gap-4">
              <CommentItem comment={c} slug={slug} />
              {c.replies.length > 0 && (
                <ul className="flex flex-col gap-4 ml-4 sm:ml-10 pl-4 border-l border-border-mid">
                  {c.replies.map((r) => (
                    <li key={r.id}>
                      <CommentItem comment={r} slug={slug} isReply />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}