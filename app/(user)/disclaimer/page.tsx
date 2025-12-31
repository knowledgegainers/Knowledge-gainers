import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer | Knowledge Gainers",
    description: "Important disclaimer information for Knowledge Gainers educational platform and services.",
};

export default function DisclaimerPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
            <p className="text-muted-foreground mb-8">
                Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. General Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The information provided by Knowledge Gainers ("we," "us," or "our") on our website and through our services
                        is for general informational and educational purposes only. All information on the site is provided in good faith,
                        however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy,
                        validity, reliability, availability, or completeness of any information on the site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Educational Content Disclaimer</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        The educational materials, study resources, exam papers, books, current affairs, notifications, and other content
                        provided on Knowledge Gainers are intended solely for educational and informational purposes. Please note:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>We are not affiliated with any government examination body, educational institution, or official organization unless explicitly stated</li>
                        <li>Our study materials are compiled from various sources and are meant to supplement your preparation</li>
                        <li>We do not guarantee that the information provided will lead to success in any examination or academic pursuit</li>
                        <li>Users should verify all information from official sources before relying on it for important decisions</li>
                        <li>Exam patterns, syllabi, and requirements may change; always refer to official notifications</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. No Professional Advice</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The information on Knowledge Gainers does not constitute professional advice. Before making any decision or taking
                        any action that might affect your education, career, or finances, you should consult with a qualified professional
                        advisor. We are not responsible for any decisions made based on information provided on our platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Accuracy of Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        While we strive to provide accurate and up-to-date information:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Information may become outdated or inaccurate over time</li>
                        <li>We do not warrant the completeness, reliability, or accuracy of the information</li>
                        <li>Errors or omissions may occur in the content</li>
                        <li>We reserve the right to modify or remove content without prior notice</li>
                        <li>Users are encouraged to verify information from multiple sources</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Exam Notifications and Dates</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Exam notifications, dates, application deadlines, and other time-sensitive information provided on our platform
                        are collected from various sources and are subject to change by the respective authorities. We strongly recommend
                        that you verify all such information from the official websites of the concerned examination bodies or organizations
                        before taking any action.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Third-Party Content and Links</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        Our website may contain links to third-party websites, resources, or references to third-party content:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>We do not endorse, warrant, or guarantee the accuracy of third-party content</li>
                        <li>We are not responsible for the content, privacy policies, or practices of third-party websites</li>
                        <li>Links to third-party sites are provided for convenience only</li>
                        <li>Access to third-party sites is at your own risk</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Copyright and Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We respect intellectual property rights and expect our users to do the same. If you believe that any content on
                        our platform infringes your copyright or intellectual property rights, please contact us immediately. We will
                        investigate and take appropriate action, which may include removing the content in question.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. No Guarantee of Results</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Knowledge Gainers does not guarantee any specific results, outcomes, or success in examinations, interviews, or
                        career advancement as a result of using our platform, materials, or services. Success depends on various factors
                        including individual effort, aptitude, preparation, and circumstances beyond our control.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Technical Issues and Availability</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        We strive to maintain the availability and functionality of our website, but:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>We do not guarantee uninterrupted or error-free access to our services</li>
                        <li>Technical issues, maintenance, or updates may temporarily affect availability</li>
                        <li>We are not liable for any loss or damage resulting from service interruptions</li>
                        <li>Content may be modified, suspended, or discontinued without prior notice</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">10. User-Generated Content</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If our platform allows user-generated content (such as comments, reviews, or forum posts), please note that such
                        content represents the views and opinions of the individual users and not those of Knowledge Gainers. We do not
                        endorse, support, verify, or guarantee the accuracy of user-generated content.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Under no circumstances shall Knowledge Gainers, its owners, employees, or affiliates be liable for any direct,
                        indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website,
                        including but not limited to damages for loss of profits, data, or other intangible losses, even if we have been
                        advised of the possibility of such damages.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">12. Changes to This Disclaimer</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting
                        to the website. Your continued use of the website following the posting of changes constitutes your acceptance
                        of such changes.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        This disclaimer is governed by and construed in accordance with the laws of India. Any disputes relating to this
                        disclaimer shall be subject to the exclusive jurisdiction of the courts of India.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions or concerns about this disclaimer, please contact us through our contact page or email
                        us at the address provided on our website.
                    </p>
                </section>

                <section className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>Important Note:</strong> By using Knowledge Gainers, you acknowledge that you have read, understood,
                        and agree to be bound by this disclaimer. If you do not agree with any part of this disclaimer, please do not
                        use our website or services.
                    </p>
                </section>
            </div>
        </div>
    );
}
