import Image from "next/image";

/**
 * Theme-aware STAIL wordmark. The black mark renders in light mode, the
 * white mark in dark mode — driven purely by prefers-color-scheme.
 */
export function Logo({
  className = "h-7 w-auto",
  priority = false,
  variant = "auto",
}: {
  className?: string;
  priority?: boolean;
  /** "white" forces the white mark (for permanently dark surfaces). */
  variant?: "auto" | "white";
}) {
  if (variant === "white") {
    return (
      <Image
        src="/brand/stail-white.png"
        alt="STAIL — ShivTrinetrix AI Labs"
        width={1307}
        height={646}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <span className="inline-flex items-center">
      <Image
        src="/brand/stail-black.png"
        alt="STAIL — ShivTrinetrix AI Labs"
        width={1307}
        height={646}
        priority={priority}
        className={`${className} dark:hidden`}
      />
      <Image
        src="/brand/stail-white.png"
        alt=""
        aria-hidden
        width={1307}
        height={646}
        priority={priority}
        className={`${className} hidden dark:block`}
      />
    </span>
  );
}
