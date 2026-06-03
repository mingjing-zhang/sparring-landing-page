// ============================================================
// AGENTIC LANDING PAGE TEMPLATE
// ============================================================
// Customize this file using natural language prompts with
// Gemini CLI or Claude Code. See README.md for prompt library.
// ============================================================

import { MobileNav } from "@/components/MobileNav";
import {
  CheckIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  CalendarIcon,
  MailIcon,
  BeakerIcon,
  BriefcaseIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  BoltIcon,
  LinkedInIcon,
  GitHubIcon,
  XTwitterIcon,
} from "@/components/Icons";

export default function Home() {
  return (
    <>
      {/* Skip link for accessibility - allows keyboard users to skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* ============================================================ */}
      {/* NAVIGATION - Fixed header with logo and nav links            */}
      {/* Prompt: "Update the logo text to [Your Name]"               */}
      {/* ============================================================ */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">
              AZ
            </div>
            <span className="text-xl font-bold tracking-tight font-display text-slate-900 dark:text-white">
              Aaron Zhang
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Archetypes
            </a>
            <a href="/demo" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Try Demo
            </a>
            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </nav>

      {/* ============================================================ */}
      {/* HERO SECTION - Main headline and call to action              */}
      {/* Prompt: "Update hero with name '[Name]' and title '[Title]'" */}
      {/* ============================================================ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background gradient blurs */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-70 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-70 -translate-x-1/3 translate-y-1/4"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Optional badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              MVP · invitation only
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-slate-900 dark:text-white mb-6">
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Aaron Zhang
              </span>
            </h1>

            {/* Title/Specialty */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4 font-medium">
              Sparring · AI VC Pitch Coach
            </p>

            {/* Tagline */}
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Practice your crypto pitch with AI VC partners — built by a former crypto VC. Bilingual EN / 中文. Web3 vertical.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/demo" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                Try the Demo
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ABOUT/AUTHORITY SECTION - Credentials and trust signals      */}
      {/* Prompt: "Update credentials to [your experience/credentials]"*/}
      {/* ============================================================ */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
                Why Sparring
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Crypto-vertical pitch practice with archetype VC partners. No generic chatbots; each archetype is modeled on the public writing of real crypto fund partners.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">8+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Years in Crypto VC</div>
              </div>
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Archetype Partners</div>
              </div>
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">EN+中</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Bilingual Native</div>
              </div>
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Crypto</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Vertical Only</div>
              </div>
            </div>

            {/* Credentials */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <BeakerIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Background</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Co-founder, Chain Renaissance Capital. 8 years in crypto venture & operating roles.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <BriefcaseIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Approach</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Each archetype is distilled from a public-corpus pipeline — not a generic VC chatbot trained on cliches.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <SparklesIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Bilingual</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Pitch in English or 中文. Built for Asia-based crypto founders raising USD rounds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SERVICES SECTION - Your offerings with pricing               */}
      {/* Prompt: "Update services to [Service 1], [Service 2], etc."  */}
      {/* ============================================================ */}
      <section id="services" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
                How To Use Sparring
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Three tiers, from a free 10-minute try to a structured 5-session program.
              </p>
            </div>

            {/* Services grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1 - DIY/Entry Level */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mb-6">
                  <BookOpenIcon />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Free Demo</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Pitch one archetype for 10 minutes. Get a quick feedback report. No signup.</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  $0
                  <span className="text-base font-normal text-slate-500">/try</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    One archetype (choose at runtime)
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Up to 10 minutes of dialogue
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Auto-generated feedback report
                  </li>
                </ul>
                <a href="#contact" className="block w-full text-center py-3 px-6 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">
                  Try Now
                </a>
              </div>

              {/* Service 2 - DWY/Most Popular */}
              <div className="relative group bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-blue-500 shadow-xl shadow-blue-500/10">
                {/* Popular badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-6">
                  <UsersIcon />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Single Session</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Pitch both archetypes back-to-back. 30 minutes each. Full Pass/Needs-Work/Not-Ready scorecard.</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  $199
                  <span className="text-base font-normal text-slate-500">/session</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Both archetypes back-to-back
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    60 minutes total dialogue
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Detailed scorecard + the 3 questions that broke you
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Bilingual EN / 中文
                  </li>
                </ul>
                <a href="#contact" className="block w-full text-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                  Book Session
                </a>
              </div>

              {/* Service 3 - DFY/Premium */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mb-6">
                  <BoltIcon />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Coaching Program</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Five sessions across two weeks. Iterate your pitch against escalating partner difficulty. Recommended before a real raise.</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  $999
                  <span className="text-base font-normal text-slate-500">/program</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    5 sessions over 2 weeks
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    All archetypes (including future)
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    1:1 written review of recorded sessions
                  </li>
                  <li className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Pre-raise readiness check
                  </li>
                </ul>
                <a href="#contact" className="block w-full text-center py-3 px-6 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">
                  Apply
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WORK/CASE STUDIES - Show your best projects                  */}
      {/* Prompt: "Add case study about [project] with [results]"      */}
      {/* ============================================================ */}
      <section id="work" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
                The Archetypes
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Two partners live for v0. Each archetype is modeled on the public writing of real crypto fund partners — disclosed in each session, no affiliation claimed.
              </p>
            </div>

            {/* Case studies grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Case Study 1 */}
              <div className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold opacity-20">01</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">Thesis-driven crypto VC</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The Thesis Partner</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Calm, professorial. Tests prior art, idea-maze depth, native-vs-skeuomorphic framing, 10-year horizon. Will not raise their voice. Will dismiss with &quot;they may work, but they&apos;re not going to be the thing people talk about 10 years from now.&quot;</p>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                    <TrendingUpIcon />
                    Modeled on a16z crypto style
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold opacity-20">02</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">Adversarial / contrarian crypto VC</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The Debater</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Amused-disdainful. Steelmans your case better than you did, then knifes the weakest assumption. Probes threat models, real users today, token distribution width. Will deploy &quot;tokens 👏 are 👏 not 👏 equity&quot; if you earn it.</p>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                    <TrendingUpIcon />
                    Modeled on Dragonfly / Multicoin style
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold opacity-20">03</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">Coming Soon</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">More Archetypes</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">The Aggressive Allocator. The Asia Bridge. The Ownership Economist. Driven by new corpus added to the pipeline.</p>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                    <TrendingUpIcon />
                    Roadmap
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ SECTION - Answer common questions                        */}
      {/* Prompt: "Add FAQ: [Question] with answer [Answer]"           */}
      {/* ============================================================ */}
      <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            {/* FAQ items */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  What exactly is Sparring?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  A pitch-practice tool where AI partners simulate VC archetypes. You upload your pitch (or paste your BP), pick an archetype, and get pressure-tested. At the end you get a structured feedback report.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Is this affiliated with any VC fund?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  No. Archetypes are modeled on the publicly known styles of multiple crypto VC partners. Each session opens with a disclaimer naming the inspirations. No real names are used during the dialogue.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Will my pitch stay confidential?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Sessions run on the platform without storing identifiable pitch content in v0. The MVP runs locally for demo purposes; production hosting will use ephemeral session storage. No deck files are persisted beyond the session.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Why only crypto VCs?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Because that&apos;s where Asia-based founders need it most. Generic VC pitch tools exist; bilingual, crypto-vertical, archetype-driven simulation does not. Sparring is built for crypto founders raising USD rounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT SECTION - How to reach you                           */}
      {/* Prompt: "Update contact with email [email] and Calendly [url]"*/}
      {/* ============================================================ */}
      <section id="contact" className="relative py-20 bg-white dark:bg-slate-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Ready to Spar?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Try the demo, request a session, or get in touch about a coaching program.
            </p>

            {/* Contact options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="mailto:aaron@sparring.dev"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/25"
              >
                <MailIcon className="w-5 h-5 mr-2" />
                aaron@sparring.dev
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                Open the Demo
              </a>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4">
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X profile"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <XTwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER - Copyright and additional links                      */}
      {/* ============================================================ */}
      <footer className="py-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Aaron Zhang. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
