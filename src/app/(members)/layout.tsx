import MemberNav from "@/components/course/MemberNav";

/* Member shell — navigation only. Auth and entitlement are checked in each
   page via the DAL (layouts do not re-run on every navigation). */
export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MemberNav />
      {children}
    </>
  );
}
