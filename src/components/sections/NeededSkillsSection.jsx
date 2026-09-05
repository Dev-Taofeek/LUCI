import { GraduationCap, Calendar, HeartPulse, Megaphone, Code2, Wallet } from "lucide-react";

const SKILLS = [
  { icon: GraduationCap, label: "Teaching & Mentoring", description: "Literacy programs, tutoring, and skills workshops." },
  { icon: Calendar, label: "Event Planning", description: "Coordinating summits, forums, and community days." },
  { icon: HeartPulse, label: "Healthcare", description: "Maternal health outreach and wellness clinics." },
  { icon: Megaphone, label: "Advocacy & Communications", description: "Storytelling, media, and policy dialogue." },
  { icon: Code2, label: "Digital Skills", description: "Coding bootcamps for the Future Leaders Tech Hub." },
  { icon: Wallet, label: "Finance & Grants", description: "Budgeting support and grant-writing expertise." },
];

export default function NeededSkillsSection() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="text-center max-w-xl sm:max-w-2xl mx-auto flex flex-col gap-3 sm:gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight">Where We Need You Most</h2>
        <p className="text-sm sm:text-base">
          These are the skill areas our current programmes need most.
          Register as a volunteer and tell us which of these fit you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {SKILLS.map(({ icon: Icon, label, description }) => (
          <div
            key={label}
            className="bg-white border border-border-mid rounded-card p-5 sm:p-6 flex flex-col gap-3"
          >
            <div className="bg-gold/10 rounded-control p-3 w-fit shrink-0">
              <Icon size={20} className="text-maroon-deep" />
            </div>
            <h3 className="text-lg sm:text-xl">{label}</h3>
            <p className="text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}