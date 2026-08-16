import { ArrowRight,  Clock, Mail, MapPin, Phone } from "lucide-react";
import { getStoreConfig } from "@/utils/store-config";
import footerData from "@/content/sections/footer.json"
import { Facebook, Instagram, TikTok, YouTube } from "@/components/social-icons";
import IconComponent from "@/components/icon";

const Footer = () => {
  const { title, subtitle, description, image, sections, quickLinks, settings } = footerData;

  if (!settings.enabled) {
    return null;
  }

  const { store, contact, address } = getStoreConfig();

  return (
    <footer className="border-t border-black/10 bg-background mt-10">
      <div className="site-container py-14 px-8 text-sm text-foreground md:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1.25fr_1fr]">
          <div>
            <a href={`/`} className="flex   gap-3">

              <div className="relative w-20 flex justify-center items-center aspect-square shadow-lg border rounded  border-foreground/80 overflow-hidden">
                <img src={image || store.logo} className="w-full h-full object-cover" /> 
              </div>


              <span className="min-w-0 leading-none">
                <span className="block text-base font-black uppercase tracking-wide text-foreground">
                  {title || store.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                  {subtitle || "Online Store"}
                </span>
              </span>

            </a>
            <p className="mt-4 max-w-sm leading-7">
              {description || store.description}
            </p>
            {sections.social.enabled && <div className="mt-7">
              <h3 className="font-heading text-sm font-black uppercase tracking-[0.28em] text-foreground">
                {sections.social.title || "Social Media"}
              </h3>
              <div className=" flex flex-wrap gap-3 mt-3">
                <a
                  href={`https://www.instagram.com/${store.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Iron Heaven instagram"
                  className="grid size-10 place-items-center rounded-md border border-foreground/10 bg-background text-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  id="base-ui-_R_375qnnb_"
                  data-slot="tooltip-trigger"
                >
                  <Instagram className="size-4" />
                  <span className="sr-only">instagram</span>
                </a>
                <a
                  href={`https://www.facebook.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Iron Heaven facebook"
                  className="grid size-10 place-items-center rounded-md border border-foreground/10 bg-background text-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  id="base-ui-_R_3b5qnnb_"
                  data-slot="tooltip-trigger"
                >
                  <Facebook className="size-4" />
                  <span className="sr-only">facebook</span>
                </a>
                <a
                  href={`https://www.youtube.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Iron Heaven youtube"
                  className="grid size-10 place-items-center rounded-md border border-foreground/10 bg-background text-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  id="base-ui-_R_3f5qnnb_"
                  data-slot="tooltip-trigger"
                >
                  <YouTube className="size-4" />
                  <span className="sr-only">youtube</span>
                </a>
                <a
                  href={`"https://www.tiktok.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Iron Heaven tiktok"
                  className="grid size-10 place-items-center rounded-md border border-foreground/10 bg-background text-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  id="base-ui-_R_3j5qnnb_"
                  data-slot="tooltip-trigger"
                >
                  <TikTok className="size-4" />
                  <span className="sr-only">tiktok</span>
                </a>
              </div>
            </div>}
          </div>
          {sections.quickLinks.enabled && <div>
            <h3 className="font-heading text-sm font-black uppercase tracking-[0.28em] text-foreground">
              {sections.quickLinks.title || "Quick Links"}
            </h3>
            <nav className="mt-5 grid gap-3">
              {
                quickLinks.map((link, index) => (<a key={index} className="transition-colors hover:text-primary group flex items-center gap-2" href={link.url}>
                {settings.isIconVisible && link.icon && <IconComponent name={link.icon} className="size-4" />}  {link.label}
                  <ArrowRight className="size-3 hidden group-hover:block group-hover:translate-x-0.5 transition-all duration-150" />
                </a>))
              }
            </nav>
          </div>}
          {sections.contact.enabled && <div>
            <h3 className="font-heading text-sm font-black uppercase tracking-[0.28em] text-foreground">
              {sections.contact.title || "Contact"}
            </h3>
            <div className="mt-5 grid gap-5">
              <div
                className="flex gap-4 leading-6 transition-colors hover:text-foreground group"
              >
                <MapPin className='size-4 group-hover:text-primary' />
                <span className="group-hover:text-primary">
                  {address.addressLine2}
                </span>
              </div>
              <a
                href={`tel:${contact.phone?.[0]}`}
                className="flex items-center gap-4 transition-colors hover:text-foreground group"
              >
                <Phone className='size-4 group-hover:text-primary' />
                <span className="group-hover:text-primary">{contact.phone?.[0].replace(/[^0-9]/g, "").replace(/^92/, "0")}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 transition-colors hover:text-foreground group"
              >
                <Mail className='size-4 group-hover:text-primary' />
                <span className="group-hover:text-primary">{contact?.email}</span>
              </a>
            </div>
          </div>
          }
          {sections.businessHours.enabled && <div>
            <h3 className="font-heading text-sm font-black uppercase tracking-[0.28em] text-foreground">
              {sections.businessHours.title || "Hours"}
            </h3>
            <div className="mt-5 flex gap-4">
              <Clock className='size-4' />
              <div className="grid gap-3 leading-6">
                <div>
                  <div className="font-bold text-foreground"> Monday-Friday</div>
                  <div>Morning: 9:30 AM to 12:30 AM</div>
                  <div>Evening: 1:00 PM to 6:00 PM</div>
                </div>
                <div>
                  <div className="font-bold text-foreground"> Saturday</div>
                  <div>Morning: 10:00 AM to 5:30 PM</div>
                </div>
              </div>
            </div>
          </div>}
        </div>
        <div className="mt-14 grid gap-6 border-t border-foreground/10 pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-2">
            {sections.copyRight.enabled && <div>{sections.copyRight?.title ? sections.copyRight?.title : `© ${new Date().getFullYear()} ${store.name}. All rights reserved.`}</div>}
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart size-3.5 fill-primary text-primary"
                aria-hidden="true"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
              <span>by</span>
              <a
                href="https://eligodigital.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-foreground transition-colors hover:text-primary"
              >
                Abdullah Rajpoot
              </a>
            </div>
          </div>
          {sections.siteMap.enabled && <nav className="flex flex-wrap gap-6 text-xs md:justify-end">
            <a href="/sitemap.xml" className="transition-colors hover:text-foreground">
              {sections.siteMap.title || "Sitemap"}
            </a>
          </nav>}
        </div>
      </div>
    </footer>

  );
};

export default Footer;
