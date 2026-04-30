const fakeSourcePatterns = [
  /\b\d+(\.\d+)?%\b/,
  /\bstudy shows\b/i,
  /\bresearch proves\b/i,
  /\bevery hospital\b/i,
  /\balways\b/i,
];

export function checkNoFakeSources(text) {
  const hasEvidenceSection = /evidence map|source|ev-\d+/i.test(text);
  const suspicious = fakeSourcePatterns.filter((pattern) => pattern.test(text));

  return {
    name: "check_no_fake_sources",
    passed: hasEvidenceSection && suspicious.length === 0,
    message:
      suspicious.length > 0
        ? `Suspicious unsupported claims: ${suspicious.map(String).join(", ")}`
        : "Evidence section should be present and unsupported claims should be absent.",
  };
}
