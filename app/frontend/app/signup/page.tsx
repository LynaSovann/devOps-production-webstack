import SignUpPage from "./_components/SignUpPage";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome</h1>
          <p className="text-muted-foreground">Please Sign up to get Access</p>
        </div>

        <SignUpPage />
      </div>
    </div>
  );
}
