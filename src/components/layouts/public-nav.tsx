"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import {
  BadgeDollarSign,
  BookOpen,
  Home,
  Info,
  Mail,
  Menu,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

// =============================================================================
// Public Navbar
// =============================================================================

type HomepageSectionId = "home" | "how-it-works" | "pricing";

interface NavLinkConfig {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  sectionId?: HomepageSectionId;
}

const homepageSectionIds: HomepageSectionId[] = [
  "home",
  "how-it-works",
  "pricing",
];

const navLinks: NavLinkConfig[] = [
  {
    label: "Home",
    href: `${ROUTES.HOME}#home`,
    icon: Home,
    sectionId: "home",
  },
  { label: "Q-Bank", href: ROUTES.SUBJECTS, icon: BookOpen },
  {
    label: "How It Works",
    href: `${ROUTES.HOME}#how-it-works`,
    icon: Workflow,
    sectionId: "how-it-works",
  },
  {
    label: "Pricing",
    href: `${ROUTES.HOME}#pricing`,
    icon: BadgeDollarSign,
    sectionId: "pricing",
  },
  { label: "About", href: ROUTES.ABOUT, icon: Info },
  { label: "Contact", href: ROUTES.CONTACT, icon: Mail },
];

interface PublicNavProps {
  className?: string;
  variant?: "default" | "hero";
}

export function PublicNav({ className, variant = "default" }: PublicNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<HomepageSectionId>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const isHeroSurface = variant === "hero" && !isScrolled;

  useEffect(() => {
    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncScrollState);
    };
  }, []);

  useEffect(() => {
    if (pathname !== ROUTES.HOME) {
      return;
    }

    const syncSectionFromHash = () => {
      const hash = window.location.hash.replace("#", "") as HomepageSectionId;

      if (homepageSectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };

    syncSectionFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const sectionId = visibleEntry?.target.id as
          | HomepageSectionId
          | undefined;

        if (sectionId && homepageSectionIds.includes(sectionId)) {
          setActiveSection(sectionId);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    homepageSectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);

      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener("hashchange", syncSectionFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncSectionFromHash);
    };
  }, [pathname]);

  return (
    <>
      <div aria-hidden="true" className="h-[78px] sm:h-[92px] lg:h-[98px]" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] w-full bg-transparent px-3 py-2 sm:px-4 sm:py-3 lg:py-3",
          className
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex h-[62px] max-w-[1440px] items-center justify-between rounded-[24px] border px-4 backdrop-blur-xl sm:h-[68px] sm:rounded-[28px] sm:px-5 lg:h-[74px] lg:rounded-[30px] lg:px-7",
            isHeroSurface
              ? "border-white/45 bg-white/75 shadow-[0_16px_42px_rgba(15,23,42,0.16)]"
              : "border-border/80 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
          )}
        >
          <BrandLogo size="desktop" />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <DesktopNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                pathname={pathname}
                activeSection={activeSection}
                sectionId={link.sectionId}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <Button
              variant="outline"
              render={<Link href={ROUTES.LOGIN} />}
              className="h-10 rounded-full border-primary/15 bg-white px-5 text-sm font-semibold text-primary shadow-sm hover:bg-primary/5"
            >
              Login
            </Button>
            <Button
              render={<Link href={ROUTES.ENROLLMENT} />}
              className="h-10 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-[0_10px_24px_rgba(57,179,79,0.28)] hover:bg-accent/90"
            >
              Register
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "ml-auto size-10 rounded-full border border-border bg-white text-primary shadow-sm hover:bg-primary/5 xl:hidden"
                  )}
                />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="inset-y-3 right-3 z-[120] h-auto w-[min(22rem,calc(100vw-1.5rem))] rounded-[28px] border border-border/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="border-b border-border px-4 pb-4 pt-1">
                <BrandLogo size="mobile" onClick={() => setOpen(false)} />
              </div>

              <nav className="flex flex-col gap-1 px-4 pt-1">
                {navLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    pathname={pathname}
                    activeSection={activeSection}
                    sectionId={link.sectionId}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                <Button
                  variant="ghost"
                  className="h-11 rounded-full text-primary hover:bg-primary/5"
                  render={
                    <Link href={ROUTES.LOGIN} onClick={() => setOpen(false)} />
                  }
                >
                  Login
                </Button>
                <Button
                  className="h-11 rounded-full bg-accent font-semibold text-accent-foreground shadow-[0_10px_24px_rgba(57,179,79,0.24)] hover:bg-accent/90"
                  render={
                    <Link
                      href={ROUTES.ENROLLMENT}
                      onClick={() => setOpen(false)}
                    />
                  }
                >
                  Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

function BrandLogo({
  onClick,
  size,
}: {
  onClick?: () => void;
  size: "desktop" | "mobile";
}) {
  return (
    <Link
      href={ROUTES.HOME}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center justify-center",
        size === "desktop"
          ? "h-[42px] w-[170px] sm:h-[46px] sm:w-[196px] lg:h-[50px] lg:w-[220px]"
          : "h-[42px] w-[176px]"
      )}
      aria-label="MDCAT in Second home"
    >
      <Image
        src="/images/branding/logo.webp?v=20260705"
        alt="MDCAT in Second"
        width={240}
        height={64}
        priority
        unoptimized
        className="h-auto max-h-full w-full object-contain object-left"
      />
    </Link>
  );
}

function DesktopNavLink({
  href,
  label,
  icon: Icon,
  pathname,
  activeSection,
  sectionId,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  pathname: string;
  activeSection: HomepageSectionId;
  sectionId?: HomepageSectionId;
}) {
  const isActive = sectionId
    ? pathname === ROUTES.HOME && activeSection === sectionId
    : pathname === href;
  let linkTone = "text-primary/80 hover:bg-accent/10 hover:text-accent-foreground";
  let iconTone = "text-primary/55 group-hover:text-accent-foreground";

  if (isActive) {
    linkTone = "bg-accent/15 text-primary";
    iconTone = "text-accent";
  }

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors",
        linkTone
      )}
    >
      <Icon className={cn("h-4 w-4 transition-colors", iconTone)} />
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  icon: Icon,
  pathname,
  activeSection,
  sectionId,
  onClick,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  pathname: string;
  activeSection: HomepageSectionId;
  sectionId?: HomepageSectionId;
  onClick: () => void;
}) {
  const isActive = sectionId
    ? pathname === ROUTES.HOME && activeSection === sectionId
    : pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-colors",
        isActive
          ? "bg-accent/15 text-primary"
          : "text-primary/80 hover:bg-accent/10 hover:text-accent-foreground"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
          isActive
            ? "bg-white text-primary"
            : "bg-muted text-primary/60 group-hover:bg-white group-hover:text-accent-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      {label}
    </Link>
  );
}
