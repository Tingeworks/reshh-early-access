import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export const Route = createFileRoute("/")({ component: App });

function App() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiDomain = import.meta.env.VITE_API_DOMAIN || "";
      const response = await fetch(`${apiDomain}/early`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit email");
      }

      // Navigate to done page on success
      navigate({ to: "/done" });
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4">
          <h1 className="text-left text-4xl  lg:text-6xl font-bold capitalize">Where Bengal's Indies feel at home</h1>
          <p className="mt-2 mb-4 text-sm lg:text-base">Join Early Access Today — Limited Spots</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2 flex-col lg:flex-row">
              <Input
                id="email"
                type="email"
                placeholder="someone@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-white px-4 py-6"
              />
              <Button
                type="submit"
                className="bg-[#1249FF] text-white hover:bg-black/90 py-6 px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <footer className="w-full py-6 text-center text-sm text-muted-foreground flex flex-col items-center ">
        <img src="/favicon.svg" height={45} width={45} />
        <p>© 2024 Reshh. All rights reserved.</p>
      </footer>
    </div>
  );
}