export default function LegalSection({ id, title, paragraphs = [], list = [], contactBox, children }) {
  return (
    <section id={id} className="flex flex-col gap-4 sm:gap-5 md:gap-6 pt-2 scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-28">
      <h2 className="text-xl sm:text-2xl md:!text-[28px] border-b border-border-mid/30 pb-3 sm:pb-4 leading-snug">
        {title}
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm sm:text-md font-thin !text-muted leading-relaxed">
          {p}
        </p>
      ))}
      {list.length > 0 && (
        <ul className="flex flex-col gap-2.5 sm:gap-3 pl-5 sm:pl-6 list-disc">
          {list.map((item, i) => (
            <li key={i} className="text-sm sm:text-md font-thin !text-muted leading-relaxed">
              {typeof item === "object" && item !== null && "bold" in item ? (
                <>
                  <strong className="text-charcoal">{item.bold}</strong> {item.rest}
                </>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      )}
      {contactBox && (
        <div className="bg-border-light/50 border border-border-light rounded p-4 sm:p-5 md:p-6 flex flex-col gap-1">
          {contactBox.map((line, i) => (
            <p key={i} className="text-sm sm:text-md font-thin !text-muted mb-0 break-words">
              {line.label && <span>{line.label}: </span>}
              <span className={line.label ? "text-maroon-deep" : ""}>{line.value}</span>
            </p>
          ))}
        </div>
      )}
      {children}
    </section>
  );
}