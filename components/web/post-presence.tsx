"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import FacePile from "@convex-dev/presence/facepile";
import usePresence from "@convex-dev/presence/react";

interface IPostPresence {
  roomId: Id<"posts">;
  userId: string;
}
export function PostPresence({ roomId, userId }: IPostPresence) {
  const presenceState = usePresence(api.presence, roomId, userId);
  if (!presenceState || presenceState.length === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 relative">
      <p className="tracking-wide text-xs">کاربران انلاین در این پست </p>
      <div className="text-black/70">
        <FacePile presenceState={presenceState} />
      </div>
    </div>
  );
}
