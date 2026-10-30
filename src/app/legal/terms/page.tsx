import { uiText } from "@/modules/data/ui-text";

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-28">
      <h1>{uiText.legal.termsTitle}</h1>
      <p className="text-muted-foreground">{uiText.legal.termsDescription}</p>
    </main>
  );
}
