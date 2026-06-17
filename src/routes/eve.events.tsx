import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Calendar, Star, X } from "lucide-react";
import { EveShell } from "@/components/shells/EveShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/eve/events")({
  component: EventsPage,
});

type Cat =
  | "all"
  | "prenatal"
  | "postpartum"
  | "wellness"
  | "health"
  | "meetup"
  | "workshop"
  | "free";

const FILTERS: { key: Cat; label: string }[] = [
  { key: "all", label: "📅 All Events" },
  { key: "prenatal", label: "🤰 Prenatal" },
  { key: "postpartum", label: "🍼 Postpartum" },
  { key: "wellness", label: "🧘 Wellness" },
  { key: "health", label: "🏥 Health Check" },
  { key: "meetup", label: "👭 Mom Meetup" },
  { key: "workshop", label: "🎓 Workshop" },
  { key: "free", label: "💰 Free Only" },
];

type Ev = {
  id: string;
  title: string;
  month: string;
  day: string;
  time: string;
  location: string;
  organizer: string;
  category: Exclude<Cat, "all" | "free">;
  price: "Free" | string;
  spots: number;
};

const CAT_COLOR: Record<Ev["category"], { border: string; pill: string }> = {
  prenatal: { border: "border-l-eve-teal", pill: "bg-eve-teal-light text-eve-teal" },
  postpartum: { border: "border-l-eve-rose", pill: "bg-eve-rose-light text-eve-rose" },
  wellness: { border: "border-l-eve-terra", pill: "bg-eve-terra-light text-eve-terra" },
  health: { border: "border-l-eve-teal-dark", pill: "bg-eve-teal-light text-eve-teal-dark" },
  meetup: { border: "border-l-eve-terra", pill: "bg-eve-terra-light text-eve-terra" },
  workshop: { border: "border-l-eve-teal", pill: "bg-eve-teal-light text-eve-teal" },
};

const CAT_LABEL: Record<Ev["category"], string> = {
  prenatal: "Prenatal",
  postpartum: "Postpartum",
  wellness: "Wellness",
  health: "Health Check",
  meetup: "Mom Meetup",
  workshop: "Workshop",
};

const EVENTS: Ev[] = [
  { id: "e001", title: "World Breastfeeding Week (SMAM) 2026", month: "AUG", day: "01", time: "Through Aug 07", location: "Morocco-wide", organizer: "By WHO / UNICEF / Ministère de la Santé & partners", category: "meetup", price: "Free", spots: 50 },
  { id: "e002", title: "World Contraception Day 2026", month: "SEP", day: "26", time: "Sat · all day", location: "Morocco-wide", organizer: "By Community partner", category: "meetup", price: "Free", spots: 50 },
  { id: "e003", title: "Octobre Rose — National Breast & Cervical Cancer Screening Campaign 2026", month: "OCT", day: "01", time: "Through Oct 31", location: "Morocco-wide", organizer: "By Ministère de la Santé / Fondation Lalla Salma (contre le cancer)", category: "meetup", price: "Free", spots: 50 },
  { id: "e004", title: "World Mental Health Day 2026", month: "OCT", day: "10", time: "Sat · all day", location: "Morocco-wide", organizer: "By Community partner", category: "meetup", price: "Free", spots: 50 },
  { id: "e005", title: "Pregnancy & Infant Loss Remembrance Day 2026", month: "OCT", day: "15", time: "Thu · all day", location: "Morocco-wide", organizer: "By Community partner", category: "meetup", price: "Free", spots: 50 },
  { id: "e006", title: "World Prematurity Day 2026", month: "NOV", day: "17", time: "Tue · all day", location: "Morocco-wide", organizer: "By Neonatology units & hospitals (e.g. CHU)", category: "meetup", price: "Free", spots: 50 },
  { id: "e007", title: "World Diabetes Day 2026 (gestational diabetes focus)", month: "NOV", day: "14", time: "Sat · all day", location: "Morocco-wide", organizer: "By Community partner", category: "meetup", price: "Free", spots: 50 },
  { id: "e008", title: "Prenatal Yoga at Yogablanca", month: "TBA", day: "–", time: "Ongoing weekly classes — contact for schedule", location: "Yogablanca (Le 7 Anfa), Casablanca", organizer: "By Yogablanca", category: "workshop", price: "Paid (per session/package)", spots: 50 },
  { id: "e009", title: "Prenatal Yoga — Yoga Prénatal Rabat", month: "TBA", day: "–", time: "Ongoing — contact for schedule", location: "Rabat", organizer: "By Yoga Prénatal Rabat", category: "workshop", price: "Free", spots: 50 },
  { id: "e010", title: "Prenatal Yoga — Yoga Therapy by Sara", month: "TBA", day: "–", time: "Ongoing — contact for schedule", location: "Casablanca", organizer: "By Yoga Therapy by Sara", category: "workshop", price: "Free", spots: 50 },
  { id: "e011", title: "Birth & Parenthood Preparation + 'Allai'Thé' Breastfeeding Workshop", month: "TBA", day: "–", time: "Recurring sessions — see PNP agenda", location: "Cabinet Reinescence / Pour Naître Parent (PNP Casa), Casablanca", organizer: "By Laetitia Rustenmeyer (sage-femme)", category: "workshop", price: "Paid", spots: 50 },
  { id: "e012", title: "Birth Preparation Classes at Centre Enkyos", month: "TBA", day: "–", time: "Ongoing programs — contact to enroll", location: "Centre Enkyos, Rabat", organizer: "By Farah Jamal (sage-femme consultante)", category: "workshop", price: "Paid", spots: 50 },
  { id: "e013", title: "Perinatal Workshops at Côté Natal", month: "TBA", day: "–", time: "Ongoing — contact for schedule", location: "Marrakech", organizer: "By Côté Natal", category: "workshop", price: "Free", spots: 50 },
  { id: "e014", title: "Baby & Parent Workshops at Atelier Bébé & Santé", month: "TBA", day: "–", time: "Periodic — see Instagram", location: "Atelier Bébé & Santé (concept store), Marrakech", organizer: "By Atelier Bébé & Santé", category: "workshop", price: "Free", spots: 50 },
  { id: "e015", title: "Prenatal Classes & Workshops — Maison de Naissance Dar Wilada", month: "TBA", day: "–", time: "Ongoing — birth-prep & exercise workshops", location: "Maison de Naissance Dar Wilada Tissir, Casablanca", organizer: "By Aicha El Fathi Daoudi (sage-femme)", category: "workshop", price: "Free", spots: 50 },
  { id: "e016", title: "Planète Maman Bébé — Maternity & Baby Expo (next edition)", month: "TBA", day: "–", time: "Annual consumer expo — 2026 dates to confirm", location: "Casablanca (Anfa) — venue to confirm", organizer: "By Planète Maman Bébé", category: "meetup", price: "Free", spots: 50 },
  { id: "e017", title: "Défi Allaitement Virtuel (Virtual Breastfeeding Challenge)", month: "AUG", day: "01", time: "Through Aug 07", location: "Online", organizer: "By SMAM partners (e.g. Nourri-Source)", category: "workshop", price: "Free", spots: 50 },
  { id: "e018", title: "Online Doula Q&A / IG Lives — Miryam Kanaan Doula", month: "TBA", day: "–", time: "Periodic — follow on Facebook/Instagram", location: "Online", organizer: "By Miryam Kanaan (doula)", category: "workshop", price: "Free", spots: 50 },
  { id: "e019", title: "Online Prenatal & Postpartum Talks — Reinescence/PNP", month: "TBA", day: "–", time: "Periodic — see agenda", location: "Online", organizer: "By Cabinet Reinescence (PNP Casa)", category: "workshop", price: "Free", spots: 50 },
  { id: "e020", title: "40e Congrès SRMGO & 1er Forum Euro-Africain de la Santé de la Femme", month: "APR", day: "15", time: "Through Apr 19", location: "Marrakech", organizer: "By SRMGO with FIGO, FéFOG, AFOG", category: "workshop", price: "Free", spots: 50 },
];

function EventsPage() {
  const [active, setActive] = useState<Cat>("all");
  const [view, setView] = useState<"list" | "map">("list");
  const [rsvp, setRsvp] = useState<Ev | null>(null);
  const [registered, setRegistered] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (active === "all") return EVENTS;
    if (active === "free") return EVENTS.filter((e) => e.price === "Free");
    return EVENTS.filter((e) => e.category === active);
  }, [active]);

  return (
    <EveShell>
      <div className="pt-2">
        <h1 className="font-serif text-3xl text-eve-teal-dark">Events Near You</h1>
        <p className="mt-1 italic font-sans text-sm text-eve-muted">
          Workshops, meetups & health days in your area
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button className="inline-flex items-center gap-1 rounded-full border border-eve-teal px-3 py-1 text-xs font-medium text-eve-teal">
            <MapPin className="h-3 w-3" /> Casablanca
          </button>
          <div className="ml-auto inline-flex rounded-full bg-eve-cream p-0.5 text-xs">
            {(["list", "map"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-full px-3 py-1 font-medium capitalize transition",
                  view === v ? "bg-eve-teal text-white" : "text-eve-muted",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="-mx-5 mt-4 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                active === f.key ? "bg-eve-teal text-white" : "bg-eve-cream text-eve-muted",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {view === "map" ? (
        <div className="mt-5 flex h-56 items-center justify-center rounded-2xl bg-eve-teal-light text-eve-teal">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8" />
            <p className="mt-2 text-sm font-medium">Map coming soon</p>
          </div>
        </div>
      ) : (
        <>
          {/* Featured */}
          <div className="relative mt-5 overflow-hidden rounded-2xl bg-eve-teal p-5 text-white">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20" />
              <div className="absolute right-12 top-10 h-12 w-12 rounded-full bg-white/15" />
              <div className="absolute -bottom-4 left-6 h-16 w-16 rounded-full bg-white/15" />
            </div>
            <span className="relative inline-flex items-center gap-1 rounded-full bg-eve-terra px-2 py-0.5 text-[10px] font-semibold text-white">
              <Star className="h-3 w-3 fill-current" /> Featured
            </span>
            <h3 className="relative mt-2 font-serif text-xl leading-snug">
              Mom Tea Party — Pregnancy Q&A with a Midwife
            </h3>
            <p className="relative mt-2 text-xs opacity-90">
              <Calendar className="mr-1 inline h-3 w-3" />
              Saturday, 7 June 2026 · 10:00am – 12:00pm
            </p>
            <p className="relative mt-1 text-xs opacity-90">
              <MapPin className="mr-1 inline h-3 w-3" />
              Espace Culturel, Casablanca · Free · Arabic + French
            </p>
            <button className="relative mt-3 rounded-full bg-eve-terra px-4 py-2 text-xs font-semibold text-white">
              RSVP Free →
            </button>
          </div>

          {/* Event list */}
          <div className="mt-5 space-y-3">
            {filtered.map((e) => {
              const color = CAT_COLOR[e.category];
              const low = e.spots < 5;
              const isReg = registered[e.id];
              return (
                <article
                  key={e.id}
                  className={cn(
                    "flex items-stretch gap-3 rounded-2xl border-l-4 bg-white p-4 shadow-sm",
                    color.border,
                  )}
                >
                  <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-eve-cream py-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-eve-muted">
                      {e.month}
                    </span>
                    <span className="font-serif text-xl font-bold text-eve-teal">{e.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-[15px] font-semibold leading-snug text-eve-teal-dark">
                      {e.title}
                    </h3>
                    <p className="mt-0.5 text-[12px] text-eve-muted">
                      {e.time} · {e.location}
                    </p>
                    <p className="mt-0.5 text-[11px] text-eve-teal">{e.organizer}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", color.pill)}>
                        {CAT_LABEL[e.category]}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          e.price === "Free"
                            ? "bg-eve-terra-light text-eve-terra"
                            : "bg-eve-sand text-eve-muted",
                        )}
                      >
                        {e.price}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-medium",
                          low ? "text-eve-rose" : "text-eve-teal",
                        )}
                      >
                        {low ? `🔴 ${e.spots} spots left` : `✅ ${e.spots} spots left`}
                      </span>
                      <button
                        onClick={() => (isReg ? null : setRsvp(e))}
                        className={cn(
                          "ml-auto rounded-full px-3 py-1 text-[11px] font-medium transition",
                          isReg
                            ? "border border-eve-teal text-eve-teal"
                            : "bg-eve-teal text-white",
                        )}
                      >
                        {isReg ? "Registered ✓" : "RSVP"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-eve-teal-light p-4 text-center text-sm text-eve-teal">
            Hosting a maternal health event? <span className="font-semibold">List it on Eve & Eden →</span>
          </div>
        </>
      )}

      {/* RSVP sheet */}
      {rsvp && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 sm:items-center">
          <div className="w-full max-w-sm rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl">
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-lg font-semibold text-eve-teal-dark">{rsvp.title}</h3>
              <button onClick={() => setRsvp(null)} aria-label="Close">
                <X className="h-5 w-5 text-eve-muted" />
              </button>
            </div>
            <p className="mt-2 text-xs text-eve-muted">{rsvp.time} · {rsvp.location}</p>
            <div className="mt-3 rounded-xl bg-eve-teal-light p-3 text-[12px] text-eve-teal">
              We'll send a reminder to your account. Your details are kept private.
            </div>
            <label className="mt-4 block text-[11px] font-medium uppercase tracking-wide text-eve-muted">
              Your first name or nickname (optional)
            </label>
            <input
              placeholder="So the organiser can welcome you"
              className="mt-1 w-full rounded-xl border border-eve-sand bg-eve-cream px-3 py-2 text-sm"
            />
            <label className="mt-3 flex items-center justify-between text-sm text-eve-teal-dark">
              <span>Send me a WhatsApp reminder</span>
              <input type="checkbox" defaultChecked className="h-4 w-8 accent-eve-teal" />
            </label>
            <button
              onClick={() => {
                setRegistered((r) => ({ ...r, [rsvp.id]: true }));
                setRsvp(null);
              }}
              className="mt-4 w-full rounded-full bg-eve-teal py-3 text-sm font-medium text-white"
            >
              Confirm my spot →
            </button>
            <button onClick={() => setRsvp(null)} className="mt-2 w-full text-center text-xs text-eve-muted">
              Cancel
            </button>
          </div>
        </div>
      )}
    </EveShell>
  );
}
