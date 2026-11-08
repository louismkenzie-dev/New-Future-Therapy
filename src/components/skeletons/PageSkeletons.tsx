/* Skeleton screens shown the instant a member or team page is requested,
   while its data loads. They echo each page's real layout (sage-pale
   header band, cream body, white cards) so nothing jumps when content
   arrives. The pulse is a slow breathe, and globals.css stills it for
   reduced motion. */

function Bone({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full ${className}`} />;
}

function Loading() {
  return <span className="sr-only">Loading…</span>;
}

function HeaderBand({ lede = true, back = false }: { lede?: boolean; back?: boolean }) {
  return (
    <section className="bg-sage-pale pt-6 pb-8 md:pt-12 md:pb-12 px-5 md:px-6">
      <div className="max-w-3xl mx-auto">
        {back && <Bone className="h-4 w-28 bg-sage-light/50 mb-6" />}
        <Bone className="h-3 w-40 bg-sage-light/60 mb-5" />
        <Bone className="h-9 md:h-11 w-4/5 bg-sage-light/50 rounded-xl mb-3" />
        {lede && <Bone className="h-4 w-3/5 bg-sage-light/40 mt-5" />}
      </div>
    </section>
  );
}

function Card({ lines = 2 }: { lines?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8 flex items-start gap-5">
      <Bone className="h-10 w-10 shrink-0 bg-sage-pale" />
      <div className="flex-1 space-y-3 pt-1">
        <Bone className="h-5 w-2/3 bg-grey-light/80 rounded-lg" />
        {Array.from({ length: lines }, (_, i) => (
          <Bone key={i} className={`h-3.5 bg-grey-light/60 ${i === lines - 1 ? "w-1/2" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

/* A lesson: header, progress row, a video-shaped panel and the Continue pill. */
export function LessonSkeleton() {
  return (
    <div role="status" aria-busy="true">
      <Loading />
      <HeaderBand lede={false} back />
      <section className="py-8 md:py-16 px-5 md:px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <Bone className="h-2 flex-1 bg-sage-pale" />
            <Bone className="h-3 w-12 bg-grey-light/70" />
            <Bone className="h-11 w-11 bg-grey-light/50" />
          </div>
          <Bone className="h-3 w-48 bg-grey-light/70 mb-4" />
          <div className="animate-pulse aspect-video rounded-2xl bg-sage-pale border border-grey-light" />
          <div className="space-y-3 mt-8">
            <Bone className="h-4 w-full bg-grey-light/60" />
            <Bone className="h-4 w-5/6 bg-grey-light/60" />
          </div>
          <div className="flex justify-end mt-10 pt-6 border-t border-grey-light">
            <Bone className="h-[52px] w-40 bg-sage-light/50" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* The module list. */
export function ModuleListSkeleton() {
  return (
    <div role="status" aria-busy="true">
      <Loading />
      <HeaderBand />
      <section className="py-10 md:py-16 px-5 md:px-6 bg-cream">
        <div className="max-w-3xl mx-auto space-y-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i} lines={2} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* Any other member or team page: header band and a few cards. */
export function PageSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div role="status" aria-busy="true">
      <Loading />
      <HeaderBand />
      <section className="py-10 md:py-16 px-5 md:px-6 bg-cream">
        <div className="max-w-3xl mx-auto space-y-6">
          {Array.from({ length: cards }, (_, i) => (
            <Card key={i} lines={i === 0 ? 3 : 2} />
          ))}
        </div>
      </section>
    </div>
  );
}
