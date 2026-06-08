import type { Metadata } from "next"
import { Gamepad2, Mail, Shield, FileText, Zap, Globe, Smartphone } from "lucide-react"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about crazyplay, our free online gaming platform, plus our privacy policy and terms of service.",
}

const features = [
  {
    icon: <Zap size={20} />,
    title: "Instant Play",
    body: "No downloads or installs. Every game runs right in your browser in seconds.",
  },
  {
    icon: <Globe size={20} />,
    title: "Thousands of Games",
    body: "Action, arcade, puzzle, sports and more — a huge library updated regularly.",
  },
  {
    icon: <Smartphone size={20} />,
    title: "Play Anywhere",
    body: "Fully responsive across phones, tablets and desktops. Your games, everywhere.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-6 sm:px-6">
      <PageHero
        title="About crazyplay"
        subtitle="Free online games for everyone"
        icon={<Gamepad2 size={22} />}
      />
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="text-primary">{f.icon}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Our mission is to make online gaming accessible to everyone.
          We believe great games should be easy to discover, simple to
          access, and enjoyable on every device. crazyplay connects players
          with high-quality browser games through a fast, modern, and
          user-friendly platform.
        </p>
      </section>

      <section id="privacy" className="mt-10 rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Shield size={22} className="text-primary" />
          Privacy Policy
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>crazyplay values user privacy and is committed to protecting your information.</p>
          <p>We do not require account registration to access games. Favorites and recently played games may be stored locally on your device using browser storage.</p>
          <p>We do not sell personal information to third parties. Third-party game providers, analytics providers, and advertising partners may collect information according to their own privacy policies.</p>
          <p>By using crazyplay, you agree to the privacy practices described on this page.</p>
        </div>
      </section>

      <section id="terms" className="mt-10 rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <FileText size={22} className="text-primary" />
          Terms of Service
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>crazyplay is provided for entertainment purposes only.</p>
          <p>All games remain the property of their respective developers and publishers.</p>
          <p>Users may not copy, reproduce, distribute, reverse-engineer, scrape, or misuse content available through the platform.</p>
          <p>We reserve the right to modify, update, or discontinue any part of the service without notice.</p>
          <p>Continued use of crazyplay constitutes acceptance of these terms and future updates.</p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-5">
          <div>
            <h3 className="font-semibold">Do I need to create an account?</h3>
            <p className="mt-1 text-muted-foreground">No. You can play games instantly without creating an account.</p>
          </div>

          <div>
            <h3 className="font-semibold">Are all games free?</h3>
            <p className="mt-1 text-muted-foreground">Yes. All games available on crazyplay can be played for free.</p>
          </div>

          <div>
            <h3 className="font-semibold">Can I play on mobile devices?</h3>
            <p className="mt-1 text-muted-foreground">Yes. crazyplay is optimized for smartphones, tablets, laptops, and desktop computers.</p>
          </div>

          <div>
            <h3 className="font-semibold">Do I need to download anything?</h3>
            <p className="mt-1 text-muted-foreground">No downloads are required. Games run directly in your browser.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="mt-10 mb-10 rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Mail size={22} className="text-primary" />
          Contact Us
        </h2>
        <p className="mt-4 text-muted-foreground">Have questions, feedback, business inquiries, or partnership opportunities? We'd love to hear from you.</p>
        <a href="mailto:hello@crazyplay.games" className="mt-4 inline-block font-medium text-primary hover:underline">hello@crazyplay.games</a>
      </section>

    </div>
  )
}
