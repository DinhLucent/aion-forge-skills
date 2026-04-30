export function checkRejectedIdeasPresent(text) {
  return {
    name: "check_rejected_ideas_present",
    passed: /rejected ideas|reject generic ai chatbot|decision:\s*reject/i.test(text),
    message: "Output should include rejected ideas or explicit rejection rationale.",
  };
}
