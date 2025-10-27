import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/login-button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center items-center bg-neutral-200">
      <div className="flex flex-col items-center gap-y-6">
        <h1 className={cn("text-2xl text-blue-700", poppins.className)}>
          AUTH!
        </h1>
        <p className="text-center text-black">Authentication guide</p>
        <LoginButton>
          <Button size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
