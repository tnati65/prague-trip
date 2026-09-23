"use client";

export type TabId = "checklist" | "weather" | "info" | "trivia" | "search";

const TABS: { id: TabId; label: string }[] = [
  { id: "checklist", label: "צ'קליסט" },
  { id: "weather", label: "תחזית" },
  { id: "info", label: "מידע" },
  { id: "trivia", label: "טריוויה" },
  { id: "search", label: "חיפוש" },
];

const WHATSAPP_GREEN = "#25D366";

function CheckboxIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="m7.5 12.5 3 3 6-6" />
    </svg>
  );
}

function CloudIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17a4 4 0 0 1 .5-7.97A5.5 5.5 0 0 1 18 10.5 3.5 3.5 0 0 1 17.5 17H7Z" />
    </svg>
  );
}

function InfoFileIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 3h9l4 4v14H6Z" />
      <path d="M15 3v4h4" />
      <path d="M12 11v5M12 8.5h.01" />
    </svg>
  );
}

function TargetIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.35-4.35" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
      <path d="M17 14.3c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s1 2.5 1.1 2.6c.1.2 1.9 3 4.7 4.1.7.3 1.2.5 1.6.6.7.2 1.3.2 1.7.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" />
    </svg>
  );
}

function TabIcon({ id, className }: { id: TabId; className: string }) {
  switch (id) {
    case "checklist":
      return <CheckboxIcon className={className} />;
    case "weather":
      return <CloudIcon className={className} />;
    case "info":
      return <InfoFileIcon className={className} />;
    case "trivia":
      return <TargetIcon className={className} />;
    case "search":
      return <SearchIcon className={className} />;
  }
}

export default function BottomNav({
  activeTab,
  onTabChange,
  whatsappUrl,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  whatsappUrl: string;
}) {
  return (
    <nav
      dir="rtl"
      className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-2xl items-center justify-around border-t border-zinc-100 bg-white px-2 py-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 lg:max-w-4xl"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? "true" : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium transition-colors ${
              isActive
                ? "text-rose-900 dark:text-rose-300"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
          >
            <TabIcon id={tab.id} className="h-5 w-5" />
            {tab.label}
          </button>
        );
      })}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="פתח את קבוצת הוואטסאפ המשפחתית"
        className="flex shrink-0 items-center justify-center rounded-full p-2 transition hover:scale-105 active:scale-95"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      >
        <WhatsAppIcon className="h-5 w-5" />
      </a>
    </nav>
  );
}
