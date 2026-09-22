import { motion, useTransform, type MotionValue } from "framer-motion";
import { Code2, Star } from "lucide-react";
import heroCollage from "@/assets/hero/hero-collage.png?hero";

type HeroShowcaseProps = {
  /** 0 → hero fills the viewport, 1 → hero has fully scrolled past. */
  scrollProgress: MotionValue<number>;
  reduced: boolean;
};

/*
 * Hero showcase — the collage sits fully still under the cursor. The only
 * motion is the idle bob of the floating badges and the scroll-linked
 * drift of the whole block, so the image itself never reacts to the mouse.
 */

function HeroChip({
  className = "",
  bob = 5,
  bobDelay = 0,
  reduced,
  children,
}: {
  className?: string;
  bob?: number;
  bobDelay?: number;
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute z-20 ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        reduced
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: 1,
              y: [0, -bob, 0],
              transition: {
                opacity: { delay: bobDelay + 0.55, duration: 0.5 },
                scale: {
                  delay: bobDelay + 0.55,
                  type: "spring",
                  stiffness: 260,
                  damping: 16,
                },
                y: {
                  duration: 5.2 + bobDelay * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bobDelay,
                },
              },
            }
      }
    >
      <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-black/10 bg-white/85 py-1.5 pl-2.5 pr-3.5 font-mono text-[11px] font-medium tracking-wide text-foreground/85 shadow-[0_18px_44px_-24px_rgba(17,17,17,0.55)] backdrop-blur-md">
        {children}
      </div>
    </motion.div>
  );
}

export function HeroShowcase({ scrollProgress, reduced }: HeroShowcaseProps) {
  const scrollY = useTransform(scrollProgress, [0, 1], [0, 90]);
  const scrollScale = useTransform(scrollProgress, [0, 1], [1, 0.93]);
  const scrollOpacity = useTransform(scrollProgress, [0, 0.85], [1, 0.45]);

  return (
    // Entrance wrapper: SSRs with opacity 0 so the collage never paints
    // before the animated hero copy — everything reveals together.
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-full"
    >
      <motion.div
        className="relative h-full w-full select-none"
        style={{ y: scrollY, scale: scrollScale, opacity: scrollOpacity }}
      >
        {/* grounded soft shadow */}
        <div
          aria-hidden
          className="absolute inset-x-[12%] bottom-[-3%] h-[16%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(17,17,17,0.5),transparent)] blur-xl"
        />

        <div className="relative h-full w-full">
          <img
            src={heroCollage.img.src}
            srcSet={heroCollage.sources.webp}
            sizes="(min-width: 1440px) 700px, (min-width: 1024px) 44vw, 92vw"
            width={heroCollage.img.w}
            height={heroCollage.img.h}
            alt="Floating 3D collage of a code editor, browser window, and app screens bursting from a black paint splash"
            draggable={false}
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none h-full w-full object-contain object-center drop-shadow-[0_42px_60px_rgba(17,17,17,0.35)]"
          />
        </div>

        <HeroChip
          reduced={reduced}
          className="left-[-2%] top-[7%] sm:left-[-4%]"
          bob={6}
          bobDelay={0.1}
        >
          <Code2 size={13} className="text-foreground/70" />
          TypeScript · React · Node
        </HeroChip>

        <HeroChip
          reduced={reduced}
          className="right-[-1%] top-[36%] sm:right-[-2%]"
          bob={7}
          bobDelay={0.6}
        >
          <Star size={13} className="fill-foreground/15 text-foreground/70" />
          40+ projects shipped
        </HeroChip>

        <HeroChip
          reduced={reduced}
          className="bottom-[5%] left-[6%]"
          bob={5}
          bobDelay={1.1}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-30" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
          </span>
          Open for new work
        </HeroChip>
      </motion.div>
    </motion.div>
  );
}
