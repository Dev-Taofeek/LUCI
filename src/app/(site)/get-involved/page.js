"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Users, Handshake, DollarSign } from "lucide-react";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ParticipationSection from "@/components/sections/ParticipationSection";
import ParticipationForm from "@/components/sections/ParticipationForm";
import NeededSkillsSection from "@/components/sections/NeededSkillsSection";
import { tabContentTransition } from "@/lib/motion";

const TABS = ["Volunteer", "Membership", "Partnership", "Needed Skills"];

const VOLUNTEER_IMAGE =
  "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1200&auto=format&fit=crop";
const MEMBERSHIP_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop";
const PARTNERSHIP_IMAGE =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop";

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab] = useState("Volunteer");
  const tabRefs = useRef({});

  const handleTabKeyDown = (e) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const idx = TABS.indexOf(activeTab);
    let next;
    if (e.key === "ArrowRight") next = (idx + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else next = TABS.length - 1;
    e.preventDefault();
    setActiveTab(TABS[next]);
    tabRefs.current[TABS[next]]?.focus();
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        tone="dark"
        title="Join the Movement of Care"
        subtitle="Whether you are an individual looking to volunteer your time, a professional seeking to join our membership, or an organization wanting to partner for greater impact, there is a place for you in the Living Unity Core Initiative."
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
      </PageHero>

      {/* Tab nav */}
      <nav
        className="bg-white border-b border-border-light sticky top-16 lg:top-20 z-40"
        role="tablist"
        aria-label="Ways to get involved"
        onKeyDown={handleTabKeyDown}
      >
        <div className="container-luci flex gap-4 sm:gap-6 md:gap-8 justify-start sm:justify-center overflow-x-auto">
          {TABS.map((tab) => {
            const tabId = `tab-${tab.toLowerCase().replace(/\s+/g, "-")}`;
            const panelId = `panel-${tab.toLowerCase().replace(/\s+/g, "-")}`;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={tabId}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                onClick={() => setActiveTab(tab)}
                className={`py-3 sm:py-4 text-sm font-semibold btn-tracking border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? "border-maroon-deep text-maroon-deep"
                    : "border-transparent text-muted hover:text-maroon-deep"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </nav>

      <section className="container-luci py-10 sm:py-14 md:py-20">
        <AnimatePresence mode="wait">
          {activeTab === "Volunteer" && (
            <motion.div
              key="volunteer"
              {...tabContentTransition}
              id="panel-volunteer"
              role="tabpanel"
              aria-labelledby="tab-volunteer"
            >
              <ParticipationSection
                icon={<HeartHandshake className="text-gold" size={24} />}
                title="Volunteer With Us"
                description="Our activities begin with the family (existing and potential) and fruit to stronger families, sound citizenry and deepening patriotic well-being. Join our Daily Reach-out Programme, the Unity-Flame Programme, or our robust counselling services. Fill out the form below to start your journey with us."
                image={VOLUNTEER_IMAGE}
                form={
                  <ParticipationForm
                    endpoint="/api/get-involved/volunteer"
                    submitLabel="Register as Volunteer"
                    successMessage="We'll be in touch about upcoming volunteer opportunities that match your skills."
                    skillOptions={["Counselling", "Family Enrichment", "Advocacy", "Women's Development", "NYSC Support"]}
                    fields={[
                      { name: "fullName", label: "Full Name", placeholder: "Jane Doe", required: true },
                      { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", required: true },
                      { name: "phone", label: "Phone Number", placeholder: "+234 802 885 2121" },
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
            <motion.div
              key="membership"
              {...tabContentTransition}
              id="panel-membership"
              role="tabpanel"
              aria-labelledby="tab-membership"
            >
              <ParticipationSection
                icon={<Users className="text-gold" size={24} />}
                title="Become a Member"
                description="Membership is open to families and individuals (as potential families) under three routes: Primary Members (PM), Associate Members (AM), and Integral Members (IM) — all being persons who will generously commit their talents, time and treasures to the prompt realization of the vision, mission and aspirations of LUCI."
                image={MEMBERSHIP_IMAGE}
                form={
                  <ParticipationForm
                    endpoint="/api/get-involved/membership"
                    submitLabel="Apply for Membership"
                    successMessage="Our membership team will follow up with next steps within 5 business days."
                    fields={[
                      { name: "fullName", label: "Full Name", placeholder: "Jane Doe", required: true },
                      { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", required: true },
                      { name: "phone", label: "Phone Number", placeholder: "+234 802 885 2121" },
                      { name: "state", label: "State of Residence", placeholder: "Lagos" },
                      { name: "lga", label: "LGA of Residence", placeholder: "Ikeja" },
                      { name: "address", label: "Residential Address", placeholder: "Street, area, city", fullWidth: true },
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
            <motion.div
              key="partnership"
              {...tabContentTransition}
              id="panel-partnership"
              role="tabpanel"
              aria-labelledby="tab-partnership"
            >
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
                      { name: "phone", label: "Phone Number", placeholder: "+234 802 885 2121" },
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
            <motion.div
              key="skills"
              {...tabContentTransition}
              id="panel-needed-skills"
              role="tabpanel"
              aria-labelledby="tab-needed-skills"
            >
              <NeededSkillsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Donate CTA — the actual donation form + payment flow now lives at its
          own page, /donate, rather than being buried in a Get Involved tab. */}
      <section className="bg-white border-t border-border-light section-padding">
        <div className="container-luci flex justify-center">
          <div className="w-full max-w-xl sm:max-w-2xl bg-maroon-deep rounded-card p-6 sm:p-8 md:p-12 flex flex-col items-center text-center gap-4 sm:gap-6">
            <span className="bg-gold/10 border border-gold/20 text-white text-xs sm:text-sm font-semibold btn-tracking rounded-control px-3 sm:px-4 py-1.5 sm:py-2 w-fit flex items-center gap-2">
              <DollarSign size={16} className="shrink-0" /> Financial Support
            </span>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl leading-tight">
              Prefer to Give Financially?
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              Every contribution, big or small, directly funds our family
              development, community, and youth programmes. Make a one-time
              gift or become a monthly supporter.
            </p>
            <Button variant="accentWhite" href="/donate" className="w-full sm:w-auto">
              Make a Donation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}