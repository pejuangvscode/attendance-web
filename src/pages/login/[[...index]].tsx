import { SignIn, SignedIn, UserButton, SignedOut } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/background.jpg')]">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignIn path="/login" routing="path" signUpUrl="/login" />
        </SignedOut>
    </div>
  );
}
