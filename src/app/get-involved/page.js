"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Users, Handshake, DollarSign } from "lucide-react";
import Button from "@/components/ui/Button";
import ParticipationSection from "@/components/sections/ParticipationSection";
import ParticipationForm from "@/components/sections/ParticipationForm";
import NeededSkillsSection from "@/components/sections/NeededSkillsSection";
import { fadeInUp, staggerContainer, tabContentTransition } from "@/lib/motion";

const TABS = ["Volunteer", "Membership", "Partnership", "Needed Skills"];

const VOLUNTEER_IMAGE =
  "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1200&auto=format&fit=crop";
const MEMBERSHIP_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop";
const PARTNERSHIP_IMAGE =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop";

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab] = useState("Volunteer");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-maroon-deep min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep to-maroon-deep/60 mix-blend-overlay opacity-30" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl sm:max-w-2xl flex flex-col items-center text-center gap-4 sm:gap-6"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-gold text-3xl sm:text-4xl md:text-5xl leading-tight"
          >
            Join the Movement of Care
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-warm-white text-base sm:text-lg">
            Whether you are an individual looking to volunteer your time, a
            professional seeking to join our membership, or an organization
            wanting to partner for greater impact, there is a place for you
            in the Love, Unity, and Care Initiative.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
          >
            <Button
              variant="accent"
              onClick={() => setActiveTab("Volunteer")}
              className="cursor-pointer w-full sm:w-auto"
            >
              Volunteer Now
            </Button>
            <Button
              variant="accentOutline"
              onClick={() => setActiveTab("Partnership")}
              className="cursor-pointer w-full sm:w-auto"
            >
              Partner With Us
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Tab nav */}
      <nav className="bg-warm-white border-b border-border-light sticky top-16 sm:top-18 lg:top-20 z-40 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="max-w-container mx-auto px-4 sm:px-6 flex gap-4 sm:gap-6 md:gap-8 justify-start sm:justify-center overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 sm:py-4 text-sm font-semibold btn-tracking border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab
                  ? "border-maroon-deep text-maroon-deep"
                  : "border-transparent text-muted hover:text-maroon-deep"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <section className="max-w-container mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">
        <AnimatePresence mode="wait">
          {activeTab === "Volunteer" && (
            <motion.div key="volunteer" {...tabContentTransition}>
              <ParticipationSection
                icon={<HeartHandshake className="text-gold" size={24} />}
                title="Volunteer With Us"
                description="Our volunteers are the heartbeat of LUCI. By giving your time and energy, you directly impact lives and help build stronger, more unified communities. Fill out the form below to start your journey with us."
                image={VOLUNTEER_IMAGE}
                form={
                  <ParticipationForm
                    endpoint="/api/get-involved/volunteer"
                    submitLabel="Register as Volunteer"
                    successMessage="We'll be in touch about upcoming volunteer opportunities that match your skills."
                    skillOptions={["Teaching/Mentoring", "Event Planning", "Healthcare"]}
                    fields={[
                      { name: "fullName", label: "Full Name", placeholder: "Jane Doe", required: true },
                      { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", required: true },
                      { name: "phone", label: "Phone Number", placeholder: "+1 234 567 8900" },
                      { name: "location", label: "Location", placeholder: "City, Country" },
                      {
                        name: "message",
                        label: "Message / Availability",
                        type: "textarea",
                        placeholder: "Tell us briefly about your experience and when you are available...",
                        fullWidth: true,
                      },
                    ]}
                  />
                }
              />
            </motion.div>
          )}

          {activeTab === "Membership" && (
            <motion.div key="membership" {...tabContentTransition}>
              <ParticipationSection
                icon={<Users className="text-gold" size={24} />}
                title="Become a Member"
                description="LUCI members are professionals and advocates who champion our mission year-round — attending forums, mentoring local leaders, and helping shape our programme direction."
                image={MEMBERSHIP_IMAGE}
                form={
                  <ParticipationForm
                    endpoint="/api/get-involved/membership"
                    submitLabel="Apply for Membership"
                    successMessage="Our membership team will follow up with next steps within 5 business days."
                    fields={[
                      { name: "fullName", label: "Full Name", placeholder: "Jane Doe", required: true },
                      { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", required: true },
                      { name: "phone", label: "Phone Number", placeholder: "+1 234 567 8900" },
                      {
                        name: "reason",
                        label: "Why do you want to join LUCI?",
                        type: "textarea",
                        placeholder: "Tell us about your background and interest...",
                        fullWidth: true,
                      },
                    ]}
                  />
                }
              />
            </motion.div>
          )}

          {activeTab === "Partnership" && (
            <motion.div key="partnership" {...tabContentTransition}>
              <ParticipationSection
                icon={<Handshake className="text-gold" size={24} />}
                title="Partner With LUCI"
                description="We collaborate with organisations, businesses, and institutions who share our vision of unified, resilient communities. Tell us about your organisation and how you'd like to partner."
                image={PARTNERSHIP_IMAGE}
                form={
                  <ParticipationForm
                    endpoint="/api/get-involved/partnership"
                    submitLabel="Submit Partnership Inquiry"
                    successMessage="Our partnerships team will reach out to discuss next steps."
                    fields={[
                      { name: "organisation", label: "Organisation Name", placeholder: "Acme Foundation", required: true },
                      { name: "contactName", label: "Contact Name", placeholder: "Jane Doe", required: true },
                      { name: "email", label: "Email Address", type: "email", placeholder: "jane@acme.org", required: true },
                      { name: "phone", label: "Phone Number", placeholder: "+1 234 567 8900" },
                      {
                        name: "proposalSummary",
                        label: "Partnership Proposal",
                        type: "textarea",
                        placeholder: "Briefly describe how you'd like to partner with LUCI...",
                        fullWidth: true,
                      },
                    ]}
                  />
                }
              />
            </motion.div>
          )}

          {activeTab === "Needed Skills" && (
            <motion.div key="skills" {...tabContentTransition}>
              <NeededSkillsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Donate CTA — the actual donation form + payment flow now lives at its
          own page, /donate, rather than being buried in a Get Involved tab. */}
      <section className="bg-warm-white border-t border-border-light section-padding flex justify-center px-4 sm:px-6">
        <div className="max-w-xl sm:max-w-2xl w-full bg-maroon-deep rounded-card p-6 sm:p-8 md:p-12 flex flex-col items-center text-center gap-4 sm:gap-6">
          <span className="bg-gold/10 border border-gold/20 text-white text-xs sm:text-sm font-semibold btn-tracking rounded-full px-3 sm:px-4 py-1.5 sm:py-2 w-fit flex items-center gap-2">
            <DollarSign size={16} className="shrink-0" /> Financial Support
          </span>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl leading-tight">
            Prefer to Give Financially?
          </h2>
          <p className="text-warm-white/80 text-base sm:text-lg">
            Every contribution, big or small, directly funds our family
            development, community, and youth programmes. Make a one-time
            gift or become a monthly supporter.
          </p>
          <Button variant="accent" href="/donate" className="w-full sm:w-auto">
            Make a Donation
          </Button>
        </div>
      </section>
    </>
  );
}