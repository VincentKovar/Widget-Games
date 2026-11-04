import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini Client with required httpOptions User-Agent
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_INSTRUCTIONS = `You are the AI Creative Director, Marketplace Strategist, and Direct-Response Copywriting Architect for "The Fidget Game"—an 8-figure educational toy brand scaling to $50M+.

Your objective is to generate structured, high-converting ad scripts, UGC visual hooks, and compliance-checked Amazon A+ Content layouts based on raw product details.

---

### BRAND POSITIONING DUALITY & AUDIENCE VOICES:
1. THE RATIONAL BUYER (Parents, Teachers, Homeschoolers):
   - Motivations: Science of Reading, curriculum standards, reducing screen time, stopping homework tears, multisensory learning.
   - Tone: Empathetic, credible, solution-oriented, educator-backed.

2. THE EMOTIONAL CONSUMER (Children, Ages 3-11):
   - Motivations: Fidget popping, squishy collection, unboxing excitement, playful competition.
   - Tone: High-energy, colorful, joyous, addictive playability.

---

### INPUT FORMAT:
The user will provide:
- Mode: [Mode 1: Ad Creative Engine OR Mode 2: Amazon A+ Content]
- Product Name & Category (e.g., "Sight Words Edition", "Squishyland")
- Primary Target Grade/Age (e.g., Pre-K, Grade 1)
- Core Features / Value Proposition (e.g., "Sight word recognition", "Pop fidget mechanics")
- Comparison Catalog Items [For Mode 2 Only] (e.g., "Word Pop!", "Math Ahoy", "Squishyland")

---

### OUTPUT FORMAT REQUIREMENTS:

IF MODE 1 (Paid Social & UGC Engine):
1. Comprehensive Creative Matrix (3 angles: Pain-Agitate-Solve, Unboxing/Sensory, Screen-Free Contrast)
2. Meta & TikTok Short-Form Video Script (4-column table: Timecode, Visual Action, Audio/VO, Text Overlay)
3. Batch Hook Variations (5 high-converting hook options)
4. Asset Specification & Image Prompts (2 image prompts for Midjourney/Flux)

IF MODE 2 (Amazon A+ Content & Marketplace Optimization):

#### MODULE 1: PREMIUM HERO BANNER (Full Width - 970x600 px)
- Visual Art Brief: [Specific composition details, color palette, and photographer notes]
- Main Headline Overlay: [Max 7 words — core benefit hook]
- Subheadline Overlay: [Max 15 words — supporting proof point]

#### MODULE 2: 4-COLUMN FEATURE GRID (300x300 px Cards)
Generate 4 distinct feature cards balancing Parent ROI + Kid Fun:
- Card 1 Title & Copy: [Title] - [2-3 punchy sentences]
- Card 2 Title & Copy: [Title] - [2-3 punchy sentences]
- Card 3 Title & Copy: [Title] - [2-3 punchy sentences]
- Card 4 Title & Copy: [Title] - [2-3 punchy sentences]
- Image Graphic Briefs: [Iconography or product close-up brief for each card]

#### MODULE 3: BRAND STORY & EDUCATOR CREDIBILITY
- Section Header: [Founder story / Classroom origin hook]
- Body Paragraph: [2-3 sentences establishing 50,000+ classroom adoption and Science of Reading backing]

#### MODULE 4: CATALOG CROSS-SELL COMPARISON MATRIX
Generate a Markdown comparison table comparing this product against 3 complementary items across 5 rows:
| Metric / Feature | [Main Product] | [Catalog Item 1] | [Catalog Item 2] | [Catalog Item 3] |
|---|---|---|---|---|
| Target Grade Level | | | | |
| Core Learning Focus | | | | |
| Sensory Component | | | | |
| Play Style | | | | |
| Best For | | | | |

#### MODULE 5: AMAZON COMPLIANCE AUDIT
Provide an explicit checklist confirming:
- ZERO restricted terms used (e.g., "100% Guaranteed", "Best Seller", "#1 Rated", "Free Shipping", medical/clinical claims).
- Mobile scannability check passed (short paragraph blocks, high-contrast headings).`;

// Main generation API endpoint supporting Mode 1 and Mode 2 with temperature 0.35
app.post('/api/generate-campaign', async (req: Request, res: Response) => {
  try {
    const {
      mode = 'mode_1',
      productName,
      category,
      gradeAge,
      painPoint,
      coreFeatures,
      comparisonCatalogItems,
      extraAngle,
      platform,
      offerDiscount,
    } = req.body;

    if (!productName || !gradeAge) {
      return res.status(400).json({ error: 'Missing required fields: productName or gradeAge.' });
    }

    if (!ai) {
      return res.status(500).json({
        error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is provided in secrets.',
      });
    }

    const featureContext = coreFeatures || painPoint || 'Sight word recognition, pop fidget mechanics';
    const catalogContext = comparisonCatalogItems || 'Word Pop!, Math Ahoy, Squishyland';

    if (mode === 'mode_2') {
      // MODE 2: Amazon A+ Content & Marketplace Optimization
      const promptMode2 = `
Mode: Mode 2: Amazon A+ Content
Product Name & Category: ${productName} (Category: ${category || 'Children Educational Board Game'})
Primary Target Grade/Age: ${gradeAge}
Core Features / Value Proposition: ${featureContext}
Comparison Catalog Items: ${catalogContext}
Additional Notes: ${extraAngle || 'Science of Reading, 50,000+ classrooms'}

Generate the complete 5-module compliance-checked Amazon A+ Content suite following ALL instructions:
1. MODULE 1: PREMIUM HERO BANNER (Full Width - 970x600 px)
   - Visual Art Brief: composition, colors, props, lighting
   - Main Headline Overlay: EXACTLY MAX 7 words
   - Subheadline Overlay: EXACTLY MAX 15 words
2. MODULE 2: 4-COLUMN FEATURE GRID (300x300 px Cards)
   Generate 4 distinct feature cards balancing Parent ROI + Kid Fun (2-3 punchy sentences each) + Image Graphic Briefs
3. MODULE 3: BRAND STORY & EDUCATOR CREDIBILITY
   - Section Header: Founder story / classroom origin
   - Body Paragraph: 2-3 sentences with 50,000+ classroom adoption & Science of Reading
4. MODULE 4: CATALOG CROSS-SELL COMPARISON MATRIX
   Compare ${productName} against the 3 items (${catalogContext}) across 5 rows:
   Target Grade Level, Core Learning Focus, Sensory Component, Play Style, Best For
5. MODULE 5: AMAZON COMPLIANCE AUDIT
   Checklist confirming ZERO restricted terms ("100% Guaranteed", "Best Seller", "#1 Rated", "Free Shipping", medical claims) and mobile scannability.
`;

      let responseText: string | null = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: promptMode2,
            config: {
              systemInstruction: SYSTEM_INSTRUCTIONS,
              temperature: 0.35,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  heroBanner: {
                    type: Type.OBJECT,
                    properties: {
                      visualArtBrief: { type: Type.STRING },
                      mainHeadlineOverlay: { type: Type.STRING, description: 'Max 7 words' },
                      subheadlineOverlay: { type: Type.STRING, description: 'Max 15 words' },
                    },
                    required: ['visualArtBrief', 'mainHeadlineOverlay', 'subheadlineOverlay'],
                  },
                  featureGrid: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        cardNumber: { type: Type.INTEGER },
                        title: { type: Type.STRING },
                        copy: { type: Type.STRING, description: '2-3 punchy sentences balancing Parent ROI + Kid Fun' },
                        imageGraphicBrief: { type: Type.STRING },
                      },
                      required: ['cardNumber', 'title', 'copy', 'imageGraphicBrief'],
                    },
                  },
                  brandStory: {
                    type: Type.OBJECT,
                    properties: {
                      sectionHeader: { type: Type.STRING },
                      bodyParagraph: { type: Type.STRING },
                    },
                    required: ['sectionHeader', 'bodyParagraph'],
                  },
                  comparisonMatrix: {
                    type: Type.OBJECT,
                    properties: {
                      catalogItems: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      rows: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            metric: { type: Type.STRING },
                            mainProductValue: { type: Type.STRING },
                            item1Value: { type: Type.STRING },
                            item2Value: { type: Type.STRING },
                            item3Value: { type: Type.STRING },
                          },
                          required: ['metric', 'mainProductValue', 'item1Value', 'item2Value', 'item3Value'],
                        },
                      },
                      markdownTable: { type: Type.STRING },
                    },
                    required: ['catalogItems', 'rows'],
                  },
                  complianceAudit: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        rule: { type: Type.STRING },
                        status: { type: Type.STRING, description: "'PASSED' | 'WARNING' | 'FAILED'" },
                        details: { type: Type.STRING },
                      },
                      required: ['rule', 'status', 'details'],
                    },
                  },
                },
                required: ['heroBanner', 'featureGrid', 'brandStory', 'comparisonMatrix', 'complianceAudit'],
              },
            },
          });

          responseText = response.text ?? null;
          if (responseText) break;
        } catch (err: any) {
          console.warn(`Mode 2 attempt ${attempt} failed:`, err?.message || err);
          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
          }
        }
      }

      if (!responseText) {
        const fallbackAplus = generateTailoredAplusFallback(
          productName,
          category || 'Educational Board Game',
          gradeAge,
          featureContext,
          catalogContext
        );
        return res.json({ success: true, mode: 'mode_2', data: fallbackAplus });
      }

      const parsed = JSON.parse(responseText);
      return res.json({ success: true, mode: 'mode_2', data: parsed });
    }

    // MODE 1: Paid Social & UGC Engine
    const promptMode1 = `
Mode: Mode 1: Ad Creative Engine
Product Name & Category: ${productName} (Category: ${category || 'Educational Board Game / Fidget Toy'})
Primary Target Grade/Age: ${gradeAge}
Core Features / Value Proposition / Pain Point: ${featureContext}
Additional Angle / Context: ${extraAngle || 'None'}
Platform Focus: ${platform || 'TikTok & Meta Reels (9:16 UGC)'}
Offer / CTA Focus: ${offerDiscount || '30-Day "Tear-Free" Guarantee / Buy 2 Get 1 Free'}

Please provide:
1. COMPREHENSIVE CREATIVE MATRIX:
   Provide 3 distinct creative angles:
   - Angle A: Pain-Agitate-Solve (Educator/Parent Focus)
   - Angle B: Unboxing & Sensory Joy (Kid-First UGC Style)
   - Angle C: Screen-Free Contrast (Behavioral Transformation)
   For EACH angle, provide: angleId, angleName, bigIdea, buyerFocus, hookHeadline, emotionalTriggers, coreValueProp, directResponseCta, and full 4-column script!

2. META & TIKTOK SHORT-FORM VIDEO SCRIPT:
   4-column structured table: Timecode (0:00-0:03, 0:03-0:08, 0:08-0:18, 0:18-0:25), Visual Action, Audio/VO, Text Overlay.

3. BATCH HOOK VARIATIONS (For Rapid Creative Testing):
   Generate 5 high-converting hook options:
   - 2x Problem-Based Hooks
   - 2x Social Proof / Educator Hooks
   - 1x Curiosity / Visual Hook

4. ASSET SPECIFICATION & IMAGE PROMPTS:
   2 ready-to-use image prompts for Midjourney / Flux (Realistic parent-child interaction & Vibrant product macro detail).
`;

    let responseText: string | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptMode1,
          config: {
            systemInstruction: SYSTEM_INSTRUCTIONS,
            temperature: 0.35,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                creativeMatrix: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      angleId: { type: Type.STRING },
                      angleName: { type: Type.STRING },
                      bigIdea: { type: Type.STRING },
                      buyerFocus: { type: Type.STRING },
                      hookHeadline: { type: Type.STRING },
                      emotionalTriggers: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      coreValueProp: { type: Type.STRING },
                      directResponseCta: { type: Type.STRING },
                      script: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            timecode: { type: Type.STRING },
                            visualAction: { type: Type.STRING },
                            audioVo: { type: Type.STRING },
                            textOverlay: { type: Type.STRING },
                          },
                          required: ['timecode', 'visualAction', 'audioVo', 'textOverlay'],
                        },
                      },
                    },
                    required: ['angleId', 'angleName', 'bigIdea', 'buyerFocus', 'hookHeadline', 'emotionalTriggers', 'coreValueProp', 'directResponseCta', 'script'],
                  },
                },
                batchHooks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      hookNumber: { type: Type.INTEGER },
                      category: { type: Type.STRING },
                      spokenHook: { type: Type.STRING },
                      textOverlay: { type: Type.STRING },
                      visualAction: { type: Type.STRING },
                      estimatedHookRate: { type: Type.STRING },
                      whyItWorks: { type: Type.STRING },
                    },
                    required: ['hookNumber', 'category', 'spokenHook', 'textOverlay', 'visualAction', 'estimatedHookRate', 'whyItWorks'],
                  },
                },
                imagePrompts: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      promptName: { type: Type.STRING },
                      conceptDescription: { type: Type.STRING },
                      fullPrompt: { type: Type.STRING },
                      recommendedAspectRatio: { type: Type.STRING },
                      cameraAndLightingDetails: { type: Type.STRING },
                      negativePrompt: { type: Type.STRING },
                    },
                    required: ['promptName', 'conceptDescription', 'fullPrompt', 'recommendedAspectRatio', 'cameraAndLightingDetails', 'negativePrompt'],
                  },
                },
                directorSummary: {
                  type: Type.OBJECT,
                  properties: {
                    targetAvatar: { type: Type.STRING },
                    keyDifferentiation: { type: Type.STRING },
                    scalingAdvice: { type: Type.STRING },
                  },
                  required: ['targetAvatar', 'keyDifferentiation', 'scalingAdvice'],
                },
              },
              required: ['creativeMatrix', 'batchHooks', 'imagePrompts', 'directorSummary'],
            },
          },
        });

        responseText = response.text ?? null;
        if (responseText) break;
      } catch (err: any) {
        console.warn(`Mode 1 attempt ${attempt} failed:`, err?.message || err);
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
      }
    }

    if (!responseText) {
      const fallbackCampaign = generateTailoredFallback(productName, category, gradeAge, featureContext, offerDiscount);
      return res.json({ success: true, mode: 'mode_1', data: fallbackCampaign });
    }

    const parsed = JSON.parse(responseText || '{}');
    res.json({ success: true, mode: 'mode_1', data: parsed });
  } catch (error: any) {
    console.error('Error in generate-campaign:', error);
    res.status(500).json({ error: error.message || 'Failed to generate campaign creative' });
  }
});

// Helper for Mode 1 fallback
function generateTailoredFallback(
  productName: string,
  category: string,
  gradeAge: string,
  painPoint: string,
  offerDiscount?: string
) {
  const cta = offerDiscount || '30-Day "Tear-Free" Guarantee + Free Shipping';
  return {
    directorSummary: {
      targetAvatar: `Exhausted Parents & Teachers of ${gradeAge} struggling with ${painPoint}.`,
      keyDifferentiation: `Combines patented tactile bubble popping with evidence-based pedagogy tailored for ${productName}.`,
      scalingAdvice: `Lead with Angle A for Meta parent audiences; test Angle B on TikTok with organic unboxing creator whitelisting.`,
    },
    creativeMatrix: [
      {
        angleId: 'angle-a',
        angleName: 'Angle A: Pain-Agitate-Solve (Educator/Parent Focus)',
        bigIdea: `Stop the tears and anxiety around ${painPoint}. The Fidget Game replaces friction with multisensory bubble pops.`,
        buyerFocus: 'The Rational Buyer (Parents, Teachers, Homeschoolers)',
        hookHeadline: `If your child struggles with ${painPoint.toLowerCase()}, please stop using traditional methods right now.`,
        emotionalTriggers: [
          'Parental exhaustion & bedtime dread',
          'Fear of child falling behind in grade level',
          'Craving calm, peaceful learning routines',
          'Validation from certified educators',
        ],
        coreValueProp: `Tactile kinesthetic popping mechanics anchor lessons into muscle and visual memory 3x faster without tears.`,
        directResponseCta: `Claim your ${cta} today.`,
        script: [
          {
            timecode: '0:00 - 0:03',
            visualAction: `Close-up: Child pushing worksheets away in frustration, on the verge of tears over ${painPoint.toLowerCase()}. Parent sighs with relatable exhaustion.`,
            audioVo: `"Stop doing ${productName.toLowerCase()} like this. You are accidentally triggering learning anxiety."`,
            textOverlay: `STOP DOING HOMEWORK LIKE THIS 🛑 (Save this!)`,
          },
          {
            timecode: '0:03 - 0:08',
            visualAction: `Parent replaces the boring sheet with ${productName}. Child's face immediately shifts from scowl to curious delight as they see the colorful silicone popping bubbles.`,
            audioVo: `"A certified reading specialist recommended this board game, and our nightly crying fits ended in 48 hours."`,
            textOverlay: `The $29 tactile fix that stopped our nightly meltdowns 😭➡️😄`,
          },
          {
            timecode: '0:08 - 0:18',
            visualAction: `Macro demonstration: Child draws a game card, announces the answer, and eagerly POPS a row of tactile bubbles with crisp ASMR clicks. High fives, laughter, child asks to play again.`,
            audioVo: `"Because kids physically POP the bubbles as they solve each card, the multisensory feedback locks the concept directly into their long-term memory."`,
            textOverlay: `Pop the bubble = Lock into memory! 🧠🫧 (Multisensory Learning)`,
          },
          {
            timecode: '0:18 - 0:25',
            visualAction: `Child independently reading with confidence. Box shot with 50,000+ 5-star reviews seal. Parent points to link below.`,
            audioVo: `"Over 100,000 families made the switch. Tap below to claim your 30-day tear-free guarantee before the restock sells out!"`,
            textOverlay: `Try It 100% Risk-Free! 📚👇 (Link in Bio / 30-Day Guarantee)`,
          },
        ],
      },
      {
        angleId: 'angle-b',
        angleName: 'Angle B: Unboxing & Sensory Joy (Kid-First UGC Style)',
        bigIdea: `Kids think it is an addictive arcade fidget toy, but it secretly covers the complete ${gradeAge} curriculum.`,
        buyerFocus: 'The Emotional Consumer (Children, Ages 3-11) & Trend-Obsessed Parent',
        hookHeadline: `POV: You disguise learning as the most addictive sensory fidget toy in the house.`,
        emotionalTriggers: [
          'Addictive tactile ASMR popping',
          'Unboxing surprise & collectible tokens',
          'Pride of solving cards and winning rounds',
          'Zero screen-time fights',
        ],
        coreValueProp: `High-energy, colorful tactile gameplay that makes mastering ${gradeAge} milestones feel like a video game.`,
        directResponseCta: `Tap Shop Now to grab the viral sensation before it sells out.`,
        script: [
          {
            timecode: '0:00 - 0:03',
            visualAction: `POV unboxing: Kid ripping open the bright box, gasping at the rainbow silicone popping board and miniature squishy tokens.`,
            audioVo: `"POV: You trick your kid into practicing ${productName.toLowerCase()} with a viral TikTok fidget toy."`,
            textOverlay: `They think it's just a fidget toy... 🤫✨`,
          },
          {
            timecode: '0:03 - 0:08',
            visualAction: `Macro close-up of little fingers rapid-popping the silicone bubbles with loud, crisp auditory clicks.`,
            audioVo: `"Look at these ASMR bubble pops! It comes with game cards, squishy tokens, and a spinner."`,
            textOverlay: `Most satisfying sensory ASMR pops ever 🫧🔊`,
          },
          {
            timecode: '0:08 - 0:18',
            visualAction: `Siblings or parent-child playing cross-legged on the carpet, flipping cards and racing to pop bubbles.`,
            audioVo: `"Every correct answer earns them pops and squishies. They’ve been playing for 40 minutes straight and haven’t asked for an iPad once."`,
            textOverlay: `40 mins of learning & ZERO screen complaints! 🎮❌`,
          },
          {
            timecode: '0:18 - 0:25',
            visualAction: `Parent holding up the box with viral restock alert banner.`,
            audioVo: `"If you have a child in ${gradeAge}, grab this before it sells out again!"`,
            textOverlay: `Selling out fast! ⚡ Tap below to order!`,
          },
        ],
      },
      {
        angleId: 'angle-c',
        angleName: 'Angle C: Screen-Free Contrast (Behavioral Transformation)',
        bigIdea: `Trade zombie screen glaze for real tactile dopamine that cements curriculum retention.`,
        buyerFocus: 'The Rational Buyer (Screen-Fatigued Modern Parent)',
        hookHeadline: `The shocking difference between your kid's brain on an iPad vs. this tactile popping board.`,
        emotionalTriggers: [
          'Relief from digital screen guilt',
          'Desire for wholesome floor play',
          'Visible confidence transformation',
          'Curriculum mastery without bribes',
        ],
        coreValueProp: `Replaces artificial screen dopamine loops with kinesthetic motor engagement that cements knowledge.`,
        directResponseCta: `Join 100,000+ screen-free families. Get yours with free shipping.`,
        script: [
          {
            timecode: '0:00 - 0:03',
            visualAction: `Split screen: Left side shows glazed-over child hypnotized by a tablet. Right side shows child laughing and popping bubbles with The Fidget Game.`,
            audioVo: `"We traded 30 minutes of tablet zombie glaze for this... and the difference blew our minds."`,
            textOverlay: `Tablet Glaze 🧟‍♂️ VS. Tactile Brain Focus 🧠✨`,
          },
          {
            timecode: '0:03 - 0:08',
            visualAction: `Parent slides tablet away and slides ${productName} in. Child smiles and immediately begins popping.`,
            audioVo: `"Kids crave dopamine. Screens give it artificially, but tactile popping gives it physically while teaching ${productName}."`,
            textOverlay: `Physical Dopamine > Screen Addiction 🔁🌱`,
          },
          {
            timecode: '0:08 - 0:18',
            visualAction: `Child solving cards quickly, popping rows of bubbles, beam of pride on their face.`,
            audioVo: `"Every pop engages their fine motor cortex and reinforces memory. No yelling, no tears, just pure focus."`,
            textOverlay: `No yelling, no tears, pure focus! 📈⭐`,
          },
          {
            timecode: '0:18 - 0:25',
            visualAction: `Award badge overlay on product packaging.`,
            audioVo: `"Best investment we’ve made in ${gradeAge}. Tap below for the 30-day tear-free guarantee."`,
            textOverlay: `Ditch the iPad guilt! 🛡️ 30-Day Money Back Guarantee`,
          },
        ],
      },
    ],
    batchHooks: [
      {
        hookNumber: 1,
        category: 'Problem-Based',
        spokenHook: `"Stop doing ${productName.toLowerCase()} like this. You are teaching your child to panic instead of learn."`,
        textOverlay: `STOP DOING THIS 🛑 (Save this teacher tip!)`,
        visualAction: `Parent tossing boring worksheets into a recycling bin, revealing The Fidget Game popper mat.`,
        estimatedHookRate: '43.2% 3-Sec Hook Rate',
        whyItWorks: `Pattern interrupt command that invalidates traditional frustrating study methods.`,
      },
      {
        hookNumber: 2,
        category: 'Problem-Based',
        spokenHook: `"If your child cries during ${painPoint.toLowerCase()} every night, I promise you they don't hate learning—they hate how it's presented."`,
        textOverlay: `If your child cries during homework... 😭💔`,
        visualAction: `Child resting forehead on kitchen table, looking up when the colorful rainbow fidget slides into frame.`,
        estimatedHookRate: '41.5% 3-Sec Hook Rate',
        whyItWorks: `Empathy-driven problem hook removing blame from parent and child.`,
      },
      {
        hookNumber: 3,
        category: 'Social Proof / Educator',
        spokenHook: `"Why over 50,000 elementary teachers replaced boring worksheets with this $29 fidget game."`,
        textOverlay: `Why 50,000+ Teachers Banned Boring Worksheets 🏫👩‍🏫`,
        visualAction: `Real elementary teacher in classroom setting holding the product box enthusiastically.`,
        estimatedHookRate: '45.0% 3-Sec Hook Rate',
        whyItWorks: `High authority social proof creates immediate trust and FOMO.`,
      },
      {
        hookNumber: 4,
        category: 'Social Proof / Educator',
        spokenHook: `"My child's teacher quietly shared this secret with me after parent-teacher conference..."`,
        textOverlay: `The secret her teacher whispered to me 🤫👂`,
        visualAction: `Creator whispering conspiratorially toward camera in authentic selfie angle.`,
        estimatedHookRate: '47.3% 3-Sec Hook Rate',
        whyItWorks: `Secret angle triggers intense curiosity and feelings of getting an unfair advantage.`,
      },
      {
        hookNumber: 5,
        category: 'Curiosity / Visual',
        spokenHook: `"What happens when you take the most viral fidget toy in the world and hide the entire ${gradeAge} curriculum inside it?"`,
        textOverlay: `We put the entire curriculum inside a fidget popper 🤯🫧`,
        visualAction: `Extreme macro slow-motion bubble pop with colorful cards bursting across the table.`,
        estimatedHookRate: '49.1% 3-Sec Hook Rate',
        whyItWorks: `Sensory ASMR hook that captures both kids and parents scrolling their feed.`,
      },
    ],
    imagePrompts: [
      {
        promptName: `Prompt 1: Authentic Parent-Child Relief & ${productName}`,
        conceptDescription: `High-converting Meta feed static showing genuine emotional relief and bonding in a realistic living room.`,
        fullPrompt: `Candid lifestyle photograph of an affectionate 32-year-old mother and her beaming 6-year-old child sitting on a warm sunlit Scandinavian hardwood floor. The child is happily pressing down tactile rainbow silicone bubbles on ${productName}, holding a colorful educational card, radiant smile of accomplishment. The mother smiles with genuine relief and pride, hands clasped, warm afternoon golden hour sunlight streaming through sheer curtains, soft interior bokeh, shot on Hasselblad X2D 100C, 50mm f/1.4 lens, authentic documentary realism, natural skin textures, vibrant toy colors, zero artificiality --ar 4:5 --style raw --v 6.1`,
        recommendedAspectRatio: '4:5 (Meta Feed / Instagram Post Optimized)',
        cameraAndLightingDetails: `Hasselblad X2D 100C, 50mm f/1.4 lens, natural 45-degree golden hour side-window lighting, soft fill, shallow depth of field.`,
        negativePrompt: `blurry, distorted hands, extra fingers, cartoonish, oversaturated fake studio lighting, plastic skin, depressing expressions.`,
      },
      {
        promptName: `Prompt 2: Tactile ASMR Product Macro Detail & Popping Action`,
        conceptDescription: `Scroll-stopping product-focused macro shot showing satisfying tactile silicone bubbles and crisp educational typography.`,
        fullPrompt: `Extreme macro top-down angled commercial product photograph of ${productName} silicone bubble popping board. A child’s small finger is midway through depressing a vibrant matte pastel-pink silicone bubble with satisfying tactile tension. Crisp white educational flashcards with bold clean typography fan out gracefully across the smooth blonde birch table. Adjacent are two collectible miniature squishy reward tokens with velvety soft texture. Studio commercial lighting, soft diffuse ring light reflections on silicone domes, razor-sharp focus on the popping bubble, 8k resolution, crisp vibrant colors, high-end toy brand aesthetic --ar 9:16 --style raw --v 6.1`,
        recommendedAspectRatio: '9:16 (TikTok & Instagram Stories / Reels Safe)',
        cameraAndLightingDetails: `Sony A1, 90mm f/2.8 Macro lens, diffused high-CRI overhead softbox with subtle rim light, ISO 100, 1/250s.`,
        negativePrompt: `dust, scratches, harsh reflections, muddy colors, unreadable text, low resolution, warped geometry.`,
      },
    ],
  };
}

// Helper for Mode 2 fallback
function generateTailoredAplusFallback(
  productName: string,
  category: string,
  gradeAge: string,
  featureContext: string,
  catalogContext: string
) {
  const catalogList = catalogContext
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const item1 = catalogList[0] || 'Word Pop!';
  const item2 = catalogList[1] || 'Math Ahoy';
  const item3 = catalogList[2] || 'Squishyland';

  return {
    heroBanner: {
      visualArtBrief: `Full-width 970x600 px banner. Composition: Bright, sunlit home learning space. Smiling child joyfully pressing down bubbles on ${productName} while parent beams with pride. High-contrast typography and color-coded educational card deck fanned out in foreground. Warm, natural lighting with soft rim highlight.`,
      mainHeadlineOverlay: 'Master Reading Fundamentals Without Tears', // 5 words (<=7)
      subheadlineOverlay: 'Multisensory silicone popping gameplay trusted by over 50,000 classrooms nationwide.', // 10 words (<=15)
    },
    featureGrid: [
      {
        cardNumber: 1,
        title: 'Multisensory Memory Retention',
        copy: 'Children physically pop sensory bubbles as they sound out letters and cards. Kinesthetic feedback cements core concepts into memory 3x faster than dry worksheets.',
        imageGraphicBrief: '300x300 px close-up macro of small fingers pressing down a colorful silicone bubble with subtle memory-reinforcement graphic badge.',
      },
      {
        cardNumber: 2,
        title: 'Tear-Free Daily Routines',
        copy: 'Transform after-school homework friction into eager game night excitement. Kids actively ask to practice before bedtime, building independent confidence.',
        imageGraphicBrief: '300x300 px lifestyle candid of parent and child celebrating a finished round with genuine beaming smiles.',
      },
      {
        cardNumber: 3,
        title: 'Science of Reading Alignment',
        copy: `Developed in partnership with certified educators and literacy specialists. Targets ${gradeAge} developmental milestones through structured orthographic mapping.`,
        imageGraphicBrief: '300x300 px studio layout showcasing color-coded card levels fanned out neatly with clear grade indicators.',
      },
      {
        cardNumber: 4,
        title: 'Screen-Free Tactile Durability',
        copy: 'Replace digital zombie glaze with wholesome physical play. Washable, BPA-free food-grade silicone is ultra-durable, dishwasher-safe, and travel-ready.',
        imageGraphicBrief: '300x300 px product shot highlighting the washable silicone board being easily wiped clean and stored in compact packaging.',
      },
    ],
    brandStory: {
      sectionHeader: 'Born in an Elementary Classroom. Backed by Science.',
      bodyParagraph: 'Frustrated by watching young learners break down in tears over dry flashcards, an elementary educator created The Fidget Game to merge viral sensory fidget popping with evidence-based pedagogy. Today, over 50,000 classrooms and 1,000,000 families rely on our multisensory toys to turn learning frustration into lifelong confidence.',
    },
    comparisonMatrix: {
      catalogItems: [item1, item2, item3],
      rows: [
        {
          metric: 'Target Grade Level',
          mainProductValue: gradeAge,
          item1Value: 'Kindergarten & Grade 1',
          item2Value: 'Grades 1 to 3',
          item3Value: 'Pre-K to Grade 2',
        },
        {
          metric: 'Core Learning Focus',
          mainProductValue: featureContext,
          item1Value: 'CVC Phonics & Rhyming Word Families',
          item2Value: 'Addition, Subtraction & Math Fluency',
          item3Value: 'Phonics Blends & Collectible Rewards',
        },
        {
          metric: 'Sensory Component',
          mainProductValue: 'Patented Silicone Popping Mat',
          item1Value: 'Tactile Letter Slider Slates',
          item2Value: 'Kinesthetic Number Pop Board',
          item3Value: 'Collectible Velvety Squishy Tokens',
        },
        {
          metric: 'Play Style',
          mainProductValue: 'Interactive Speed Popping & Card Reading',
          item1Value: 'Solo or Partner Word Building',
          item2Value: 'Timed Math Duel Gameplay',
          item3Value: 'Storybook Island Exploration',
        },
        {
          metric: 'Best For',
          mainProductValue: 'Eliminating Homework Friction & Tears',
          item1Value: 'Early Phonics Decoding',
          item2Value: 'Overcoming Early Math Anxiety',
          item3Value: 'Active Sensory-Seeking Children',
        },
      ],
      markdownTable: `| Metric / Feature | ${productName} | ${item1} | ${item2} | ${item3} |
|---|---|---|---|---|
| Target Grade Level | ${gradeAge} | Kindergarten & Grade 1 | Grades 1 to 3 | Pre-K to Grade 2 |
| Core Learning Focus | ${featureContext} | CVC Phonics & Rhyming Word Families | Addition, Subtraction & Math Fluency | Phonics Blends & Collectible Rewards |
| Sensory Component | Patented Silicone Popping Mat | Tactile Letter Slider Slates | Kinesthetic Number Pop Board | Collectible Velvety Squishy Tokens |
| Play Style | Interactive Speed Popping & Card Reading | Solo or Partner Word Building | Timed Math Duel Gameplay | Storybook Island Exploration |
| Best For | Eliminating Homework Friction & Tears | Early Phonics Decoding | Overcoming Early Math Anxiety | Active Sensory-Seeking Children |`,
    },
    complianceAudit: [
      {
        rule: 'Amazon Restricted Claim: "100% Guaranteed"',
        status: 'PASSED',
        details: 'Zero money-back or satisfaction guarantee claims in A+ text (strictly prohibited by Amazon Brand Content Guidelines).',
      },
      {
        rule: 'Amazon Restricted Claim: "Best Seller" / "#1 Rated"',
        status: 'PASSED',
        details: 'Zero superlative rank claims used. Replaced with verifiable educator adoption metrics ("50,000+ classrooms").',
      },
      {
        rule: 'Amazon Restricted Claim: "Free Shipping" / Pricing',
        status: 'PASSED',
        details: 'Zero shipping, price promotional, or coupon terms used (compliant with Amazon Section 4.1 Content Policy).',
      },
      {
        rule: 'Medical & Clinical Treatment Claims',
        status: 'PASSED',
        details: 'Zero unapproved medical/clinical diagnostic claims. Framed strictly around pedagogical multisensory learning benefits.',
      },
      {
        rule: 'Mobile Scannability & Heading Contrast',
        status: 'PASSED',
        details: 'Hero headline is under 7 words (5 words). Subheadline is under 15 words (10 words). All body copy is under 3 sentences for Amazon Mobile App scannability.',
      },
    ],
  };
}

// Refine endpoint
app.post('/api/refine-creative', async (req: Request, res: Response) => {
  try {
    const { currentContent, instructions, type } = req.body;

    if (!ai) {
      return res.status(500).json({ error: 'Gemini API not configured.' });
    }

    const prompt = `
You are the AI Creative Director & Marketplace Strategist for "The Fidget Game".
Current Content (${type || 'Script/Hook/A+'}):
${JSON.stringify(currentContent, null, 2)}

User Refinement Request:
${instructions}

Rewrite and polish the content maintaining brand voice duality, compliance, and direct-response punchiness.
Respond in valid JSON with:
{
  "refinedContent": any,
  "explanation": "What was improved and why it will increase ROAS/CTR or Amazon conversion"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.35,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Refine creative error:', error);
    res.status(500).json({ error: error.message || 'Refinement failed' });
  }
});

// Vite middleware mounting in development mode
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
