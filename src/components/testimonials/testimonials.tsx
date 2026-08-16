
import type { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import testimonialsData from "@/content/pages/testimonials.json"
import homePageData from "@/content/pages/home.json";


const TestimonialsPage = () => {
  const { title, description, enabled } = testimonialsData;

  const { setting } = homePageData;

  if (!enabled || !setting.testimonialsEnabled) return null;
  
  return (<div className="px-6 py-30 h-auto relative">
    <h2 className="text-center  font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      {title}
    </h2>
    <p className="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] md:text-2xl">
      {description}
    </p>
    <div className="mask-x-from-80% mt-14">
      <Marquee className="[--duration:60s]" pauseOnHover>
        <TestimonialList />
      </Marquee>
      <Marquee className="mt-0 [--duration:60s]" pauseOnHover reverse>
        <TestimonialList />
      </Marquee>
    </div>
  </div>
  )
};

const TestimonialList = () => {
  const { testimonials } = testimonialsData;
  return <>
    {testimonials.map((testimonial) => (
      <div
        className="min-w-96 max-w-sm rounded-xl bg-accent p-6"
        key={testimonial.id}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary font-medium text-primary-foreground text-xl">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{testimonial.name}</p>
              <p className="text-muted-foreground text-sm">
                {testimonial.role}
              </p>
            </div>
          </div>
          <Button asChild size="icon" variant="ghost">
            <div>
              <TwitterLogo className="h-4 w-4" />
            </div>
          </Button>
        </div>
        <p className="mt-5 text-[17px]">{testimonial.message}</p>
      </div>

    ))}
  </>
};

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      fill="currentColor"
    />
  </svg>
);

export default TestimonialsPage;
