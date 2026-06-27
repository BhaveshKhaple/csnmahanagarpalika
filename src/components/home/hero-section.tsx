import { readdir } from 'fs/promises';
import { extname, join } from 'path';

const SLIDER_DIR = join(process.cwd(), 'public', 'images', 'home-slider');
const MOTION_CLASSES = ['hero-motion-zoom-left', 'hero-motion-zoom-out-up', 'hero-motion-tilt-zoom'] as const;

async function getHeroSlides() {
  try {
    const entries = await readdir(SLIDER_DIR, { withFileTypes: true });
    const slides = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => ['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes(extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/images/home-slider/${name}`);

    return slides;
  } catch {
    return [];
  }
}

export default async function HeroSection() {
  const heroSlides = await getHeroSlides();
  const slideCount = heroSlides.length;
  const slotSeconds = 7;
  const totalCycleSeconds = Math.max(slotSeconds * slideCount, slotSeconds);

  return (
    <section className="relative h-[48vh] min-h-[320px] overflow-hidden sm:h-[58vh] lg:h-[68vh]" aria-label="Home image slider">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="absolute inset-0">
        {slideCount <= 1 ? (
          <div
            className="hero-slide-single absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[0] ?? ''})` }}
          />
        ) : (
          heroSlides.map((slide, index) => (
            <div
              key={slide}
              className={`hero-slide ${MOTION_CLASSES[index % MOTION_CLASSES.length]} absolute inset-0 bg-cover bg-center`}
              style={{
                backgroundImage: `url(${slide})`,
                ['--delay' as string]: `${index * slotSeconds}s`,
                ['--cycle' as string]: `${totalCycleSeconds}s`,
              }}
            />
          ))
        )}
      </div>
    </section>
  );
}
