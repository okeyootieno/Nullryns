import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalModalProps {
  type: "terms" | "privacy" | null;
  onClose: () => void;
}

const lastUpdated = "June 2026";
const companyName = "Nullryns Ltd";
const companyAlias = "Nullryns (Øryns)";
const email = "nullryns@atomicmail.com";
const country = "Kenya";

const termsContent = (
  <div className="space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
    <p>
      These Terms of Service govern your use of the services offered by <strong className="text-foreground">{companyName}</strong> ("{companyAlias}", "we", "our", or "us"),
      a software development collective registered in {country}. By engaging our services or accessing our website, you agree to be bound by these terms.
    </p>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">1. Services</h3>
      <p>
        Nullryns provides custom software development services including, but not limited to, web application development,
        mobile application development, business systems, UI/UX design, technical consulting, and software mentorship programs.
        The specific scope, deliverables, timeline, and pricing for any engagement are defined in a separate Statement of Work
        (SOW) or Service Agreement signed by both parties.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">2. Client Responsibilities</h3>
      <p>You agree to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide accurate, complete, and timely information required for the delivery of services.</li>
        <li>Designate a point of contact authorised to make decisions on your behalf.</li>
        <li>Review and provide feedback on deliverables within the timeframes agreed in the SOW.</li>
        <li>Ensure that any content, assets, or third-party materials you supply do not infringe on any intellectual property rights.</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">3. Payment Terms</h3>
      <p>
        All fees are outlined in the applicable SOW or invoice. Unless otherwise agreed:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>A deposit of 50% of the total project cost is required before work commences.</li>
        <li>The remaining balance is due upon project completion and before final delivery of source code or live deployment.</li>
        <li>Invoices not settled within 14 days of the due date may accrue a late fee of 1.5% per month on the outstanding balance.</li>
        <li>Nullryns reserves the right to pause work on any project with an outstanding overdue invoice.</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">4. Intellectual Property</h3>
      <p>
        Upon receipt of full payment, the client is granted full ownership of the final custom-developed code and assets
        produced specifically for their project. Nullryns retains ownership of any pre-existing tools, frameworks, libraries,
        internal boilerplate, or proprietary methodologies used in the delivery. Open-source components are governed by their
        respective licenses. Nullryns reserves the right to reference the completed project in its portfolio unless the client
        explicitly requests otherwise in writing.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">5. Confidentiality</h3>
      <p>
        Both parties agree to treat all non-public business information shared during an engagement as confidential. Nullryns
        will not disclose your proprietary business logic, data structures, or trade secrets to any third party without your
        written consent, except as required by law. This obligation survives the termination of any agreement.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">6. Project Changes & Scope Creep</h3>
      <p>
        Any changes to the agreed scope of work must be submitted in writing and approved by both parties via a Change Request.
        Significant changes may affect the project timeline and cost. Nullryns will provide a revised estimate before proceeding
        with out-of-scope work.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">7. Warranties & Limitation of Liability</h3>
      <p>
        Nullryns warrants that services will be performed with professional care and skill. We provide a 30-day bug-fix warranty
        after final delivery, covering defects in the agreed deliverables. This warranty does not cover issues arising from
        client modifications, third-party integrations, or hosting environment configurations.
      </p>
      <p>
        To the fullest extent permitted by law, Nullryns's total liability for any claim arising from our services shall not
        exceed the total fees paid by the client for the specific engagement giving rise to the claim. We are not liable for
        any indirect, incidental, or consequential damages.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">8. Termination</h3>
      <p>
        Either party may terminate an engagement with 14 days' written notice. Upon termination, the client is liable for
        payment for all work completed up to the termination date. Nullryns will deliver all completed work and project assets
        upon receipt of final payment for work rendered.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">9. Governing Law</h3>
      <p>
        These terms are governed by the laws of the Republic of {country}. Any disputes shall first be addressed through good-faith
        negotiation. If unresolved, disputes shall be submitted to the jurisdiction of the courts of {country}.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">10. Contact</h3>
      <p>
        For questions about these terms, reach us at <a href={`mailto:${email}`} className="text-primary underline underline-offset-4">{email}</a>.
      </p>
    </section>
  </div>
);

const privacyContent = (
  <div className="space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
    <p>
      This Privacy Policy explains how <strong className="text-foreground">{companyName}</strong> ("{companyAlias}") collects, uses,
      and protects information you provide when you interact with our website or engage our services.
    </p>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">1. Information We Collect</h3>
      <p>We may collect the following:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong className="text-foreground">Contact information</strong> — name, email address, phone number, and company name submitted via our contact or project intake forms.</li>
        <li><strong className="text-foreground">Project information</strong> — details about your business needs and project requirements that you voluntarily share.</li>
        <li><strong className="text-foreground">Usage data</strong> — anonymised data on how visitors interact with our website (pages visited, time on site), collected via analytics tools.</li>
      </ul>
      <p>We do not collect payment card details directly; any billing is handled through trusted third-party payment processors.</p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">2. How We Use Your Information</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>To respond to enquiries and deliver the services you have requested.</li>
        <li>To send project updates, invoices, and communications related to an active engagement.</li>
        <li>To improve our website and service offerings based on aggregated usage patterns.</li>
        <li>To comply with legal obligations under {country}n law.</li>
      </ul>
      <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">3. Data Retention</h3>
      <p>
        We retain client and project data for a period of 5 years after the conclusion of an engagement, or as required by
        applicable law, whichever is longer. Enquiry data from non-clients is retained for up to 12 months.
        You may request deletion of your data at any time by contacting us.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">4. Data Security</h3>
      <p>
        We implement industry-standard security measures to protect your information, including encrypted communications (HTTPS),
        access controls, and secure storage practices. However, no method of internet transmission is 100% secure, and we cannot
        guarantee absolute security.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">5. Third-Party Services</h3>
      <p>
        Our website may use third-party tools such as analytics platforms or communication services. These providers have their
        own privacy policies and we encourage you to review them. We only work with providers who meet reasonable data protection standards.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">6. Your Rights</h3>
      <p>You have the right to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your data, subject to our legal obligations.</li>
        <li>Withdraw consent for any data processing based on consent at any time.</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href={`mailto:${email}`} className="text-primary underline underline-offset-4">{email}</a>.</p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">7. Changes to This Policy</h3>
      <p>
        We may update this policy periodically. Material changes will be communicated via our website. Continued use of our
        services after any update constitutes your acceptance of the revised policy.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-base font-semibold font-serif text-foreground">8. Contact</h3>
      <p>
        For privacy-related enquiries, contact us at <a href={`mailto:${email}`} className="text-primary underline underline-offset-4">{email}</a>.
      </p>
    </section>
  </div>
);

export function LegalModal({ type, onClose }: LegalModalProps) {
  const isTerms = type === "terms";
  const isPrivacy = type === "privacy";

  return (
    <Dialog open={!!type} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-card flex flex-col max-h-[85vh]">
        <DialogHeader className="flex-shrink-0 border-b border-border pb-4">
          <DialogTitle className="text-2xl font-serif font-bold text-foreground">
            {isTerms && "Terms of Service"}
            {isPrivacy && "Privacy Policy"}
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            {companyAlias} · Last updated {lastUpdated}
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-auto pr-4 mt-4">
          {isTerms && termsContent}
          {isPrivacy && privacyContent}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
