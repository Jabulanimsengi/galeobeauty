"use client";

import { motion, useReducedMotion } from "framer-motion";

export const BrandsSection = () => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="absolute inset-x-0 top-[100svh] z-20 min-h-[100svh] overflow-hidden bg-[rgba(201,168,108,0.34)] backdrop-blur-[2px]">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(215,184,126,0.24) 0%, rgba(201,168,108,0.32) 48%, rgba(186,149,86,0.38) 100%)",
                }}
            />
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(circle at 18% 18%, rgba(255,248,236,0.18), transparent 20%), radial-gradient(circle at 82% 24%, rgba(223,195,146,0.14), transparent 18%), linear-gradient(135deg, rgba(255,255,255,0.05), transparent 42%)",
                }}
            />

            <div className="relative flex min-h-[100svh] items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center"
                >
                    <div className="max-w-6xl text-center">
                        <span className="mb-4 block text-[0.78rem] font-semibold uppercase tracking-[0.42em] text-white/75 sm:mb-6">
                            Galeo Beauty
                        </span>
                        <h2 className="text-center font-serif text-[3.35rem] font-medium leading-[0.88] tracking-[-0.035em] text-white sm:text-[4.9rem] md:text-[6.1rem] lg:text-[7.6rem] xl:text-[8.6rem]">
                            This is where
                            <br />
                            <span className="italic">beauty</span> &amp; wellness
                            <br />
                            meet
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
