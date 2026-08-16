import CarouselWithFooter from "@/components/home/hero-carousel";
import { getStoreConfig } from "@/utils/store-config";
import heroData from "@/content/sections/hero.json";
import { buttonVariants } from "@/components/ui/button";
import IconComponent from "@/components/icon";
import { cn } from "@/lib/utils";
import homePageData from "@/content/pages/home.json";

interface HeroSectionProps {
    children: React.ReactNode; // This holds our interactive carousel island
}

export default function HeroSection({ children }: HeroSectionProps) {

    const { heading, subHeading,  tagLine, description, buttons } = heroData;

    const isButtonsGreaterThan1 = buttons.length > 1;

    const { store } = getStoreConfig();

    return (
        <section id="hero" className="pt-20 px-4 md:px-8">
            <div className=" grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <span className="block text-primary text-balance font-heading  text-5xl md:text-6xl font-black uppercase leading-[0.94] ">{heading || store.name}</span>
                    <h2 className="mt-3 text-balance font-heading text-3xl sm:text-4xl font-black uppercase leading-[0.94] text-foreground ">
                        {subHeading}
                        <span className="block text-primary mt-3">{tagLine}</span>
                    </h2>
                    <p className="mt-3 max-w-xl text-xl leading-7 text-foreground/90 sm:text-text-2xl">
                        {description}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row w-full flex-wrap">
                        {
                            buttons.map((btn) => {
                                // Cast the variant type explicitly
                                const buttonVariant = btn.type as "secondary" | "link" | "default" | "outline" | "ghost" | "destructive" | null | undefined;
                                return (
                                    <a key={btn.link} href={btn.link} className={cn(`grow w-full`, isButtonsGreaterThan1 && "sm:max-w-[47%]")}>
                                        <div
                                            className={cn(buttonVariants({ variant: buttonVariant, size: "icon" }), "rounded-md text-sm px-4 py-3! mt-2 w-full text-center")}

                                        >
                                            {btn.icon && <IconComponent name={btn.icon} className="size-4 mr-1" />} {btn.text}
                                        </div>
                                    </a>
                                );
                            })
                        }
                    </div>

                </div>
                <div className="relative overflow-hidden max-w-md lg:aspect-square mx-auto border border-foreground/10 bg-black rounded-lg">
                    
                     {children}
                </div>
            </div>
        </section>

    );
}
