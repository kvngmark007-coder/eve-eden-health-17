import { createFileRoute, Link } from "@tanstack/react-router";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eve & Eden Health — Modern pregnancy in Africa" },
      {
        name: "description",
        content:
          "The operating system for modern pregnancy in Africa. Trusted guidance for expecting parents and providers.",
      },
      { property: "og:title", content: "Eve & Eden Health" },
      {
        property: "og:description",
        content: "The operating system for modern pregnancy in Africa.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-eve-sand px-6 text-center">
      <h1 className="font-serif text-5xl text-eve-teal sm:text-6xl">
        eve &amp; eden health
      </h1>
      <p className="mt-6 max-w-md font-sans text-base text-eve-muted sm:text-lg">
        The operating system for modern pregnancy in Africa.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to="/eve/onboarding">
          <PrimaryButton>I am expecting</PrimaryButton>
        </Link>
        <Link to="/eden/login">
          <SecondaryButton>I am a provider</SecondaryButton>
        </Link>
      </div>
    </main>
  );
}
