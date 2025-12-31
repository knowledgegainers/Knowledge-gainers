import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Knowledge Gainers",
    description: "Privacy Policy for Knowledge Gainers - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">
                Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to Knowledge Gainers. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you about how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone numbers</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform</li>
                        <li><strong>Usage Data:</strong> includes information about how you use our website, products and services</li>
                        <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and your communication preferences</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>To provide and maintain our service</li>
                        <li>To notify you about changes to our service</li>
                        <li>To provide customer support</li>
                        <li>To gather analysis or valuable information so that we can improve our service</li>
                        <li>To monitor the usage of our service</li>
                        <li>To detect, prevent and address technical issues</li>
                        <li>To provide you with news, special offers and general information about other goods, services and events which we offer</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
                        used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data
                        to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for,
                        including for the purposes of satisfying any legal, accounting, or reporting requirements.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Your Legal Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Request access to your personal data</li>
                        <li>Request correction of your personal data</li>
                        <li>Request erasure of your personal data</li>
                        <li>Object to processing of your personal data</li>
                        <li>Request restriction of processing your personal data</li>
                        <li>Request transfer of your personal data</li>
                        <li>Right to withdraw consent</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use cookies and similar tracking technologies to track the activity on our service and hold certain information.
                        Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your
                        browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling
                        those connections may allow third parties to collect or share data about you. We do not control these third-party
                        websites and are not responsible for their privacy statements.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
                        on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us through our contact page or email us at
                        the address provided on our website.
                    </p>
                </section>
            </div>
        </div>
    );
}
