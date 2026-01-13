"use client";

import React, { useEffect, useState } from "react";

export function Countdown({ targetDate }: { targetDate: Date }) {
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

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof typeof timeLeft]) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-2 sm:mx-4">
                <span className="text-2xl sm:text-4xl font-serif font-bold text-foreground">
                    {timeLeft[interval as keyof typeof timeLeft]}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <div className="flex justify-center items-center py-6 border-y border-gold/30 my-8">
            {timerComponents.length ? timerComponents : <span className="text-xl font-serif">Offer Expired</span>}
        </div>
    );
}
