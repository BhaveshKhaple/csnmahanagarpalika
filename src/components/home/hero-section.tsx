import Image from 'next/image';
import { readdir } from 'fs/promises';
import { extname, join } from 'path';

const SLIDER_DIR = join(process.cwd(), 'public', 'images', 'home-slider');

async function getHeroSlides(): Promise<string[]> {
  try {
    const entries = await readdir(SLIDER_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) =>
        ['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes(extname(name).toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/images/home-slider/${name}`);
  } catch {
    return [];
  }
}

const MOTION_CLASSES = [
  'hero-motion-zoom-left',
  'hero-motion-zoom-out-up',
  'hero-motion-tilt-zoom',
] as const;

/**
 * Hero section — Phase 1 rebuild.
 *
 * Uses next/image instead of CSS backgroundImage so the browser receives
 * correctly-sized WebP/AVIF srcsets rather than one oversized file.
 *
 * The first slide is loaded with priority={true} (LCP candidate).
 * Remaining slides use lazy loading (loaded only when they animate into view).
 *
 * No autoplay video — spec requirement (csmc-website-redesign-spec.md §6).
 * CSS animation classes (hero-motion-*) are defined in globals.css and remain
 * unchanged; we simply preserve the CSS-driven slideshow behaviour.
 */
export default async function HeroSection() {
  const heroSlides = await getHeroSlides();
  const slideCount = heroSlides.length;
  const slotSeconds = 7;
  const totalCycleSeconds = Math.max(slotSeconds * slideCount, slotSeconds);

  // Fallback: if no slides found, show a solid saffron/CSMC-branded background
  if (slideCount === 0) {
    return (
      <section
        className="relative h-[48vh] min-h-[320px] overflow-hidden sm:h-[58vh] lg:h-[68vh] bg-gradient-to-br from-orange-700 to-amber-600"
        aria-label="CSMC मुख्यपृष्ठ"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/60 text-lg font-medium">
            छत्रपती संभाजीनगर महानगरपालिका
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative h-[48vh] min-h-[320px] overflow-hidden sm:h-[58vh] lg:h-[68vh]"
      aria-label="Home image slider"
    >
      {/* Dark base layer — prevents flash of unstyled content while images load */}
      <div className="absolute inset-0 bg-slate-950" aria-hidden="true" />

      <div className="absolute inset-0">
        {slideCount === 1 ? (
          /* Single slide — priority LCP image, no animation needed */
          <Image
            src={heroSlides[0]}
            alt="छत्रपती संभाजीनगर महानगरपालिका — मुख्य दृश्य"
            fill
            sizes="100vw"
            className="object-cover object-center hero-slide-single"
            priority
            quality={85}
          />
        ) : (
          heroSlides.map((slide, index) => (
            <div
              key={slide}
              className={`${MOTION_CLASSES[index % MOTION_CLASSES.length]} absolute inset-0`}
              style={{
                ['--delay' as string]: `${index * slotSeconds}s`,
                ['--cycle' as string]: `${totalCycleSeconds}s`,
              }}
            >
              <Image
                src={slide}
                alt={`छत्रपती संभाजीनगर महानगरपालिका — दृश्य ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover object-center"
                /*
                 * Only the first (immediately visible) slide is loaded with
                 * priority. Others are lazy-loaded; they will be in the DOM
                 * but the browser fetches them only when needed.
                 */
                priority={index === 0}
                quality={index === 0 ? 85 : 75}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
