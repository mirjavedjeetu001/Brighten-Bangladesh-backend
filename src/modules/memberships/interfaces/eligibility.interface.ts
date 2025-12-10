export interface EligibilityRules {
  blogs: boolean;
  events: boolean;
  projects: boolean;
}

export interface EligibilityCounts {
  approvedBlogsLast30Days: number;
  eventParticipationsLast90Days: number;
  projectParticipationsLast180Days: number;
}

export interface EligibilityResult {
  eligible: boolean;
  rules: EligibilityRules;
  counts: EligibilityCounts;
  message: string;
}
