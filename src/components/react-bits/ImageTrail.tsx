"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ImageTrailProps {
  items?: string[];
  variant?: number;
}

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: any, rect: DOMRect) {
  let clientX = 0,
    clientY = 0;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM: { el: HTMLElement; inner: HTMLElement | null } = { el: null as any, inner: null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect!: DOMRect;
  resize!: () => void;

  constructor(DOM_el: HTMLElement) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
    this.getRect();
    this.initEvents();
  }
  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    if (typeof window !== "undefined") {
      window.addEventListener('resize', this.resize);
    }
  }
  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener('resize', this.resize);
    }
  }
}

class ImageTrailVariant1 {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 80;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove!: (ev: any) => void;
  initRender!: (ev: any) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = Array.from(this.DOM.el.querySelectorAll('.content__img')).map(img => new ImageItem(img as HTMLElement));
    this.imagesTotal = this.images.length;

    const handlePointerMove = (ev: any) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = (ev: any) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      this.rafId = requestAnimationFrame(() => this.render());

      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
  }

  render() {
    if (this.destroyed) return;

    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (this.imagesTotal === 0) return;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0,
          scale: 0.2
        },
        0.4
      );
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.container.removeEventListener('mousemove', this.handlePointerMove);
    this.container.removeEventListener('touchmove', this.handlePointerMove);
    this.container.removeEventListener('mousemove', this.initRender);
    this.container.removeEventListener('touchmove', this.initRender);
    this.images.forEach(img => {
      gsap.killTweensOf(img.DOM.el);
      img.destroy();
    });
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }
}

class ImageTrailVariant2 {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 80;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove!: (ev: any) => void;
  initRender!: (ev: any) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = Array.from(container.querySelectorAll('.content__img')).map(img => new ImageItem(img as HTMLElement));
    this.imagesTotal = this.images.length;

    const handlePointerMove = (ev: any) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = (ev: any) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      this.rafId = requestAnimationFrame(() => this.render());

      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
  }

  render() {
    if (this.destroyed) return;

    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (this.imagesTotal === 0) return;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2.8,
          filter: 'brightness(250%)'
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          scale: 0.2
        },
        0.45
      );
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.container.removeEventListener('mousemove', this.handlePointerMove);
    this.container.removeEventListener('touchmove', this.handlePointerMove);
    this.container.removeEventListener('mousemove', this.initRender);
    this.container.removeEventListener('touchmove', this.initRender);
    this.images.forEach(img => {
      gsap.killTweensOf(img.DOM.el);
      img.destroy();
    });
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

const variantMap: Record<number, any> = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2
};

export default function ImageTrail({ items = [], variant = 1 }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const Cls = variantMap[variant] || variantMap[1];
    const instance = new Cls(containerRef.current);

    return () => {
      instance.destroy();
    };
  }, [variant, items]);

  return (
    <div className="w-full h-full relative z-[100] rounded-lg bg-transparent overflow-visible" ref={containerRef}>
      {items.map((url, i) => (
        <div
          className="content__img w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter]"
          key={i}
        >
          <div
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}
