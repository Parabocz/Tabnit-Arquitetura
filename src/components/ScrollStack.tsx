"use client";

import {
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export function ScrollStackItem({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;
}

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());
  const isUpdatingRef = useRef(false);
  // Cached separately from scroll: on mobile, window.innerHeight changes as the
  // browser chrome (address bar) shows/hides while scrolling, which would make
  // every trigger position recompute slightly differently each frame and read
  // as the cards trembling. Only refresh this on resize, not on every scroll tick.
  const containerHeightRef = useRef(0);
  // Each card's document-relative offset, measured once (not on every scroll
  // frame). `transform` never affects layout, so these stay valid while
  // scrolling — reading them fresh via getBoundingClientRect() on every tick
  // instead forces a synchronous layout recalculation right after the previous
  // card's style write, which is what was actually causing the trembling.
  const cardOffsetsRef = useRef<number[]>([]);
  const endElementOffsetRef = useRef(0);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(String(value));
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: containerHeightRef.current || window.innerHeight,
      };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: containerHeightRef.current || scroller?.clientHeight || 0,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return element.offsetTop;
    },
    [useWindowScroll]
  );

  // Measures every card's (and the end spacer's) offset once. Must run after
  // layout has settled (post-mount, post-resize, post-webfont-swap) — never
  // from inside the scroll handler, since getBoundingClientRect() there is
  // what forces a synchronous layout recalculation on every frame.
  const measureOffsets = useCallback(() => {
    cardOffsetsRef.current = cardsRef.current.map((card) => getElementOffset(card));

    const endElement = useWindowScroll
      ? document.querySelector<HTMLElement>(".scroll-stack-end")
      : scrollerRef.current?.querySelector<HTMLElement>(".scroll-stack-end");
    endElementOffsetRef.current = endElement ? getElementOffset(endElement) : 0;
  }, [useWindowScroll, getElementOffset]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElementTop = endElementOffsetRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardOffsetsRef.current[j] ?? 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform: CardTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = rotationAmount
          ? `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
          : `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        anchors: true,
      });

      lenis.on("scroll", handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const updateContainerHeight = () => {
      containerHeightRef.current = useWindowScroll
        ? window.innerHeight
        : (scrollerRef.current?.clientHeight ?? 0);
    };

    updateContainerHeight();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateContainerHeight();
        // Layout may genuinely have changed (rotation, viewport resize) —
        // re-measure card offsets too, then re-apply transforms against them.
        measureOffsets();
        updateCardTransforms();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [useWindowScroll, measureOffsets, updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll<HTMLElement>(".scroll-stack-card")
        : scroller.querySelectorAll<HTMLElement>(".scroll-stack-card")
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
      card.style.transform = "translate3d(0, 0, 0)";
      // Perspective/backface-visibility only matter for the rotateY effect —
      // skip them otherwise. On mobile GPUs, an unused 3D context on several
      // overlapping elements is a common cause of compositing shimmer/jitter.
      if (rotationAmount) {
        card.style.backfaceVisibility = "hidden";
        card.style.perspective = "1000px";
      }
    });

    measureOffsets();
    setupLenis();
    updateCardTransforms();

    // Web fonts swapping in after mount can reflow text and shift card
    // heights (and therefore every later card's offset) — re-measure once
    // they're confirmed loaded rather than relying only on the initial pass.
    let cancelled = false;
    document.fonts?.ready
      ?.then(() => {
        if (cancelled) return;
        measureOffsets();
        updateCardTransforms();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, rotationAmount, useWindowScroll, setupLenis, updateCardTransforms, measureOffsets]);

  // In window-scroll mode the page itself scrolls — cancel the CSS class's
  // nested-scroll-container styling (overflow-y/height) so there's no inner scrollbar.
  const scrollerStyle: CSSProperties = useWindowScroll
    ? { overflow: "visible", height: "auto", willChange: "auto" }
    : { position: "relative", width: "100%", height: "100%" };

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
      style={scrollerStyle}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}
