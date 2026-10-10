"use client";

import { motion } from "framer-motion";
import { Users, HeartHandshake, Link2, Flag } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import PageHero from "@/components/ui/PageHero";
import { IconCard } from "@/components/ui/Card";
import { ACTIVITIES, ACTIVITY_COMPONENTS } from "@/lib/data/impact";

export default function ImpactPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        tone="dark"
        eyebrow="Our Impact"
        title={
          <>
            Making <span className="text-gold">"Beauty in Diversity"</span> Work.
          </>
        }
        subtitle="Growing expertise in human diversity management from the family level for a better society and better nation: A more perfect union."
      />

      {/* Our Values */}
      <section className="bg-white section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="container-luci flex flex-col gap-8 sm:gap-10 lg:gap-12"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center gap-2 sm:gap-3"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">Our Values</h2>
            <p className="text-sm sm:text-base max-w-xl">
              That God creates the family and continuously sustains it
              for his purpose — and the family is the true engine room
              of citizenry.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            <IconCard
              icon={<Users className="text-maroon-deep" size={20} />}
              title="The Family, Engine Room of Citizenry"
              description="The family (a micro nation) can become the effective unit of commitment to cohesive unity, inculcating in the individual, from the family level, a mentality that is charitable, while making national values attractive."
            />
            <IconCard
              icon={<HeartHandshake className="text-maroon-deep" size={20} />}
              title="Citizens Are Families"
              description="Citizens are families and are the building blocks of society, and they must be nurtured to love and not to hate. Family as source of the new generation citizens who will receive from their parents the manifold heritage of values, duties and aspiration of the nation."
              tint="gold"
            />
            <IconCard
              icon={<Link2 className="text-maroon-deep" size={20} />}
              title="Family Commitment, Building Bridges"
              description="LUCI is set to identify and deliver on the missing link and begin to make cohesive unity attractive, hate-free, controlled anger, resentment-free and making this a family commitment on a front burner."
            />
            <IconCard
              icon={<Flag className="text-maroon-deep" size={20} />}
              title="The New Nigeria"
              description="That the entire country be a truly NEW NIGERIA — seen as one very large family, united together by various divine webs and ties, where every member is attended to as a family's mutual challenge."
              tint="gold"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Summary of Activities */}
      <section className="bg-white border-t border-border-light section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="container-luci flex flex-col gap-8 sm:gap-10 lg:gap-12"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center gap-2 sm:gap-3"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">
              Summary of Activities
            </h2>
            <p className="text-sm sm:text-base max-w-xl">
              Our main activities, as laid out in the LUCI brochure.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {ACTIVITIES.map((activity, i) => (
              <div
                key={activity}
                className="bg-white border border-border-mid rounded-card p-5 sm:p-6 flex items-start gap-4"
              >
                <span className="bg-maroon-deep text-white font-display font-semibold text-lg rounded-control size-10 sm:size-12 shrink-0 flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm sm:text-base text-charcoal pt-2 sm:pt-3">
                  {activity}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-white border border-border-mid rounded-card p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4"
          >
            <h3 className="text-sm font-semibold text-maroon-deep btn-tracking">
              Components
            </h3>
            <ul className="list-disc pl-4 text-sm sm:text-base text-muted flex flex-col gap-1">
              {ACTIVITY_COMPONENTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
