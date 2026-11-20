export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FE3F5" />
          <stop offset="1" stopColor="#2F6BFF" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#0B1220" stroke="url(#logo-g)" strokeWidth="1.5" />
      <path d="M9 13h12M15 13v15" stroke="url(#logo-g)" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="26" cy="22" r="6" fill="none" stroke="url(#logo-g)" strokeWidth="2.6" />
      <circle cx="31.5" cy="11" r="1.8" fill="#35C8E8" />
    </svg>
  );
}
