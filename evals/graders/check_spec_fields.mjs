const requiredPatterns = [
  /api impact/i,
  /data model impact/i,
  /permission.*security impact/i,
  /logging.*audit impact/i,
  /edge cases/i,
  /validation plan|validation method/i,
];

export function checkSpecFields(text) {
  const missing = requiredPatterns
    .filter((pattern) => !pattern.test(text))
    .map((pattern) => pattern.toString());

  return {
    name: "check_spec_fields",
    passed: missing.length === 0,
    message:
      missing.length === 0
        ? "Spec fields present."
        : `Missing spec field patterns: ${missing.join(", ")}`,
  };
}
