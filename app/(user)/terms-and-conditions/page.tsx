import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions | Knowledge Gainers",
    description: "Terms and Conditions for using Knowledge Gainers platform and services.",
};

export default function TermsAndConditionsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-muted-foreground mb-8">
                Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing and using Knowledge Gainers ("the Website"), you accept and agree to be bound by the terms and
                        provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        Permission is granted to temporarily download one copy of the materials (information or software) on Knowledge Gainers
                        for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                        under this license you may not:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
                        <li>Attempt to decompile or reverse engineer any software contained on Knowledge Gainers</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-3">
                        This license shall automatically terminate if you violate any of these restrictions and may be terminated by
                        Knowledge Gainers at any time.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                        Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        You are responsible for safeguarding the password that you use to access the Service and for any activities or actions
                        under your password. You agree not to disclose your password to any third party.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Content and Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        All content on Knowledge Gainers, including but not limited to text, graphics, logos, images, audio clips, digital
                        downloads, data compilations, and software, is the property of Knowledge Gainers or its content suppliers and is
                        protected by Indian and international copyright laws.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        The compilation of all content on this site is the exclusive property of Knowledge Gainers and is protected by
                        Indian and international copyright laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Educational Materials</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        The educational materials, study resources, exam papers, and other content provided on this platform are for
                        educational purposes only. We strive to ensure accuracy but:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>We do not guarantee the accuracy, completeness, or usefulness of any information</li>
                        <li>We are not responsible for any errors or omissions in the content</li>
                        <li>Users should verify information from official sources before relying on it</li>
                        <li>We do not guarantee specific results or outcomes from using our materials</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to use the Website:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>In any way that violates any applicable national or international law or regulation</li>
                        <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                        <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                        <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website</li>
                        <li>To use any robot, spider, or other automatic device to access the Website for any purpose without our express written permission</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Payment and Refunds</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        For paid courses and materials:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>All prices are listed in Indian Rupees (INR) unless otherwise stated</li>
                        <li>Payment must be made in full before accessing paid content</li>
                        <li>Refund policies will be clearly stated for each product or service</li>
                        <li>We reserve the right to refuse or cancel any order at our discretion</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The materials on Knowledge Gainers are provided on an 'as is' basis. Knowledge Gainers makes no warranties,
                        expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
                        implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                        intellectual property or other violation of rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In no event shall Knowledge Gainers or its suppliers be liable for any damages (including, without limitation,
                        damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use
                        the materials on Knowledge Gainers, even if Knowledge Gainers or a Knowledge Gainers authorized representative
                        has been notified orally or in writing of the possibility of such damage.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Links to Third-Party Websites</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our Service may contain links to third-party websites or services that are not owned or controlled by Knowledge Gainers.
                        We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party
                        websites or services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">11. Modifications to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Knowledge Gainers may revise these terms of service for its website at any time without notice. By using this website,
                        you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably
                        submit to the exclusive jurisdiction of the courts in that location.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about these Terms and Conditions, please contact us through our contact page or email us
                        at the address provided on our website.
                    </p>
                </section>
            </div>
        </div>
    );
}
