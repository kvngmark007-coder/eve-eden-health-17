import { useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { LANGS, AppLang } from "@/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Globe icon + dropdown with the 4 supported languages. Persists the
 * choice to profile.language and reloads i18n.
 */
export function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { lang, changeLanguage } = useLanguage();
  const { t, i18n } = useTranslation();

  // Make sure the trigger label re-renders on language change
  useEffect(() => {}, [i18n.language]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("language.label")}
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-eve-cream text-eve-teal-dark ${className}`}
      >
        <Globe className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => void changeLanguage(l.code as AppLang)}
            className="flex items-center justify-between gap-3 font-sans text-sm"
          >
            <span>{l.native}</span>
            {lang === l.code && (
              <Check className="h-3.5 w-3.5 text-eve-teal" strokeWidth={3} />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
