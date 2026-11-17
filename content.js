// Shared content for all minimal variants. Pulled from index.html.
window.PF = {
  name: "Baladharshan",
  full: "Baladharshan B",
  role: "Staff Product Designer",
  company: "JumpCloud",
  email: "dharshan37@outlook.com",
  resume: "Baladharshan-Resume-2026-Lite.pdf",
  studio: { name: "Bangalore66", url: "https://bangalore66.framer.website", line: "Photography studio. Shoots for pets, products, fashion and food." },
  intro: "I lead UX strategy, research and design systems for enterprise platforms.",
  sub: "I'm a Staff Product Designer at JumpCloud. I set the UX direction across Platform, Commands and Authentication, back it with research, and turn it into shared standards.",
  work: [
    { co: "JumpCloud", role: "Staff Product Designer", when: "Jan 2024 — Present", line: "UX lead for Platform, Commands and Authentication: strategy, research and shared standards.",
      detail: {
      slug: "jumpcloud",
      accent: "#6FD3C3",
      summary: "I set the UX direction for Platform, Commands and Authentication, hands-on or managing depending on what each project needs. I turn it into shared standards, back it with research, and keep product and engineering in step. Most of it starts in the unknown: Workflows began as a hackathon idea and went to GA in 25 days.",
      impact: [
        { n: "~$2M", l: "MRR of customer demand answered by Workflows" },
        { n: "232", l: "orgs run Workflows, up from 93" },
        { n: "326", l: "orgs on the Slack app" },
        { n: "7", l: "product areas reuse the card framework" },
        { n: "20 min", l: "to a first working workflow, down from 2h 45" },
        { n: "40%", l: "fewer access-related support tickets" }
      ],
      did: [
        "Lead design across Platform, Commands, Authentication and Workflows",
        "Build Circuit, the design system: component libraries, tokens and production-ready handoff",
        "Prototype in Claude Code and Storybook, and lead AI adoption across UX",
        "Taught technical writers Cursor, Git and Storybook; mentor new designers"
      ],
      projects: [
        { t: "Workflows", d: "Automate IT tasks on a visual canvas, not API calls. Reached customers where they already work.", img: "img/jc-flows.jpg", m: "~$2M MRR answered" },
        { t: "Slack approvals", d: "Approve access and act on alerts without leaving Slack, built as one card framework.", img: "img/sl-ar-1.png", m: "Reused by 7 product areas" },
        { t: "AI Assistant", d: "Describe a workflow in plain words and the Assistant drafts it on the canvas.", img: "img/cap-draft-assign.jpg", m: "Plain words to a workflow" },
        { t: "TOTP cloud backup", d: "A new phone shouldn't mean an IT ticket. Restore codes on a new device.", img: "img/pr-key.jpg", m: "~$1M MRR retained" },
        { t: "Conditional access", d: "Who gets in, and from where. The same care for admins, now at sign-in.", img: "img/cap-approve.jpg", m: "40% fewer support tickets" },
        { t: "Circuit", d: "One design system for every screen, so each product area builds from the same parts.", img: "img/jc-card.jpg", m: "Shared parts, consistent screens" }
      ]
    },
    projects: [
      { t: "Workflows", m: "~$2M", d: "MRR of customer demand answered · 1,830 workflows built", img: "img/cover-wf.jpg", url: "index.html#projects" },
      { t: "Slack approvals", m: "7", d: "product areas reuse the framework · 326 orgs on the Slack app", img: "img/cover-slack.jpg", url: "index.html#projects" },
      { t: "TOTP cloud backup", m: "~$1M", d: "MRR retained at renewal · restore codes on a new phone", img: "img/cover-totp.jpg", url: "index.html#projects" },
      { t: "Conditional access", m: "40%", d: "fewer access-related support tickets", img: "img/cover-cap.jpg", url: "index.html#projects" }
    ] },
    { co: "Microsoft", role: "Product Designer", when: "Jan 2021 — Jul 2023", line: "0-to-1 mobile design of Microsoft Defender on iOS and Android.",
      detail: {
      slug: "microsoft",
      accent: "#7DB4FF",
      summary: "I led the 0-to-1 mobile design of Microsoft Defender, the consumer security app on iOS and Android, and built a mobile platform framework that sped up development.",
      impact: [
        { n: "0 → 1", l: "mobile design of the consumer security app" },
        { n: "2", l: "platforms, one product: iOS and Android" },
        { n: "1", l: "mobile platform framework that sped up development" },
        { n: "10M+", l: "Android downloads on Google Play" },
        { n: "~2M", l: "iOS downloads", est: true },
        { n: "~1.5M", l: "monthly active users", est: true },
        { n: "~250K", l: "daily active users", est: true }
      ],
      did: [
        "Led the mobile design of Defender's consumer security app on iOS and Android",
        "Built shared mobile patterns that sped up development",
        "Took enterprise security to people and families: protection status, alerts and monitoring"
      ],
      projects: [
        { t: "Microsoft Defender", d: "Protection status, alerts, and credit and dark web monitoring, including family members.", img: "img/def-defender-redesign.jpg", m: "iOS and Android" },
      ]
    },
    projects: [
      { t: "Microsoft Defender", m: "0 → 1", d: "Consumer security app on iOS and Android, plus a mobile platform framework", img: "img/def-defender-redesign.jpg", url: "https://app.pitch.com/app/presentation/6c1b06eb-1019-4c1b-9b7c-6e6dab221c61/ee534318-9053-49cb-89fc-4bf7506d3c77/39012ae9-3291-4272-af1a-da718af71380", cta: "Read the case study" }
    ] },
    { co: "Pramati Technologies", role: "Interaction Designer", when: "Mar 2019 — Jan 2021", line: "An API design platform, and a formal research practice." },
    { co: "UX Mint", role: "UX Intern", when: "Oct 2018 — Mar 2019", line: "UX internship." },
    { co: "Cognizant", role: "Designer", when: "Dec 2016 — Sep 2018", line: "Foundational form designs on AEM." }
  ],
  impact: [
    { n: "~$2M", l: "MRR of customer demand answered", s: "Workflows" },
    { n: "7", l: "product areas reuse the card framework", s: "Slack approvals" },
    { n: "~$1M", l: "MRR retained at renewal", s: "TOTP cloud backup" },
    { n: "40%", l: "fewer access-related support tickets", s: "Conditional access" },
    { n: "20 min", l: "to a first working workflow, down from 2h 45m", s: "Workflows" },
    { n: "10M+", l: "Android downloads, ~1.5M monthly active users (est.)", s: "Microsoft Defender" }
  ],
  how: [
    ["Frame the problem", "Talk to customers and teams until the real problem is clear."],
    ["Prototype in code", "Claude Code and Storybook, not just mockups."],
    ["Build on tokens", "Reusable by default, on Circuit standards."],
    ["Align early", "Critiques and cross-team reviews."]
  ],
  side: [
    { t: "Circuit Design System", d: "Component libraries and tokens", k: "system" },
    { t: "Workflows", d: "From hackathon idea to GA in 25 days", k: "product" },
    { t: "Microsoft Defender", d: "Consumer security app, iOS and Android", k: "mobile" },
    { t: "Bangalore66", d: "Photography studio", k: "studio", url: "https://bangalore66.framer.website" }
  ],
  principles: [
    ["Set the direction, then write it down", "A few principles, each with a reason and an example, so any team can apply them. One framework reused across seven product areas beats seven one-offs."],
    ["Keep everyone in step", "Short written updates, open design reviews and working prototypes keep product, engineering and design looking at the same thing."],
    ["Speak for the user", "Every decision gets asked: who is this for, and what did we hear from them? I bring that evidence into the room."],
    ["Research that survives a budget cut", "Use the evidence we already hold, test working prototypes in calls already planned, and tie each finding to the decision it changed."],
    ["Check what ships", "Built screens are checked against the design in every state, including other languages and screen readers, and the shared parts carry the standard so teams inherit it."]
  ],
  ai: {
    done: 9, total: 11, tools: ["Cursor", "Claude", "Storybook"],
    text: "I design in code, with AI as part of how I normally work. 9 of my 11 projects went from idea to working screens this way. That is how Workflows shipped in 25 days. Working prototypes let customers react to something real, and what they say decides what I build next."
  },
  photos: [
    { src: "img/pets-balloons.jpg", cap: "Balloons, and one very good boy" },
    { src: "img/food-cupcakes.jpg", cap: "Cupcakes. None survived the shoot." },
    { src: "img/product-kimirica.jpg", cap: "Kimirica, with sweets" },
    { src: "img/pets-dog-hat.jpg", cap: "Top hat, sunglasses, zero modesty" },
    { src: "img/product-nivea.jpg", cap: "Nivea Men, on a pedestal" },
    { src: "img/food-orange.jpg", cap: "Orange, mid-splash" },
    { src: "img/product-plush.jpg", cap: "Plush, with flowers and a peach" },
    { src: "img/pets-shades.jpg", cap: "Shades on, toy guarded" }
  ],
  thanks: ["நன்றி", "ధన్యవాదాలు", "धन्यवाद", "ಧನ್ಯವಾದ", "നന്ദി", "Thank you"],
  deckNote: "Full case studies are shared on request."
};
