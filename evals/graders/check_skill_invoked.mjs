export function checkSkillInvoked(text, expectedSkill = "aion-forge") {
  const haystack = text.toLowerCase();
  return {
    name: "check_skill_invoked",
    passed:
      haystack.includes(`$${expectedSkill}`) ||
      haystack.includes(expectedSkill) ||
      haystack.includes("aion-forge"),
    message: `Expected output or trace to mention ${expectedSkill}.`,
  };
}
