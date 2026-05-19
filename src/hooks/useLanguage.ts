import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import i18n, { applyDir, setAppLanguage, AppLang } from "@/i18n";

/**
 * Loads the current user's profile.language on mount, applies it to i18n,
 * and exposes a setter that persists to Supabase.
 */
export function useLanguage() {
  const [lang, setLang] = useState<AppLang>(
    (i18n.language as AppLang) ?? "fr",
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id;
      if (!uid) {
        applyDir(i18n.language);
        return;
      }
      const { data: p } = await supabase
        .from("profiles")
        .select("language")
        .eq("id", uid)
        .maybeSingle();
      const next = (p?.language as AppLang) || "fr";
      if (cancelled) return;
      await setAppLanguage(next);
      setLang(next);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function changeLanguage(next: AppLang) {
    await setAppLanguage(next);
    setLang(next);
    const { data } = await supabase.auth.getUser();
    if (data.user?.id) {
      await supabase
        .from("profiles")
        .update({ language: next })
        .eq("id", data.user.id);
    }
  }

  return { lang, changeLanguage };
}
