import Image from "next/image";
import type { CommunityPost } from "@/data/community";
import { categoryColors } from "@/data/community";

export default function CommunityCard({ post }: { post: CommunityPost }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md shadow-savoree-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-40 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        {post.approved && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-savoree-green-dark shadow">
            ✓ Admin Reviewed &amp; Approved
          </span>
        )}
      </div>
      <div className="p-4">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${categoryColors[post.category]}`}
        >
          {post.category}
        </span>
        <h3 className="mt-2 font-display text-base font-semibold text-savoree-ink">
          {post.title}
        </h3>
        <p className="mt-0.5 text-sm text-savoree-ink/50">@{post.author}</p>
      </div>
    </div>
  );
}
