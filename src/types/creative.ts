export interface ScriptRow {
  timecode: string;
  visualAction: string;
  audioVo: string;
  textOverlay: string;
}

export interface CreativeMatrixAngle {
  angleId: string;
  angleName: string;
  bigIdea: string;
  buyerFocus: string;
  hookHeadline: string;
  emotionalTriggers: string[];
  coreValueProp: string;
  directResponseCta: string;
  script: ScriptRow[];
}

export interface BatchHook {
  hookNumber: number;
  category: 'Problem-Based' | 'Social Proof / Educator' | 'Curiosity / Visual' | string;
  spokenHook: string;
  textOverlay: string;
  visualAction: string;
  estimatedHookRate: string;
  whyItWorks: string;
}

export interface ImagePrompt {
  promptName: string;
  conceptDescription: string;
  fullPrompt: string;
  recommendedAspectRatio: string;
  cameraAndLightingDetails: string;
  negativePrompt: string;
}

export interface DirectorSummary {
  targetAvatar: string;
  keyDifferentiation: string;
  scalingAdvice: string;
}

export interface CampaignData {
  creativeMatrix: CreativeMatrixAngle[];
  batchHooks: BatchHook[];
  imagePrompts: ImagePrompt[];
  directorSummary: DirectorSummary;
}

// Mode 2: Amazon A+ Content Interfaces
export interface HeroBannerModule {
  visualArtBrief: string;
  mainHeadlineOverlay: string; // Max 7 words
  subheadlineOverlay: string; // Max 15 words
}

export interface FeatureCard {
  cardNumber: number;
  title: string;
  copy: string; // 2-3 punchy sentences balancing Parent ROI + Kid Fun
  imageGraphicBrief: string;
}

export interface BrandStoryModule {
  sectionHeader: string;
  bodyParagraph: string;
}

export interface ComparisonRow {
  metric: string; // e.g. "Target Grade Level", "Core Learning Focus", "Sensory Component", "Play Style", "Best For"
  mainProductValue: string;
  item1Value: string;
  item2Value: string;
  item3Value: string;
}

export interface CatalogComparisonModule {
  catalogItems: string[]; // [Catalog Item 1, Catalog Item 2, Catalog Item 3]
  rows: ComparisonRow[];
  markdownTable?: string;
}

export interface ComplianceAuditItem {
  rule: string;
  status: 'PASSED' | 'WARNING' | 'FAILED';
  details: string;
}

export interface AmazonAplusData {
  heroBanner: HeroBannerModule;
  featureGrid: FeatureCard[];
  brandStory: BrandStoryModule;
  comparisonMatrix: CatalogComparisonModule;
  complianceAudit: ComplianceAuditItem[];
}

export interface ProductInput {
  mode: 'mode_1' | 'mode_2';
  productName: string;
  category: string;
  gradeAge: string;
  painPoint: string; // Core Pain Point / Angle (Mode 1) or Core Features / Value Prop (Mode 2)
  coreFeatures?: string;
  comparisonCatalogItems?: string; // Mode 2 only: e.g. "Word Pop!, Math Ahoy, Squishyland"
  extraAngle?: string;
  platform?: string;
  offerDiscount?: string;
}
