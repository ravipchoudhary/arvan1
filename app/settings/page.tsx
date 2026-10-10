import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/trading-shell";
import { SettingsControls } from "@/components/settings/settings-controls";
import { getSessionUser } from "@/lib/auth/session";

export default async function SettingsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppShell
      title="Settings"
      subtitle="Manage local trading preferences, account security, notifications, and integration status."
      active="/settings"
    >
      <SettingsControls user={{ name: user.name, email: user.email }} />
    </AppShell>
  );
}
