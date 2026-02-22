import { useEffect, useRef } from 'react'
import './LiquidGlassCursor.css'

export default function LiquidGlassCursor() {
    const wrapRef = useRef(null)
    const targetRef = useRef({ x: -999, y: -999 })
    const currentRef = useRef({ x: -999, y: -999 })
    const rafRef = useRef(null)

    useEffect(() => {
        const onMouseMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY }
        }

        const lerp = (a, b, t) => a + (b - a) * t

        const tick = () => {
            currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08)
            currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08)

            if (wrapRef.current) {
                wrapRef.current.style.transform =
                    `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`
            }
            rafRef.current = requestAnimationFrame(tick)
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true })
        rafRef.current = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <div className="lgc" ref={wrapRef} aria-hidden="true">
            {/* The glass pane — backdrop-filter is clipped to the blob shape by overflow:hidden on parent */}
            <div className="lgc__pane">
                <div className="lgc__refract" />
                <div className="lgc__shine--primary" />
                <div className="lgc__shine--secondary" />
                <div className="lgc__caustic" />
                <div className="lgc__aberr-r" />
                <div className="lgc__aberr-b" />
            </div>
        </div>
    )
}
