import {
    GraduationCap,
    Target,
    Eye,
    Heart,
    Users,
    BookOpen,
    Award,
    Lightbulb
} from "lucide-react";

const stats = [
    { value: "10K+", label: "Books Available", icon: BookOpen },
    { value: "50K+", label: "Active Students", icon: Users },
    { value: "5K+", label: "Exam Papers", icon: Award },
    { value: "99%", label: "Satisfaction Rate", icon: Heart },
];

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description: "To democratize education by providing free and accessible study materials to every student, regardless of their background or financial status.",
    },
    {
        icon: Eye,
        title: "Our Vision",
        description: "To become the most trusted educational platform in India, empowering millions of students to achieve their academic and career goals.",
    },
    {
        icon: Heart,
        title: "Our Values",
        description: "We believe in quality education for all, continuous improvement, community support, and maintaining the highest standards of integrity.",
    },
];

const team = [
    {
        name: "Dr. Rajesh Kumar",
        role: "Founder & CEO",
        bio: "Former IAS officer with 20+ years in education sector",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Priya Sharma",
        role: "Chief Academic Officer",
        bio: "PhD in Education, 15 years teaching experience",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Amit Patel",
        role: "Head of Content",
        bio: "Former UPSC trainer, authored 10+ competitive exam books",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Sneha Reddy",
        role: "Community Manager",
        bio: "Building student communities across India",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
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
                            About Knowledge Gainers
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Empowering Students to{" "}
                            <span className="gradient-text">Achieve Excellence</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            We started with a simple belief: quality education should be accessible to everyone.
                            Today, we're helping thousands of students prepare for their future.
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
                                From a Small Idea to a{" "}
                                <span className="gradient-text">Big Impact</span>
                            </h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Knowledge Gainers was founded in 2020 with a mission to bridge the gap between
                                    quality education and accessibility. We noticed that many talented students
                                    from rural and semi-urban areas lacked access to quality study materials and
                                    guidance for competitive exams.
                                </p>
                                <p>
                                    What started as a small initiative to share PDF books and notes has now grown
                                    into a comprehensive educational platform serving over 50,000 students across India.
                                    Our team of educators, content creators, and technologists work tirelessly to
                                    bring you the best resources for your preparation.
                                </p>
                                <p>
                                    We believe that every student deserves a chance to succeed, regardless of their
                                    economic background. That's why we keep most of our resources free and accessible
                                    to all.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop"
                                    alt="Students studying together"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-lg border border-border bg-white">
                                <div className="text-3xl font-bold gradient-text">5+ Years</div>
                                <div className="text-sm text-muted-foreground">of Excellence</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-20 lg:py-28 bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            What Drives <span className="gradient-text">Us</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Our core principles guide everything we do at Knowledge Gainers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-background rounded-2xl p-8 border border-border hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="inline-flex p-4 rounded-xl gradient-hero mb-6">
                                    <value.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
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
                            Meet the <span className="gradient-text">People</span> Behind
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            A dedicated team of educators and technologists working to make quality education accessible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="group bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 group-hover:border-primary transition-colors" />
                                </div>
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-primary font-medium mb-2">
                                    {member.role}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
