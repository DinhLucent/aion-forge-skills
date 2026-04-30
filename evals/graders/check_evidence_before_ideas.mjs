export function checkEvidenceBeforeIdeas(text) {
  const lower = text.toLowerCase();
  const evidenceIndex = lower.indexOf("evidence");
  const ideaIndex = lower.indexOf("candidate ideas");

  return {
    name: "check_evidence_before_ideas",
    passed: evidenceIndex >= 0 && ideaIndex >= 0 && evidenceIndex < ideaIndex,
    message: "Evidence must appear before candidate ideas.",
  };
}
