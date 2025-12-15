import {
    GraduationCap,
    Target,
    Eye,
    Heart,
    Users,
    BookOpen,
    Award,
    Lightbulb,
    Shield,
    Clock,
    Zap,
    Linkedin,
    Globe
} from "lucide-react";

// Updated based on user text: "over 1,000 members"
const stats = [
    { value: "10K+", label: "Books Available", icon: BookOpen },
    { value: "1K+", label: "Community Members", icon: Users },
    { value: "5K+", label: "Exam Papers", icon: Award },
    { value: "99%", label: "Satisfaction Rate", icon: Heart },
];

const values = [
    {
        icon: Users,
        title: "Community First",
        description: "We are not just a group; we are a family. We believe in the power of cooperation and mutual support to help everyone rise together.",
    },
    {
        icon: Shield, // Accessibility often implies shielding/helping the needy
        title: "Accessibility",
        description: "We are dedicated to serving the needy. We believe that lack of resources should never be a barrier to education or career success.",
    },
    {
        icon: Clock,
        title: "Consistency",
        description: "From day one, our consistency in providing updates has been our strength. We are committed to working continuously to provide up-to-date and accurate information.",
    },
    {
        icon: Zap,
        title: "Empowerment",
        description: "We don't just share news; we share knowledge. Our goal is to empower individuals with the skills and insights they need to develop personally and professionally.",
    },
];

const teamMembers = [
    {
        name: "Dhanunjayarao",
        title: "Electrical and Electronics Engineering",
        education: "Velegapudi Ramakrishna Siddhartha Engineering College",
        image: "/Dhanunjayarao.png",
        links: [
            { icon: Linkedin, url: "https://www.linkedin.com/in/kuna-dhanunjayarao/" }
        ]
    },
    {
        name: "UdayKiran",
        title: "Electrical and Electronics Engineering",
        education: "GMR Institute of Technology",
        image: "/udaykiran.png",
        links: [
            { icon: Globe, url: "https://udaykiran-peddinti.vercel.app/" }
        ]
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-8">
                            <GraduationCap className="h-4 w-4" />
                            About Knowledge Gainers Teams
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Empowering Aspirants{" "}
                            <span className="gradient-text">Since 2020</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A journey of dedication, shared passion, and a thriving community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-card border-y border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                                <Lightbulb className="h-4 w-4" />
                                Our Story
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                From a Humble Start to a{" "}
                                <span className="gradient-text">Thriving Community</span>
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Our journey began on August 19, 2020. What started as a humble initiative with fewer than 10 members has, through dedication and shared passion, blossomed into a thriving community.
                                </p>
                                <p>
                                    Initially, our goal was simple: to share exam updates, current affairs, and general knowledge with a small circle of friends. However, the demand for quality information fueled our rapid expansion. Today, we are proud to stand as a strong family of over 1,000 members spanning across Andhra Pradesh and Telangana.
                                </p>
                                <p>
                                    Over the years, our continuous efforts have yielded tangible results. We have watched with pride as many of our members utilized our daily resources to secure government and private sector jobs, while countless others have significantly expanded their technical and general knowledge.
                                </p>
                                <p>
                                    We launched this website to take that mission further—to organize our resources and extend our helping hand to even more students in need.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop"
                                    alt="Community learning together"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border bg-white">
                                <div className="text-3xl font-bold gradient-text">3+ Years</div>
                                <div className="text-sm text-muted-foreground">of Impact</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Mission */}
                        <div className="bg-white dark:bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-all">
                            <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-500 mb-6">
                                <Target className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To democratize access to educational resources for every student and job aspirant. We aim to simplify the preparation journey by providing a centralized platform for job books, preparation patterns, and direct exam links, ensuring that no student has to struggle with random searches to find the right path to success.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white dark:bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-all">
                            <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-500 mb-6">
                                <Eye className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To build a knowledgeable and successful society where every aspiring student in Andhra Pradesh, Telangana, and beyond has the support, mentorship, and materials they need to achieve their career goals. We envision a future where Knowledge Gainers Teams is the stepping stone for every student's dream job.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Users className="h-4 w-4" />
                            Our Team
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Meet the <span className="gradient-text">Minds</span> Behind
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Dedicated individuals working to empower the community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group relative bg-card rounded-3xl p-6 border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-secondary/50">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <div className="flex gap-4">
                                            {member.links.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                                                >
                                                    <link.icon className="h-5 w-5" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-primary font-medium mb-2">{member.title}</p>
                                    {member.education && (
                                        <p className="text-sm text-muted-foreground">{member.education}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Heart className="h-4 w-4" />
                            Our Values
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            What Drives <span className="gradient-text">Us</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            The core principles that guide our family.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="inline-flex p-3 rounded-xl bg-secondary mb-4">
                                    <value.icon className="h-6 w-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <div className="inline-block p-8 bg-card rounded-3xl border border-border max-w-2xl mx-auto">
                            <p className="text-lg italic text-muted-foreground">
                                "We believe in quality education for all, continuous improvement, community support, and maintaining the highest standards of integrity."
                            </p>
                            <div className="mt-6 font-semibold text-primary">
                                With regards,
                                <br />
                                Knowledge Gainers Team
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
