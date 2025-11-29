import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center h-[90vh]">
      <SignIn forceRedirectUrl={"/dashboard"} />
    </main>
  );
}
