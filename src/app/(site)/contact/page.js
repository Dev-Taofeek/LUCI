"use client";
import PageHero from "@/components/ui/PageHero";
import { ContactInfoCard, MapCard } from "@/components/sections/ContactInfoCard";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="pb-12 sm:pb-16 md:pb-20">
      {/* Hero */}
      <PageHero
        title="Get in Touch"
        subtitle="We're here to listen, collaborate, and support our community. Reach out to us through any of our channels."
      />

      {/* Bento grid: contact info + map / form */}
      <section className="container-luci grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        <div className="md:col-span-5 flex flex-col gap-5 sm:gap-6 order-2 md:order-1">
          <ContactInfoCard />
          <MapCard />
        </div>
        <div className="md:col-span-7 order-1 md:order-2">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}