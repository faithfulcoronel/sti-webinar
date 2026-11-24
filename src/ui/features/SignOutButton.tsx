import { Button } from "@/ui/components/Button";

export function SignOutButton() {
  return (
    <form action="/api/organizer/sign-out" method="post">
      <Button type="submit" variant="outline">
        Sign out
      </Button>
    </form>
  );
}
