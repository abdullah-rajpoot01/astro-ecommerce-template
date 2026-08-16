"use client";
import { WhatsApp } from "./social-icons";



export default function WhatsAppButton({ whatsapp }: { whatsapp: string }) {
    const number = whatsapp.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${number}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        >
            <WhatsApp className="h-7 w-7" />
        </a>
    );
}