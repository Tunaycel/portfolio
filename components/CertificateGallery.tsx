import Image from "next/image";

const certificates = [
  {
    issuer: "Oracle University",
    title: "OCI 2025 Certified Foundations Associate",
    date: "7 January 2026",
    image: "/images/certificates/oracle.webp",
    pdf: "/certificates/oracle-oci-2025-foundations-associate.pdf",
    alt: "Oracle certificate awarded to Hüseyin Tunay Çelik for OCI 2025 Certified Foundations Associate",
    action: "View certificate",
  },
  {
    issuer: "LinkedIn Learning",
    title: "What Is Generative AI?",
    date: "25 July 2026",
    image: "/images/certificates/linkedin.webp",
    pdf: "/certificates/linkedin-learning-what-is-generative-ai.pdf",
    alt: "LinkedIn Learning course completion certificate for Hüseyin Tunay Çelik: What Is Generative AI?",
    action: "View course completion",
  },
] as const;

export function CertificateGallery() {
  return (
    <section className="certificate-gallery" aria-labelledby="certificate-gallery-title">
      <div className="certificate-gallery-heading">
        <div>
          <p className="eyebrow">Credentials / 2026</p>
          <h3 id="certificate-gallery-title">Credentials & learning.</h3>
        </div>
        <p>Open the original documents to see the details.</p>
      </div>
      <div className="certificate-grid">
        {certificates.map((certificate) => (
          <a
            className="certificate-card"
            href={certificate.pdf}
            target="_blank"
            rel="noopener noreferrer"
            key={certificate.pdf}
          >
            <span className="certificate-artwork">
              <Image
                src={certificate.image}
                alt={certificate.alt}
                width={1600}
                height={1237}
                sizes="(max-width: 720px) 100vw, 50vw"
              />
            </span>
            <span className="certificate-details">
              <span className="eyebrow">{certificate.issuer}</span>
              <strong>{certificate.title}</strong>
              <span className="certificate-bottom">
                <span>{certificate.date}</span>
                <span>
                  {certificate.action} <span aria-hidden="true">↗</span>
                </span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
