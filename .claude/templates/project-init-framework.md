# Project Initialization Framework

When starting a new project, automatically generate the following planning documents by interviewing the user:

## 1. Proposed Development Plan (`proposed-plan.md`)

**Structure to generate:**
- Overview
- Technical Decisions (with rationale for each decision)
- Development Phases (Priority 1, 2, 3 with clear goals)
- Implementation Details (project structure, configurations)
- Demo Story Flow (narrative walkthrough)
- Success Criteria (checklist per phase)
- Timeline Estimate (rough hours/days breakdown)

**Questions to ask user:**
- What is the project goal/overview?
- What are the main features/requirements?
- **Is there a hard deadline or time constraint for this project?** (This is critical for prioritization)
- If there's a deadline, what's the minimum viable demo that must be ready by then?
- What technology stack preferences do you have?
- What's most important to demonstrate in a demo?
- Are there any technical constraints or limitations?
- Are there any existing specs, requirements, or API definitions?

## 2. Iteration Strategy (`iteration-strategy.md`)

**Structure to generate:**
- Overview
- Iteration workflow pattern (branch → wireframe → review → build → commit → PR → merge)
- Pull Request strategy (one PR per screen/feature - industry standard)
- Breakdown of each phase into small iterations (4-8 hours each)
- For each iteration:
  - Goal (what it accomplishes)
  - Git workflow (branch creation, commits, PR creation, merge)
  - Features (specific functionality)
  - API endpoints used
  - Mock data required
  - Deliverable (what's demo-ready)
  - Time estimate
  - Demo-ready status (yes/no with explanation)
- Benefits of the iterative approach
- Communication checkpoints
- PR checklist (per iteration)
- Next steps

**Instructions:**
- Break work into 4-8 hour chunks
- Each iteration should be independently demoable where possible
- Include wireframe/review steps for UI work (save wireframes to `.specs/wireframes/`)
- Follow git workflow: **One PR per screen/feature (industry standard)**
  - Each iteration gets its own feature branch
  - Commit frequently with clear messages
  - Create PR when iteration is complete and demo-ready
  - Merge PR after review
  - Next iteration branches from main
- Start with "quick wins" for early momentum
- Build foundation before features if needed
- **Implement "Coming Soon" pattern for unimplemented features:**
  - Create a reusable utility (e.g., `coming-soon.ts`) early in the project
  - Add alerts/popups showing which iteration will implement each placeholder feature
  - Update placeholder pages with professional "Coming Soon" UI (icons, descriptions, buttons)
  - Maintain a centralized feature roadmap catalog
  - Apply to all buttons, links, and pages that will be implemented in future iterations
  - This ensures demos are professional and clearly communicate the implementation plan

## Process

### 1. **Discovery Phase: Structured Interview**

**IMPORTANT: Interview the user ONE QUESTION AT A TIME to build rich context.**

#### Interview Approach:
1. **Present the Interview Framework** - Show the user the categories/topics you'll explore
2. **Ask questions one-by-one** - Wait for response before proceeding
3. **Follow up dynamically** - If an answer creates uncertainty or reveals new information, ask clarifying follow-up questions before moving to the next planned question
4. **Don't rigidly stick to the script** - Adapt based on the conversation flow
5. **Enrich context progressively** - Each answer should deepen your understanding

#### Interview Framework (Present to User First):

**Discovery Topics:**
- **A. Project Context & Goals** - Understanding the "why" and "what"
- **B. Timeline & Constraints** - Critical deadline information
- **C. Technical Stack & Preferences** - Technology choices and rationale
- **D. Feature Scope & Priorities** - What to build and in what order
- **E. Demo & Success Criteria** - What "done" looks like
- **F. Team & Workflow** - Collaboration and development practices
- **G. Existing Assets** - What's already available to leverage

#### Interview Questions (Ask One-by-One):

**A. Project Context & Goals**
1. What is the primary business goal of this project?
2. Who is the intended audience/user of this application?
3. What problem does this solve that current solutions don't?
   - *Follow-up if needed: What are the current pain points?*

**B. Timeline & Constraints (CRITICAL)**
4. **Is there a hard deadline for this project?**
   - *If YES:* What is the exact deadline date?
   - *Follow-up:* What are the consequences if we miss this deadline?
5. **If there's a deadline, what is the absolute minimum that must be demo-ready by then?**
   - *Follow-up:* What can be cut if we're running short on time?
6. Are there any interim milestones or checkpoints?

**C. Technical Stack & Preferences**
7. Do you have any specific technology preferences or constraints?
   - *Present discovered/recommended stack for confirmation*
   - *Follow-up:* Are there any technologies you want to avoid? Why?
8. Are there browser/device compatibility requirements?
9. Where will this be deployed? (localhost, cloud, specific hosting?)

**D. Feature Scope & Priorities**
10. Looking at the [existing spec/requirements], which features are:
    - **Must-have** (Priority 1)
    - **Should-have** (Priority 2)
    - **Nice-to-have** (Priority 3)
    - *Follow-up for each must-have:* What makes this critical?
11. Are there any features in the spec that are actually not needed?
12. Are there any features missing from the spec that you know you'll need?

**E. Demo & Success Criteria**
13. What specific workflows do you want to demonstrate?
    - *Follow-up:* Walk me through the ideal demo flow from start to finish
14. Who will you be demoing this to, and what will impress them most?
15. What does "success" look like for this POC?
    - *Follow-up:* How will you measure whether this POC achieved its goal?

**F. Backend & Data Strategy**
16. Will there be a real backend API, or should we use mock data?
    - *If real API:* Is it already built, or being built in parallel?
    - *If mock:* How realistic should the mock data be?
17. Do you need data to persist between sessions, or is in-memory okay?
18. Are there any existing APIs or services we need to integrate with?

**G. Team & Workflow**
19. Will you be the only developer, or is this a team effort?
    - *If team:* How many developers? What are their roles?
20. What git workflow do you prefer? (feature branches, PRs, etc.)
21. How do you want to receive updates? (after each iteration, daily, weekly?)

**H. Design & Branding**
22. Do you have existing branding guidelines or a design system?
    - *Follow-up:* Colors, fonts, logo assets?
23. Are there any design inspirations or reference applications?
24. Should this look polished/production-ready, or is "functional POC" acceptable?

**I. Constraints & Risks**
25. Are there any known technical constraints or limitations I should be aware of?
26. What concerns you most about this project?
    - *Follow-up:* How can we mitigate that risk?
27. Are there any compliance, security, or regulatory requirements?

#### After Interview Completion:
- Summarize key findings back to user for confirmation
- Highlight any areas of uncertainty that still exist
- Confirm understanding before moving to Generation Phase

### 2. **Generation Phase**
   - Read and analyze any existing requirements, specs, API definitions in the codebase
   - Synthesize interview responses into comprehensive plans
   - Generate `proposed-plan.md` with phased approach based on priorities and timeline
   - Generate `iteration-strategy.md` with detailed iteration breakdowns (4-8 hour chunks)
   - Ensure plans reflect user's actual constraints and priorities
   - Save both to `.specs/` directory

### 3. **Review Phase**
   - Present both documents to user
   - Explain rationale for key decisions
   - Get user approval/feedback
   - Revise if needed based on feedback
   - **Do not proceed to Execution until explicit approval**

### 4. **Execution Phase**
   - Only start implementation after plan approval
   - Follow iteration strategy exactly
   - **Before committing work:**
     - Perform thorough self-review of all changes
     - Check for code quality, consistency, and adherence to requirements
     - Identify potential issues, improvements, or alternatives
     - Document review findings and suggestions
     - **Discuss review comments with user BEFORE implementing changes**
     - Get user approval/direction on which improvements to make
   - Get feedback after each iteration
   - Adapt plan if priorities change

## Coming Soon Pattern Implementation

To ensure professional demos that clearly communicate the implementation roadmap, implement this pattern early in every project:

### 1. Create Utility File (e.g., `lib/coming-soon.ts`)
```typescript
export function showComingSoon(featureName: string, plannedIteration: string) {
  alert(`${featureName}\n\nThis feature will be implemented in ${plannedIteration}.`);
}

export const COMING_SOON_FEATURES = {
  FEATURE_NAME: {
    name: 'Feature Display Name',
    iteration: 'Iteration X.X: Description',
  },
  // Add all planned features here
} as const;
```

### 2. Apply to Buttons/Links
For any button or link that leads to unimplemented functionality:
```typescript
import { showComingSoon, COMING_SOON_FEATURES } from '@/lib/coming-soon';

<Button onClick={() => showComingSoon(
  COMING_SOON_FEATURES.FEATURE_NAME.name,
  COMING_SOON_FEATURES.FEATURE_NAME.iteration
)}>
  Button Text
</Button>
```

### 3. Create Professional Placeholder Pages
For screens not yet implemented, create attractive placeholder pages:
```typescript
<div className="flex items-center justify-center min-h-[400px]">
  <div className="text-center max-w-md">
    <div className="text-6xl mb-6">🚀</div>
    <h2 className="text-2xl font-semibold mb-3">Coming Soon</h2>
    <p className="text-gray-600 mb-6">
      Feature description explaining what it will do...
    </p>
    <Button onClick={() => showComingSoon(...)}>
      View Implementation Plan
    </Button>
  </div>
</div>
```

### 4. Maintain Centrally
Update the `COMING_SOON_FEATURES` catalog as iterations are completed or plans change. This provides a single source of truth for the project roadmap.

## Output Location

Save generated planning documents to:
- `.specs/proposed-plan.md`
- `.specs/iteration-strategy.md`
- `.specs/wireframes/` - Directory for all wireframe files (create if needed)

## Important Principles

- **Ask, don't assume**: Interview the user to understand their specific technical as well as business needs
- **Phased approach**: Break large projects into Priority 1/2/3 phases
- **Demo-ready increments**: Each iteration should show visible progress
- **Early feedback**: Review after each iteration to course-correct
- **Self-review before commit**: ALWAYS review your own work thoroughly before committing, document findings, and discuss review comments with the user to get approval/direction before implementing changes
- **Keep track of completed steps**: When you finish a task, immediately mark it as completed by changing `[ ]` to `[x]`.
- **Technical rationale**: Explain why each technical decision was made
- **Realistic estimates**: Provide honest time estimates per iteration
- **Flexibility**: Build in checkpoints to adjust based on learnings
- **One PR per feature**: Follow industry standard - create PR after each screen/feature is complete (easier review, faster feedback, reduced risk)
- **Coming Soon pattern**: ALWAYS implement coming soon alerts/pages for unimplemented features to make demos professional and communicate the roadmap clearly
