import { redirect } from "next/navigation";
import { getOrganizerEmail } from "@/lib/organizer";
import { listRegistrations } from "@/lib/registrations";
import { signOut } from "./actions";

export const dynamic = "force-dynamic"; // never cache a page full of registrations

export default async function OrganizerPage() {
  // Authorization happens on the server, on every request. Hiding a link is not security.
  const email = await getOrganizerEmail();
  if (!email) redirect("/organizer/login");

  const rows = await listRegistrations();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Registrations</h1>
          <p className="text-sm text-charcoal/60">Signed in as {email} · {rows.length} registered</p>
        </div>
        <form action={signOut}>
          <button className="rounded-lg border border-forest px-4 py-2 text-sm font-semibold text-forest">Sign out</button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist text-charcoal/70">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Idea</th>
              <th className="px-4 py-3">Registered</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-charcoal/60">No registrations yet.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-charcoal/10">
                <td className="px-4 py-3 font-semibold">{r.full_name}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3">{r.program}</td>
                <td className="px-4 py-3">{r.idea ?? ""}</td>
                <td className="px-4 py-3">{new Date(r.created_at).toLocaleString("en-PH", { timeZone: "Asia/Manila" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
