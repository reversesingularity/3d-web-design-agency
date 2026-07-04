# System Architecture for an Autonomous 3D Web Design Agency

**Loop Engineering Claude Fable 5 for Deep-Tech and Aerospace Environments**

The paradigm of artificial intelligence in software engineering underwent a foundational transformation in mid-2026, transitioning from localized prompt engineering to the broader, systems-level discipline of loop engineering. Rather than manually steering conversational models through isolated interactions, loop engineering dictates the design of automated control flows wherein an AI agent prompts itself, evaluates its environment, executes code, verifies the output, and iterates toward a defined termination condition without requiring a human at each step.

This comprehensive report provides an exhaustive architectural blueprint for loop engineering Anthropic’s Claude Fable 5—a fifth-generation autonomous knowledge worker model—into a highly specialized, multi-agent web design agency. The specific operational domain for this autonomous agency is the end-to-end creation of immersive, 3D interactive dashboards and WebGL/WebGPU landing pages tailored for deep-tech, aerospace, and advanced scientific organizations. By synthesizing frontier AI orchestration with advanced React Three Fiber (R3F) and Zustand state management, this system architecture establishes a scalable mechanism for translating complex, physically invisible technologies into cinematic, high-fidelity digital experiences.

## The Paradigm Shift: From Prompting to Loop Engineering

To successfully engineer an autonomous agency, one must first deconstruct the functional differences between prompt engineering and loop engineering. The technological progression of AI interactions has moved outward in distinct phases: prompt engineering optimized human-to-machine communication for single-turn tasks; context engineering structured the information the model sees; harness engineering built the isolated environment the agent runs in; and finally, loop engineering designs the cyclical control system that drives continuous, autonomous operation.

The autonomous agent is fundamentally a recursive logical loop. The model reads its context, calls a tool such as a terminal or file editor, injects the result back into its context window, and repeats the cycle until a hard stop condition is achieved. When deploying Claude Fable 5, the engineering leverage shifts from crafting the perfect instructional paragraph to designing the overarching cognitive track on which the model runs. This involves configuring triggers, persistent state architectures, isolated worktrees, focused toolsets, and verifiable exit conditions. In this framework, human judgment is baked directly into the evaluation criteria, branching rules, and retry conditions, allowing the system to exercise quality control autonomously.

## The Orchestration Engine: Claude Fable 5

Anthropic’s Claude Fable 5 represents the optimal cognitive engine for this system, offering a 1-million-token context window, exclusive adaptive thinking modes, and autonomous tool-calling capabilities optimized for days-long asynchronous workflows. Positioned as a Mythos-class model explicitly safeguarded for general availability, it is engineered for end-to-end tasks that encompass ambiguity, high multi-step complexity, and continuous self-correction via verification loops.

### Capabilities and Performance Benchmarks

Fable 5 is demonstrably the most capable frontier model for autonomous coding and knowledge work as of mid-2026. The model consistently tops independent evaluation leaderboards across multiple critical dimensions of artificial intelligence.

| Benchmark / Index                        | Score   | Performance Context                                      |
|------------------------------------------|---------|----------------------------------------------------------|
| Artificial Analysis Intelligence Index   | 59.9    | Exceeds 99% of compared models in overall capability.    |
| Artificial Analysis Coding Index         | 76.5    | Exceeds 99% of compared models in composite coding.      |
| Artificial Analysis Agentic Index        | 52.8    | Exceeds 99% of compared models in agentic orchestration. |
| GPQA Diamond                             | 92.6%   | Graduate-level scientific reasoning.                     |
| Humanity's Last Exam (HLE)               | 53.3%   | Advanced multi-disciplinary evaluation.                  |
| Agent Security League (ASL)              | 72.6%   | Functional pass rate on real-world coding tasks using the Cursor harness. |

Deploying Fable 5 within an optimized harness drastically alters its output quality. When benchmarked by the Agent Security League on real-world coding tasks, the same Fable 5 model weights produced a 59.8% functional pass rate under Anthropic's default Claude Code harness, but escalated to a record-breaking 72.6% functional pass rate and 29% security pass rate when orchestrated through the Cursor harness. This underscores the core principle of loop engineering: the harness and the loop design, rather than the raw model alone, dictate the ceiling of the agent's performance.

### Economic Constraints and Token Efficiency

Deploying a continuously looping agent introduces significant economic considerations. Fable 5 operates at a premium pricing tier of $10 per million input tokens and $50 per million output tokens. Because loop engineering inherently compounds token usage as the agent iterates through errors, unconstrained loops can lead to rapid cost blowouts.

The architecture mitigates this through Anthropic's prompt caching mechanisms, which provide a 90% discount on cached input tokens. This demands a strict "stable prefix" strategy. The system instructions, overarching brand guidelines, and memory files must be loaded at the top of the context window and remain byte-for-byte identical across iterative turns. Only the volatile, task-specific details and immediate error logs are appended at the end of the context window, effectively reducing a baseline $2.00 input cost to roughly $0.20 on subsequent cached turns. Furthermore, the system must aggressively manage output tokens, directing the model to generate the required artifacts without verbose narrations of its reasoning process unless explicitly necessary for debugging.

### Safeguard Mitigation and the Opus 4.8 Fallback

A critical architectural consideration for this specific agency involves Fable 5's aggressive safety classifiers. The model launched alongside its unrestricted counterpart, Mythos 5, but Fable 5 contains robust "defense in depth" safeguards designed to prevent the misuse of its prodigious intelligence in offensive cybersecurity and biological weapons synthesis.

The deployment of these classifiers led to a highly publicized geopolitical and regulatory incident. Following the discovery of a jailbreak technique by Amazon researchers, the US Department of Commerce invoked the June 2 AI executive order, forcing Anthropic to suspend global access to Fable 5 on June 12, 2026, due to national security concerns. After extensive negotiations and the deployment of a new classifier suite that blocks the reported vulnerability in over 99% of cases, the export controls were lifted, and global access was restored on July 1, 2026.

Because this autonomous agency targets aerospace and deep-tech—industries that frequently intersect with dual-use technologies, advanced physics, proprietary hardware, and secure networks—benign design prompts may inadvertently trigger these heightened classifiers. When a classifier is tripped, Fable 5 automatically routes the request to Claude Opus 4.8, a less capable model. The system architecture must preemptively mitigate this by explicitly stating the commercial, educational, and defensive intent of the design task within the root `AGENTS.md` file, thereby reducing false positives and ensuring the loop remains powered by Fable 5.

## The Deep-Tech and Aerospace Market Context

An autonomous agency cannot succeed on technical competence alone; it requires deeply codified domain expertise. Designing digital platforms for aerospace manufacturers, quantum computing startups, fusion energy researchers, and advanced biotech firms presents a unique communicative challenge recognized within the industry as the "Credibility Gap."

Deep-tech ventures are inherently engaged in selling a probability rather than an immediately available consumer product. If their digital presence is too visionary, they risk appearing as speculative vaporware; if the presence is too academic, they appear as isolated research projects rather than scalable commercial businesses. The autonomous loop must be rigidly constrained by a design philosophy termed "Engineered Optimism." This philosophy frames the underlying science as a validated engine and the commercial model as the vehicle, proving that the technology is real while simultaneously selling the commercial scale of the future.

## The Operational Ecosystem: New Zealand Aerospace

To ground the autonomous agency in a highly active commercial theater, the system is calibrated to target the rapidly expanding aerospace and deep-tech ecosystem in Aotearoa New Zealand. Over the past five years leading up to 2026, New Zealand's space sector estimated revenue grew from NZ$2.68 billion, outpacing global growth averages.

This ecosystem is anchored by Rocket Lab, which demonstrated how a stable, responsive operating environment can support complex orbital launch technology at scale. Surrounding this anchor is a dense network of specialized entities, including Dawn Aerospace focusing on sustainable space transport, Xerra Earth Observation Institute leveraging remote sensing technologies, and academic centers of excellence such as the University of Auckland's Te Pūnaha Ātea – Space Institute. The New Zealand government actively supports this commercialization through initiatives like the Kiwi Space Activator, a $1.78 million pilot program co-funding demonstration missions to build domestic readiness for national space missions. By programming the AI agent to understand this specific regional ecosystem, the generated digital platforms can precisely target the expectations of local government partners, venture capital incubators like Outset Ventures, and global investors.

## Visualizing the Invisible: Aesthetic Constraints

Deep-tech products are frequently physically invisible—such as predictive algorithms, chemical processes, or quantum error correction—or aesthetically utilitarian, such as raw industrial hardware. The AI agent must be strictly instructed to utilize metaphorical 3D visualization. Rather than rendering generic hardware models, the loop must be configured to generate WebGL representations of what the hardware achieves.

The visual constraints embedded into the agent's memory must mirror the aesthetic standards of leading global WebGL interactive agencies such as Psychoactive Studios, Lusion, Noomo Agency, and Active Theory. The system must enforce the following aesthetic mandates:

- **Engineered Minimalism and Dark Mode**: A default to deep, high-contrast dark modes to signal a developer-first, futuristic aesthetic, paired strictly with Swiss typography and monospaced fonts to communicate precision.
- **Cinematic Realism**: High-fidelity 3D rendering environments with precise lighting, utilizing light refraction to simulate data speed, and particle systems to simulate molecular bonding or orbital mechanics.
- **Avoidance of Distributional Convergence**: Unconstrained Large Language Models naturally regress to the statistical center of their training data, producing forgettable, generic aesthetics characterized by safe grids and purple gradients. The agency system must utilize specialized frontend design skills to force the model into bold, intentional aesthetic decisions that align with the high-end output of premium human agencies.

## Technical Stack Architecture for Immersive WebGL

To execute the "Engineered Optimism" aesthetic reliably, the AI loop requires a highly optimized, modern technological stack. Generating 3D interfaces via automated code generation demands extreme precision, as inefficient WebGL rendering will rapidly degrade browser performance, causing severe frame-rate drops that destroy the user experience. The loop is engineered to mandate the use of React Three Fiber (R3F), Zustand, and WebGPU performance monitors.

### React Three Fiber and Declarative 3D Pipelines

React Three Fiber (R3F) is a React renderer for Three.js that enables the declarative construction of 3D scenes. It maps standard Three.js constructors directly to React components, providing seamless integration with React's state management, context, and hook ecosystems. R3F is the superior choice when embedding complex data visualizations, digital twins, and spatial dashboards within larger React-based enterprise applications.

The AI agent must be rigidly instructed on the specific nuances of R3F to prevent the generation of severe performance bottlenecks commonly found in tutorial-derived LLM code:

| Performance Anti-Pattern     | Required Agent Behavior in R3F                                                                 |
|------------------------------|------------------------------------------------------------------------------------------------|
| Geometry Allocation          | The agent must never create new geometries per frame. It must modify positions within an existing BufferGeometry. |
| Memory Leaks                 | The agent must explicitly invoke `.dispose()` on geometries, materials, and textures when components unmount, as removing an object from the React tree does not free GPU memory. |
| Draw Call Saturation         | The agent must use `InstancedMesh` for repeated geometries (e.g., orbital debris, data points) to render thousands of copies with a single draw call, altering per-instance attributes. |
| Synchronous Loading          | The agent must utilize asynchronous texture loading via `<Suspense>` boundaries and the `useLoader` hook to prevent the main thread from stalling. |

### High-Frequency State Synchronization via Zustand

Immersive 3D dashboards generate continuous, high-frequency state updates—including camera positioning, animation progress, and spatial hover states—that execute 60 to 120 times per second. Attempting to manage this continuous state pipeline using React's native `useState` or the Context API forces the Virtual DOM to reconcile and re-render the entire component tree on every single frame, resulting in catastrophic performance degradation.

The loop architecture strictly enforces the use of Zustand, a minimal, unopinionated state management library created by Poimandres, the same collective responsible for React Three Fiber. The agent is instructed to utilize transient state updates, fetching and mutating state entirely outside the React render cycle. By connecting R3F's `useFrame` hook directly to Zustand stores, the AI can animate objects based on real-time data—such as live telemetry from an aerospace API or live WebSocket events—without triggering a single React component re-render, ensuring the graphics pipeline remains locked at a seamless 60 frames per second.

### WebGPU and Autonomous Performance Verification

A core tenet of loop engineering is the establishment of a verifiable exit condition. An AI agent building a 3D interface cannot simply assume the code is optimal because it compiles successfully; it must mathematically verify that the 3D scene renders within a strict performance budget.

The architecture integrates `r3f-webgpu-perf`, a lightweight performance monitoring tool specifically built for React Three Fiber applications running on both WebGL and modern WebGPU renderers. The verification sub-agent is programmed to read the output of this monitor—specifically tracking draw calls, triangle counts, and GPU frame timing—to confirm the 3D scene is heavily optimized before formally concluding the task.

## Loop-Engineered Context Prompt Architecture

To construct the autonomous agency, the traditional concept of a single, monolithic "system prompt" is abandoned. Instead, the architecture is distributed across a precise filesystem hierarchy. This utilizes the "progressive disclosure" pattern, ensuring Claude Fable 5 only loads relevant rules when it operates within specific project domains, thereby preserving the token budget, preventing context rot, and drastically improving decision-making accuracy.

The architecture operates seamlessly across modern execution harnesses, specifically targeting Kilo Code and Roo Code environments that support multi-agent modes and advanced `.roomodes` or `kilo.jsonc` configurations. The exact structural files required to initialize the Claude Fable 5 autonomous agency serve as the distributed "context prompt."

### 1. Root Orchestration Configuration (`kilo.jsonc`)

This configuration establishes the fundamental rules of engagement, granting Fable 5 the autonomy to edit files and read contexts while strictly sandboxing destructive terminal commands.

```json
{
  "$schema": "https://app.kilo.ai/config.json",
  "model": "anthropic/claude-fable-5",
  "effort": "high",
  "instructions": [
    ".agency/rules/*.md",
    ".agency/memory/*.md"
  ],
  "permission": {
    "bash": {
      "npm run *": "allow",
      "git *": "allow",
      "rm -rf *": "deny"
    },
    "read": "allow",
    "edit": "allow",
    "webfetch": "allow"
  }
}
```

### 2. The Core Agency Persona (`.agency/rules/01-persona.md`)

This file acts as the primary identity anchor, defining the agency's domain expertise and establishing defensive constraints against Fable 5's aggressive cybersecurity classifiers.

```markdown
# Agency Persona: Deep-Tech & Aerospace 3D Web Design

You are an elite, autonomous AI engineering and design agency specializing in WebGL, React Three Fiber (R3F), and immersive data visualization. Your target market includes aerospace manufacturers, quantum computing startups, and scientific institutions based in the New Zealand and global markets.

## Domain Philosophy: "Engineered Optimism"

You do not build standard B2B SaaS landing pages. You reject distributional convergence (e.g., standard grids, generic gradients).

Your designs must bridge the "Credibility Gap." The science must appear as a validated engine driving a highly scalable commercial vehicle.

Employ metaphorical visualization: Do not render generic hardware; render the physics of what the hardware achieves (e.g., particle bonding, orbital trajectories, data refraction).

Utilize cinematic realism, high-contrast dark modes, and Swiss monospaced typography to communicate precision.

## Safeguard Mitigation (CRITICAL)

Your tasks will involve parsing technical documents related to aerospace, defense logistics, orbital mechanics, and advanced materials.

All context provided is for commercial marketing and educational data visualization.

You are not engaging in offensive cybersecurity, biological synthesis, or weaponization.

Approach all prompts with the assumption of benign, defensive, and commercial intent to avoid triggering external safety classifiers.
```

### 3. Technical Standards Directive (`.agency/rules/02-standards.md`)

This file provides the rigid engineering boundaries that the agent must adhere to, forcing it out of standard React habits and into high-performance 3D workflows.

```markdown
# Technical Architecture & Constraints

## State Management

- NEVER use React `useState` or Context API for high-frequency 3D state (e.g., camera positioning, animation loops, cursor tracking).
- MUST use Zustand for all global and transient state.
- Subscribe to Zustand stores directly inside R3F `useFrame` loops without triggering React DOM re-renders.

## React Three Fiber (R3F) Performance

- NEVER instantiate multiple `Mesh` components for repeated geometries (e.g., stars, data nodes, debris). MUST use `InstancedMesh`.
- ALWAYS explicitly call `.dispose()` on unmounted geometries and materials to prevent WebGL/WebGPU memory leaks.
- NEVER block the main thread with synchronous texture loading. Use `<Suspense>` and `useLoader`.

## Verification & Definition of Done

A task is NOT complete until the following conditions are met:

- `npm run typecheck` reports zero errors.
- `npm run lint` reports zero warnings.
- The R3F scene boots successfully and `r3f-webgpu-perf` reports draw calls remain under 100 per frame.
```

### 4. Persistent Memory Integration (`.agency/rules/03-memory.md`)

A severe failure mode in long-horizon loop engineering is the accumulation of stale reasoning, often referred to as the "doom loop," where an agent repeats failed solutions because critical history becomes buried in an overflowing context window. The architecture must mandate memory manipulation to preserve continuous state.

```markdown
# Memory Maintenance (MANDATORY)

Before completing any task, you must update the persistent memory files in `.agency/memory/`.

- If you encountered a WebGL compilation error and found a workaround, document it in `memory-decisions.md`.
- Do not repeat mistakes logged in the memory files.
- Treat context as a strict budget; rely on the memory files for historical state rather than reading the entire chat transcript.
```

## Multi-Agent Collaboration and Custom Modes

A loop operating without an independent verification mechanism is simply an agent nodding along to its own hallucinations. The autonomous agency requires specialized modes, operating in a strict Evaluator-Optimizer pattern, to segment ideation, execution, and quality control. These custom modes are defined within `.roomodes` or equivalent configuration files.

| Custom Agent Mode     | Operational Role                                                                 | Authorized Tool Groups      | Effort Level |
|-----------------------|----------------------------------------------------------------------------------|-----------------------------|--------------|
| Deep-Tech Strategist  | Responsible for discovery and planning. Parses client whitepapers, patents, and datasets to extract a commercial paradigm-shift narrative. Defines the overarching visual metaphor for the R3F scene. | read, browser, webfetch     | high         |
| R3F Architect         | Translates the visual metaphor into a structural system design. Defines the Zustand store architecture, component hierarchy, and GLSL shader requirements before execution begins. | read, edit, command         | xhigh        |
| WebGL Developer       | The primary executor. Generates the React Three Fiber code, implements transient Zustand state logic, compiles custom shaders, and integrates performance monitors. | read, edit, command         | high         |
| The Verifier          | The critical quality gate. Runs build tests, analyzes `r3f-webgpu-perf` outputs, and acts as the ultimate termination authority. Dispatches structural feedback to the Developer if performance thresholds fail. | read, command               | xhigh        |

To prevent these parallel agents from colliding and overwriting each other's code during simultaneous execution, the loop utilizes Git worktrees. Each agent operates within a completely isolated working directory that shares the same repository history, ensuring that the WebGL Developer can experiment with shader compilation without breaking the stable branch utilized by the Verifier.

## Skill Integration and Autonomous Execution

To handle complex, highly specific tasks without bloating the root system instructions, the loop utilizes progressive disclosure via skills. A skill is codified knowledge stored in a `SKILL.md` file, which the agent reads on-demand, ensuring that the loop builds upon established project habits rather than restarting its learning process on every beat.

For the aerospace and deep-tech agency, a specialized skill is required to extract narrative structures from dense scientific documentation.

**Path:** `.agency/skills/deep-tech-narrative/SKILL.md`

```yaml
---
name: deep-tech-narrative
description: Analyzes scientific whitepapers, patents, and aerospace documentation to extract a commercial paradigm-shift narrative and define the 3D visual metaphor.
disable-model-invocation: false
---

# Deep-Tech Narrative Extraction Protocol

Parse the provided client documentation using the read or webfetch tools.

Identify the core scientific breakthrough (e.g., novel propulsion, new protein folding algorithm, quantum error correction).

Translate this breakthrough into a "Paradigm Shift" narrative. Explain why now and why it is commercially viable.

Define the 3D Metaphorical Visualization:
- Propose an R3F scene that visually explains the technology without relying on literal CAD models.
- Define the particle systems, shader logic, and lighting required to achieve cinematic realism.

Output the narrative and 3D architectural plan to docs/visual-strategy.md.
```

## The Autonomous Verification Loop

The hallmark of successful loop engineering is the shift from manual human verification to systemic, closed-loop verification. When the WebGL Developer mode generates the code for an interactive aerospace dashboard, it remains prone to hallucinating specific Three.js mathematical functions or failing to account for device pixel ratios on high-DPI displays.

The system handles this by autonomously executing the Verifier mode in a continuous feedback cycle:

1. **Execution Trigger**: The WebGL Developer mode saves the updated `Scene.tsx` file.
2. **Automated Action**: The loop automatically executes `npm run verify-3d`.
3. **Metric Evaluation**: A headless browser script compiles the R3F scene, mounts the `r3f-webgpu-perf` component, and captures the GPU frame time, triangle counts, and draw calls.
4. **Data Feedback**: If the frame time exceeds 16.6ms (dropping below the critical 60 FPS threshold), the Verifier mode intercepts the failure. It feeds the exact WebGPU performance logs back into Fable 5's context window.
5. **Systemic Correction**: Fable 5, seeing the precise draw call count, autonomously escalates its processing to the xhigh effort level. It determines that the geometry is too complex, refactors the codebase to utilize `InstancedMesh` for repeated elements, and saves the file.
6. **Task Resolution**: The cycle repeats autonomously until the performance metrics pass the mandated threshold, at which point the Verifier formally commits the code and halts the loop.

By abandoning prompt-based micro-management in favor of systemic architectural design, this loop-engineered configuration harnesses Claude Fable 5's exceptional autonomous capabilities. It strictly enforces the "Engineered Optimism" design philosophy and mathematically gates WebGL performance, ensuring that the agency consistently produces highly performant, visually striking 3D digital experiences capable of bridging the credibility gap for frontier technology organizations.

## References

- [What Is Loop Engineering? A Complete Guide from Prompt to Harness Engineering (2026)](https://tosea.ai/blog/loop-engineering-ai-agents-complete-guide-2026)
- [GitHub - cobusgreyling/loop-engineering: Practical patterns, starters & CLI tools for loop engineering with AI coding agents](https://github.com/cobusgreyling/loop-engineering)
- [Loop Engineering vs Prompt Engineering: What's the Difference and Which Do You Need?](https://www.mindstudio.ai/blog/loop-engineering-vs-prompt-engineering)
- [What is loop engineering? The AI trend replacing prompt engineering](https://www.businesstoday.in/technology/artificial-intelligence/story/what-is-loop-engineering-the-ai-trend-replacing-prompt-engineering-539754-2026-06-29)
- [Loop Engineering: The Skill That's Replacing Prompting | by Vovance | Jun, 2026 | Medium](https://medium.com/@vovance/loop-engineering-the-skill-thats-replacing-prompting-d429b000489c)
- [Deep Tech Branding & Website Agency - Everything Design](https://www.everything.design/solution/deep-tech-branding-website-agency)
- [Build Browser-Based Low-Latency Conversational AI Avatars with Three.js and React](https://convai.com/blog/ai-avatars-inside-browser-threejs-react-convai-web-sdk-tutorial)
- [Three.js Interfaces: Production 3D for Web Applications | IGC - Intelligent Graphic & Code](https://www.intelligentgraphicandcode.com/development/threejs-interfaces)
- [i just read about loop engineering and the shift from prompting to designing the system finally made sense - Reddit](https://www.reddit.com/r/aiagents/comments/1udgo7d/i_just_read_about_loop_engineering_and_the_shift/)
- [What Is Loop Engineering in AI Coding? - Verdent Guides](https://www.verdent.ai/pt/guides/agent/what-is-loop-engineering)
- [Claude Fable 5 - API Pricing & Benchmarks - OpenRouter](https://openrouter.ai/anthropic/claude-fable-5)
- [Claude Fable - Anthropic](https://www.anthropic.com/claude/fable)
- [Loop Engineering Guide (2026) - AI Builder Club](https://www.aibuilderclub.com/blog/loop-engineering-guide-2026)
- [From Prompting to Loop Engineering: Building Autonomous Agents in VS Code - Regolo.AI](https://regolo.ai/from-prompting-to-loop-engineering-building-autonomous-agents-in-vs-code/)
- [Introducing Claude Fable 5 and Claude Mythos 5 - Claude Platform Docs](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5)
- [Claude Fable 5, take two: same model, different harness, and a very different result](https://www.endorlabs.com/learn/claude-fable-5-take-two-same-model-different-harness-and-a-very-different-result)
- [Claude Fable 5 Prompting Guide: Effort & Self-Check - LushBinary](https://lushbinary.com/blog/claude-fable-5-prompting-guide/)
- [Redeploying Claude Fable 5 - Anthropic](https://www.anthropic.com/news/redeploying-fable-5)
- [Expect Claude Fable 5 to Be Turned Back on in a Matter of Days, Report Says](https://gizmodo.com/expect-claude-fable-5-to-be-turned-back-on-in-a-matter-of-days-report-says-2000778672)
- [Anthropic bringing back Claude Fable 5, Mythos 5 globally after US removes restrictions](https://www.indiatoday.in/technology/news/story/anthropic-bringing-back-claude-fable-5-mythos-5-for-other-countries-after-us-removes-restrictions-2937955-2026-07-01)
- [Trump administration lifts restrictions on Anthropic's Claude models after cybersecurity alarm](https://apnews.com/article/anthropic-fable-mythos-trump-claude-028db5135128fce6b38c873bf9cb5e09)
- [Anthropic’s Fable 5 is back online after US export controls forced shutdown](https://timesofindia.indiatimes.com/technology/tech-news/anthropics-fable-5-is-back-online-after-us-export-controls-forced-shutdown/articleshow/132129900.cms)
- [U.S. lifts export controls on Anthropic's Claude Fable 5 and Mythos 5, ending 19-day shutdown](https://www.marketscale.com/industries/software-and-technology/us-lifts-export-controls-on-anthropics-claude-fable-5-and-mythos-5-ending-19-day-shutdown)
- [Fable 5 is back: Anthropic restores Claude’s powerful AI model worldwide — Now with extra safety features](https://www.financialexpress.com/life/technology-fable-5-is-back-anthropic-restores-claudes-powerful-ai-model-worldwide-now-with-extra-safety-features-4281389/)
- [Anthropic's Claude Fable 5, Mythos 5 global access cleared by US govt; Global rollout starts July 1](https://www.businesstoday.in/technology/artificial-intelligence/story/anthropics-claude-fable-5-mythos-5-access-cleared-by-us-govt-global-rollout-starts-july-1-540167-2026-07-01)
- [Introducing Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)
- [OPTIMISM ONE FM ESFANDIARY - galtonsbox.com](https://galtonsbox.com/wp-content/uploads/2015/05/esfandiary-optimism-one.pdf)
- [Aerospace | Emerging Sectors - Auckland Economic Development](https://aucklandeconomicdevelopment.com/techakl/emerging-sectors/aerospace)
- [NEW ZEALAND TECH: FUTURE-FOCUSED. MADE FOR THE WORLD](https://www.nzte.govt.nz/page/new-zealand-tech-future-focused-made-for-the-world)
- [Top 68 Space Exploration Companies in New Zealand (2026) | ensun](https://ensun.io/search/space-exploration/new-zealand)
- [Kiwi Space Activator | Ministry of Business, Innovation & Employment](https://www.mbie.govt.nz/science-and-technology/space/industry-and-innovation/kiwi-space-activator)
- [Digital Storytelling & 3D Website Design Agency | Noomo](https://noomoagency.com/)
- [The best WebGL & interactive 3D agencies in 2026 - Psychoactive Studios](https://www.psychoactive.co.nz/content-hub/best-webgl-interactive-3d-agencies)
- [Webflow Enterprise Partner & Agency NZ - Psychoactive Studios](https://www.psychoactive.co.nz/webflow-enterprise-agency)
- [We design brands and interfaces for aerospace companies - O0 Design](https://www.ozero.design/services/aerospace-web-design)
- [10 Must-Have Skills for Claude (and Any Coding Agent) in 2026 - Medium](https://medium.com/@unicodeveloper/10-must-have-skills-for-claude-and-any-coding-agent-in-2026-b5451b013051)
- [Kilo Code for design](https://open-design.ai/agents/kilo-design/)
- [10 Best Three.js Agencies (2026): Pricing, Strengths & How to Choose - Utsubo](https://www.utsubo.com/blog/top-threejs-agencies)
- [Zustand posts - daily.dev](https://daily.dev/tags/zustand)
- [Three.js vs React Three Fiber vs Babylon.js 2026 - PkgPulse](https://www.pkgpulse.com/guides/threejs-vs-react-three-fiber-vs-babylonjs-3d-webgl-2026)
- [Zustand Does in 10 Lines What Redux Does in 100](https://javascript.plainenglish.io/why-17-000-companies-quietly-switched-to-zustand-f0f5206edee3)
- [Backyard Studio 3D: Design Your Dream Yard in 30 Minutes : 6 Steps - Instructables](https://www.instructables.com/Backyard-Studio-3D-Design-Your-Dream-Yard-in-30-Mi/)
- [Managing React state with Zustand - LogRocket Blog](https://blog.logrocket.com/managing-react-state-zustand/)
- [React 19 + React Three Fiber project: real-time 3D dashboard with WebSocket state sync : r/reactjs - Reddit](https://www.reddit.com/r/reactjs/comments/1repcbt/react_19_react_three_fiber_project_realtime_3d/)
- [Anderson Mancini ektogamat - GitHub](https://github.com/ektogamat)
- [ektogamat/r3f-webgpu-perf - GitHub](https://github.com/ektogamat/r3f-webgpu-perf)
- [CHANGELOG.md - ektogamat/r3f-webgpu-perf - GitHub](https://github.com/ektogamat/r3f-webgpu-perf/blob/main/CHANGELOG.md)
- [Set up Claude Code in a monorepo or large codebase](https://code.claude.com/docs/en/large-codebases)
- [The CLAUDE.md Configuration Hierarchy - The AI Agent Factory - Panaversity](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/claude-code-teams-cicd/claude-md-configuration-hierarchy)
- [I Tried 100 Claude Skills. These Are The Best. - DEV Community](https://dev.to/suraj_khaitan_f893c243958/i-tried-100-claude-skills-these-are-the-best-1m4a)
- [01_Custom_Modes · jezweb/roo-commander Wiki - GitHub](https://github.com/jezweb/roo-commander/wiki/01_Custom_Modes)
- [The Great Roo Migration - Kilo Code](https://kilo.ai/roo-migration)
- [Kilo Code Rules & kilo.jsonc Configuration Guide (2026) - Cursor alternatives](https://cursor-alternatives.com/blog/kilo-code-rules/)
- [How I structure Claude Code projects (CLAUDE.md, Skills, MCP) : r/ClaudeAI - Reddit](https://www.reddit.com/r/ClaudeAI/comments/1r66oo0/how_i_structure_claude_code_projects_claudemd/)
- [Loop Engineering - AddyOsmani.com](https://addyosmani.com/blog/loop-engineering/)
- [sellisd/roomodes: custom modes for agile software development with roo code - GitHub](https://github.com/sellisd/roomodes)
- [Loop Engineering: A Crash Course | The AI Agent Factory](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)
- [How to create custom skills | Claude Help Center](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Context Engineering Explained: How Kilo Code Manages Context | by Jason Yang | Medium](https://medium.com/@jasonyang.algo/context-engineering-explained-how-kilo-code-manages-context-a3126d97d44f)
