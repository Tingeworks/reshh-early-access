import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/done")({ component: Done });

function Done() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold capitalize mb-4">
            Thank You!
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground">
            We've received your email. You'll receive further details soon.
          </p>
        </div>
      </div>
      <footer className="w-full py-6 text-center text-sm text-muted-foreground flex flex-col items-center">
        <img src="/favicon.svg" height={45} width={45} />
        <p>© 2024 Reshh. All rights reserved.</p>
      </footer>
    </div>
  );
}

