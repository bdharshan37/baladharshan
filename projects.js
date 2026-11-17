/* Project data for the Swiss project pages. Stories come from the original portfolio; methods are written per project. */
window.PJ=[
{
 "co": "lead",
 "slug": "ux-strategy",
 "name": "UX strategy and governance",
 "area": "Strategy",
 "role": "Staff design lead",
 "frm": "Seven one-off designs",
 "to": "One shared framework",
 "line": "How I set the UX direction for a platform, and kept seven product areas designing from the same parts.",
 "bg": "#E4E0F2",
 "metric": "7",
 "metricL": "product areas reuse one card framework",
 "prob": "Teams shipped fast, and each designed its own version of the same pieces: how a notification reads, how a picker behaves, how a failure is explained. Every choice was reasonable alone. Together they made one product feel like several.",
 "did": "Set the UX direction for Platform, Commands and Authentication, turned it into shared standards (the card framework, Circuit tokens and components), and kept product, engineering and design in step while it was adopted.",
 "out": "7 product areas reuse the card framework · Slack and Webhooks became 2 shared blocks · Workflows reached 232 orgs, up from 93",
 "intro": "I start strategy with a written position: what good looks like across the whole platform, and which decisions are worth making once. This case covers how I set that direction, how I kept stakeholders informed, how I resolved a hard constraint, and what changed once the framework existed.",
 "ch": [
  {
   "k": "Strategy",
   "h": "Decide once, reuse everywhere",
   "blocks": [
    {
     "t": "The problem",
     "d": "Each team drew its own message layout, its own dropdown and its own error wording. The cost was inconsistency, and a new feature meant designing the basics again."
    },
    {
     "t": "The position I wrote",
     "d": "I wrote the direction as a few principles, each with a reason and an example, so a PM or an engineer could apply it without asking me. The principles were about admins: clear states, safe defaults and no surprises."
    },
    {
     "t": "The frameworks I used",
     "d": "A card framework for every Slack message, with one layout and one way to show status. Circuit tokens and components, with every state drawn once. State tables, so each part says how it behaves in rest, hover, error and disabled.",
     "key": true
    }
   ],
   "call": "A framework only works when adding something new is cheaper than copying it. That was the test I kept using.",
   "imgs": [
    {
     "src": "img/sl-alerts.png",
     "cap": "One alert layout. A new alert source only means writing its content.",
     "phone": false
    },
    {
     "src": "img/ts-rows.png",
     "cap": "Circuit: every state of a row drawn once.",
     "phone": false
    }
   ]
  },
  {
   "k": "Stakeholders",
   "h": "Keeping product, engineering and design in step",
   "blocks": [
    {
     "t": "Who needed what",
     "d": "Product managers needed scope and timing. Engineers needed specs they could build and a component to start from. Other designers needed decisions explained, not just announced."
    },
    {
     "t": "How I kept them informed",
     "d": "Short written updates after each milestone, design reviews open to anyone, and working prototypes in Storybook. Reviews were about decisions to make, not screens to approve."
    },
    {
     "t": "Prototypes as the update",
     "d": "I built screens in Storybook with Cursor and Claude, so stakeholders and customers could click through something real in review calls, and I could change what they pointed out the same day.",
     "key": true
    }
   ],
   "call": "People who have used the prototype ask better questions than people who have seen the slide.",
   "imgs": [
    {
     "src": "img/wf-templates.jpg",
     "cap": "Workflows templates, reviewed as a working prototype before build.",
     "phone": false
    }
   ]
  },
  {
   "k": "Hard problems",
   "h": "Resolving a constraint nobody could design around",
   "blocks": [
    {
     "t": "The challenge",
     "d": "Customers wanted Workflows to act in Salesforce, GitHub, Google Workspace and their own tools. Every API works differently, and credentials cannot sit inside a workflow step, because anyone who can edit the workflow could read them."
    },
    {
     "t": "How it was resolved",
     "d": "I split the problem in two. An admin sets up a connector once in Settings, with its credentials. A step in the builder only selects that connector. I accepted the extra trip to Settings and added a direct link from the step.",
     "key": true
    },
    {
     "t": "Checking what shipped",
     "d": "Before release I checked the built screens against the design in every state, not only the happy path, and sent back specific fixes. Each run also shows the admin role it ran as, with a history that links to the audit trail, so an admin can answer who did what."
    }
   ],
   "call": "The hardest design call was the one that added a step. It kept the product safe.",
   "imgs": [
    {
     "src": "img/wf-connector.jpg",
     "cap": "A step selects a connector. Credentials stay in Settings.",
     "phone": false
    },
    {
     "src": "img/wf-history.jpg",
     "cap": "Every run, its steps, and the role it ran as.",
     "phone": false
    }
   ]
  },
  {
   "k": "Before and after",
   "h": "What changed once the framework existed",
   "blocks": [
    {
     "t": "Before",
     "d": "Each team designed its own messages and its own dropdowns. A new alert type or a new picker meant a new design and a new set of states."
    },
    {
     "t": "After",
     "d": "Every alert uses the same layout. Tree select is one component with clear modes in place of one-off dropdowns. Slack and Webhooks are 2 shared blocks used across many features."
    },
    {
     "t": "The result",
     "d": "7 product areas reuse the card framework, from Access requests and Commands to SaaS management and Asset management. Workflows reached 232 orgs, up from 93, with 1,830 workflows built, and the first working workflow takes 20 minutes, down from 2h 45m.",
     "key": true
    }
   ],
   "call": "",
   "imgs": []
  }
 ],
 "method": [
  {
   "i": "target",
   "t": "Write the position down",
   "d": "A few principles with a reason and an example each, so anyone can apply them."
  },
  {
   "i": "layers",
   "t": "Build the shared parts",
   "d": "The card framework, tokens and components, with every state drawn once."
  },
  {
   "i": "users",
   "t": "Keep people in step",
   "d": "Written updates, open reviews and working prototypes, not only slides."
  },
  {
   "i": "check",
   "t": "Check what ships",
   "d": "Built screens are checked against the design in every state."
  },
  {
   "i": "eye",
   "t": "Test it without me",
   "d": "If a team can use it unaided, it works. If not, I fix the framework."
  }
 ],
 "facts": [
  [
   "Scope",
   "Platform, Commands, Authentication"
  ],
  [
   "Reused by",
   "7 product areas"
  ],
  [
   "Became",
   "2 shared blocks"
  ],
  [
   "Workflows",
   "232 orgs, up from 93"
  ]
 ]
},
{
 "co": "lead",
 "slug": "accessibility",
 "name": "Accessibility across four platforms",
 "area": "Accessibility",
 "role": "Design lead",
 "frm": "A check at the end",
 "to": "A map before the build",
 "line": "How I mapped and reviewed accessibility for Defender for Individuals on iOS, Android, Windows and macOS.",
 "bg": "#D9EEE2",
 "metric": "4",
 "metricL": "platforms mapped: iOS, Android, Windows and macOS",
 "prob": "Defender for Individuals runs on four platforms. Each has its own screen reader, its own focus behaviour and its own text-scaling rules, so a screen that works on one can fail on another.",
 "did": "Mapped accessibility for Defender for Individuals on all four platforms, set the review checklist, and reviewed screens before they went to engineering. I used the same approach to review other products.",
 "out": "One set of status words and patterns that behave the same on every device · every screen reviewed per platform before build",
 "intro": "Accessibility is easier to get right as a map drawn before the build than as a list of bugs after it. This case covers the map, the patterns that came out of it, and how I reviewed products before they shipped.",
 "ch": [
  {
   "k": "Mapping",
   "h": "One map per screen, per platform",
   "blocks": [
    {
     "t": "What the map holds",
     "d": "For each screen: every control and the name a screen reader gives it, the order focus moves in, contrast and use of colour, how text and layout behave when scaled, and what is announced when status changes."
    },
    {
     "t": "Four platforms, three screen readers",
     "d": "VoiceOver on iOS and macOS, TalkBack on Android and Narrator on Windows. Each reads a screen a little differently, so the map is made per platform and not once for all."
    },
    {
     "t": "Why a map",
     "d": "A map shows the gaps before anything is built. Engineers get a checklist per platform in place of a general request to make it accessible.",
     "key": true
    }
   ],
   "call": "Status words like Protected and Active mean the same on every device.",
   "imgs": [
    {
     "src": "img/defender-ios-1.jpg",
     "cap": "iOS: a recommendation card and monitoring cards.",
     "phone": true
    },
    {
     "src": "img/defender-android-2.jpg",
     "cap": "Android: device protection.",
     "phone": true
    },
    {
     "src": "img/defender-ios-3.jpg",
     "cap": "iOS: monitoring and alerts.",
     "phone": true
    }
   ]
  },
  {
   "k": "Patterns",
   "h": "Status that does not depend on colour",
   "blocks": [
    {
     "t": "Never colour alone",
     "d": "Protection status uses an icon and a plain word as well as colour, so it reads correctly for people who cannot tell the colours apart and in a screen reader."
    },
    {
     "t": "Plain words",
     "d": "Enterprise security language does not work for a household, so every term was rewritten for people. It helps everyone, and it matters most to someone using a screen reader."
    },
    {
     "t": "Announce what changes",
     "d": "When protection status or an alert changes, the screen says so, so nobody is left reading stale information.",
     "key": true
    }
   ],
   "call": "The same pattern on every platform means one thing to learn, not four.",
   "imgs": [
    {
     "src": "img/defender-android-1.jpg",
     "cap": "Android: the home screen.",
     "phone": true
    },
    {
     "src": "img/defender-ios-2.jpg",
     "cap": "iOS: more of the protection experience.",
     "phone": true
    }
   ]
  },
  {
   "k": "Review",
   "h": "Reviewing products before they ship",
   "blocks": [
    {
     "t": "How I review",
     "d": "I check the built screen against the map on a real device, with the platform screen reader on, with large text, and with a keyboard where there is one. I send back specific fixes, each with the screen and the state."
    },
    {
     "t": "Reviewing other teams' products",
     "d": "I used the same checklist on other products, so every team gets the same questions in the same order."
    },
    {
     "t": "Making it routine",
     "d": "Where I can, I put the behaviour in the component: its labels, its focus and its states. Teams then inherit it instead of checking it again each time.",
     "key": true
    }
   ],
   "call": "Review works best when it comes early and arrives as a short, specific list.",
   "imgs": [
    {
     "src": "img/ts-field.png",
     "cap": "Circuit: a component with each state defined once.",
     "phone": false
    }
   ]
  },
  {
   "k": "Before and after",
   "h": "What changed once the map existed",
   "blocks": [
    {
     "t": "Before",
     "d": "Accessibility was a check near the end, screen by screen, so fixes landed after the design was done."
    },
    {
     "t": "After",
     "d": "Each screen has a map before it is built. Fixes arrive as specific items per platform, and the same patterns carry across all four."
    },
    {
     "t": "The result",
     "d": "One product on four platforms, with status that reads the same everywhere and a review checklist other teams can reuse.",
     "key": true
    }
   ],
   "call": "",
   "imgs": []
  }
 ],
 "method": [
  {
   "i": "grid",
   "t": "Map each screen",
   "d": "Controls, names, focus order, contrast, scaling and announcements, per platform."
  },
  {
   "i": "ear",
   "t": "Use the real screen readers",
   "d": "VoiceOver, TalkBack and Narrator, on real devices."
  },
  {
   "i": "eye",
   "t": "Never rely on colour",
   "d": "Status carries an icon and a plain word as well as colour."
  },
  {
   "i": "check",
   "t": "Review before build",
   "d": "Short, specific fixes, sent early."
  },
  {
   "i": "layers",
   "t": "Put it in the component",
   "d": "Teams inherit the behaviour instead of rechecking it."
  }
 ],
 "facts": [
  [
   "Product",
   "Defender for Individuals"
  ],
  [
   "Platforms",
   "iOS, Android, Windows, macOS"
  ],
  [
   "Method",
   "A map per screen, per platform"
  ],
  [
   "Review",
   "On device, with the platform screen reader"
  ]
 ]
},
{
 "co": "lead",
 "slug": "research-priority",
 "name": "Keeping research a priority",
 "area": "Research",
 "role": "Design lead",
 "frm": "Decisions on assumptions",
 "to": "Decisions on evidence",
 "line": "How I kept customer research in every big decision when there was no research budget.",
 "bg": "#F4E5DA",
 "metric": "20 min",
 "metricL": "to a first working workflow, down from 2h 45m",
 "prob": "When budgets tighten, research is often the first thing cut, because its value is hard to see in advance. I needed customer evidence in every major decision without a research budget to spend.",
 "did": "Built a lean research practice: use the evidence the company already holds, test working prototypes with customers in calls that were already planned, and tie each finding to revenue or support risk so it stayed on the roadmap.",
 "out": "Formal research for Alerts V2 · admin workflows analysed from Gong recordings · first working workflow in 20 min, down from 2h 45m · Workflows reached 232 orgs",
 "intro": "I formalised research at Pramati and ran it again at JumpCloud for Alerts V2. When budgets were cut, the question was not whether to do research but how to do it cheaper without it turning into opinion. This is the approach I used.",
 "ch": [
  {
   "k": "Framework",
   "h": "The evidence ladder",
   "blocks": [
    {
     "t": "Start with what exists",
     "d": "Before any new study I look at what the company already holds: recorded customer calls, support tickets and usage data. For admin workflows I analysed Gong recordings to see what admins were trying to do and where they got stuck."
    },
    {
     "t": "Then the smallest new study",
     "d": "A few customers, a working prototype, and calls that were already planned. Because I build screens in Storybook, hearing a reaction costs a call and not a study."
    },
    {
     "t": "Escalate only when it matters",
     "d": "I run formal research, as I did for Alerts V2, when the decision is large or the evidence disagrees with itself.",
     "key": true
    }
   ],
   "call": "Each rung costs more than the one below it, so I only climb when the decision needs it.",
   "imgs": [
    {
     "src": "img/jc-flows.jpg",
     "cap": "The Workflows builder, shown to customers as working screens.",
     "phone": false
    }
   ]
  },
  {
   "k": "Priority",
   "h": "Making research hard to cut",
   "blocks": [
    {
     "t": "Name the decision",
     "d": "Each study starts from the decision it will change and who will make it. Research with no decision attached is the first thing to lose funding."
    },
    {
     "t": "Report in the leaders' terms",
     "d": "I put findings next to the figures leaders already track: customer demand (about $2M MRR for Workflows), revenue at renewal (about $1M MRR retained for code backup) and support load (40% fewer access-related tickets for conditional access)."
    },
    {
     "t": "Share what was learned",
     "d": "A short written readout after every study, and a working prototype anyone can open. People protect research they have seen change a decision.",
     "key": true
    }
   ],
   "call": "Research survives a budget cut when leaders can point to the decision it changed.",
   "imgs": [
    {
     "src": "img/wf-history.jpg",
     "cap": "Run history, so an admin can answer an auditor.",
     "phone": false
    }
   ]
  },
  {
   "k": "Impact",
   "h": "What changed in the product",
   "blocks": [
    {
     "t": "Before",
     "d": "A blank canvas. Admins had to turn their job into triggers and actions before they could do anything, and many got stuck there."
    },
    {
     "t": "After",
     "d": "Templates start from the job. Each card says in one sentence when the workflow runs and what it does, and using one creates an editable copy that stays off until the admin turns it on."
    },
    {
     "t": "The result",
     "d": "The first working workflow takes 20 minutes, down from 2h 45m. Workflows reached 232 orgs, up from 93, and 1,830 workflows have been built.",
     "key": true
    }
   ],
   "call": "Admins find their own problem first and look at how it is built second.",
   "imgs": [
    {
     "src": "img/wf-templates.jpg",
     "cap": "Templates, grouped by the job an admin is trying to get done.",
     "phone": false
    }
   ]
  }
 ],
 "method": [
  {
   "i": "eye",
   "t": "Look at what exists",
   "d": "Calls, tickets and usage data before any new study."
  },
  {
   "i": "ear",
   "t": "Listen to recorded calls",
   "d": "Gong recordings of admin workflows showed where people got stuck."
  },
  {
   "i": "bolt",
   "t": "Test working prototypes",
   "d": "Customers react to real screens in calls already planned."
  },
  {
   "i": "target",
   "t": "Tie it to a decision",
   "d": "Every study names the decision it will change."
  },
  {
   "i": "check",
   "t": "Report in business terms",
   "d": "Findings sit next to demand, renewal and support figures."
  }
 ],
 "facts": [
  [
   "Methods",
   "Call analysis, prototype tests, formal studies"
  ],
  [
   "Alerts V2",
   "Formal research"
  ],
  [
   "Earlier",
   "Research practice at Pramati"
  ],
  [
   "Result",
   "20 min to a first workflow, from 2h 45m"
  ]
 ]
},
 {
  "co": "jumpcloud",
  "slug": "workflows",
  "name": "Workflows",
  "area": "Platform",
  "role": "Design lead",
  "frm": "API calls",
  "to": "Self-serve builder",
  "line": "Moved Workflows from API scripts to a visual builder admins can use on their own.",
  "prob": "Automating identity work in JumpCloud meant scripting against APIs. Customers kept asking for something admins could build themselves.",
  "did": "Led Workflows from API calls to a visual builder, and set up the card framework every step uses, so triggers, actions and conditions look and work the same way.",
  "out": "~$2M MRR of customer demand answered by the GA release · 232 orgs, up from 93 · 1,830 workflows built",
  "bg": "#DDEFEB",
  "metric": "~$2M",
  "metricL": "MRR of customer demand answered",
  "intro": "Admins had asked for a visual builder for years. Most of the design work went into the parts around the canvas: how admins get started, how workflows reach other apps, and how admins can check what a workflow did. These three screens cover those parts.",
  "ch": [
   {
    "k": "Templates",
    "h": "Nobody wants to start from a blank canvas",
    "blocks": [
     {
      "t": "Why templates",
      "d": "Admins come to Workflows with a specific job in mind, like offboarding someone today, reminding people who haven’t set up MFA, or cleaning up after a device leaves a group. A blank canvas makes them translate that job into triggers and actions before they can do anything, and this is where many got stuck. Templates start from the job instead. Each card says in one sentence when the workflow runs and what it does, so admins find their own problem first and look at how it’s built after. Using a template creates an editable copy that stays off until the admin turns it on, so it’s safe to try.",
      "key": true
     }
    ],
    "call": "",
    "imgs": [
     {
      "src": "img/wf-templates.jpg",
      "cap": "Templates, grouped by the job an admin is trying to get done.",
      "phone": false
     }
    ]
   },
   {
    "k": "Connectors",
    "h": "Reaching the apps JumpCloud doesn’t own",
    "blocks": [
     {
      "t": "The challenge",
      "d": "Customers wanted workflows to take actions in Salesforce, GitHub, Google Workspace and their own internal tools. Every API works differently, so designing a separate screen for each app wasn’t realistic.",
      "key": false
     },
     {
      "t": "The constraint",
      "d": "Credentials can’t be stored inside a workflow step, because anyone who can edit the workflow would be able to see them.",
      "key": false
     },
     {
      "t": "How I designed it",
      "d": "I split it into two parts. An admin sets up a connector once in Settings, including its credentials. In the builder, a step selects that connector and then sets the method, path and body, and values from earlier steps can be pulled in by typing input. On the canvas, the step looks like every other card and shows the app and the endpoint.",
      "key": true
     }
    ],
    "call": "Keeping credentials out of the builder means an extra trip to Settings. I accepted that and added a direct link to the connector settings from the step.",
    "imgs": [
     {
      "src": "img/wf-connector.jpg",
      "cap": "A Salesforce step. The connector is selected here and set up once in Settings.",
      "phone": false
     }
    ]
   },
   {
    "k": "Run as · history",
    "h": "Automation an admin can trust",
    "blocks": [
     {
      "t": "The challenge",
      "d": "These workflows suspend users and lock devices, often when no one is watching. Runs can loop, take a long time and return large outputs, so showing everything would hide the one step that failed.",
      "key": false
     },
     {
      "t": "What admins needed",
      "d": "The admin who turns on an automation is still responsible for what it does. When a manager asks why someone lost access, or an auditor asks who removed a device, the admin needs to answer quickly and show evidence. Saving manual work mattered, but admins cared more about never being surprised by something a workflow did on their behalf.",
      "key": false
     },
     {
      "t": "How I designed it",
      "d": "Each workflow runs as a named admin role, shown next to its title, so it can only do what that role allows. Execution history lists every run with its status. Opening a run shows each step in order with its input and output, sums up loops in one line, and links to Directory Insights for the audit trail.",
      "key": true
     }
    ],
    "call": "Errors, failures and runs still in progress each have their own status, so the runs that need attention are easy to spot.",
    "imgs": [
     {
      "src": "img/wf-history.jpg",
      "cap": "Every run and its steps, with the workflow’s role shown at the top.",
      "phone": false
     }
    ]
   },
   {
    "k": "Built with AI",
    "h": "Fitting a visual builder into 25 days",
    "blocks": [
     {
      "t": "The time",
      "d": "Admins had asked for a visual builder for years, and the project ran 25 days. Drawing every state of a builder by hand would have left little time for anything else.",
      "key": false
     },
     {
      "t": "Working screens early",
      "d": "I used Cursor and Claude to build the screens in Storybook. Customers could click through something real in review calls, and I could change what they pointed out the same day.",
      "key": false
     },
     {
      "t": "The missing component",
      "d": "Admins pick from nested lists all the time, and Circuit had no component for it. I built Tree select with AI, starting from PrimeVue’s TreeSelect, so teams didn’t need their own dropdowns.",
      "key": false
     }
    ],
    "call": "AI let me finish a large build in 25 days and still review it with customers.",
    "imgs": []
   }
  ],
  "method": [
   {
    "i": "ear",
    "t": "Listen to the long ask",
    "d": "Admins had asked for a visual builder for years. I started from what they were trying to get done, not from the canvas."
   },
   {
    "i": "grid",
    "t": "Start from the job",
    "d": "Templates describe a job in one sentence, so admins find their own problem before they see how it is built."
   },
   {
    "i": "bolt",
    "t": "Build screens in code",
    "d": "Cursor and Claude built real screens in Storybook, so customers clicked through something working in review calls."
   },
   {
    "i": "lock",
    "t": "Keep credentials out of the builder",
    "d": "Connectors are set up once in Settings. A step only picks one, so anyone who can edit a workflow never sees a secret."
   },
   {
    "i": "clock",
    "t": "Make runs explainable",
    "d": "Each workflow runs as a named admin role, and every run lists its steps, inputs and outputs for audits."
   }
  ],
  "facts": [
   [
    "Timeline",
    "Hackathon idea to GA in 25 days"
   ],
   [
    "Reach",
    "232 orgs, up from 93"
   ],
   [
    "Built",
    "1,830 workflows"
   ]
  ]
 },
 {
  "co": "jumpcloud",
  "slug": "slack",
  "name": "Slack approvals & alerts",
  "area": "Workflows",
  "role": "Framework owner",
  "frm": "One-off messages",
  "to": "One Slack framework",
  "line": "A shared way for JumpCloud to post alerts and approvals in Slack.",
  "prob": "Teams needed a consistent way to send notifications and approvals into Slack, instead of designing each message from scratch.",
  "did": "Designed the Slack connector and the card framework for Workflows, then the Slack app notification framework that other teams use for their own messages.",
  "out": "Other teams build on it. Access Requests already does. Slack and Webhooks became 2 shared blocks used across many features.",
  "bg": "#EFE6F1",
  "metric": "7",
  "metricL": "product areas reuse one card framework",
  "intro": "Admins already spend their day in Slack. My goal was one consistent way for JumpCloud to post there, so alerts and approvals look like they come from the same product, and other teams can add their own messages without designing them from scratch.",
  "ch": [
   {
    "k": "Alerts",
    "h": "Alerts admins can act on without leaving Slack",
    "blocks": [
     {
      "t": "Readable in a busy channel",
      "d": "Alert channels get busy quickly. Every alert uses the same layout: a coloured bar for priority, a short title, the user or device it’s about, and four details in two columns (priority, status, last occurrence and organization). Someone scrolling the channel can quickly see which alert needs them.",
      "key": false
     },
     {
      "t": "Acting without switching tabs",
      "d": "Admins can acknowledge or resolve an alert from the message, and the new status shows for everyone in the channel, so two people don’t work on the same alert. View Alert Details opens the console when they need more information.",
      "key": false
     }
    ],
    "call": "Every alert type uses the same layout, so adding a new alert source only means writing its content.",
    "imgs": [
     {
      "src": "img/sl-alerts.png",
      "cap": "Two alerts in #alerts-management, both with the same layout: priority bar, title, four details and two actions.",
      "phone": false
     },
     {
      "src": "img/sl-alerts-earlier.png",
      "cap": "Earlier alerts in the same channel. High and medium alerts use the same layout, so the channel is easy to scan.",
      "phone": false
     }
    ]
   },
   {
    "k": "Access requests",
    "h": "Several approvers, one message that stays up to date",
    "blocks": [
     {
      "t": "Many approvers, one request",
      "d": "Some apps need sign-off from more than one person. Instead of sending a message to each approver, JumpCloud posts one message that everyone sees, with each approver’s status next to their name.",
      "key": false
     },
     {
      "t": "A message that stays current",
      "d": "Approvals can come in minutes or hours apart. The original message updates as they arrive, from 3 pending to 2 to approved, and its buttons are disabled once the request is decided, so no one acts on an outdated request.",
      "key": false
     },
     {
      "t": "A reason with every decision",
      "d": "Approving or denying asks for a short reason. Whoever reviews access months later probably wasn’t in the channel, and the reason is the first thing they’ll look for.",
      "key": true
     }
    ],
    "call": "The message always shows the current status, and the thread keeps the record of who approved and when.",
    "imgs": [
     {
      "src": "img/sl-ar-1.png",
      "cap": "A Salesforce request waiting on three approvers.",
      "phone": false
     },
     {
      "src": "img/sl-ar-2.png",
      "cap": "Approving asks for a short reason.",
      "phone": false
     },
     {
      "src": "img/sl-ar-3.png",
      "cap": "One approval in: the same message now reads “Pending 2 approvals”.",
      "phone": false
     },
     {
      "src": "img/sl-ar-4.png",
      "cap": "All three approved. The message shows the final status, and the thread lists who approved and when.",
      "phone": false
     }
    ]
   },
   {
    "k": "Channel ID",
    "h": "When the channel isn’t in the list",
    "blocks": [
     {
      "t": "What admins ran into",
      "d": "After installing the app, admins went to select a channel and couldn’t find it in the list. Many assumed the integration was broken, and some gave up there.",
      "key": false
     },
     {
      "t": "What Slack lets an app see",
      "d": "The list can only include channels the JumpCloud app has access to. Private channels don’t appear until someone invites the app, and very large workspaces can return an incomplete list. We couldn’t fix that on our side.",
      "key": false
     },
     {
      "t": "A second way in, added later",
      "d": "After launch, I added a Use Channel ID option next to Select channel, which stays the default. When an admin pastes an ID, the field shows the matching channel name before they save, so a wrong ID is caught straight away. A short how-to explains where to find the ID in Slack.",
      "key": true
     }
    ],
    "call": "I fixed the dead end inside the flow itself, so admins don’t need the help docs to get past it.",
    "imgs": [
     {
      "src": "img/sl-channel-1.jpg",
      "cap": "Select channel stays the default, with channels picked from the list.",
      "phone": false
     },
     {
      "src": "img/sl-channel-2.jpg",
      "cap": "With Use Channel ID, the channel name is confirmed before saving.",
      "phone": false
     },
     {
      "src": "img/sl-channel-3.jpg",
      "cap": "A short how-to sits right where the ID is needed.",
      "phone": false
     }
    ]
   }
  ],
  "method": [
   {
    "i": "chat",
    "t": "Work where admins already are",
    "d": "Admins spend their day in Slack, so alerts and approvals had to arrive there instead of in another tab."
   },
   {
    "i": "layers",
    "t": "One layout for every alert",
    "d": "A priority bar, a short title, four details and two actions. A new alert source only has to write its content."
   },
   {
    "i": "loop",
    "t": "One message that stays current",
    "d": "Approvals arrive minutes or hours apart, so the original message updates from 3 pending to 2, 1, then done."
   },
   {
    "i": "pen",
    "t": "A reason with every decision",
    "d": "Approve or deny asks for a short reason, so a reviewer months later knows why."
   },
   {
    "i": "key",
    "t": "Fix the dead end in the flow",
    "d": "When a channel was not in the list, I added Use Channel ID beside Select channel instead of sending admins to docs."
   }
  ],
  "facts": [
   [
    "Live in",
    "326 orgs"
   ],
   [
    "Reused by",
    "7 product areas"
   ],
   [
    "Became",
    "2 shared blocks"
   ]
  ]
 },
 {
  "co": "jumpcloud",
  "slug": "ai-assistant",
  "name": "AI Assistant for Workflows",
  "area": "Workflows",
  "role": "Design lead",
  "frm": "Blank canvas",
  "to": "Drafted workflow",
  "line": "Admins describe a workflow in plain words and the assistant drafts it on the canvas.",
  "prob": "Even with a visual builder, a blank canvas is a hard place to start.",
  "did": "Designed the Assistant experience. An admin describes a workflow in plain words, and the assistant drafts it on the canvas for them to review.",
  "out": "Part of leading AI adoption across UX at JumpCloud.",
  "bg": "#ECE8F8",
  "metric": "Plain words",
  "metricL": "to a drafted workflow on the canvas",
  "intro": "Even with a visual builder, a blank canvas is a hard place to start. The Assistant lets an admin describe a workflow in plain words and drafts it on the canvas for them to review, edit and run.",
  "ch": [
   {
    "k": "Draft",
    "h": "Describe it, review it, run it",
    "blocks": [
     {
      "t": "Plain words in",
      "d": "An admin writes what they want, such as suspending a user and notifying their manager. No triggers or actions to pick first."
     },
     {
      "t": "A draft on the canvas",
      "d": "The assistant places the steps on the same canvas admins already know, so they review a real workflow, not a description of one.",
      "key": true
     }
    ],
    "call": "The assistant starts the work. The admin stays the one who approves it.",
    "imgs": [
     {
      "src": "img/jc-glimpse.jpg",
      "cap": "The assistant drafts a workflow on the canvas from a sentence.",
      "phone": false
     }
    ]
   }
  ],
  "method": [
   {
    "i": "target",
    "t": "Find the hard moment",
    "d": "Even with a builder, the first step is the hardest: a blank canvas."
   },
   {
    "i": "chat",
    "t": "Start from plain words",
    "d": "Admins describe the outcome. The assistant works out the triggers and actions."
   },
   {
    "i": "nodes",
    "t": "Draft on the real canvas",
    "d": "The draft appears as ordinary steps, so nothing is hidden behind the chat."
   },
   {
    "i": "check",
    "t": "Review before it runs",
    "d": "The admin edits and approves. Nothing runs until they say so."
   }
  ],
  "facts": [
   [
    "Part of",
    "Leading AI adoption across UX"
   ],
   [
    "Area",
    "Workflows"
   ]
  ]
 },
 {
  "co": "jumpcloud",
  "slug": "protect",
  "name": "JumpCloud Protect · code backup",
  "area": "Authentication",
  "role": "Lead designer",
  "frm": "Lost phone",
  "to": "Codes restored",
  "line": "Getting a new phone shouldn’t mean filing a helpdesk ticket.",
  "prob": "Lose or swap your phone and your sign-in codes go with it. Getting them back meant asking IT.",
  "did": "Designed backup and restore for codes on iPhone and Android, the step for saving the backup key, Push re-pairing on a new phone, and what happens when something goes wrong. I also built a prototype for testing.",
  "out": "Measured by helpdesk tickets for phone swaps and the share of people who recover without IT. Next: customer interviews and prototype tests, iPhone first.",
  "bg": "#DCEFEC",
  "metric": "~$1M",
  "metricL": "MRR retained at renewal",
  "intro": "If you lose or replace your phone, your sign-in codes go with it. Backup had to stay out of the way day to day and be easy to use when something went wrong. The design covers three moments: restoring codes on a new phone, getting people to turn on backup before they need it, and removing codes from the old phone.",
  "ch": [
   {
    "k": "Restore",
    "h": "A new phone shouldn’t mean starting over",
    "blocks": [
     {
      "t": "A backup only the owner can open",
      "d": "Codes are encrypted with a key that only the user has, so JumpCloud can’t read them or recover them. One backup can be restored on iPhone or Android. Because of this, restore is the one place where we ask for the key, so the screen had to make finding it as easy as possible.",
      "key": false
     },
     {
      "t": "No password typed on a phone",
      "d": "Typing a long password on a new phone is where many people give up. Sign-in happens in the browser instead, where password managers and company sign-in already work, and then returns the user to Protect.",
      "key": false
     },
     {
      "t": "A key saved months ago",
      "d": "Most people don’t remember where they saved a key months ago. Before asking for it, the screen shows what was found: 12 accounts, last backed up Oct 6 from Alex’s iPhone. It then lists the usual places people keep the key, accepts a pasted key and adds the spaces, offers the QR code as another option, and keeps “I can’t find my key” one tap away.",
      "key": true
     }
    ],
    "call": "Show people what they’re getting back before asking them for anything.",
    "imgs": [
     {
      "src": "img/pr-welcome.jpg",
      "cap": "A fresh install offers “Restore my codes” beside “Add account”.",
      "phone": true
     },
     {
      "src": "img/pr-signin.jpg",
      "cap": "Sign-in happens in the browser, then returns to the app.",
      "phone": true
     },
     {
      "src": "img/pr-key.jpg",
      "cap": "The backup is confirmed before the key is asked for.",
      "phone": true
     }
    ]
   },
   {
    "k": "Nudge",
    "h": "Backup only helps if it’s on before you need it",
    "blocks": [
     {
      "t": "A risk nobody feels",
      "d": "Losing codes only becomes a problem on the day a phone is lost, and by then it’s too late to back up. Existing users had codes in Protect with backup turned off, and nothing reminded them.",
      "key": false
     },
     {
      "t": "Asking without nagging",
      "d": "People get one notification after the update and one reminder 7 days later, then no more, and none at all once backup is on. In the app, Remind me later means a week. The user portal banner can be dismissed for 14 days and comes back up to 3 times. Dismissing a reminder shouldn’t mean we never ask again, but the reminders also shouldn’t feel like nagging.",
      "key": false
     },
     {
      "t": "When notifications are off",
      "d": "Some people turn notifications off, so the in-app announcement and the portal banner act as a fallback. From engineering, I needed each person’s backup status, so every reminder stops once backup is on, and a way to send a notification that isn’t a sign-in approval.",
      "key": true
     }
    ],
    "call": "Every reminder has a limit, so asking a few times doesn’t turn into nagging.",
    "imgs": [
     {
      "src": "img/pr-nudge-lock.jpg",
      "cap": "One notification for people with codes and backup still off.",
      "phone": true
     },
     {
      "src": "img/pr-nudge-app.jpg",
      "cap": "Tapping it opens a short prompt. Turning on backup takes about a minute.",
      "phone": true
     }
    ]
   },
   {
    "k": "Old phone",
    "h": "One phone should hold your codes, not two",
    "blocks": [
     {
      "t": "Two phones, same codes",
      "d": "After a restore, both phones can sign in. That’s less safe, especially if the old phone is about to be sold or given to someone else. So the success screen’s main action is removing the codes from the old phone.",
      "key": false
     },
     {
      "t": "The old phone isn’t in your hand",
      "d": "The codes can’t be removed from the old phone right away. It clears them the next time it opens Protect with an internet connection. The screen shows this clearly: this phone is working, Alex’s iPhone is waiting to clear, and until then both phones show codes.",
      "key": false
     },
     {
      "t": "When it never comes back",
      "d": "If the old phone is lost or wiped, its codes keep working until they’re replaced. To fix this, the user follows two steps for each account: open the account’s security settings and scan a new QR code in Protect. Work accounts are reset by the IT admin. Remind me later means no one gets blocked.",
      "key": true
     }
    ],
    "call": "When something can’t happen yet, the screen says so and gives the next step.",
    "imgs": [
     {
      "src": "img/pr-remove.jpg",
      "cap": "Restored, and the next step is clearing the old phone.",
      "phone": true
     },
     {
      "src": "img/pr-clearing.jpg",
      "cap": "The screen shows that the old phone hasn’t cleared yet.",
      "phone": true
     },
     {
      "src": "img/pr-unreachable.jpg",
      "cap": "If the old phone is lost, wiped or sold, re-enrolling means only this phone works.",
      "phone": true
     }
    ]
   },
   {
    "k": "Built with AI",
    "h": "Covering the awkward cases in 14 days",
    "blocks": [
     {
      "t": "The cases",
      "d": "Restore looks simple until the old phone is offline, wiped or already sold. The project ran 14 days, and each of those cases needed its own screen and its own wording.",
      "key": false
     },
     {
      "t": "Working through them",
      "d": "I used Claude to list the cases and draft the wording for each one, then built the screens in Storybook with Cursor. That let me try versions quickly and compare them before showing customers.",
      "key": false
     }
    ],
    "call": "AI gave me time to cover the awkward cases within 14 days.",
    "imgs": []
   }
  ],
  "method": [
   {
    "i": "spark",
    "t": "Name the three moments",
    "d": "Restore, nudge and old phone. Each one needed its own design, so I drew them as separate flows."
   },
   {
    "i": "key",
    "t": "Make it safe first",
    "d": "Codes are encrypted with a key only the user holds, so restore is the one place we ask for it."
   },
   {
    "i": "phone",
    "t": "Sign in where passwords live",
    "d": "The browser handles sign-in, with password managers and company login, then returns to the app."
   },
   {
    "i": "bell",
    "t": "Ask a few times, then stop",
    "d": "One notification, one reminder 7 days later, then no more. Fallbacks cover people with notifications off."
   },
   {
    "i": "bolt",
    "t": "Cover awkward cases fast",
    "d": "Claude listed the cases and drafted wording, and Storybook screens covered all of them in 14 days."
   }
  ],
  "facts": [
   [
    "Timeline",
    "14 days"
   ],
   [
    "Platforms",
    "iPhone and Android"
   ],
   [
    "Measured by",
    "Phone-swap helpdesk tickets"
   ]
  ]
 },
 {
  "co": "jumpcloud",
  "slug": "conditional-access",
  "name": "Conditional access · AI Assistant",
  "area": "Access",
  "role": "Design lead",
  "frm": "A long policy form",
  "to": "A policy by conversation",
  "line": "Admins describe a policy, review the draft and approve it before anything changes.",
  "prob": "Conditional access policies have many parts, and a small mistake can lock people out or let the wrong device in.",
  "did": "Designed an AI Assistant that drafts the policy beside the chat, versions every change and asks before it writes.",
  "out": "",
  "bg": "#E4ECFA",
  "metric": "40%",
  "metricL": "fewer access-related support tickets",
  "intro": "Conditional access policies are among the most powerful settings in JumpCloud, and among the easiest to get wrong. Each one covers a resource, who’s included and excluded, device conditions, an action and sign-in factors. I designed an AI Assistant that builds the policy together with the admin, with the chat on the left and the policy on the right.",
  "ch": [
   {
    "k": "Draft",
    "h": "From one sentence to a policy you can read",
    "blocks": [
     {
      "t": "Chat on the left, policy on the right",
      "d": "The admin asks in the chat and reviews the policy in the side panel. The assistant doesn’t only describe the policy in its reply. It opens the draft next to the chat, so the admin can see every field it filled in and change any of them by hand.",
      "key": false
     },
     {
      "t": "The form admins already know",
      "d": "The side panel uses the same policy form as the console, with status, assignments, conditions, action and authentication. Admins don’t have to learn anything new, and the draft can move straight into the real policy page.",
      "key": false
     },
     {
      "t": "The resource changes the rules",
      "d": "If the admin picks Admin Portal, the policy applies only to admins, and the form recommends excluding LDAP bind users so service accounts don’t get locked out. The assistant writes the draft, and the product’s usual rules still apply to it.",
      "key": true
     }
    ],
    "call": "The assistant writes the first draft, and the admin checks it in the same policy form they already use.",
    "imgs": [
     {
      "src": "img/cap-prompt.jpg",
      "cap": "One line to start: a policy for device hygiene and compliance.",
      "phone": false
     },
     {
      "src": "img/cap-draft-assign.jpg",
      "cap": "The draft opens beside the chat: status, who it applies to, a name and a description.",
      "phone": false
     },
     {
      "src": "img/cap-draft.jpg",
      "cap": "Conditions and the action are filled in, with a preview of what a blocked user sees.",
      "phone": false
     },
     {
      "src": "img/cap-admin.jpg",
      "cap": "With Admin Portal selected, the form changes and recommends excluding LDAP bind users.",
      "phone": false
     }
    ]
   },
   {
    "k": "Iterate",
    "h": "Change the policy in the chat, with every version saved",
    "blocks": [
     {
      "t": "Each request shows what changed",
      "d": "When the admin asks to use password with MFA, with JumpCloud Go and TOTP as factors, the assistant creates Version 2 as a new card and opens the panel at the authentication section, which is the part that changed.",
      "key": false
     },
     {
      "t": "Every version is kept",
      "d": "Each request creates a new version that the admin can open or go back to. This makes it easy to try an idea, and the chat becomes a record of how the policy was built.",
      "key": false
     }
    ],
    "call": "Every change is saved as a version the admin can go back to.",
    "imgs": [
     {
      "src": "img/cap-v2.jpg",
      "cap": "Asking for password with MFA, JumpCloud Go and TOTP creates Version 2, opened at the part that changed.",
      "phone": false
     },
     {
      "src": "img/cap-saved.jpg",
      "cap": "Once saved, the panel shows a summary of the whole policy.",
      "phone": false
     }
    ]
   },
   {
    "k": "Approve",
    "h": "Nothing changes without a yes",
    "blocks": [
     {
      "t": "Approval before any change",
      "d": "When a request would change a live policy, such as adding the Developer and Designer groups, the assistant shows what it’s going to do (the groups, the policy and the operation) and waits for the admin to approve or deny it.",
      "key": false
     },
     {
      "t": "Showing the result",
      "d": "After approval, the card shows that the operation completed, and the policy panel updates to show both user groups, so the admin can check the actual result.",
      "key": false
     }
    ],
    "call": "The assistant can look things up freely, but it only makes changes after the admin approves them.",
    "imgs": [
     {
      "src": "img/cap-approve.jpg",
      "cap": "Adding two groups to a live policy waits for approval, showing exactly what will change.",
      "phone": false
     },
     {
      "src": "img/cap-approved.jpg",
      "cap": "After approval, the result is confirmed and the policy panel shows both groups.",
      "phone": false
     }
    ]
   },
   {
    "k": "Interview",
    "h": "When the request is vague, the assistant asks questions",
    "blocks": [
     {
      "t": "Most requests start vague",
      "d": "Most admins start with a policy name and a rough goal. Replying with a full template would bring back the long form, just inside the chat.",
      "key": false
     },
     {
      "t": "One block at a time",
      "d": "Instead, the assistant asks about one part at a time: which resource and users, then which device conditions, then what should happen. Each answer is added to the policy straight away, and when nothing is missing, the assistant says so and points the admin to Create Policy.",
      "key": false
     }
    ],
    "call": "The assistant asks only the question that’s needed next, instead of every question at once.",
    "imgs": [
     {
      "src": "img/cap-ask1.jpg",
      "cap": "With only a policy name to go on, the assistant starts a draft and asks who and what it should cover.",
      "phone": false
     },
     {
      "src": "img/cap-ask2.jpg",
      "cap": "It asks about one part at a time: resource and users, then device conditions, then the action.",
      "phone": false
     },
     {
      "src": "img/cap-ask3.jpg",
      "cap": "Once everything is filled in, the assistant recaps the policy and points to Create Policy.",
      "phone": false
     }
    ]
   }
  ],
  "method": [
   {
    "i": "chat",
    "t": "Chat on the left, policy on the right",
    "d": "The admin asks in the chat and reviews the policy beside it, in the same form they already know."
   },
   {
    "i": "grid",
    "t": "Reuse the console form",
    "d": "Status, assignments, conditions, action and sign-in factors look exactly like the console, so nothing new to learn."
   },
   {
    "i": "layers",
    "t": "Version every change",
    "d": "Each request creates a version admins can open or return to, so trying an idea is safe."
   },
   {
    "i": "shield",
    "t": "Ask before it writes",
    "d": "The assistant can look things up freely, but any change to a live policy needs an approval first."
   },
   {
    "i": "question",
    "t": "Interview vague requests",
    "d": "It asks one question at a time: resource, users, device conditions, action. No long form up front."
   }
  ],
  "facts": [
   [
    "Result",
    "40% fewer access tickets"
   ],
   [
    "Area",
    "Access"
   ],
   [
    "Guardrail",
    "Approval before any change"
   ]
  ]
 },
 {
  "co": "jumpcloud",
  "slug": "circuit",
  "name": "Circuit · Tree select",
  "area": "Design system",
  "role": "Lead designer",
  "frm": "Rebuilt controls",
  "to": "Shared primitives",
  "line": "Shared components, so screens stay consistent across teams.",
  "prob": "As more teams shipped, the same controls were being rebuilt slightly differently on every screen.",
  "did": "Contributed to Circuit, the tokens and components that keep every screen consistent, including the tree select component for picking from nested lists.",
  "out": "Teams pick from the same primitives and tokens, so screens stay consistent and handoff to engineering is faster.",
  "bg": "#EDEDEA",
  "metric": "1",
  "metricL": "component instead of many one-off dropdowns",
  "intro": "Admins pick from nested lists all the time, like groups inside groups or devices sorted by platform and version. Circuit had no component for this, so teams were building their own dropdowns, each a little different. I designed Tree select for Circuit, starting from the PrimeVue TreeSelect that Circuit is built on, and shaped it around Circuit’s tokens and the selection cases our product needs.",
  "ch": [
   {
    "k": "Anatomy",
    "h": "A field, a panel and a row, each with every state",
    "blocks": [
     {
      "t": "Built on what engineering already uses",
      "d": "Circuit is built on PrimeVue, so Tree select starts from its TreeSelect. Engineers keep the behaviour they already have, and the design work goes into how it looks and reads in JumpCloud.",
      "key": false
     },
     {
      "t": "Every state drawn once",
      "d": "The field has rest, hover, pressed, open, error and disabled states in two sizes. Each row has rest, hover, pressed, selected, disabled, and selected and disabled, at three nesting levels. Teams pick a state instead of drawing their own.",
      "key": false
     },
     {
      "t": "Showing what’s been picked",
      "d": "Selected values show as chips, as a comma-separated list, or as a count such as “4 items selected” when there are more than three, so the field never grows taller than its row.",
      "key": true
     }
    ],
    "call": "Each part of the component has its states defined, so no team has to invent one.",
    "imgs": [
     {
      "src": "img/ts-field.png",
      "cap": "The field in two sizes: rest, hover, pressed, open, error and disabled.",
      "phone": false
     },
     {
      "src": "img/ts-panel.png",
      "cap": "The panel: search at the top, nested rows, and an optional footer for a short hint.",
      "phone": false
     },
     {
      "src": "img/ts-rows.png",
      "cap": "Row states at three nesting levels, from rest to selected and disabled.",
      "phone": false
     },
     {
      "src": "img/ts-values.png",
      "cap": "Selected values as chips, as a list, or as a count once the list gets long.",
      "phone": false
     }
    ]
   },
   {
    "k": "Selection modes",
    "h": "One component for every way of picking",
    "blocks": [
     {
      "t": "Single, multiple and checkboxes",
      "d": "Single select closes as soon as an item is picked. Multiple select keeps the panel open, and the field switches from a list to chips or a count. Checkboxes make it clear that several items can be picked across different branches.",
      "key": false
     },
     {
      "t": "Only some levels can be picked",
      "d": "Some lists only make sense at one level, for example when the choice is a group and not the items inside it. A mode where only branch items can be selected covers this, in both single and multiple select.",
      "key": false
     }
    ],
    "call": "One component with clear modes, so teams choose a mode instead of building a new dropdown.",
    "imgs": [
     {
      "src": "img/ts-modes-1.jpg",
      "cap": "Default and single select. Picking an item closes the panel.",
      "phone": false
     },
     {
      "src": "img/ts-modes-2.jpg",
      "cap": "Multiple select shown as a list, as chips, and as a count once more than three are picked.",
      "phone": false
     },
     {
      "src": "img/ts-modes-3.jpg",
      "cap": "Checkboxes, and two modes where only branch items can be selected.",
      "phone": false
     }
    ]
   },
   {
    "k": "Light and dark",
    "h": "Both themes from the same tokens",
    "blocks": [
     {
      "t": "Colours come from tokens",
      "d": "Every colour in Tree select comes from a Circuit token, so dark mode uses the same component with the dark token set. There is no second version to keep in sync.",
      "key": false
     }
    ],
    "call": "Tokens first, so a theme change never means redrawing the component.",
    "imgs": [
     {
      "src": "img/ts-dark-1.jpg",
      "cap": "Multiple select modes in dark mode.",
      "phone": false
     },
     {
      "src": "img/ts-dark-2.jpg",
      "cap": "Checkboxes and branch-only selection in dark mode.",
      "phone": false
     }
    ]
   }
  ],
  "method": [
   {
    "i": "eye",
    "t": "Audit what exists",
    "d": "Teams were rebuilding the same nested picker a little differently on every screen."
   },
   {
    "i": "layers",
    "t": "Start from what engineers use",
    "d": "Circuit is built on PrimeVue, so Tree select starts from its TreeSelect and keeps the behaviour engineers know."
   },
   {
    "i": "grid",
    "t": "Draw every state once",
    "d": "Rest, hover, pressed, open, error and disabled, in two sizes, so no team has to invent one."
   },
   {
    "i": "branch",
    "t": "Offer clear modes",
    "d": "Single, multiple and checkbox, with some levels pickable and others not."
   },
   {
    "i": "spark",
    "t": "Tokens first",
    "d": "Every colour comes from a token, so dark mode never means redrawing the component."
   }
  ],
  "facts": [
   [
    "Area",
    "Design system"
   ],
   [
    "Built on",
    "PrimeVue TreeSelect"
   ],
   [
    "Themes",
    "Light and dark"
   ]
  ]
 },
 {
  "co": "microsoft",
  "slug": "defender",
  "name": "Microsoft Defender",
  "bg": "#E7ECFB",
  "area": "Mobile",
  "role": "Lead designer",
  "frm": "Enterprise security",
  "to": "Consumer app",
  "line": "Protection status, alerts, and credit and dark web monitoring, including family members.",
  "metric": "0 → 1",
  "metricL": "consumer security app on iOS and Android",
  "prob": "Microsoft’s security tools were built for enterprises. People and families needed protection they could understand at a glance.",
  "did": "Led the 0-to-1 mobile design of Defender’s consumer app on iOS and Android, and built the shared mobile patterns behind it.",
  "out": "One product on two platforms, with a mobile framework that sped up development.",
  "intro": "Defender takes enterprise security to people and families. The mobile app shows protection status first, then the alerts and monitoring that need attention.",
  "ch": [
   {
    "k": "Protect",
    "h": "Protection status first",
    "blocks": [
     {
      "t": "Status at a glance",
      "d": "The home screen answers one question: am I protected? Recommendations sit beneath, one at a time."
     },
     {
      "t": "Family included",
      "d": "Credit and dark web monitoring cover family members too, so one person can look after everyone.",
      "key": true
     }
    ],
    "call": "Recommendations are specific to the person, such as protecting a child’s identity.",
    "imgs": [
     {
      "src": "img/defender-ios-1.jpg",
      "cap": "iOS home: a recommendation card and monitoring cards.",
      "phone": true
     },
     {
      "src": "img/defender-ios-2.jpg",
      "cap": "iOS: more of the protection experience.",
      "phone": true
     },
     {
      "src": "img/defender-ios-3.jpg",
      "cap": "iOS: monitoring and alerts.",
      "phone": true
     }
    ]
   },
   {
    "k": "Devices",
    "h": "Protection across devices",
    "blocks": [
     {
      "t": "Device protection",
      "d": "Apps scanned, links scanned, malware and web protection, and active threats, with plain language for each."
     }
    ],
    "call": "Status words like Protected and Active mean the same on every device.",
    "imgs": [
     {
      "src": "img/defender-android-2.jpg",
      "cap": "Android: device protection.",
      "phone": true
     },
     {
      "src": "img/defender-android-1.jpg",
      "cap": "Android: the home screen.",
      "phone": true
     }
    ]
   }
  ],
  "method": [
   {
    "i": "users",
    "t": "Translate for families",
    "d": "Enterprise security language does not work for a household, so every term was rewritten for people."
   },
   {
    "i": "shield",
    "t": "Lead with status",
    "d": "The first screen shows whether you are protected, before anything that needs action."
   },
   {
    "i": "bell",
    "t": "Surface one thing at a time",
    "d": "Recommendations and alerts appear individually, so attention goes where it is needed."
   },
   {
    "i": "layers",
    "t": "Build shared patterns",
    "d": "Shared mobile patterns meant new screens started from parts that already worked."
   },
   {
    "i": "phone",
    "t": "Ship both platforms together",
    "d": "iOS and Android were designed as one product with platform-native details."
   }
  ],
  "facts": [
   [
    "Platforms",
    "iOS and Android"
   ],
   [
    "Android downloads",
    "10M+"
   ],
   [
    "Team",
    "Microsoft Security"
   ]
  ]
 }
];
