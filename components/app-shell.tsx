"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    ScrollText,
    Sparkles,
    Link as LinkIcon,
    Code2,
    Menu,
    X,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type SectionId = "mission" | "about" | "letter" | "inspo" | "links" | "making-of";

interface AppShellProps {
    letterContent: string;
}

// --- Content Components ---

const OurMission = () => (
    <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight lowercase">our mission</h1>
        <div className="text-lg text-zinc-600 dark:text-zinc-300 space-y-4">
            <p>
                To bridge the gap between untraditional backgrounds and high-impact engineering.
            </p>
            <p>
                afrodev is about proving that talent is universal, but opportunity is not -- and then engineering the solutions to fix that distribution.
            </p>
        </div>
    </div>
);

const AboutMe = () => (
    <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight lowercase">about me</h1>
        <ul className="space-y-4 text-lg text-zinc-600 dark:text-zinc-300">
            <li>- 24-year-old Multicultural Software Engineer & Entrepreneur.</li>
            <li>- Moving between Norway, Sudan, and Berkeley.</li>
            <li>- Focusing on AI Agents, Full-Stack Dev, and Social Impact.</li>
        </ul>
    </div>
);

const TheLetter = ({ content }: { content: string }) => {
    // Fix Hydration Error: The markdown has `**## Header`, which creates `<strong><h2>` (Invalid HTML).
    // We remove the `**` immediately preceding headers or wrapping standard paragraphs to prevent nesting issues.
    const safeContent = React.useMemo(() => {
        return content
            .replace(/\*\*\s*(#+)/g, '$1') // Remove ** before headers (e.g. **## -> ##)
            .replace(/^\*\*/g, '')         // Remove starting ** if it wraps the whole text
            .replace(/\*\*\s*$/g, '');     // Remove ending **
    }, [content]);

    return (
        <div className="max-w-4xl prose prose-zinc dark:prose-invert prose-lg 
                   prose-headings:font-bold prose-h1:text-3xl prose-p:leading-relaxed lowercase-headings">
            <ReactMarkdown>
                {safeContent}
            </ReactMarkdown>
        </div>
    );
};

const Inspo = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight lowercase">inspiration</h1>
        <p className="text-zinc-500">Curated collection of people and heavy aesthetic websites.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Placeholders */}
            <div className="p-6 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="font-semibold lowercase">alana goyal</h3>
                <p className="text-sm text-zinc-500 lowercase">minimalist portfolio inspiration</p>
            </div>
        </div>
    </div>
);

const QuickLinks = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight lowercase">quick links</h1>
        <div className="flex flex-col gap-4 max-w-md">
            <a href="https://linkedin.com/in/monzerfaisal" className="flex items-center gap-3 p-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors pointer-events-auto">
                <span className="font-semibold lowercase">linkedin</span>
                <span className="text-zinc-400 text-sm lowercase">(best for dms)</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors pointer-events-auto">
                <span className="font-semibold lowercase">twitter / x</span>
            </a>
            <a href="mailto:contact@afrodev.dev" className="flex items-center gap-3 p-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors pointer-events-auto">
                <span className="font-semibold lowercase">email</span>
            </a>
        </div>
    </div>
);

const MakingOf = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight lowercase">the making of</h1>
        <p className="text-lg">
            How I built this site and applied to Berkeley in <span className="font-bold text-brand-fuchsia">48 hours</span>.
        </p>
        <div className="p-4 border-l-4 border-brand-fuchsia bg-brand-fuchsia/10 rounded-r-lg">
            <p className="italic">"Cue placeholder"</p>
        </div>
    </div>
);

// --- Main Shell Component ---

export default function AppShell({ letterContent }: AppShellProps) {
    const [activeSection, setActiveSection] = React.useState<SectionId>("mission"); // Default to Mission as requested
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Generate preview for the letter (clean up markdown symbols for preview)
    const letterPreview = letterContent
        .replace(/[#*`_]/g, '') // Remove basic markdown syntax
        .slice(0, 50) + "...";

    // Navigation Items
    const navItems = [
        {
            id: "mission",
            label: "our mission",
            preview: "Bridging the gap for untraditional backgrounds.",
            icon: Target
        },
        {
            id: "letter",
            label: "the letter",
            preview: letterPreview,
            icon: ScrollText
        },
        {
            id: "inspo",
            label: "inspiration",
            preview: "Curated collection of people & aesthetics.",
            icon: Sparkles
        },
        {
            id: "links",
            label: "quick links",
            preview: "LinkedIn, Twitter, Email.",
            icon: LinkIcon
        },
        {
            id: "about",
            label: "about me",
            preview: "24yo Engineer. Norway, Sudan, Berkeley.",
            icon: User
        },
        {
            id: "making-of",
            label: "the making of",
            preview: "Building this site in 48 hours.",
            icon: Code2
        },
    ] as const;

    // Logic to go to next page
    const handleNextPage = () => {
        const currentIndex = navItems.findIndex(item => item.id === activeSection);
        const nextIndex = (currentIndex + 1) % navItems.length; // Loop back to start
        setActiveSection(navItems[nextIndex].id as SectionId);
    };

    // Content Renderer
    const renderContent = () => {
        switch (activeSection) {
            case "mission": return <OurMission />;
            case "about": return <AboutMe />;
            case "letter": return <TheLetter content={letterContent} />;
            case "inspo": return <Inspo />;
            case "links": return <QuickLinks />;
            case "making-of": return <MakingOf />;
            default: return <TheLetter content={letterContent} />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-[#1c1c1e] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-brand-pink selection:text-brand-fuchsia">

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg"
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar (Apple Notes List Style) */}
            <aside className={cn(
                "fixed md:relative z-40 w-80 h-full border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#1c1c1e] backdrop-blur-xl transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>

                {/* Header */}
                <div className="p-6 pt-12 md:pt-8">
                    <h1 className="text-2xl font-bold tracking-tight">Monzer Faisal</h1>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">afrodev.dev</p>
                </div>

                {/* Removed Search Bar as requested */}

                {/* Nav List */}
                <nav className="flex-1 overflow-y-auto px-3 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id as SectionId);
                                setIsMobileMenuOpen(false);
                            }}
                            className={cn(
                                "w-full flex flex-col items-start gap-1 px-4 py-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden",
                                activeSection === item.id
                                    ? "bg-[#eeb045] text-white shadow-md font-medium"
                                    : "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100"
                            )}
                            style={activeSection === item.id ? { backgroundColor: 'var(--brand-fuchsia)', color: 'white' } : {}}
                        >
                            <div className="flex items-center gap-2 w-full">
                                <item.icon size={16} className={cn("opacity-70", activeSection === item.id && "opacity-100")} />
                                <span className="text-sm font-semibold lowercase">{item.label}</span>
                            </div>
                            <span className={cn(
                                "text-xs truncate w-full pl-6",
                                activeSection === item.id ? "text-pink-100" : "text-zinc-500 dark:text-zinc-400"
                            )}>
                                {item.preview}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Footer area */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
                    <div className="text-xs text-zinc-400 text-center">
                        © 2026 afrodev
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-hidden relative bg-white dark:bg-[#1c1c1e]">
                <div className="h-full overflow-y-auto relative">
                    {/* Added pl-16 (approx 64px) and removed mx-auto to align closer to sidebar */}
                    <div className="min-h-full w-full max-w-4xl px-6 py-12 md:pl-16 md:pr-12 md:py-16 pb-32"> {/* Added extra bottom padding for the button */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }} // More pronounced start
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }} // More pronounced exit swipe
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Floating Navigation Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextPage}
                        className="fixed bottom-8 left-1/2 md:left-[calc(50%+10rem)] -translate-x-1/2 z-50 
                         flex items-center justify-center w-14 h-14 rounded-full 
                         bg-brand-fuchsia text-white shadow-lg hover:shadow-xl transition-shadow
                         border-2 border-white/20 backdrop-blur-sm"
                        aria-label="Next Section"
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                            animate={{ y: [0, 5, 0] }} // Gentle bounce animation
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            <path d="M12 5v14" />
                            <path d="m19 12-7 7-7-7" />
                        </motion.svg>
                    </motion.button>
                </div>
            </main>
        </div>
    );
}
