import { useEffect, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faReact, faTailwindCss } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faEnvelope as farEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faCode,
  faLayerGroup,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareJs } from "@fortawesome/free-brands-svg-icons";

const technologies = [
  { name: "React", icon: faReact, color: "rgb(132, 207, 222)" },
  { name: "TypeScript", icon: faSquareJs, color: "rgb(58, 134, 201)" },
  { name: "Tailwind CSS", icon: faTailwindCss, color: "rgb(132, 207, 222)" },
  { name: "Supabase", icon: faCode, color: "rgb(132, 207, 222)" },
];

const services = [
  {
    icon: faCode,
    title: "Web Development",
    description: "Modern responsive websites for businesses, portfolios, and services",
    points: ["Responsive design", "Clean UI", "Fast performance"],
  },
  {
    icon: faBagShopping,
    title: "Landing Pages",
    description: "High-converting landing pages for products and personal brands",
    points: ["Clear sections", "CTA buttons", "Mobile friendly"],
  },
  {
    icon: faLayerGroup,
    title: "UI Implementation",
    description: "Converting designs into modern React interfaces",
    points: ["React components", "Tailwind styling", "Reusable layout"],
  },
];

const aboutHighlights = [
  {
    title: "Business Websites",
    description: "Professional websites for companies, shops, and personal brands.",
  },
  {
    title: "Landing Pages",
    description: "Pages designed to convert visitors into customers.",
  },
  {
    title: "Website Redesign",
    description: "Upgrade your current website with modern design and better UX.",
  },
  {
    title: "Ongoing Support",
    description: "Support, updates, and improvements after launch.",
  },
];

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
    setFormStatus(null);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!isContactModalOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseContactModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isContactModalOpen]);

  const handleSubmitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setFormStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormStatus({
        type: "error",
        text: "Email service is not configured. Add EmailJS keys to your environment.",
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: trimmedName,
          email: trimmedEmail,
          reply_to: trimmedEmail,
          to_name: "Lyale Azbarka",
          from_name: trimmedName,
          from_email: trimmedEmail,
          message: trimmedMessage,
          to_email: "zbarkalyale69@gmail.com",
        },
        { publicKey },
      );

      setFormStatus({ type: "success", text: "Your message was sent successfully!" });
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      const errorText =
        typeof error === "object" && error !== null && "text" in error
          ? String(error.text)
          : typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : "";

      setFormStatus({
        type: "error",
        text: errorText ? `Failed to send message: ${errorText}` : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  } as const;

  const fadeLeft = {
    initial: { opacity: 0, x: -28 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.85, ease: "easeOut", delay: 0.14 },
  } as const;

  const buttonAnimation = {
    initial: { opacity: 0, y: 10, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.7, ease: "easeOut" },
  } as const;

  const techContainer = {
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
  } as const;

  const techItem = {
    initial: { opacity: 0, y: 12, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.66, ease: "easeOut" },
  } as const;

  const profileEnter = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
  } as const;

  return (
    <div className="w-full min-h-screen bg-white text-[#2f2b33]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-36 top-20 h-72 w-72 rounded-full border border-[#f4dbe1]" />
        <div className="pointer-events-none absolute -right-32 top-[420px] h-72 w-72 rounded-full border border-[#f4dbe1]" />

        <motion.header className="w-full bg-white" initial={fadeDown.initial} animate={fadeDown.animate} transition={fadeDown.transition}>
          <nav className="flex w-full items-center justify-between px-8 py-6 lg:px-20">
            <p className="text-[31px] font-bold tracking-tight">Lyale Azbarka</p>
            <nav className="hidden items-center gap-10 text-[15px] text-[#6f6c72] md:flex">
              <a className="border-b-2 border-[#d79aa8] pb-2 text-[#cb8798]" href="#about">
                About
              </a>
              <a className="hover:text-[#cb8798]" href="#services">
                Services
              </a>
              <a className="hover:text-[#cb8798]" href="#projects">
                Projects
              </a>
              <a className="hover:text-[#cb8798]" href="#contact">
                Contact
              </a>
            </nav>
          </nav>
        </motion.header>

        <main className="w-full bg-white">
          <section id="about" className="w-full min-h-screen px-8 py-14 lg:px-20 lg:py-16">
            <div className="grid min-h-[calc(100vh-120px)] w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-4">
              <motion.div
                className="w-full space-y-7"
                initial={fadeLeft.initial}
                animate={fadeLeft.animate}
                transition={fadeLeft.transition}
              >
                <p className="text-[22px] font-semibold text-[#cb8798]">Software Engineer & Web Developer</p>

                <h1 className="text-6xl font-extrabold leading-[1.06] tracking-[-0.03em] text-[#25242a]">
                  Hi, I&apos;m Lyale.
                  <br />
                  I turn ideas into
                  <span className="text-[#cb8798]"> modern websites.</span>
                </h1>

                <div className="max-w-2xl space-y-5 text-xl leading-relaxed text-[#66626a]">
                  <p>
                    I&apos;m a Software Engineering graduate and M.Sc. student. I build clean, responsive, and
                    user-friendly websites for small businesses, startups, and personal brands.
                  </p>
                  <p>
                    From landing pages to full web applications, I help clients create a professional online presence
                    with modern design and reliable development.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2 lg:flex-nowrap">
                  <motion.a
                    href="#projects"
                    className="inline-flex items-center rounded-xl bg-[#d894a2] px-7 py-4 text-lg font-semibold text-white shadow-[0_8px_25px_rgba(216,148,162,0.35)] transition hover:bg-[#c78392]"
                    initial={buttonAnimation.initial}
                    animate={buttonAnimation.animate}
                    transition={{ ...buttonAnimation.transition, delay: 0.42 }}
                  >
                    <FontAwesomeIcon icon={faBagShopping} style={{ color: "rgb(255, 255, 255)", }} className="mr-2 text-lg" />
                    View My Work
                  </motion.a>
                  <motion.button
                    type="button"
                    onClick={handleOpenContactModal}
                    className="inline-flex items-center rounded-xl border border-[#d7a2af] bg-white px-7 py-4 text-lg font-semibold text-[#bf7f8e] transition hover:bg-[#fff5f8]"
                    initial={buttonAnimation.initial}
                    animate={buttonAnimation.animate}
                    transition={{ ...buttonAnimation.transition, delay: 0.52 }}
                  >
                    <FontAwesomeIcon icon={farEnvelope} style={{ color: "#d894a2" }} className="mr-2 text-lg" />
                    Contact Me
                  </motion.button>
                </div>

                <motion.div className="flex flex-wrap gap-4 pt-2" variants={techContainer} initial="initial" animate="animate">
                  {technologies.map((tech) => (
                    <motion.span
                      key={tech.name}
                      className="inline-flex items-center rounded-xl border border-[#f0e8eb] bg-white px-5 py-2.5 text-base font-medium text-[#66626a] shadow-[0_4px_14px_rgba(28,26,30,0.06)]"
                      variants={techItem}
                    >
                      <FontAwesomeIcon icon={tech.icon} style={{ color: tech.color }} className="mr-2" />
                      {tech.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="flex w-full justify-center lg:-ml-4 lg:justify-start"
                initial={profileEnter.initial}
                animate={profileEnter.animate}
                transition={profileEnter.transition}
              >
                <div className="w-full max-w-2xl rounded-[34px] bg-[#faeef1] p-5 shadow-[0_18px_55px_rgba(34,28,35,0.11)] md:p-8">
                  <motion.div
                    className="relative overflow-hidden rounded-[30px] bg-[#fbeff2] p-8 pb-0"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, delay: 1.1 }}
                  >
                    <div className="mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full border-[14px] border-[#f5dbe2] bg-white md:h-[290px] md:w-[290px]">
                      <img src="/profile.png" alt="Lyale Azbarka" className="h-full w-full object-cover" />
                    </div>
                  </motion.div>

                  <div className="-mt-3 rounded-[24px] bg-white p-6 shadow-[0_18px_40px_rgba(34,28,35,0.09)] md:p-7">
                    <div className="grid gap-8 md:grid-cols-2 md:gap-6">
                      <article>
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f9e8ec]">
                          <FontAwesomeIcon icon={faCircleUser} style={{ color: "#d894a2" }} className="text-lg" />
                        </div>
                        <p className="mb-3 text-xl font-bold text-[#2f2b33]">Who I Am</p>
                        <p className="text-[15px] leading-7 text-[#726f76]">
                          I&apos;m a Software Engineering graduate and M.Sc. student who loves building clean, efficient,
                          and impactful web solutions.
                        </p>
                      </article>

                      <article>
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f9e8ec]">
                          <FontAwesomeIcon icon={faCode} style={{ color: "#d894a2" }} className="text-lg" />
                        </div>
                        <p className="mb-3 text-xl font-bold text-[#2f2b33]">What I Do</p>
                        <ul className="space-y-2 text-[15px] text-[#726f76]">
                          <li>Responsive Websites</li>
                          <li>Landing Pages</li>
                          <li>Web Applications</li>
                          <li>UI/UX Implementation</li>
                        </ul>
                      </article>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>

      <section id="services" className="mx-auto w-full max-w-7xl px-8 pb-24 pt-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#cb8798]">What I Offer</p>
          <h2 className="mt-2 text-5xl font-extrabold tracking-[-0.02em] text-[#26242a]">Services</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-[#f2e9ec] bg-white p-8 shadow-[0_10px_28px_rgba(28,24,30,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_38px_rgba(28,24,30,0.14)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8dce4]">
                <FontAwesomeIcon icon={item.icon} className="text-xl text-[#bc7487]" />
              </div>
              <p className="text-2xl font-bold text-[#2f2b33]">{item.title}</p>
              <p className="mt-3 text-[15px] leading-7 text-[#726f76]">{item.description}</p>
              <ul className="mt-6 space-y-3 text-[15px] text-[#726f76]">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#d894a2]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="about-me" className="w-full py-24">
        <div className="w-full px-10 lg:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-12 px-10 lg:grid-cols-2 lg:gap-24 lg:px-20">            <div className="w-full rounded-3xl border border-[#f2e7eb] bg-[#faeef1] p-6 shadow-[0_14px_34px_rgba(28,24,30,0.08)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {aboutHighlights.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-[#f3e4e8] bg-white p-6 shadow-[0_8px_22px_rgba(28,24,30,0.07)]"
                  >
                    <p className="text-3xl font-semibold text-[#2f2b33]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#726f76]">{item.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-gradient-to-r from-[#d894a2] to-[#cb8798] p-6 text-white shadow-[0_10px_25px_rgba(203,135,152,0.32)]">
                <p className="text-4xl font-extrabold">3+ Years</p>
                <p className="mt-1 text-sm font-semibold tracking-[0.02em]">Learning &amp; Building</p>
              </div>
            </div>

            <div className="w-full rounded-3xl border border-[#f1e5e9] bg-white p-7 shadow-[0_14px_34px_rgba(28,24,30,0.08)] sm:p-8 lg:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#f8dce4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#cb8798]">
                <FontAwesomeIcon icon={faWandMagicSparkles} className="text-[11px]" />
                About Section
              </p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.02em] text-[#2f2b33] sm:text-5xl">
                What I Can Do
              </h2>
              <p className="mt-3 text-lg font-semibold text-[#cb8798]">Web Developer for Businesses &amp; Brands</p>
              <p className="mt-5 text-[15px] leading-8 text-[#726f76]">
                I help small businesses and startups build modern, clean, and professional websites that represent their
                brand and attract customers.
              </p>
              <p className="mt-4 text-[15px] leading-8 text-[#726f76]">
                My focus is not just on design, but on creating websites that are fast, responsive, and easy to use,
                so your business looks trustworthy and stands out online.
              </p>
              <p className="mt-4 text-[15px] leading-8 text-[#726f76]">
                Whether you need a landing page, a full website, or an upgrade to your current site, I work closely
                with you to turn your idea into a real, working product that delivers results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f2b33]/35 px-4 py-6"
          onClick={handleCloseContactModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div
            className="relative w-full max-w-xl rounded-[28px] border border-[#f2e3e8] bg-white p-6 shadow-[0_24px_70px_rgba(34,28,35,0.2)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseContactModal}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#efdae0] bg-[#fff7f9] text-xl text-[#ba7f8d] transition hover:bg-[#feeef2]"
              aria-label="Close contact modal"
            >
              X
            </button>

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#cb8798]">Let&apos;s Connect</p>
            <h3 id="contact-modal-title" className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-[#2f2b33]">
              Contact Me
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-[#716d75]">
              Share your project idea and I&apos;ll get back to you as soon as possible.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmitContact}>
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-[#5b5860]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-2xl border border-[#ecd7de] bg-[#fffafb] px-4 py-3 text-[15px] text-[#2f2b33] outline-none transition focus:border-[#d894a2] focus:ring-2 focus:ring-[#f6d8df]"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#5b5860]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-[#ecd7de] bg-[#fffafb] px-4 py-3 text-[15px] text-[#2f2b33] outline-none transition focus:border-[#d894a2] focus:ring-2 focus:ring-[#f6d8df]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#5b5860]">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="min-h-32 w-full resize-y rounded-2xl border border-[#ecd7de] bg-[#fffafb] px-4 py-3 text-[15px] text-[#2f2b33] outline-none transition focus:border-[#d894a2] focus:ring-2 focus:ring-[#f6d8df]"
                  placeholder="Tell me about your project..."
                />
              </div>

              {formStatus && (
                <p
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${formStatus.type === "success"
                    ? "bg-[#e7f9ef] text-[#1c7b4f]"
                    : "bg-[#fff1f5] text-[#b14d67]"
                    }`}
                >
                  {formStatus.text}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#d894a2] px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(216,148,162,0.35)] transition hover:bg-[#c78392] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;