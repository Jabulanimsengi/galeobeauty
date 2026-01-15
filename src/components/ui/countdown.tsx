"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
    targetDate: Date;
    variant?: "light" | "dark";
}

export function Countdown({ targetDate, variant = "light" }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +targetDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents: React.JSX.Element[] = [];

    const numberColor = variant === "dark" ? "text-white" : "text-foreground";
    const labelColor = variant === "dark" ? "text-white/70" : "text-muted-foreground";

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof typeof timeLeft]) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-2 sm:mx-4">
                <span className={`text-2xl sm:text-4xl font-serif font-bold ${numberColor}`}>
                    {timeLeft[interval as keyof typeof timeLeft]}
                </span>
                <span className={`text-[10px] sm:text-xs uppercase tracking-widest mt-1 ${labelColor}`}>
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <div className="flex items-center">
            {timerComponents.length ? timerComponents : <span className={`text-xl font-serif ${numberColor}`}>Offer Expired</span>}
        </div>
    );
}

