import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SplitTextReveal({ text, className = "", delay = 0, duration = 0.5 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    const words = text.split(" ")

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.015,
                delayChildren: delay,
            },
        },
    }

    const wordVariants = {
        hidden: {
            y: "110%",
            opacity: 0,
            rotateZ: 2
        },
        visible: {
            y: "0%",
            opacity: 1,
            rotateZ: 0,
            transition: {
                ease: [0.25, 0.46, 0.45, 0.94],
                duration: duration
            }
        }
    }

    const renderWord = (word) => {
        if (word.includes("**")) {
            const parts = word.split("**");
            return (
                <>
                    {parts[0]}
                    <strong>{parts[1]}</strong>
                    {parts[2]}
                </>
            );
        }
        return word;
    }

    return (
        <motion.span
            ref={ref}
            className={`split-text-reveal ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
            aria-label={text.replace(/\*\*/g, '')}
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        marginRight: "0.28em",
                        paddingBottom: "0.1em"
                    }}
                    aria-hidden="true"
                >
                    <motion.span
                        style={{ display: "inline-block", transformOrigin: "bottom left" }}
                        variants={wordVariants}
                    >
                        {renderWord(word)}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    )
}
