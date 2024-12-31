import React, { useEffect, useRef } from 'react'
import { LightDarkParticles } from './Particles'

export default function FeaturesImage({ left, right }: React.PropsWithChildren<{ left: React.ReactNode, right: React.ReactNode }>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const cardLeftRef = useRef<HTMLDivElement>(null)
  const cardRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setClipPercentage = (percentage: number) => {
      cardLeftRef.current && cardLeftRef.current.style.setProperty('--clip-percentage', `${100 - percentage}%`)
      cardRightRef.current && cardRightRef.current.style.setProperty('--clip-percentage', `${percentage}%`)
      if (indicatorRef.current) {
        indicatorRef.current.style.left = `${percentage}%`
      }
    }

    setClipPercentage(50)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const containerWidth = rect.width

        const clipPercentage = (mouseX / containerWidth) * 100
        setClipPercentage(clipPercentage)
      }
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="overflow-hidden border border-dashed mb-16">
      <div className="relative z-4">
        <div ref={indicatorRef} className="absolute -inset-y-4 left-[--clip-percentage] z-10 w-0.5 rounded-full bg-gradient-to-b from-transparent via-white to-transparent">
          <div className="absolute inset-y-4 -left-6 w-12 rounded-[100%] bg-gradient-to-r from-transparent via-primary-600/75 to-transparent blur-md"></div>
          <div className="absolute -inset-x-14 inset-y-4 z-10">
            <LightDarkParticles id="light-dark" />
          </div>
        </div>

        <div ref={cardLeftRef} className="ml-auto flex h-full flex-col justify-between !border-gray-200  [clip-path:inset(0px_var(--clip-percentage)_0px_0px)]">
          {left}
        </div>
        <div ref={cardRightRef} className="absolute inset-0 ml-auto flex h-full flex-col justify-between !border-gray-800 !shadow-lg  [clip-path:inset(0px_0px_0px_var(--clip-percentage))]">
          {right}
        </div>
      </div>
    </div>
  )
}
