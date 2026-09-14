export function ProjectVisual({ slug }: { slug: string }) {
  return <div className={`project-visual visual-${slug}`} aria-hidden="true">
    <span className="visual-label">{slug === "local-llm-pipeline" ? "MODEL → MEANING" : slug === "pazarpilot" ? "COMMERCE, CONNECTED" : slug === "plusemlak" ? "PROPERTY → POSSIBILITY" : slug === "cvforge" ? "EXPERIENCE → OPPORTUNITY" : "ORDER IN THE INVENTORY"}</span>
    {slug === "local-llm-pipeline" ? <div className="pipeline-art"><div className="doc-stack"><i/><i/><i/><span>www.</span></div><span className="connector">······→</span><div className="model-block">Q<span>LOCAL INFERENCE</span></div><span className="connector">······→</span><div className="data-brackets">{`{ }`}<small>structured data</small></div></div>
    : slug === "pazarpilot" ? <div className="commerce-art"><span className="market market-one">t.</span><div className="commerce-hub">p<span>ORDER / STOCK / SYNC</span></div><span className="market market-two">hb</span><div className="commerce-line"/></div>
    : slug === "plusemlak" ? <div className="property-art"><div className="property-frame"><div className="building"><i/><i/><i/><i/><i/><i/></div><span>A place to call <em>home.</em></span><small>PHOTO + TEMPLATE + TYPOGRAPHY</small></div><div className="property-offset"/></div>
    : slug === "cvforge" ? <div className="resume-art"><div className="resume-sheet"><span>YOUR NEXT<br /><em>chapter.</em></span><i/><i/><i/><i/></div><div className="cloud-stamp">S3<small>STORED SECURELY</small></div></div>
    : <div className="stock-art"><div className="barcode">{Array.from({length:24},(_,i)=><i key={i} style={{width: i%3===0?5:2}}/>)}</div><span>Every price.<br /><em>Accounted for.</em></span><small>INPUT → RULES → RESOLUTION</small></div>}
    <span className="visual-caption">ARCHITECTURE STUDY / CONCEPTUAL ILLUSTRATION</span>
  </div>;
}
