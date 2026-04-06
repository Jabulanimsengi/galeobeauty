import { MapPin, Phone, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeferredMap } from "@/components/ui/DeferredMap";
import { TrackedExternalLink } from "@/components/tracking/TrackedExternalLink";
import { TrackedWhatsAppLink } from "@/components/tracking/TrackedWhatsAppLink";
import { businessInfo } from "@/lib/constants";

export function HomepageLocationSection() {
    return (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-8">
                    <div className="flex flex-col justify-between bg-stone-50 px-6 py-7 sm:px-7 lg:px-8">
                        <div>
                            <h2 className="font-serif text-2xl leading-[0.98] text-foreground sm:text-3xl lg:max-w-[11ch]">
                                Visit Our Salon
                            </h2>

                            <div className="mt-8 space-y-5 text-foreground/80">
                                <div className="flex items-start gap-4">
                                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                                    <div className="text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                                        <p>{businessInfo.address.street}</p>
                                        <p>{businessInfo.address.area}</p>
                                        <p>{businessInfo.address.city}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                                    <div className="text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                                        <p>{businessInfo.phone}</p>
                                        {businessInfo.cell && <p>{businessInfo.cell}</p>}
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                                    <div className="text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                                        <p>{businessInfo.hours.weekday}</p>
                                        <p>{businessInfo.hours.saturday}</p>
                                        <p>{businessInfo.hours.publicHoliday}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="rounded-none bg-foreground px-7 text-xs font-semibold uppercase tracking-[0.18em] text-background hover:bg-gold hover:text-white sm:text-sm"
                            >
                                <TrackedWhatsAppLink
                                    message="Hi, I found you on www.galeobeauty.com and would like to book or enquire about your services."
                                    trackingContext="homepage_location_whatsapp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Message Us
                                </TrackedWhatsAppLink>
                            </Button>

                            <TrackedExternalLink
                                href={businessInfo.socials.google ?? "#"}
                                trackingContext="homepage_location_directions"
                                linkType="maps"
                                linkLabel="Homepage directions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/65 transition-colors hover:text-gold sm:text-sm"
                            >
                                Get Directions
                            </TrackedExternalLink>
                        </div>
                    </div>

                    <div className="min-h-[20rem] overflow-hidden border border-border/40 bg-stone-100 shadow-[0_28px_60px_-46px_rgba(31,24,20,0.35)] sm:min-h-[22rem] lg:min-h-[26rem]">
                        <DeferredMap
                            latitude={-25.753414}
                            longitude={27.909252}
                            zoom={15}
                            previewTitle="Find Galeo Beauty"
                            previewDescription="Our location is always visible here, and the live map upgrades automatically as it comes into view."
                            directionsClassName="rounded-none"
                            className="h-full w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
