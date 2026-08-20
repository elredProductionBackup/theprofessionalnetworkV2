'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/* =========================================================
   1) EDIT THIS — just drop in image URLs + labels.
   Add or remove items freely, the loop adjusts itself.
   ========================================================= */
const SLIDES = [
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339135/r6mmfoaymtujzutvflyq_zzcho1.webp', name: 'Aarav', role: 'Design Lead' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339136/xfh8lhbfrsxcd9p6ruux_m3njog.webp', name: 'Maya',  role: 'Product' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339137/cx7nrz2sdteojh3oaeai_pr3sxe.webp', name: 'Zoe',   role: 'Engineering' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339137/ktkyiat9bclwpb6jrbgp_ujtgme.webp', name: 'Dev',   role: 'Growth' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339151/dssexrfdfdtwrbvl9wvb_geqxsr.webp', name: 'Lena',  role: 'Ops' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339151/akdrkrzxpz2nkkhjhroh_bi7nbg.webp', name: 'Jamal', role: 'Data' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339151/ale5b4auhphyva2b4zun_n6eabg.webp', name: 'Priya', role: 'Marketing' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339152/e7nydhgrizlplhdo63zx_cqfok6.webp', name: 'Omar',  role: 'Support' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339153/ekz2vxs1fbo69ksaoshr_lijkz9.webp', name: 'Omar',  role: 'Support' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339167/fluu438xcx5okotpglj2_kgcvlh.webp', name: 'Omar',  role: 'Support' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339169/ktdgfso58h3g77ppbjbn_v9rlik.webp', name: 'Omar',  role: 'Support' },
  { src: 'https://res.cloudinary.com/dtrv7p3gg/image/upload/v1786339169/pb7lo5tjewvgfvkmcgwa_corvjd.webp', name: 'Omar',  role: 'Support' },
]

/* Hero text (no animations, static) */
const HEADLINE = 'a network for ambitious professionals who are keen to learn from the best academic minds of the world'
const HIGHLIGHT = ''

/* Tagline after the title (the red-pill line) */
const TAGLINE_PLAIN = 'Learn. Stay ahead.'
const TAGLINE_PILL  = 'Actionable intelligence'

/* =========================================================
   2) Slider feel — tweak these numbers to taste.
   ========================================================= */
const STEP       = 150   // base gap between card centres (px @ desktop). Spacing auto-widens
                         // if needed so cards always fill the full width (no black gaps).
const AUTO_SPEED = 0.4    // auto-scroll drift (px/frame). 0 to disable
const CARD_W     = 225    // desktop card width
const CARD_H     = 300    // desktop card height (ratio preserved on mobile)
const MIN_K      = 0.78   // smallest card scale on phones. Raise for bigger mobile cards.
const EDGE_FADE  = 0.28   // fraction of the half-width used for the left/right fade band
const DIM        = 0.45   // how much darker side cards get (0 = none, 1 = black at edges)

export default function CoverflowHero() {
  const stageRef  = useRef(null)
  const cardRefs  = useRef([])
  const offset    = useRef(0)      // scroll distance, grows forever; modulo wraps it
  const dragging  = useRef(false)
  const hovering  = useRef(false)
  const lastX     = useRef(0)
  const velocity  = useRef(0)
  const k         = useRef(1)      // responsive scale factor (1 = desktop)
  const edge      = useRef(960)    // half of the viewport width (px)

  useEffect(() => {
    const N = SLIDES.length

    const setK = () => {
      k.current = Math.min(1, Math.max(MIN_K, window.innerWidth / 1180))
      edge.current = (document.documentElement.clientWidth || window.innerWidth) / 2
    }
    setK()
    window.addEventListener('resize', setK)

    // Place + tilt every card from its distance to centre (coverflow math)
    const render = () => {
      const E  = edge.current
      // spacing: base value, but auto-widened so the N cards always span the
      // full viewport width -> the track can never leave black gaps on the sides.
      const sp = Math.max(STEP * k.current, (E * 2 * 1.04) / N)
      const TOTAL = N * sp
      const HALF  = TOTAL / 2
      const cw = CARD_W * k.current
      const ch = CARD_H * k.current
      const fadeBand = E * EDGE_FADE

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        let x = (((i * sp - offset.current) % TOTAL) + TOTAL) % TOTAL
        if (x > HALF) x -= TOTAL

        const dist = Math.abs(x)
        const rotateY = Math.max(-55, Math.min(55, (-x / sp) * 24))
        const translateZ = -dist * 0.55
        const scale = Math.max(0.72, 1 - (dist / HALF) * 0.42)

        // opacity: solid across the middle, fades to 0 only as it nears the real edge
        const opacity = Math.max(0, Math.min(1, (E - dist) / fadeBand))
        // brightness: centre pops, sides dim toward the edge (floored, never full black)
        const brightness = 1 - DIM * Math.min(1, dist / E)

        card.style.width = `${cw}px`
        card.style.height = `${ch}px`
        card.style.transform =
          `translate(-50%, -50%) translateX(${x}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
        card.style.zIndex = String(Math.round(1000 - dist))
        card.style.opacity = String(opacity)
        card.style.filter = `brightness(${brightness})`
      })
    }

    let raf
    const tick = () => {
      if (!dragging.current) {
        if (Math.abs(velocity.current) > 0.15) {
          offset.current -= velocity.current            // glide after a flick
          velocity.current *= 0.94                       // friction
        } else if (!hovering.current) {
          offset.current += AUTO_SPEED * k.current        // idle drift (speed scaled too)
        }
      }
      render()
      raf = requestAnimationFrame(tick)
    }

    render()
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setK)
    }
  }, [])

  /* ---- pointer drag (mouse + touch via Pointer Events) ---- */
  const onPointerDown = (e) => {
    dragging.current = true
    velocity.current = 0
    lastX.current = e.clientX
    stageRef.current?.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    offset.current -= dx
    velocity.current = dx
  }
  const onPointerUp = (e) => {
    dragging.current = false
    if (e && stageRef.current?.hasPointerCapture?.(e.pointerId)) {
      stageRef.current.releasePointerCapture(e.pointerId)
    }
  }

  const words = HEADLINE.split(' ')

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(140%_100%_at_50%_-20%,#191313_0%,#0c0b0d_48%,#060608_100%)] px-6 py-16 text-white">

      {/* hero text — no animation, just clean display */}
      <div className="relative z-10 mx-auto max-w-5xl text-center pt-[40px]">
        <h1 className="font-inter-display mx-auto max-w-[50ch] text-[clamp(28px,5vw,48px)] font-semibold leading-[1.3] tracking-[-0.022em]">
          {words.map((w, i) =>
            w === HIGHLIGHT ? (
              <span
                key={i}
                className="relative mx-[0.12em] inline-block rounded-md px-[0.1em] ring-[1.5px] ring-[#D71A21]/90"
              >
                {w}{' '}
              </span>
            ) : (
              <span key={i}>{w}{' '}</span>
            )
          )}
        </h1>

        {/* tagline pill */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-inter-display text-[clamp(16px,2.3vw,24px)] font-bold tracking-[-0.01em]">
          <span className="text-white">{TAGLINE_PLAIN}</span>
          <span className="rounded-lg bg-[#D71A21] px-3.5 py-1.5 text-white shadow-[0_8px_24px_-8px_rgba(215,26,33,0.8)]">
            {TAGLINE_PILL}
          </span>
        </div>
      </div>

      {/* soft red glow behind the slider for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[64%] -z-0 h-[500px] w-[min(1000px,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(215,26,33,0.22),transparent_70%)] blur-md"
      />

      {/* 3D coverflow slider — full-bleed so section padding never clips it */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => { hovering.current = true }}
        onMouseLeave={() => { hovering.current = false }}
        className="relative  z-10 mt-12 h-[380px] w-screen  cursor-grab touch-pan-y select-none overflow-hidden [perspective:1400px] active:cursor-grabbing"
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ width: CARD_W, height: CARD_H }}
            className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/10 will-change-transform"
          >
            <Image
              src={s.src}
              alt={s.name}
              fill
              quality={100}
              sizes="(max-width: 640px) 220px, 250px"
              draggable={false}
              className="pointer-events-none select-none object-cover"
            />
          </div>
        ))}

        {/* thin edge gradients to blend the last cards into the background */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[60] w-[10%] bg-gradient-to-r from-[#08070a] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-[60] w-[10%] bg-gradient-to-l from-[#08070a] to-transparent" />
      </div>
    </section>
  )
}