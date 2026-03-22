"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ ease: "easeInOut", duration: prefersReducedMotion ? 0 : 0.2 }}
        >
            {children}
        </motion.div>
    );
}
