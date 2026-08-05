import Image from "next/image"
import { ArrowUpRight, ChevronDown, Lock } from "lucide-react"
import type { Project, ProjectVisualVariant } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const variantTint: Record<ProjectVisualVariant, { bar: string; soft: string; faint: string }> = {
    primary: { bar: "bg-primary", soft: "bg-primary/20", faint: "bg-primary/8" },
    accent: { bar: "bg-accent", soft: "bg-accent/20", faint: "bg-accent/8" },
    slate: { bar: "bg-text-muted", soft: "bg-text-muted/20", faint: "bg-text-muted/8" },
}

/**
 * Abstract interface panel used until real product screenshots exist.
 * Deliberately contains no text, numbers or metrics.
 */
function ProjectMockup({ variant }: { variant: ProjectVisualVariant }) {
    const tint = variantTint[variant]

    return (
        <div
            aria-hidden="true"
            className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-white"
        >
            <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-border" />
                <span className="h-2 w-2 rounded-full bg-border" />
                <span className="h-2 w-2 rounded-full bg-border" />
                <span className="ml-3 h-3 w-1/3 rounded-full bg-border/70" />
            </div>

            <div className="flex min-h-0 flex-1">
                <div className="hidden w-14 shrink-0 flex-col gap-2.5 border-r border-border p-3 sm:flex">
                    <span className={cn("h-6 w-6 rounded-md", tint.bar)} />
                    <span className={cn("h-2 w-full rounded-full", tint.soft)} />
                    <span className="h-2 w-full rounded-full bg-border" />
                    <span className="h-2 w-2/3 rounded-full bg-border" />
                    <span className="h-2 w-full rounded-full bg-border" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3 sm:gap-3 sm:p-4">
                    <div className="flex items-center gap-2">
                        <span className={cn("h-2.5 w-24 rounded-full", tint.bar)} />
                        <span className="ml-auto h-5 w-14 rounded-md bg-surface" />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <span className={cn("h-8 rounded-lg sm:h-10", tint.faint)} />
                        <span className="h-8 rounded-lg bg-surface sm:h-10" />
                        <span className={cn("h-8 rounded-lg sm:h-10", tint.faint)} />
                    </div>

                    <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
                        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden rounded-lg bg-surface p-2.5">
                            <span className={cn("h-2 w-full rounded-full", tint.soft)} />
                            <span className="h-2 w-4/5 rounded-full bg-border" />
                            <span className="h-2 w-3/5 rounded-full bg-border" />
                        </div>
                        <div className="hidden w-1/3 flex-col gap-1.5 rounded-lg bg-surface p-2.5 sm:flex">
                            <span className={cn("h-2 w-full rounded-full", tint.soft)} />
                            <span className="h-2 w-2/3 rounded-full bg-border" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectVisual({ project }: { project: Project }) {
    return (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-sm sm:p-4">
            {/* Inner wrapper keeps `fill` inside the padding, so the frame reads as a bezel. */}
            <div className="relative h-full w-full overflow-hidden rounded-xl">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                        // Screenshots are wider than the frame: anchor the top so
                        // headline and product UI survive the crop.
                        className="object-cover object-top"
                    />
                ) : (
                    <ProjectMockup variant={project.visualVariant} />
                )}
            </div>
        </div>
    )
}

function TechList({ technologies }: { technologies: string[] }) {
    return (
        <ul className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
                <li
                    key={tech}
                    className="rounded-md border border-border bg-white px-2.5 py-1 text-xs font-semibold text-text-muted"
                >
                    {tech}
                </li>
            ))}
        </ul>
    )
}

function CapabilityList({ items, twoColumn }: { items: string[]; twoColumn?: boolean }) {
    return (
        <ul className={cn("grid gap-x-6 gap-y-2", twoColumn && "sm:grid-cols-2")}>
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                </li>
            ))}
        </ul>
    )
}

function StatusBadge({ status }: { status: string }) {
    return (
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">{status}</p>
    )
}

function Disclosure({ project }: { project: Project }) {
    return (
        <div className="mt-6 border-t border-border pt-4">
            {project.confidentialityNote && (
                <p className="flex items-start gap-2 text-xs leading-5 text-text-muted">
                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {project.confidentialityNote}
                </p>
            )}
            <p
                className={cn(
                    "text-xs leading-5 text-text-muted",
                    project.confidentialityNote && "mt-2"
                )}
            >
                {project.disclosure}
            </p>
        </div>
    )
}

interface ProjectShowcaseProps {
    project: Project
    /** "featured" alternates a large visual beside the copy. "card" stacks it. */
    layout?: "featured" | "card"
    /** Featured layout only: flips the visual to the opposite column on desktop. */
    reverse?: boolean
    /** Heading level so each section keeps a valid outline. */
    headingLevel?: "h3" | "h4"
}

export function ProjectShowcase({
    project,
    layout = "card",
    reverse = false,
    headingLevel: Heading = "h3",
}: ProjectShowcaseProps) {
    if (layout === "featured") {
        return (
            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className={cn("min-w-0", reverse && "lg:order-2")}>
                    <StatusBadge status={project.status} />
                    <Heading className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-primary sm:text-4xl">
                        {project.title}
                    </Heading>
                    <p className="mt-4 text-base leading-7 text-text-muted">{project.description}</p>
                    <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-6 text-text-dark/80">
                        {project.problem}
                    </p>

                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        What we worked on
                    </p>
                    <div className="mt-3">
                        <CapabilityList items={project.capabilities} twoColumn />
                    </div>

                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Technology
                    </p>
                    <div className="mt-3">
                        <TechList technologies={project.technologies} />
                    </div>

                    {project.projectUrl && (
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            {project.ctaLabel}
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    )}

                    <Disclosure project={project} />
                </div>

                <div className={cn("min-w-0", reverse && "lg:order-1")}>
                    <ProjectVisual project={project} />
                </div>
            </article>
        )
    }

    return (
        <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
            <ProjectVisual project={project} />

            <div className="mt-6 flex min-w-0 flex-1 flex-col">
                <StatusBadge status={project.status} />
                <Heading className="mt-2.5 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-primary sm:text-2xl">
                    {project.title}
                </Heading>
                <p className="mt-3 text-sm leading-6 text-text-muted">{project.description}</p>
                <p className="mt-3 border-l-2 border-accent pl-3 text-sm leading-6 text-text-dark/80">
                    {project.problem}
                </p>

                <div className="mt-5">
                    <TechList technologies={project.technologies} />
                </div>

                <details className="group mt-5 border-t border-border pt-4">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-md text-sm font-bold text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                        {project.ctaLabel}
                        <ChevronDown
                            className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                            aria-hidden="true"
                        />
                    </summary>
                    <div className="pt-4">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            Key capabilities
                        </p>
                        <div className="mt-3">
                            <CapabilityList items={project.capabilities} />
                        </div>
                    </div>
                </details>

                <div className="mt-auto">
                    <Disclosure project={project} />
                </div>
            </div>
        </article>
    )
}
