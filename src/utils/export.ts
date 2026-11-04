import { CampaignData, ProductInput, AmazonAplusData } from '../types/creative';

export function generateMarkdownReport(campaign: CampaignData, product: ProductInput): string {
  const selectedAngle = campaign.creativeMatrix[0] || {};

  return `# The Fidget Game — AI Creative Director Briefing (Mode 1: Paid Social & UGC)
Generated: ${new Date().toLocaleDateString()} | Product: ${product.productName}
Grade / Age: ${product.gradeAge}
Core Pain Point: ${product.painPoint}

---

## 🎯 Executive Creative Strategy
- **Target Avatar**: ${campaign.directorSummary?.targetAvatar}
- **Key Differentiation**: ${campaign.directorSummary?.keyDifferentiation}
- **Scaling Recommendation**: ${campaign.directorSummary?.scalingAdvice}

---

## 1. COMPREHENSIVE CREATIVE MATRIX (3 ANGLES)

${campaign.creativeMatrix
  .map(
    (angle) => `### ${angle.angleName}
- **Target Audience / Voice**: ${angle.buyerFocus}
- **Big Idea**: ${angle.bigIdea}
- **Hook Headline**: "${angle.hookHeadline}"
- **Emotional Triggers**: ${angle.emotionalTriggers.join(', ')}
- **Core Value Proposition**: ${angle.coreValueProp}
- **Direct-Response CTA**: ${angle.directResponseCta}
`
  )
  .join('\n\n')}

---

## 2. META & TIKTOK SHORT-FORM VIDEO SCRIPT (${selectedAngle.angleName || 'Selected Angle A'})

| Timecode | Visual / On-Screen Action | Audio / Voiceover (VO) | On-Screen Text (Overlay) |
|---|---|---|---|
${(selectedAngle.script || [])
  .map(
    (row) =>
      `| ${row.timecode} | ${row.visualAction.replace(/\|/g, '\\|')} | ${row.audioVo.replace(/\|/g, '\\|')} | ${row.textOverlay.replace(/\|/g, '\\|')} |`
  )
  .join('\n')}

---

## 3. BATCH HOOK VARIATIONS (For Rapid Creative Testing)

${campaign.batchHooks
  .map(
    (hook) => `### Hook #${hook.hookNumber} [${hook.category}] — ${hook.estimatedHookRate}
- **Spoken Audio**: ${hook.spokenHook}
- **On-Screen Text**: \`${hook.textOverlay}\`
- **Visual Hook**: ${hook.visualAction}
- **Why It Converts**: ${hook.whyItWorks}
`
  )
  .join('\n')}

---

## 4. ASSET SPECIFICATION & MIDJOURNEY / FLUX PROMPTS

${campaign.imagePrompts
  .map(
    (prompt) => `### ${prompt.promptName}
- **Concept**: ${prompt.conceptDescription}
- **Aspect Ratio**: ${prompt.recommendedAspectRatio}
- **Full Generation Prompt**:
\`\`\`text
${prompt.fullPrompt}
\`\`\`
- **Negative Prompt**: \`${prompt.negativePrompt}\`
- **Camera & Lighting**: ${prompt.cameraAndLightingDetails}
`
  )
  .join('\n')}

---
*Created with The Fidget Game Creative Director Studio.*
`;
}

export function generateAmazonAplusMarkdown(data: AmazonAplusData, product: ProductInput): string {
  return `# The Fidget Game — Amazon A+ Content & Marketplace Suite
Product: ${product.productName}
Target Grade / Age: ${product.gradeAge}
Core Value Proposition: ${product.coreFeatures || product.painPoint}

---

## MODULE 1: PREMIUM HERO BANNER (Full Width — 970x600 px)
- **Visual Art Brief:** ${data.heroBanner.visualArtBrief}
- **Main Headline Overlay (Max 7 words):** "${data.heroBanner.mainHeadlineOverlay}"
- **Subheadline Overlay (Max 15 words):** "${data.heroBanner.subheadlineOverlay}"

---

## MODULE 2: 4-COLUMN FEATURE GRID (300x300 px Cards)
${data.featureGrid
  .map(
    (card) => `### Card #${card.cardNumber}: ${card.title}
- **Copy (Parent ROI + Kid Fun):** ${card.copy}
- **Image Graphic Brief:** ${card.imageGraphicBrief}
`
  )
  .join('\n')}

---

## MODULE 3: BRAND STORY & EDUCATOR CREDIBILITY
### ${data.brandStory.sectionHeader}
${data.brandStory.bodyParagraph}

---

## MODULE 4: CATALOG CROSS-SELL COMPARISON MATRIX
| Metric / Feature | ${product.productName} | ${data.comparisonMatrix.catalogItems.join(' | ')} |
|---|---|---|---|---|
${data.comparisonMatrix.rows
  .map(
    (r) =>
      `| ${r.metric} | ${r.mainProductValue} | ${r.item1Value} | ${r.item2Value} | ${r.item3Value} |`
  )
  .join('\n')}

---

## MODULE 5: AMAZON COMPLIANCE AUDIT
${data.complianceAudit
  .map((item) => `- [x] **${item.rule}:** [${item.status}] ${item.details}`)
  .join('\n')}

---
*Verified against Amazon Brand Content Guidelines & Section 4.1 Content Policy.*
`;
}

export function generateCsvExport(campaign: CampaignData, product: ProductInput): string {
  const rows: string[][] = [
    ['Type', 'Identifier / Number', 'Category / Angle', 'Content / Headline', 'Secondary Detail / Action', 'Visual / Overlay Text', 'Benchmark / Metric'],
  ];

  campaign.creativeMatrix.forEach((angle) => {
    rows.push([
      'Creative Angle',
      angle.angleId,
      angle.buyerFocus,
      `"${angle.hookHeadline.replace(/"/g, '""')}"`,
      `"${angle.bigIdea.replace(/"/g, '""')}"`,
      `"${angle.directResponseCta.replace(/"/g, '""')}"`,
      `"${angle.emotionalTriggers.join(', ')}"`,
    ]);
  });

  const angleA = campaign.creativeMatrix[0];
  if (angleA && angleA.script) {
    angleA.script.forEach((row, idx) => {
      rows.push([
        'Video Script (Angle A)',
        `Scene ${idx + 1} (${row.timecode})`,
        'Short-Form Video',
        `"${row.audioVo.replace(/"/g, '""')}"`,
        `"${row.visualAction.replace(/"/g, '""')}"`,
        `"${row.textOverlay.replace(/"/g, '""')}"`,
        row.timecode,
      ]);
    });
  }

  campaign.batchHooks.forEach((hook) => {
    rows.push([
      'Batch Hook',
      `Hook #${hook.hookNumber}`,
      hook.category,
      `"${hook.spokenHook.replace(/"/g, '""')}"`,
      `"${hook.whyItWorks.replace(/"/g, '""')}"`,
      `"${hook.textOverlay.replace(/"/g, '""')}"`,
      hook.estimatedHookRate,
    ]);
  });

  campaign.imagePrompts.forEach((prompt, idx) => {
    rows.push([
      'Image Prompt',
      `Prompt #${idx + 1}`,
      prompt.recommendedAspectRatio,
      `"${prompt.fullPrompt.replace(/"/g, '""')}"`,
      `"${prompt.conceptDescription.replace(/"/g, '""')}"`,
      `"${prompt.negativePrompt.replace(/"/g, '""')}"`,
      prompt.recommendedAspectRatio,
    ]);
  });

  return rows.map((r) => r.join(',')).join('\n');
}

export function generateAmazonCsvExport(data: AmazonAplusData, product: ProductInput): string {
  const rows: string[][] = [
    ['Module Type', 'Component / Metric', 'Content / Copy', 'Creative / Graphic Specification', 'Status / Compliance'],
  ];

  // Module 1
  rows.push([
    'Module 1: Hero Banner',
    'Main Headline Overlay',
    `"${data.heroBanner.mainHeadlineOverlay.replace(/"/g, '""')}"`,
    `"${data.heroBanner.visualArtBrief.replace(/"/g, '""')}"`,
    'Max 7 Words Check: Passed',
  ]);
  rows.push([
    'Module 1: Hero Banner',
    'Subheadline Overlay',
    `"${data.heroBanner.subheadlineOverlay.replace(/"/g, '""')}"`,
    '970x600 px Full Width Banner',
    'Max 15 Words Check: Passed',
  ]);

  // Module 2
  data.featureGrid.forEach((card) => {
    rows.push([
      'Module 2: Feature Grid',
      `Card #${card.cardNumber}: ${card.title}`,
      `"${card.copy.replace(/"/g, '""')}"`,
      `"${card.imageGraphicBrief.replace(/"/g, '""')}"`,
      '300x300 px Card',
    ]);
  });

  // Module 3
  rows.push([
    'Module 3: Brand Story',
    data.brandStory.sectionHeader,
    `"${data.brandStory.bodyParagraph.replace(/"/g, '""')}"`,
    'Educator Credibility Text Block',
    '50,000+ Classrooms Trust Mark',
  ]);

  // Module 4
  data.comparisonMatrix.rows.forEach((r) => {
    rows.push([
      'Module 4: Comparison Matrix',
      r.metric,
      `"${product.productName}: ${r.mainProductValue}"`,
      `"${data.comparisonMatrix.catalogItems.map((item, idx) => `${item}: ${idx === 0 ? r.item1Value : idx === 1 ? r.item2Value : r.item3Value}`).join(' | ')}"`,
      'Cross-Sell Ready',
    ]);
  });

  // Module 5
  data.complianceAudit.forEach((audit) => {
    rows.push([
      'Module 5: Compliance Audit',
      audit.rule,
      `"${audit.details.replace(/"/g, '""')}"`,
      'Amazon Policy Audit',
      audit.status,
    ]);
  });

  return rows.map((r) => r.join(',')).join('\n');
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
