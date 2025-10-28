import { headers } from "next/headers";

import { auth } from "@/auth";
import { SettingsClient } from "@/components/settings-client";

const SettingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      {JSON.stringify(session)}
      <SettingsClient />
    </div>
  );
};

export default SettingsPage;
