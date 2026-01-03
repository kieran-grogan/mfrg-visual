# GHL XCEL + Contracting Interactive Guide (Web App) — Build Spec v1.0

> **Purpose:** Convert the existing “GHL XCEL + Contracting Visual Aid v2” (PowerPoint + workflow screenshots) into a **clickable, searchable, interactive** web app / landing page that a VA can use to understand and manage the account.
>
> **Primary constraint:** Build it **fast**, **clean**, and **without losing any information** from the current documentation (v2 deck + 20 workflow screenshots).  
> **Secondary constraint:** Keep it **simple to maintain** (content-first, preferably Markdown/MDX-driven).

---

## 0) What the Agent is building (one sentence)

A small documentation web app that has:
- a landing page + sidebar navigation,
- a master “journey map” with clickable nodes,
- per-workflow pages (with screenshots + step-by-step logic + dependencies),
- a custom-field dependency map,
- and a troubleshooting runbook,
all driven by Markdown/MDX content so non-devs can update it later.

---

## 1) Audience and success criteria

### Target users
- **Technical VA / Ops VA** who will manage the GHL sub-account daily.
- **Owner / Admin** who needs quick troubleshooting and onboarding.

### Definition of “success”
The VA can:
1. Understand the **full journey** (XCEL onboarding → licensed → contracting stages).
2. Click into **any workflow** and see:
   - trigger(s),
   - what it does,
   - branches/loops,
   - what fields it reads/writes,
   - what other workflows it enrolls/removes,
   - and the relevant screenshot(s).
3. Use **search** + **filters** to quickly find:
   - a workflow by name,
   - where a custom field is written/read,
   - what happens at a specific pipeline stage.
4. Follow a **troubleshooting checklist** to resolve common “stuck” cases.

---

## 2) Non-goals (explicitly out of scope)

- No real-time integration with GoHighLevel or SureLC.
- No authentication required for v1 (unless you want it later).
- No editing from inside the web app (content is edited in Markdown files).
- No requirement to reconstruct every micro-step of the “XCEL Drip Reminders” workflow (we only have a zoomed-out screenshot). We **will** include the screenshot and a summarized description + placeholders for missing node-level detail.

---

## 3) Canonical source materials (must be preserved)

The web app must preserve and present **all** information from:
1. **PowerPoint deck (v2):** `GHL_XCEL_Contracting_Visual_Aid_v2.pptx`
2. **20 workflow screenshots** (below)  
3. **Confirmed custom fields** (below)

### 3.1 Screenshot inventory (20 files)
These are the current filenames (you will rename them in the repo for clarity):

**Automation lists / folder lists**
1. `1.png` — Automation → Workflow List (root)  
2. `2.png` — Folder “XCEL Onboarding” workflow list  
3. `3.png` — Folder “Contracting” workflow list (page 1)  
4. `4.png` — Folder “Contracting” workflow list (page 2)

**XCEL workflows**
5. `2.1.png` — `"Passed Test" Trigger Link` (builder)  
6. `2.2.png` — `1 — Intake — Unlicensed (XCEL)` (builder)  
7. `2.3.png` — `2 — XCEL — Drip Reminders (added by WF A)` (builder, zoomed out)  
8. `2.4.png` — `3 — XCEL — On Logged In (Trigger Link)` (builder)  
9. `2.5.png` — `4 — XCEL — On Purchased/Accessed (Trigger Link)` (builder)  
10. `2.6.png` — `6 — XCEL — Completion & Transition (NPN form)` (builder)

**Contracting workflows**
11. `1.1.png` — `1. New Agent Enters Stage - No Profile` (builder)  
12. `1.2.png` — `2. Monitor Agent Stage - At Producer` (builder)  
13. `1.2v2.png` — `2. Monitor Agent Stage - At Producer` (builder, upline logic version w/ loop locked)  
14. `1.3.png` — `3. Monitor BGA → Carrier Stage` (builder)  
15. `1.4.png` — `At Producer: Communication` (builder)  
16. `1.5.png` — `Licensed Intake → Profile Stage in Contracting Pipeline` (builder)  
17. `1.6.png` — `SureLC Granular Audit` (builder)  
18. `1.7.png` — `BGA Reminders (Equita) ** Review for Upline Logic` (builder)  
19. `1.8.png` — `BGA Reminders (Quility) * Review for Upline Logic` (builder)  
20. `1.9.png` — `New BGA: Monitor Agent Stage - At Producer` (builder)

> **Rule:** Every workflow page must link to its screenshot(s).

### 3.2 Confirmed custom fields (must be included)
These are confirmed as “in-scope” custom fields:

- `Onboarding | XCEL Started`
- `Onboarding | XCEL Paid`
- `Onboarding | Licensed`
- `Upline Highest Stage`
- `XCEL Last Touch`

### 3.3 Observed-but-not-confirmed fields (do NOT delete this info)
From workflow screenshots, at least one additional field appears to exist and be referenced:

- `Onboarding | NPN` (seen in “NPN Not Empty” logic)

Also implied (via node names), but not verified in the provided custom field list:
- `Upline NPN` (referenced in “Stage Check Upline via Upline NPN”)
- “Comp level” and “upline info” fields (written by “Add Comp Level” and “Add Upline Info” steps)

> **Rule:** The web app must present these as **Observed/Implied** until confirmed. Do not omit them.

---

## 4) Recommended tech stack (fast + maintainable)

### Option A (recommended): Next.js + MDX + React Flow
- Next.js (App Router) + TypeScript
- MDX for content pages (workflows, fields, troubleshooting, glossary)
- React Flow for interactive diagrams (pipeline + workflow links)
- Simple client-side search over workflow metadata (name, tags, fields)

Why: fastest path to an interactive “docs web app” with clickable diagrams.

### Option B (acceptable): Astro + Starlight docs theme
- Astro + Starlight + Pagefind search
- Mermaid diagrams (less custom, but very usable)

If you choose Option B, you must still implement clickable navigation and embed images.

> **This spec assumes Option A**. If you use Option B, keep identical IA + content requirements.

---

## 5) Information architecture (IA) — required pages

### 5.1 Top-level navigation (sidebar)
1. **Home / Landing**
2. **System Overview**
3. **Journey Map (Interactive)**
4. **Workflows**
   - XCEL Onboarding
   - Contracting
   - Root / Other (stubs)
5. **Custom Fields**
   - Confirmed fields
   - Observed/Implied fields
   - Field dependency map
6. **Troubleshooting**
7. **Changelog / How to Update Docs**

### 5.2 Required UX features
- Global search box (workflow name + tags + field names)
- Filters:
  - by folder (XCEL / Contracting / Root)
  - by stage (No Profile / At Producer / BGA / Carrier / XCEL)
  - by status (Published / Draft / Unknown)
  - by field read/write
- Each workflow page must have:
  - “Back to folder” link
  - “Related workflows” section (links)
  - “Fields read/write” section
  - Screenshot gallery (image lightbox/zoom)

---

## 6) Data model (metadata) — required

Even though pages are MDX, you must create a single metadata source so the UI can:
- build the sidebar,
- build workflow cards,
- power search/filters,
- power the clickable Journey Map.

### 6.1 Create `data/workflows.ts` (or `.json`) with this shape
For each workflow, store:

- `id` (slug)
- `name` (exact GHL name)
- `folder` (`XCEL Onboarding` | `Contracting` | `Root`)
- `status` (`Published` | `Draft` | `Unknown`)
- `triggers` (array of trigger types)
- `primaryPurpose` (1–2 sentences)
- `readsFields` (array)
- `writesFields` (array)
- `enrollsWorkflows` (array of workflow ids)
- `removesWorkflows` (array of workflow ids)
- `stageIn` (optional)
- `stageOut` (optional)
- `screenshots` (array of image paths)
- `mdxPath` (page path)

> **Rule:** `name` must match what’s in GHL screenshots (case/punctuation matters).

---

## 7) Canonical content (must appear in the site)

Below is the canonical content extracted from the screenshots. Your implementation must present it in the workflow pages.

> If a micro-detail is unknown (ex: exact wait durations inside the zoomed-out drip), mark it as **Unknown (needs closer screenshot)** — do not invent.

### 7.1 System overview (XCEL → Contracting)
- XCEL Onboarding progresses contacts via form + trigger links.
- XCEL completion (`6 — Completion & Transition`) updates Licensed and creates an Agent Opportunity.
- Contracting automation begins from **Opportunity Created** and moves opportunity through stages:
  - **No Profile → At Producer → BGA → Carrier** (confirmed)

### 7.2 Workflow catalog — XCEL Onboarding

#### WF-XCEL-01: `"Passed Test" Trigger Link`
- Trigger: Trigger link “Passed”
- Steps (in order):
  1. `XCEL Completed Stage`
  2. `Remove from Drip Workflows`
  3. `Wait (2) Days`
  4. `Email`
  5. `Go To` (loop/redirect)

#### WF-XCEL-02: `1 — Intake — Unlicensed (XCEL)`
- Trigger: Form Submitted
- Steps:
  1. `XCEL Stage 1`
  2. `Enrollment Date Set`
  3. `30 Day Due Date Set`
  4. `Pre-Licensing Link for Login` (email)
  5. `Add to Workflow` (enroll into drip reminders)

#### WF-XCEL-03: `2 — XCEL — Drip Reminders (added by WF A)`
- Trigger: Not shown (likely enroll via “Add to Workflow”)
- Details: Zoomed-out screenshot only.
- Requirements:
  - Embed screenshot
  - Add summary: “Long drip + branch + waits”
  - Add placeholders for missing node-level details

#### WF-XCEL-04: `3 — XCEL — On Logged In (Trigger Link)`
- Trigger: Trigger link “Logged in”
- Steps:
  1. `XCEL Started Update`
- Writes: `Onboarding | XCEL Started` (confirmed intent)

#### WF-XCEL-05: `4 — XCEL — On Purchased/Accessed (Trigger Link)`
- Trigger: Trigger link “Purchased”
- Steps:
  1. `XCEL Started Stage`
  2. `XCEL Paid Update`
- Writes: `Onboarding | XCEL Started`, `Onboarding | XCEL Paid`

#### WF-XCEL-06: `6 — XCEL — Completion & Transition (NPN form)`
- Triggers: Form Submitted, NPN Form Submitted
- Steps:
  1. `Remove from Workflow`
  2. `Update "Licensed" Field`
  3. `Create Agent Opportunity`
- Writes: `Onboarding | Licensed`

### 7.3 Workflow catalog — Contracting

#### WF-CON-01: `1. New Agent Enters Stage - No Profile`
- Trigger: Opportunity Created
- Steps:
  1. `NPN Check`
  2. Condition: **NPN Not Empty** (Double Check: `Onboarding | NPN` is not empty) vs **None**
     - None branch: `Internal Notification` → `Wait` → `Go To` (loop)
  3. If NPN present: `#2 Does Producer Exist in SureLC – API Call`
  4. `Producer Found?`
  5. Condition: **Producer Found** vs **None**
     - None: `Wait (1) Day` → `Go To` (loop)
  6. If Producer Found:
     - `Add Comp Level`
     - `Add Upline Info`
     - `Move to Stage 2 (at Producer)`
     - `Add to Stage 2 Communication`
     - `Add to Stage 2 Monitor`
     - End
- Notes:
  - Must call out dependency on SureLC API/custom code.

#### WF-CON-02: `At Producer: Communication`
- Trigger: Not shown (likely enrolled via “Add to Workflow”)
- Steps:
  1. `Submit Carrier Requests (Day 0 in S2)` (email)
  2. `Wait 1 Day`
  3. `Submit Carrier Requests (Day 2 in S2 and Rotating)` (email)
  4. `SMS Nudge`
  5. `Wait (2) Days`
  6. `Go To` (loop)

#### WF-CON-03: `2. Monitor Agent Stage - At Producer` (Published version)
- Trigger: Not shown (likely enrolled via “Add to Workflow”)
- Steps:
  1. `Internal Notification`
  2. `Wait`
  3. `#1 Stage 2 Monitor Stage Level for Pipeline Movement`
  4. `Stage Selection from API Call`
  5. Branch:
     - Move to BGA:
       - `Remove from Workflow`
       - `Move to BGA Stage`
       - `Add to Workflow (Quility)`
       - `Add to Workflow (Equita)`
       - `Add to BGA Monitor`
       - End
     - Move to Carrier:
       - `Remove from Workflow`
       - `Move to Carrier Stage`
       - End
     - None:
       - `Wait (1) Day`
       - `Add to Workflow` (re-enroll/poll strategy)
       - End

#### WF-CON-04: `2. Monitor Agent Stage - At Producer` (Upline logic / loop-locked version)
- Screenshot shows:
  - `Upline NPN?` condition (`Upline NPN is not empty` vs None)
  - `Validating Upline Agent’s Status`
  - `Pending with BGA` branches
  - “Loop Locked Go To” errors (red)
- Requirement:
  - Include as a separate workflow page marked “Legacy/Experiment (loop-locked)"
  - Explain: GHL loop lock encountered; use remove+re-enroll pattern instead.

#### WF-CON-05: `New BGA: Monitor Agent Stage - At Producer` (Draft)
- Steps:
  1. `Wait`
  2. `#1 Stage 2 Monitor Stage Level for Pipeline Movement`
  3. `Stage Selection from API Call`
  4. Branch by `1.output.highestStage contains …`:
     - Move to BGA:
       - `Remove from Workflow`
       - `Move to BGA Stage`
       - `Add to Workflow (Quility)`
       - `Add to Workflow (Equita)`
       - `Add to BGA Monitor`
     - Move to Carrier:
       - `Remove from Workflow`
       - `Move to Carrier Stage`
     - None:
       - `Wait (1) Day`

#### WF-CON-06: `3. Monitor BGA → Carrier Stage`
- Steps:
  1. `#1 Stage 2 Monitor Stage Level for Pipeline Movement`
  2. `Stage Selection from API Call`
  3. Branch:
     - Move to Carrier:
       - `Remove from Workflow`
       - `Move to Carrier Stage`
       - End
     - None:
       - `Wait (1) Day`
       - `Go To` (loop)

#### WF-CON-07: `BGA Reminders (Equita) ** Review for Upline Logic` (Draft)
- Steps:
  1. `#1 Stage 3 Monitor Stage Level for Pipeline Movement`
  2. `Send Reminder Pre-Req Met?` condition
     - None: `Wait (2) Days` → `Go To` (loop)
     - Yes: `#1 Stage Check Upline via Upline NPN` → `Send Reminder Pre-Req Met?` again
       - If Yes: `Equita - Email to Niki Heisler` → `Wait (2) Days` → `Go To` (loop)
       - If None: `Wait 1 Day` → `Go To` (loop)

#### WF-CON-08: `BGA Reminders (Quility) * Review for Upline Logic` (Draft)
- Same as Equita reminders, but sends:
  - `Quility - Email Reminder`

#### WF-CON-09: `Licensed Intake → Profile Stage in Contracting Pipeline`
- Trigger: Form Submitted
- Steps:
  1. `Wait`
  2. `Email`
  3. End

#### WF-CON-10: `SureLC Granular Audit`
- Steps:
  1. `#1 Custom Code`
  2. `Note`
  3. Condition branches:
     - `Ready to Push` (if `1.output.has_actionable` is true)
     - `Blocked by Upline` (if `1.output.blocked_list` is not empty)
     - `No Pending Work` (end)
  4. For Ready to Push and Blocked by Upline:
     - route by `Which BGA` (Equita / Quility / Both)
     - send corresponding email(s):
       - `Email to Niki`
       - `Quility - Email Reminder`

- Must include the explanation note (summarized, not verbatim):
  - endpoint pattern: `/producer/{npn}/appointments`
  - “double tap” requests for Equita vs Quility credentials
  - output flags used for routing (`has_actionable`, `blocked_list`, etc.)

### 7.4 Root workflows (stubs)
From Automation root list (no builder screenshots provided):
- `Comp Level Link Assignment` (Published)
- `New Workflow : 1761582399175` (Draft)
- `Upline Import Code` (Draft)
- `Warm up test` (Draft)

Requirement:
- Include these as “stubs” pages with:
  - title + status
  - “No canvas screenshot provided yet”
  - placeholder fields/actions unknown

---

## 8) Interactive diagrams — required

### 8.1 Journey Map (clickable)
Implement a clickable diagram that shows:
- XCEL Onboarding sequence → Completion → Create Agent Opportunity
- Contracting stage machine: No Profile → At Producer → BGA → Carrier
- Each node click navigates to the relevant workflow page(s).

Implementation suggestion:
- React Flow diagram with nodes for each stage/workflow cluster.
- Nodes include badges for folder + status.
- Use `next/link` navigation from node click.

### 8.2 Field Dependency Map (clickable)
Provide a map/table that shows:
- Each confirmed field
- Which workflows write it
- Which workflows read it (if known)
- Links to those workflows

Also show Observed/Implied fields separately.

---

## 9) Build steps (sequential, do not skip)

### Step 1 — Create project
1. Create a new Next.js app with TypeScript.
2. Add MDX support.
3. Add basic styling (Tailwind optional, but keep it clean).

### Step 2 — Create content structure
Create folders:
- `content/` (MDX pages)
- `public/assets/workflows/` (screenshots)
- `public/downloads/` (pptx)
- `data/` (workflow metadata)

### Step 3 — Import assets
1. Copy all 20 screenshots into `public/assets/workflows/`.
2. Rename them using the workflow id naming convention (see Step 4).
3. Copy `GHL_XCEL_Contracting_Visual_Aid_v2.pptx` into `public/downloads/`.

### Step 4 — Define workflow IDs + rename images
Use the workflow ids from Section 7 and name images like:
- `wf-xcel-01-passed-test-trigger-link.png`
- `wf-con-01-new-agent-enters-stage-no-profile.png`
etc.

Keep the original names in a mapping file:
- `data/asset-map.json` to avoid losing traceability.

### Step 5 — Implement metadata + routing
1. Build `data/workflows.ts` with all workflows.
2. Generate pages:
   - `/workflows/[id]` renders MDX content + screenshot gallery + metadata blocks.
3. Build “Workflows” index pages with cards and filters.

### Step 6 — Implement search + filters
Minimum:
- search by workflow name
- filter by folder and status
Stretch:
- filter by stageIn/stageOut
- filter by fields read/write

### Step 7 — Build Journey Map
Create `/journey` page:
- React Flow diagram
- clickable nodes → navigate to workflow pages

### Step 8 — Build Custom Fields section
Create `/fields` page:
- Confirmed fields list
- Observed/Implied fields list
- “Where is this field used?” lists with links

### Step 9 — Troubleshooting page
Create `/troubleshooting` page including:
- “No Profile stuck” checklist:
  - check Onboarding | NPN presence (observed)
  - check producer exists in SureLC
  - check loop workflow enrollment
- “At Producer stuck” checklist:
  - verify Stage Selection API call is running
  - check outputs / stage evaluation
- “Loop locked” guidance:
  - avoid deep Go To recursion; use remove + re-enroll patterns

### Step 10 — QA checklist
Before finishing, verify:
- Every workflow has a page.
- Every page has at least one screenshot or explicitly says it’s missing.
- Journey Map works (all clicks navigate).
- Field map links work.
- Search returns correct workflow cards.
- Mobile layout is readable.

---

## 10) Acceptance criteria (must pass)

- [ ] A deployed or locally runnable web app exists (`npm run dev`).
- [ ] Landing page explains the system + provides links to Journey, Workflows, Fields, Troubleshooting.
- [ ] Each workflow page includes: Trigger(s), Purpose, Steps, Branches/Loops, Fields read/write, Related workflows, Screenshot(s).
- [ ] Journey Map is interactive and navigates correctly.
- [ ] Custom Field map shows confirmed fields and observed fields separately.
- [ ] No content is fabricated; unknown details are labeled as unknown.

---

## 11) Cursor / Antigravity Agent Prompt (copy/paste)

**Use this exact prompt in your coding agent:**

---

You are a senior full-stack engineer building a small documentation web app.

### Goal
Build an interactive docs site for “GHL XCEL + Contracting Visual Aid” based on the spec in `SPEC.md`.  
The site must preserve all information: workflow logic, custom fields, and the 20 screenshots.

### Hard Rules
1. Follow `SPEC.md` sequentially. Do not skip steps.
2. Do not invent unknown workflow details. If something is missing, label it “Unknown (needs closer screenshot)”.
3. Workflow names must match the spec exactly.
4. Every workflow must have its own page and must embed its screenshot(s).
5. Implement a clickable Journey Map (React Flow preferred).
6. Implement a searchable/filterable workflows index.
7. Include confirmed custom fields and observed fields in separate sections.

### Output
- A Next.js + TypeScript project
- Content pages in MDX under `content/`
- A `data/workflows.ts` metadata file
- Screenshots under `public/assets/workflows/`
- A clean UI with sidebar navigation + search

### Deliverables
1. Working local build instructions
2. A short “How to update content” doc page
3. All acceptance criteria checked off

Start now by implementing Step 1 to Step 3, then proceed in order until finished.

---

## 12) Maintenance instructions (must be included on site)
Add a page `/how-to-update` with:
- how to add a new workflow
- how to add a new screenshot
- how to update field mappings
- how to deploy

---

## Appendix A — Recommended slugs (workflow IDs)

### XCEL
- `wf-xcel-01-passed-test-trigger-link`
- `wf-xcel-02-intake-unlicensed-xcel`
- `wf-xcel-03-xcel-drip-reminders`
- `wf-xcel-04-on-logged-in-trigger-link`
- `wf-xcel-05-on-purchased-accessed-trigger-link`
- `wf-xcel-06-completion-transition-npn-form`

### Contracting
- `wf-con-01-new-agent-enters-stage-no-profile`
- `wf-con-02-at-producer-communication`
- `wf-con-03-monitor-agent-stage-at-producer-published`
- `wf-con-04-monitor-agent-stage-at-producer-upline-loop-locked`
- `wf-con-05-new-bga-monitor-agent-stage-at-producer-draft`
- `wf-con-06-monitor-bga-to-carrier-stage`
- `wf-con-07-bga-reminders-equita`
- `wf-con-08-bga-reminders-quility`
- `wf-con-09-licensed-intake-profile-stage`
- `wf-con-10-surelc-granular-audit`

### Root stubs
- `wf-root-comp-level-link-assignment`
- `wf-root-new-workflow-1761582399175`
- `wf-root-upline-import-code`
- `wf-root-warm-up-test`
