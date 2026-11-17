import PageHero from "@/components/ui/PageHero";
import ProgrammeNav from "@/components/sections/ProgrammeNav";

const PROGRAMMES = [
  {
    id: "family-life",
    number: "6.1",
    title: "Pre-Marriage, Married & Family Life Support Seminars",
    fullTitle:
      "Pre-Marriage, Married-Life & Family-Inspiring/Support Programmes; Seminars/Workshops and Counselling Services.",
    callout:
      "It is an outright fallacy to fight against juvenile delinquency or against the prostitution of women while though favouring the discrediting or deterioration of the institution of the family!",
    listLabel: "With Married & Family Life",
    items: [
      "With Pre-Marriage Persons.",
      "With Married & Family Life:",
      "A Daily Reach-out Programme.",
      "The Unity-Flame Programme.",
      "Robust Counseling Services.",
    ],
  },
  {
    id: "family-enrichment",
    number: "6.2",
    title: "In-Depth Family Enrichment Programmes",
    paragraphs: [
      "LUCI will actively be concerned with advancing studies and human development programmes of our families, their children and wards by various strategies.",
    ],
  },
  {
    id: "unity-structures",
    number: "6.3",
    title: "Commitment to Identified Structures Building Unity",
    paragraphs: [
      "Promoting, initiating, strengthening and supporting as appropriate, physical, material and institutional infrastructures considered as catalysts to building unity; supporting institutions like the National Youth Service Corps Scheme (and similar unity infrastructures), giving them prominence and pride of place.",
    ],
    items: [
      "Promoting Corpers' Welfare Initiatives.",
      "Identifying, Promoting and Supporting Programmes to amplifying Hate-Free/Violence-Free nation: LUCI will conscientiously work innovatively to create these programmes and be sustained organically; as integral element of the overall transcendental goal for a better society.",
      "Identifying and Promoting such other structures. Other structures that would be considered as pillars of unity; like in the sphere of sports, in cultural unity (relations among cultures) and other areas of typical achievements of national pride.",
    ],
  },
  {
    id: "womens-development",
    number: "6.4",
    title: "The Special Woman's Development Programme",
    paragraphs: [
      "Utilizing the instrumentality of training seminars, workshops and our counseling platforms; a special focus shall be deployed, continually seeking out for inspiration, the Naomis, the Ruths the Esthers and our modern day others like Tamar and Rahab - the mother of Boaz; for Ruth married Boaz to become the mother of Obed who became the father of Jesse. Jesse became the father of King David\"; we must begin to render worthwhile regard to \"women of providence\" of our own time: outstandingly dignified women building bridges; could be your daughter or my granddaughter as God's instrument created to wiring (connecting) boundaries, bringing down walls and barriers of division, and building bridges to achieving fullness of unity and life and making living more meaningful.",
    ],
    note: "WBB: Women building bridges a project of LUCI. Recognizing and telling the stories of great bridge building women of our time.",
  },
  {
    id: "advocacy",
    number: "6.5",
    title: "Advocacy",
    callout:
      "By advocating and communicating unity, charity and justice innovatively. That every time, God loves our co-operation and He is at work even if we cannot always see how.",
    paragraphs: [
      "Legislation by itself will never do away with all the fears, pride and selfishness which damage families and nations. To overcome such obstacles, we must rely on Human Solidarity and God's Love\" and begin to develop and/or advocate for support for quality capital human capital for quality leaders. LUCI is surely on e way to that human solidarity and God's love, advocating for:",
    ],
    items: [
      "Marriage, Family Life and manifold heritage",
      "Sustainable National Unity Infrastructures and",
      "The family as the unit of the nation in God's creation.",
      "Promoting love and denouncing hate in our nation: As families become the most readily vulnerable in any national conflagration; so we all must enthusiastically foster living relationship between the family and national unity.",
    ],
  },
];

function Programme({ programme, index }) {
  const { id, number, title, fullTitle, callout, paragraphs, listLabel, items, note } = programme;

  return (
    <article
      id={id}
      className="scroll-mt-40 border-t border-border-mid py-8 first:border-t-0 first:pt-0 sm:py-10"
    >
      <header className="flex gap-4 sm:gap-5">
        <span
          aria-hidden="true"
          className="font-display text-3xl font-semibold leading-none text-maroon-deep/30 sm:text-4xl"
        >
          {index + 1}
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl leading-snug sm:text-2xl lg:text-3xl">{title}</h2>
          {fullTitle && <p className="text-sm text-muted">{fullTitle}</p>}
        </div>
      </header>

      <div className="mt-5 flex flex-col gap-4 sm:pl-12 sm:mt-6">
        {callout && (
          <blockquote className="rounded-card border-l-4 border-maroon-deep bg-gold-light/40 px-4 py-3 text-sm font-semibold italic text-maroon-deep sm:text-base">
            {callout}
          </blockquote>
        )}

        {paragraphs?.map((p) => (
          <p key={p} className="text-sm sm:text-base">
            {p}
          </p>
        ))}

        {items && (
          <ul className="flex flex-col gap-2 text-sm sm:text-base">
            {items.map((item) => (
              <li
                key={item}
                className="relative rounded-card border border-border-mid bg-white py-3 pl-9 pr-4"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-[1.15rem] h-2 w-2 rounded-full bg-maroon-deep"
                />
                {item}
              </li>
            ))}
          </ul>
        )}

        {note && <p className="text-sm font-medium text-maroon-deep">{note}</p>}
      </div>
    </article>
  );
}

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        title="Our Inspired Activities; Thus Programmes"
        subtitle={
          'Our inspired activities thus programmes, of rather "cradle to grave" in nature: our activities begin with the family (existing and potential), and going through the family (by family development & enrichment programmes), through to collaborative spirit for common good, and fruiting to stronger families, sound citizenry and deepening patriotic well-being. Our activities therefore are: family and neighbor and country focused, laid out as programmes grouped as follows:'
        }
      />

      <section id="programmes-section" className="container-luci py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[18rem_1fr] lg:gap-16">
          {/* Programme index (fixed on scroll) */}
          <ProgrammeNav programmes={PROGRAMMES} boundaryId="programmes-section" />

          {/* Programmes */}
          <div className="flex flex-col">
            {PROGRAMMES.map((programme, i) => (
              <Programme key={programme.id} programme={programme} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}