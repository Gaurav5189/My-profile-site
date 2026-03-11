import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

export default function GradualSpacing({
    text = "",
    duration = 0.5,
    delayMultiple = 0.04,
    delay = 0,
    framerProps = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    },
    className = "",
    as: Component = 'span'
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    if (!text) {
        return (
            <Component ref={ref} className={`gradual-spacing ${className}`} style={{ display: 'inline-flex', justifyContent: 'center', flexWrap: 'wrap' }} />
        );
    }

    return (
        <Component ref={ref} className={`gradual-spacing ${className}`} style={{ display: 'inline-flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <AnimatePresence>
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        exit="hidden"
                        variants={framerProps}
                        transition={{ duration, delay: delay + i * delayMultiple }}
                        style={{ display: 'inline-block', whiteSpace: 'pre' }}
                    >
                        {char === " " ? <span>&nbsp;</span> : char}
                    </motion.span>
                ))}
            </AnimatePresence>
        </Component>
    );
}
