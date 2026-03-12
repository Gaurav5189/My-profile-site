import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SplitTextReveal({ text, className = "", delay = 0, duration = 0.5 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    const parseText = (text) => {
        const tokens = [];
        // Parse text for highlighted sections using ^ markers
        const regex = /\^([^^]+)\^|(\S+)/g;
        let match;

        while ((match = regex.exec(text ?? "")) !== null) {
            if (match[1]) {
                // Split highlighted sections while preserving per-word animations
                const subWords = match[1].split(/\s+/);
                subWords.forEach((sw, idx) => {
                    if (sw) tokens.push({
                        text: sw,
                        highlight: true,
                    });
                });
            } else if (match[2]) {
                // Process standard word
                tokens.push({ text: match[2], highlight: false });
            }
        }
        return tokens;
    }

    const words = parseText(text);

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

    return (
        <motion.span
            ref={ref}
            className={`split-text-reveal ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block", perspective: "1000px" }}
            aria-label={(text ?? "").replace(/\^/g, '')}
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
                        {word.highlight ? <strong>{word.text}</strong> : word.text}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    )
}
