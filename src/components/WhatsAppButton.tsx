import { tripConfig } from "@/data/tripData";

const WHATSAPP_GREEN = "#25D366";

export default function WhatsAppButton() {
  return (
    <a
      href={tripConfig.whatsappGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פתח את קבוצת הוואטסאפ המשפחתית"
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/20 transition hover:scale-105 active:scale-95"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full opacity-75"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      />
      <span
        aria-hidden="true"
        className="relative flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
          <path d="M17 14.3c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s1 2.5 1.1 2.6c.1.2 1.9 3 4.7 4.1.7.3 1.2.5 1.6.6.7.2 1.3.2 1.7.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" />
        </svg>
      </span>
    </a>
  );
}
