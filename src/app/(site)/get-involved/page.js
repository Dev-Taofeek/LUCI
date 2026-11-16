"use client";

import { Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ParticipationSection from "@/components/sections/ParticipationSection";
import ParticipationForm from "@/components/sections/ParticipationForm";

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        tone="dark"
        title="Join the Movement of Care"
        subtitle="Whether you are an individual looking to volunteer your time, a professional seeking to join our membership, or an organization wanting to partner for greater impact, there is a place for you in the Living Unity Core Initiative."
      />

      <section className="container-luci py-10 sm:py-14 md:py-20">
      <ParticipationSection
        icon={<Users className="text-gold" size={24} />}
        title="Become a Member"
        description="Membership is open to families and individuals (as potential families) under three routes: Primary Members (PM), Associate Members (AM), and Integral Members (IM) — all being persons who will generously commit their talents, time and treasures to the prompt realization of the vision, mission and aspirations of LUCI."
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
      </section>
    </>
  );
}