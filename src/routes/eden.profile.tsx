import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EdenShell } from "@/components/shells/EdenShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/eden/profile")({
  component: EdenProfile,
});

type Provider = {
  id: string;
  full_name: string | null;
  specialty: string | null;
  clinic_name: string | null;
  bio: string | null;
  languages: string[] | null;
  consultation_fee_mad: number | null;
  accepting_patients: boolean | null;
  city: string | null;
  is_verified: boolean | null;
  avg_rating: number | null;
  review_count: number | null;
};

const LANG_OPTIONS = ["Français", "العربية", "English", "Darija"];

function EdenProfile() {
  const [p, setP] = useState<Provider | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [license, setLicense] = useState("");
  const [clinicAddr, setClinicAddr] = useState("");
  const [verifySent, setVerifySent] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const { data } = await supabase
        .from("providers")
        .select("id,full_name,specialty,clinic_name,bio,languages,consultation_fee_mad,accepting_patients,city,is_verified,avg_rating,review_count")
        .eq("user_id", auth.user.id)
        .maybeSingle();
      if (data) setP(data as Provider);
    })();
  }, []);

  function update<K extends keyof Provider>(k: K, v: Provider[K]) {
    setP((prev) => (prev ? { ...prev, [k]: v } : prev));
  }

  function toggleLang(l: string) {
    if (!p) return;
    const cur = p.languages ?? [];
    update("languages", cur.includes(l) ? cur.filter((x) => x !== l) : [...cur, l]);
  }

  async function save() {
    if (!p) return;
    setSaving(true);
    await supabase.from("providers").update({
      full_name: p.full_name,
      specialty: p.specialty,
      clinic_name: p.clinic_name,
      bio: p.bio,
      languages: p.languages,
      consultation_fee_mad: p.consultation_fee_mad,
      accepting_patients: p.accepting_patients,
      city: p.city,
    }).eq("id", p.id);
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString());
  }

  if (!p) {
    return (
      <EdenShell>
        <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
      </EdenShell>
    );
  }

  return (
    <EdenShell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-sans text-2xl font-medium text-gray-900">Public profile</h1>
          <p className="mt-1 font-sans text-sm text-gray-500">
            How mothers see you on the marketplace.
          </p>
        </div>
        {p.is_verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-eve-teal/10 px-3 py-1 font-sans text-xs text-eve-teal-dark">
            <CheckCircle2 className="h-3.5 w-3.5" /> Verified
          </span>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setShowVerify((v) => !v)}>
            Request verification
          </Button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Edit form */}
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <Field label="Full name">
            <input
              value={p.full_name ?? ""}
              onChange={(e) => update("full_name", e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-sm"
            />
          </Field>
          <Field label="Specialty">
            <select
              value={p.specialty ?? ""}
              onChange={(e) => update("specialty", e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-sm"
            >
              <option value="">Select…</option>
              <option>OB-GYN</option>
              <option>Midwife</option>
              <option>Doula</option>
              <option>Lactation</option>
              <option>General</option>
            </select>
          </Field>
          <Field label="Clinic name">
            <input
              value={p.clinic_name ?? ""}
              onChange={(e) => update("clinic_name", e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-sm"
            />
          </Field>
          <Field label="City">
            <input
              value={p.city ?? ""}
              onChange={(e) => update("city", e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-sm"
            />
          </Field>
          <Field label={`Bio (${(p.bio ?? "").length}/300)`}>
            <textarea
              value={p.bio ?? ""}
              maxLength={300}
              rows={4}
              onChange={(e) => update("bio", e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-sm"
            />
          </Field>
          <Field label="Languages">
            <div className="flex flex-wrap gap-2">
              {LANG_OPTIONS.map((l) => {
                const on = (p.languages ?? []).includes(l);
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => toggleLang(l)}
                    className={
                      "rounded-full border px-3 py-1 font-sans text-xs " +
                      (on
                        ? "bg-eve-teal text-white border-eve-teal-dark"
                        : "bg-white text-gray-600 border-gray-200")
                    }
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Consultation fee (MAD)">
            <input
              type="number"
              value={p.consultation_fee_mad ?? ""}
              onChange={(e) => update("consultation_fee_mad", e.target.value ? Number(e.target.value) : null)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-sm"
            />
          </Field>
          <label className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
            <span className="font-sans text-sm text-gray-700">Accepting new patients</span>
            <input
              type="checkbox"
              checked={!!p.accepting_patients}
              onChange={(e) => update("accepting_patients", e.target.checked)}
              className="h-4 w-4 accent-eve-teal"
            />
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            {savedAt && <span className="font-sans text-xs text-gray-500">Saved {savedAt}</span>}
            <Button className="bg-eve-teal hover:bg-eve-teal-dark" disabled={saving} onClick={save}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>

          {showVerify && !p.is_verified && (
            <div className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-sans text-sm font-medium text-amber-900">Request verification</h3>
              <p className="mt-1 font-sans text-xs text-amber-800">
                Submit your license details so our team can verify you.
              </p>
              <input
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="License number"
                className="mt-3 w-full rounded-md border border-amber-200 px-3 py-2 font-sans text-sm"
              />
              <input
                value={clinicAddr}
                onChange={(e) => setClinicAddr(e.target.value)}
                placeholder="Clinic address"
                className="mt-2 w-full rounded-md border border-amber-200 px-3 py-2 font-sans text-sm"
              />
              <Button
                size="sm"
                className="mt-3 bg-eve-teal hover:bg-eve-teal-dark"
                disabled={!license || !clinicAddr || verifySent}
                onClick={() => setVerifySent(true)}
              >
                {verifySent ? "Submitted" : "Submit for review"}
              </Button>
            </div>
          )}
        </div>

        {/* Live preview */}
        <div>
          <p className="mb-2 font-sans text-xs uppercase tracking-wide text-gray-500">
            Marketplace preview
          </p>
          <ProviderCardPreview p={p} />
        </div>
      </div>
    </EdenShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block font-sans text-xs uppercase tracking-wide text-gray-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function initials(n?: string | null) {
  if (!n) return "·";
  return n.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
}

function ProviderCardPreview({ p }: { p: Provider }) {
  return (
    <div className="rounded-2xl border border-eve-muted/20 bg-eve-cream p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eve-teal text-white font-sans text-base font-medium">
          {initials(p.full_name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg text-eve-forest truncate">
              {p.full_name || "Your name"}
            </h3>
            {p.is_verified && (
              <span className="rounded-full bg-eve-teal/10 px-2 py-0.5 text-[10px] text-eve-teal-dark">
                Verified
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-eve-muted">
            {p.specialty || "Specialty"} · {p.clinic_name || "Clinic"}
          </p>
          <p className="font-sans text-xs text-eve-muted">{p.city || "City"}</p>
        </div>
      </div>
      <p className="mt-3 font-sans text-sm text-gray-700 line-clamp-4">
        {p.bio || "Add a short bio to introduce yourself to expecting mothers."}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(p.languages ?? []).map((l) => (
          <span
            key={l}
            className="rounded-full bg-white px-2 py-0.5 font-sans text-[10px] text-eve-forest border border-eve-muted/20"
          >
            {l}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-eve-muted/20 pt-3">
        <span className="font-sans text-sm font-medium text-eve-forest">
          {p.consultation_fee_mad ? `${p.consultation_fee_mad} MAD` : "Fee not set"}
        </span>
        <span
          className={
            "rounded-full px-2 py-0.5 font-sans text-[10px] " +
            (p.accepting_patients
              ? "bg-eve-teal/10 text-eve-teal-dark"
              : "bg-gray-100 text-gray-500")
          }
        >
          {p.accepting_patients ? "Accepting patients" : "Not accepting"}
        </span>
      </div>
    </div>
  );
}
