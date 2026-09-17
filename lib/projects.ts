export type Project = {
  slug: string;
  name: string;
  category: "AI integration" | "Full-stack" | "Cloud & backend";
  subtitle: string;
  summary: string;
  role: string;
  status: string;
  stack: string[];
  problem: string;
  decisions: { title: string; body: string }[];
  outcome: string;
  source?: string;
  sourceLabel?: string;
  diagram: string[];
};
export const projects: Project[] = [
  {
    slug: "local-llm-pipeline",
    name: "Local intelligence",
    category: "AI integration",
    subtitle: "Turning public websites into structured company data.",
    summary:
      "A local-model enrichment pipeline: crawl, extract with Qwen, and sync useful company metadata into PostgreSQL.",
    role: "Pipeline engineering · Nest2Move",
    status: "Internship work",
    stack: ["Python", "Ollama", "Qwen", "PostgreSQL", "Prisma"],
    problem:
      "Company websites contain useful industry and market-positioning information, but that information arrives as unstructured pages. The procurement product needed structured metadata that could live alongside its existing company records.",
    decisions: [
      {
        title: "Run the model locally",
        body: "I stood up Ollama and Qwen on a GPU environment. A local inference setup let the extraction pipeline run against a controlled model environment and connect to the rest of the data workflow.",
      },
      {
        title: "Separate collection from extraction",
        body: "The scraper collected public company pages, while the model handled extraction of industry and market-positioning metadata. Keeping the stages separate made the pipeline easier to inspect and maintain.",
      },
      {
        title: "Finish at the database",
        body: "The output was synced into PostgreSQL using Prisma, making the extracted metadata useful inside the product rather than leaving it in a separate experiment.",
      },
    ],
    outcome:
      "Built the pipeline across approximately 110 public company websites during my Nest2Move internship. This describes the implemented scope; no extraction-accuracy or performance benchmark is claimed.",
    diagram: ["Public websites", "Secure scraper", "Ollama + Qwen", "PostgreSQL"],
  },
  {
    slug: "pazarpilot",
    name: "PazarPilot",
    category: "Full-stack",
    subtitle: "One workspace. Multiple marketplaces.",
    summary:
      "A unified operations panel for listings, orders, warehouse locations and integration health across Turkish marketplaces.",
    role: "Solo product development · Nest2Move",
    status: "In development · simulated integrations",
    stack: ["Next.js 16", "TypeScript", "Prisma", "Tailwind CSS", "SQLite"],
    problem:
      "Selling across Trendyol and Hepsiburada means coordinating listings, stock, orders and shipping across separate systems. PazarPilot brings those operations into a shared workspace.",
    decisions: [
      {
        title: "Make a marketplace an adapter",
        body: "Each channel sits behind a five-method interface for fetching orders, pushing stock and prices, fetching listings, and testing the connection. Adding a channel becomes an adapter implementation instead of a rewrite of the product.",
      },
      {
        title: "Connect the operational details",
        body: "The panel combines listing management, merged orders, shelf-level warehouse management, shipping and integration-health monitoring. Those workflows share a consistent product interface.",
      },
      {
        title: "Surface exceptions",
        body: "A rule engine raises alerts for critical stock, cross-channel price mismatches and sync failures. The intent is to help the operator find issues that need attention.",
      },
    ],
    outcome:
      "Building the product solo since July 2026 following the initial internship. The application runs in a realistic simulation mode; live seller API integration remains a separate step.",
    diagram: [
      "Trendyol / Hepsiburada",
      "Marketplace adapters",
      "Orders + stock + rules",
      "Operations panel",
    ],
  },
  {
    slug: "plusemlak",
    name: "PlusEmlak",
    category: "Full-stack",
    subtitle: "From property listing to a brand-ready visual.",
    summary:
      "Frontend ownership of a real-estate CRM and AI marketing studio, from a typed API client to an editable visual-composition workflow.",
    role: "Frontend owner · 3-person team",
    status: "Pilot-ready frontend",
    stack: ["Next.js 16", "React 19", "Tailwind CSS", "Recharts", "Playwright"],
    problem:
      "Real-estate teams need to manage properties and client requests, then turn listing photography into branded social content. The interface had to bring those workflows together while keeping automated output editable.",
    decisions: [
      {
        title: "One typed API client",
        body: "I centralized authentication headers, error handling and response types in a fetch wrapper. When the login contract needed a form-encoded OAuth2 request, the change stayed in one place instead of spreading across screens.",
      },
      {
        title: "Give automation a human correction path",
        body: "The template studio shows detected photo slots, lets users correct them and draw text zones, then requests a composite. The uploaded photo becomes a listing record first; the composition endpoint receives its image ID.",
      },
      {
        title: "Keep the workflow resilient",
        body: "A browser canvas compositor provides a simpler fallback if the server composition fails. Playwright verifies the template flow against the actual backend. The backend and infrastructure belong to my teammates.",
      },
    ],
    outcome:
      "The frontend reached a pilot-ready state, with the template-studio workflow verified end to end. The public write-up documents my frontend ownership and the broader architecture as context.",
    source: "https://github.com/Tunaycel/emlakplus-ai-case-study",
    sourceLabel: "Read original case study",
    diagram: ["Listing photo", "Detect + edit zones", "Composite", "Social publishing"],
  },
  {
    slug: "cvforge",
    name: "CVForge",
    category: "Cloud & backend",
    subtitle: "A résumé workflow, built for the cloud.",
    summary:
      "PDF generation, AI tailoring and AWS storage brought together in a Flask application with pre-signed document access.",
    role: "Solo developer",
    status: "AWS lab deployment · now offline",
    stack: ["Python", "Flask", "AWS S3", "DynamoDB", "boto3"],
    problem:
      "A CV builder needs to turn structured experience into a downloadable document, preserve the underlying data and support tailoring to a role. CVForge connects that workflow to managed cloud services.",
    decisions: [
      {
        title: "Generate documents in memory",
        body: "The Flask application creates PDF résumés in memory and sends them to S3 through boto3, connecting document generation directly to object storage.",
      },
      {
        title: "Use pre-signed access",
        body: "Documents are accessed through pre-signed S3 URLs. DynamoDB holds the résumé data while S3 stores the generated files.",
      },
      {
        title: "Deploy the whole path",
        body: "I deployed the Flask application to Elastic Beanstalk as a lab environment and integrated AI-assisted tailoring. The cloud environment has since been torn down; the repository remains available.",
      },
    ],
    outcome:
      "Implemented the résumé-to-PDF workflow with AWS persistence and a lab deployment. This is a completed cloud engineering exercise, not a currently running public service.",
    sourceLabel: "Explore repository",
    diagram: ["Résumé input", "Flask + AI", "S3 / DynamoDB", "Pre-signed PDF"],
  },
  {
    slug: "data-stock",
    name: "data-stock",
    category: "Cloud & backend",
    subtitle: "Pricing that stays explainable.",
    summary:
      "A deterministic campaign engine for a scan-based inventory system: time windows, explicit priorities and an auditable price history.",
    role: "Backend contributor · 5-person team",
    status: "Implemented & tested",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic", "pytest"],
    problem:
      "An inventory system replacing Excel needed percentage and fixed-amount discounts without ambiguous overlapping campaigns or negative prices. Price history also had to remain explainable after a campaign ended.",
    decisions: [
      {
        title: "Keep price resolution deterministic",
        body: "A pure resolver takes the variant and time, finds matching active campaigns and selects the highest-priority winner with a deterministic tie-break. Discounts do not stack implicitly, and the final price is clamped at zero.",
      },
      {
        title: "Preserve history",
        body: "Campaigns are soft-deleted so historical pricing remains auditable. Campaign writes are restricted to administrators while regular users can read the shared price result.",
      },
      {
        title: "Test boundaries and prepare for growth",
        body: "The feature shipped with 13 pytest cases covering authorization, discount arithmetic, date edges, priority conflicts and missing base prices. I also introduced a warehouse model and warehouse-scoped locations.",
      },
    ],
    outcome:
      "Delivered the campaign engine and multi-warehouse foundation. The web admin, mobile app and remaining API are my teammates’ work; this case study focuses on my backend contribution.",
    source: "https://github.com/Tunaycel/data-stock-case-study",
    sourceLabel: "Read original case study",
    diagram: ["Base price", "Active campaigns", "Priority resolver", "Auditable price"],
  },
];
