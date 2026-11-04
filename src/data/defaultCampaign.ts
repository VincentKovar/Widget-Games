import { CampaignData, ProductInput, AmazonAplusData } from '../types/creative';

export const DEFAULT_PRODUCT_INPUT: ProductInput = {
  mode: 'mode_1',
  productName: 'The Fidget Game: Sight Words Edition',
  category: 'Multisensory Educational Game / Fidget Toy',
  gradeAge: 'Kindergarten & Grade 1 (Ages 4-7)',
  painPoint: 'Tears over flashcards & struggling with sight word recognition',
  coreFeatures: 'Sight word recognition, pop fidget mechanics, Dolch & Fry 220 word cards',
  comparisonCatalogItems: 'Word Pop!, Math Ahoy, Squishyland',
  extraAngle: 'Science of Reading backed, replaces iPad dopamine loop with tactile popping',
  platform: 'TikTok & Meta Reels (9:16 Vertical Video)',
  offerDiscount: 'Buy 2 Get 1 Free + 30-Day "Tear-Free Reading" Guarantee',
};

export const PRESET_PRODUCTS: { id: string; label: string; badge: string; input: ProductInput }[] = [
  {
    id: 'sight-words-mode1',
    label: 'Sight Words Edition (UGC Engine)',
    badge: 'Mode 1: Ad Creative',
    input: {
      mode: 'mode_1',
      productName: 'The Fidget Game: Sight Words Edition',
      category: 'Multisensory Educational Game',
      gradeAge: 'Kindergarten & Grade 1 (Ages 4-7)',
      painPoint: 'Tears over flashcards & struggling with sight word recognition',
      coreFeatures: '220 Dolch & Fry sight words, sensory pop-it mat, Science of Reading phonics alignment',
      comparisonCatalogItems: 'Word Pop!, Math Ahoy, Squishyland',
      extraAngle: 'Turns nightly homework battles into an active game kids ask to play',
      platform: 'TikTok & Meta Reels (9:16 UGC)',
      offerDiscount: '30-Day Tear-Free Guarantee + Free Shipping',
    },
  },
  {
    id: 'sight-words-mode2',
    label: 'Sight Words (Amazon A+)',
    badge: 'Mode 2: Amazon A+',
    input: {
      mode: 'mode_2',
      productName: 'The Fidget Game: Sight Words Edition',
      category: 'Children’s Phonics Reading Board Game',
      gradeAge: 'Kindergarten & Grade 1 (Ages 4-7)',
      painPoint: 'Eliminating flashcard tears with multisensory pop mechanics',
      coreFeatures: 'Patented silicone bubble popping mat, 220 high-frequency sight word cards, Dolch & Fry curriculum, Science of Reading orthographic mapping',
      comparisonCatalogItems: 'Word Pop!, Math Ahoy, Squishyland',
      extraAngle: 'Classroom tested by 50,000+ certified reading specialists',
      platform: 'Amazon Marketplace Listing & Brand Store',
      offerDiscount: 'Amazon Prime 2-Day Delivery',
    },
  },
  {
    id: 'squishyland-mode2',
    label: 'Squishyland Phonics & Math (A+)',
    badge: 'Mode 2: Amazon A+',
    input: {
      mode: 'mode_2',
      productName: 'The Fidget Game: Squishyland Edition',
      category: 'Sensory Phonics & Collectible Toy Board Game',
      gradeAge: 'Pre-K to Grade 2 (Ages 3-8)',
      painPoint: 'Kids refuse to sit still for static flashcards and demand toy unboxings',
      coreFeatures: 'Collectible miniature animal squishies, dual phonics & early addition card decks, tactile silicone pop board, gamified island board',
      comparisonCatalogItems: 'Sight Words Edition, Math Ahoy, Word Pop!',
      extraAngle: 'Tactile reward loop keeps active learners engaged for 40+ minutes',
      platform: 'Amazon A+ Content',
      offerDiscount: 'Amazon Prime Eligible',
    },
  },
  {
    id: 'math-addition-mode1',
    label: 'Math Addition Pop (UGC Engine)',
    badge: 'Mode 1: Ad Creative',
    input: {
      mode: 'mode_1',
      productName: 'The Fidget Game: Math Pop Edition',
      category: 'Tactile Math Game',
      gradeAge: 'Grade 1 to Grade 3 (Ages 6-9)',
      painPoint: 'Math anxiety, counting on fingers under pressure, and timed worksheet stress',
      coreFeatures: 'Addition & subtraction facts to 20, tactile silicone finger popper, competitive gameplay',
      comparisonCatalogItems: 'Sight Words Edition, Math Ahoy, Squishyland',
      extraAngle: 'Kinesthetic finger popping cements number bonds visually',
      platform: 'Meta Ads & YouTube Shorts',
      offerDiscount: 'Save $15 on Math + Reading Bundle',
    },
  },
];

export const DEFAULT_CAMPAIGN_DATA: CampaignData = {
  directorSummary: {
    targetAvatar: 'Exhausted Millennial Parent (Moms 28-44) & 1st Grade Teachers tired of homework meltdowns and digital zombie glaze.',
    keyDifferentiation: 'Combines viral fidget popping tactile sensory satisfaction with evidence-based Science of Reading phonics pedagogy.',
    scalingAdvice: 'For Meta, lead with Angle A (Educator/Relief hook) with static UGC carousels. For TikTok, scale Angle B (unboxing squishy excitement & ASMR pop sounds) using creator spark ads.',
  },
  creativeMatrix: [
    {
      angleId: 'angle-a',
      angleName: 'Angle A: Pain-Agitate-Solve (Educator/Parent Focus)',
      bigIdea: 'Stop the 6:30 PM homework crying. Flashcards trigger anxiety; multisensory popping creates instant reading breakthroughs.',
      buyerFocus: 'The Rational Buyer (Parents, Teachers, Homeschoolers)',
      hookHeadline: 'If your 5-year-old cries every time you pull out sight word flashcards, stop doing this right now.',
      emotionalTriggers: [
        'Parental guilt & bedtime exhaustion',
        'Fear of child falling behind in reading',
        'Desire for calm, tear-free homework routines',
        'Validation from certified teachers',
      ],
      coreValueProp: 'Patented tactile bubble pop mechanism locks 220 Dolch & Fry sight words into long-term memory 3x faster through multisensory Science of Reading.',
      directResponseCta: 'Claim your 30-Day "Tear-Free Reading" Guarantee at 25% off today.',
      script: [
        {
          timecode: '0:00 - 0:03',
          visualAction: 'Extreme close-up: Frustrated 6-year-old child pushing a stack of paper flashcards across a kitchen table, eyes welling up with tears. Mom looks visibly overwhelmed and sighs.',
          audioVo: '"Stop doing sight words like this. You are literally triggering reading anxiety."',
          textOverlay: 'STOP DOING FLASHCARDS LIKE THIS 🛑 (Save this!)',
        },
        {
          timecode: '0:03 - 0:08',
          visualAction: 'Mom hands the child The Fidget Game board. Child\'s eyes widen as colorful rainbow popping bubbles and cute game cards replace the boring paper flashcards. Instant shift in body language.',
          audioVo: '"A pediatric literacy specialist showed me this board game, and it completely ended our 6:30 PM homework meltdowns."',
          textOverlay: 'The $29 game that stopped our nightly homework tears 😭➡️😄',
        },
        {
          timecode: '0:08 - 0:18',
          visualAction: 'Fast-paced macro demonstration. Child draws a card ("WHERE"), sounds out /w/ /air/, and enthusiastically POPS 5 satisfying bubbles with loud crisp ASMR pops. High five with mom, child giggles and pulls the next card without being asked.',
          audioVo: '"It\'s called The Fidget Game. Because kids physically POP the bubbles as they decode the words, the Science of Reading says it locks the letters directly into their kinesthetic memory."',
          textOverlay: 'Pop the bubble = Lock into memory! 🧠✨ (Science of Reading backed)',
        },
        {
          timecode: '0:18 - 0:25',
          visualAction: 'Split screen: Left side shows child reading a full bedtime book with confidence. Right side shows the product box with 50,000+ 5-star reviews badge and the "30-Day Tear-Free Guarantee" seal. Mom points to link below.',
          audioVo: '"He learned 40 sight words in two weeks and now BEGS to play before bed. Tap below for 25% off while it\'s still in stock!"',
          textOverlay: '40 Sight Words in 2 Weeks! 📚👇 (Link in Bio / 30-Day Guarantee)',
        },
      ],
    },
    {
      angleId: 'angle-b',
      angleName: 'Angle B: Unboxing & Sensory Joy (Kid-First UGC Style)',
      bigIdea: 'The viral sensory game kids mistake for an addictive arcade toy while secretly mastering kindergarten reading curriculum.',
      buyerFocus: 'The Emotional Consumer (Children, Ages 3-11) & Trend-Obsessed Parent',
      hookHeadline: 'My daughter thought I bought her another viral TikTok fidget toy... she has no idea it\'s teaching her to read.',
      emotionalTriggers: [
        'Pure joy of unboxing new sensory toys',
        'Addictive bubble popping ASMR satisfaction',
        'Gamified competition & collecting tokens',
        'Pride of winning the round',
      ],
      coreValueProp: 'High-energy, colorful tactile gameplay that turns literacy practice into an exhilarating unboxing and popping game.',
      directResponseCta: 'Tap Shop Now to grab the viral TikTok sensation before the holiday restock sells out.',
      script: [
        {
          timecode: '0:00 - 0:03',
          visualAction: 'Vibrant unboxing point-of-view: Kid frantically tearing into the bright yellow "The Fidget Game" box, squealing with excitement as the rainbow silicone popping board pops out. Loud tactile click sounds.',
          audioVo: '"POV: You disguise reading homework as the most addictive sensory toy in the house."',
          textOverlay: 'She thinks it\'s just a fidget toy... 🤫✨',
        },
        {
          timecode: '0:03 - 0:08',
          visualAction: 'Macro shot of little fingers rapid-popping the rainbow silicone bubbles. Rapid-fire text transitions showing collectible sensory squishies and glossy cartoon cards.',
          audioVo: '"Look at this satisfying pop! It comes with Dolch sight word cards, squishy tokens, and a spinner."',
          textOverlay: 'LOUDEST, most satisfying ASMR pops ever 🫧🔊',
        },
        {
          timecode: '0:08 - 0:18',
          visualAction: 'Brother and sister sitting cross-legged on a fluffy rug, taking turns flipping cards and racing to pop the correct bubble row. Sister shouts "BECAUSE!" and pops three bubbles, pumping her fist in victory.',
          audioVo: '"Every word they read correctly earns them pops. They’ve been playing for 45 minutes straight and haven’t asked for an iPad once."',
          textOverlay: '45 mins of playing & ZERO screen complaints! 🎮❌',
        },
        {
          timecode: '0:18 - 0:25',
          visualAction: 'Mom holding the box up to camera smiling. Fast animated graphics showing "Over 1,000,000 games sold" and a flashing "TikTok Shop Special Bundle".',
          audioVo: '"If you have a 4 to 7 year old, grab this before the next restock sells out again!"',
          textOverlay: 'Viral sensation selling out fast! ⚡ Tap to grab yours!',
        },
      ],
    },
    {
      angleId: 'angle-c',
      angleName: 'Angle C: Screen-Free Contrast (Behavioral Transformation)',
      bigIdea: 'Swap the zombie iPad glaze for real neural dopamine. How one silicone board broke our family\'s tablet addiction.',
      buyerFocus: 'The Rational Buyer (Guilt-Ridden Modern Parent seeking screen detox)',
      hookHeadline: 'The shocking difference between your kid’s brain on YouTube Kids vs. this tactile reading board.',
      emotionalTriggers: [
        'Screen-time guilt & fear of digital overstimulation',
        'Desire for wholesome family floor play',
        'Craving tangible educational milestones',
        'Instant dopamine redirection to real-world toys',
      ],
      coreValueProp: 'Replaces artificial screen dopamine with kinesthetic tactile feedback, creating calm focus and natural literacy retention.',
      directResponseCta: 'Join 100,000+ screen-free families. Get The Fidget Game with free shipping today.',
      script: [
        {
          timecode: '0:00 - 0:03',
          visualAction: 'High-contrast split screen: Left side shows a glazed-over child hypnotized by a glowing tablet in a dark room. Right side shows a bright, laughing child sitting on the carpet with The Fidget Game popping mat.',
          audioVo: '"We traded 30 minutes of tablet zombie glaze for this... and my kid’s teacher called me in shock."',
          textOverlay: 'Tablet Glaze 🧟‍♂️ VS. Tactile Brain Focus 🧠✨',
        },
        {
          timecode: '0:03 - 0:08',
          visualAction: 'Parent pulls tablet away smoothly and places The Fidget Game down. Instead of a meltdown, the child\'s fingers instantly reach for the tactile bubbles and press them down with satisfying clicks.',
          audioVo: '"Kids crave sensory dopamine. Tablets give it artificially, but The Fidget Game gives it physically."',
          textOverlay: 'Redirecting the dopamine loop naturally 🔁🌱',
        },
        {
          timecode: '0:08 - 0:18',
          visualAction: 'Montage: Child independently reading word cards ("SAID", "COULD", "PLAY"), popping bubbles, matching color-coded phonics cards, and looking up at mom with authentic beaming pride.',
          audioVo: '"Instead of mindlessly swiping, every pop engages their motor cortex and reinforces phonetic memory. His reading score jumped two grade levels."',
          textOverlay: 'Jumped TWO reading levels in 30 days! 📈⭐',
        },
        {
          timecode: '0:18 - 0:25',
          visualAction: 'Parent holding the award-winning package showing "National Parenting Product Award" badge. Text overlay prompts to check the limited-time bundle offer.',
          audioVo: '"Best $30 I’ve ever spent on his education. Tap below to test the 30-day tear-free guarantee yourself."',
          textOverlay: 'Ditch the iPad guilt today! 🛡️ 30-Day Money Back Guarantee',
        },
      ],
    },
  ],
  batchHooks: [
    {
      hookNumber: 1,
      category: 'Problem-Based',
      spokenHook: '"Stop doing sight word flashcards like this. You are literally teaching your child to memorize shapes instead of reading."',
      textOverlay: 'STOP DOING FLASHCARDS LIKE THIS 🛑 (Save this teacher tip!)',
      visualAction: 'Mom dramatically dropping a pile of boring paper flashcards into the recycling bin, pulling out The Fidget Game popper mat.',
      estimatedHookRate: '42.8% 3-Sec Hook Rate',
      whyItWorks: 'Uses negative command + pattern interrupt. Attacks the status quo method every exhausted parent secretly hates.',
    },
    {
      hookNumber: 2,
      category: 'Problem-Based',
      spokenHook: '"If your 1st grader cries at homework time every single night, I promise you they don’t hate reading—they hate how it’s being taught."',
      textOverlay: 'If your 5 or 6 year old cries during homework... 😭💔',
      visualAction: 'Close-up of a child putting head down on homework table, then looking up in surprise as a rainbow fidget popper slides into frame.',
      estimatedHookRate: '39.4% 3-Sec Hook Rate',
      whyItWorks: 'Empathy-driven hook that removes blame from the child and parent, introducing the tool as the missing bridge.',
    },
    {
      hookNumber: 3,
      category: 'Social Proof / Educator',
      spokenHook: '"Why over 50,000 elementary teachers banned traditional sight word worksheets and replaced them with this $29 fidget game."',
      textOverlay: 'Why 50,000+ Teachers Banned Boring Worksheets 🏫👩‍🏫',
      visualAction: 'Real 1st grade teacher in classroom setting standing in front of whiteboard holding the game box, pointing excitedly.',
      estimatedHookRate: '44.1% 3-Sec Hook Rate',
      whyItWorks: 'High-authority social proof ("50,000 teachers") creates FOMO and instant institutional credibility.',
    },
    {
      hookNumber: 4,
      category: 'Social Proof / Educator',
      spokenHook: '"My daughter’s kindergarten teacher quietly whispered this Amazon secret to me after parent-teacher conference..."',
      textOverlay: 'The secret her Kindergarten teacher whispered to me 🤫👂',
      visualAction: 'Whisper-to-camera selfie style framing with high intrigue; creator glances over shoulder conspiratorially.',
      estimatedHookRate: '46.7% 3-Sec Hook Rate',
      whyItWorks: 'Confidential secret angle triggers intense curiosity; parents feel like they are getting an insider parenting cheat code.',
    },
    {
      hookNumber: 5,
      category: 'Curiosity / Visual',
      spokenHook: '"What happens when you take the most addictive fidget toy on TikTok and sneak the entire Science of Reading curriculum inside it?"',
      textOverlay: 'We put the entire kindergarten reading curriculum inside a fidget popper 🤯🫧',
      visualAction: 'Extreme macro slow-motion bubble pop with colorful cards bursting out of the box like a sensory explosion.',
      estimatedHookRate: '48.2% 3-Sec Hook Rate',
      whyItWorks: 'Bridges the gap between toy craze and educational utility; visually hypnotic in the first 0.5 seconds.',
    },
  ],
  imagePrompts: [
    {
      promptName: 'Prompt 1: Authentic Parent-Child Relief & Homework Breakthrough',
      conceptDescription: 'High-converting Meta feed static ad showcasing genuine mother-child joy and emotional homework relief in an authentic modern living room.',
      fullPrompt: 'Candid lifestyle photograph of an affectionate 32-year-old mother and her beaming 6-year-old daughter sitting together on a sun-drenched Scandinavian hardwood floor. The daughter is happily pressing down tactile rainbow silicone bubbles on The Fidget Game board, holding a colorful educational word card, radiant natural smile of accomplishment. The mother is smiling with genuine relief and pride, hands clasped, warm golden hour afternoon sunlight streaming through sheer curtains, soft interior bokeh, shot on Hasselblad X2D 100C, 50mm f/1.4 lens, authentic documentary realism, natural skin textures, vibrant toy colors, zero artificiality --ar 4:5 --style raw --v 6.1',
      recommendedAspectRatio: '4:5 (Meta Feed / Instagram Post Optimized)',
      cameraAndLightingDetails: 'Hasselblad X2D 100C, 50mm f/1.4 lens, natural 45-degree golden hour side-window lighting, soft fill, shallow depth of field, filmic color grading.',
      negativePrompt: 'blurry, distorted hands, extra fingers, cartoonish, oversaturated fake studio lighting, plastic skin, depressing expressions, cluttered messy background.',
    },
    {
      promptName: 'Prompt 2: Tactile ASMR Product Macro Detail & Popping Action',
      conceptDescription: 'Scroll-stopping product-focused macro shot showing the satisfying tactile silicone pop-it bubbles, high-contrast typography, and collectible tokens.',
      fullPrompt: 'Extreme macro top-down angled commercial product photograph of The Fidget Game silicone bubble popping board. A child’s small finger is midway through depressing a vibrant matte pastel-pink silicone bubble with satisfying tactile tension and realistic silicone crease. Crisp white educational flashcards with bold clean typography ("SIGHT WORDS", "WHERE", "BECAUSE") fan out gracefully across the smooth blonde birch table. Adjacent to the board are two adorable collectible miniature squishy animal reward tokens with velvety soft texture. Studio commercial lighting, soft diffuse ring light reflections on silicone domes, razor-sharp focus on the popping bubble, 8k resolution, crisp vibrant colors, high-end toy brand aesthetic --ar 9:16 --style raw --v 6.1',
      recommendedAspectRatio: '9:16 (TikTok & Instagram Stories / Reels Safe)',
      cameraAndLightingDetails: 'Sony A1, 90mm f/2.8 Macro lens, diffused high-CRI overhead softbox with subtle rim light highlighting the silicone dome curves, ISO 100, 1/250s.',
      negativePrompt: 'dust, scratches, harsh reflections, muddy colors, unreadable text, low resolution, warped geometry, artificial neon glare.',
    },
  ],
};

export const DEFAULT_AMAZON_APLUS_DATA: AmazonAplusData = {
  heroBanner: {
    visualArtBrief: 'Full-width 970x600 px banner. Composition: Warm, sun-drenched Scandinavian kitchen island. A smiling 6-year-old girl joyfully pops colorful bubbles on The Fidget Game board while her mother looks on with pride and relief. Clean fanned-out sight word cards in foreground. Soft studio rim-lighting with brand pastel pink and yellow accents.',
    mainHeadlineOverlay: 'Master 220 Sight Words Without Tears',
    subheadlineOverlay: 'Multisensory popping gameplay trusted by over 50,000 elementary classrooms nationwide.',
  },
  featureGrid: [
    {
      cardNumber: 1,
      title: 'Multisensory Memory Lock',
      copy: 'Children physically pop tactile silicone bubbles as they sound out words. Kinesthetic feedback cements Dolch and Fry sight words into permanent memory 3x faster than paper flashcards.',
      imageGraphicBrief: '300x300 px close-up macro of small fingers pressing down a bubble on the rainbow pop board, highlighted with a subtle brain synapsing graphic overlay.',
    },
    {
      cardNumber: 2,
      title: 'Tear-Free Homework Routines',
      copy: 'Transform the dreaded 6:30 PM homework struggle into game night excitement. Kids actively ask to practice reading before bedtime, building self-driven reading confidence.',
      imageGraphicBrief: '300x300 px lifestyle candid of parent and child high-fiving across the kitchen table with beaming smiles and zero homework frustration.',
    },
    {
      cardNumber: 3,
      title: 'Science of Reading Aligned',
      copy: 'Developed with pediatric literacy experts and curriculum specialists. Covers 220 high-frequency words organized into color-coded developmental stages from Pre-K through 2nd Grade.',
      imageGraphicBrief: '300x300 px clean product graphic showing the 5 color-coded word decks fanned out with clear typography and grade-level progression labels.',
    },
    {
      cardNumber: 4,
      title: 'Screen-Free Tactile Play',
      copy: 'Replace digital zombie glaze with wholesome physical play. Food-grade, BPA-free silicone popping board is dishwasher-safe, ultra-durable, and travel-ready for car rides.',
      imageGraphicBrief: '300x300 px studio overhead shot showing the washable silicone board being wiped clean, durable packaging, and portable travel-ready card boxes.',
    },
  ],
  brandStory: {
    sectionHeader: 'Born in an Elementary Classroom. Backed by Science.',
    bodyParagraph: 'Frustrated by seeing young students break down in tears over dry memorization sheets, elementary educator and founder created The Fidget Game to merge viral sensory fidget play with rigorous Science of Reading phonics. Today, over 50,000 classrooms and 1,000,000 families use our patented multisensory learning toys to turn reading frustration into lifelong literacy joy.',
  },
  comparisonMatrix: {
    catalogItems: ['Word Pop!', 'Math Ahoy', 'Squishyland'],
    rows: [
      {
        metric: 'Target Grade Level',
        mainProductValue: 'Pre-K, Kindergarten & Grade 1',
        item1Value: 'Kindergarten & Grade 1',
        item2Value: 'Grades 1 to 3',
        item3Value: 'Pre-K to Grade 2',
      },
      {
        metric: 'Core Learning Focus',
        mainProductValue: '220 High-Frequency Dolch & Fry Sight Words',
        item1Value: 'CVC Phonics & Rhyming Word Families',
        item2Value: 'Addition, Subtraction & Math Fact Fluency',
        item3Value: 'Blends, Digraphs & Early Phonics',
      },
      {
        metric: 'Sensory Component',
        mainProductValue: 'Patented Rainbow Silicone Popping Mat',
        item1Value: 'Tactile Letter Sliders',
        item2Value: 'Kinesthetic Number Pop Board',
        item3Value: 'Collectible Tactile Squishy Animal Tokens',
      },
      {
        metric: 'Play Style',
        mainProductValue: 'Fast-Paced Competitive or Cooperative Popping',
        item1Value: 'Solo or Partner Word Building',
        item2Value: 'Timed Math Duel Gameplay',
        item3Value: 'Storybook Island Exploration',
      },
      {
        metric: 'Best For',
        mainProductValue: 'Stopping Nightly Reading Homework Tears',
        item1Value: 'Early Sound Decoding & Blending',
        item2Value: 'Eliminating Early Elementary Math Anxiety',
        item3Value: 'Sensory-Seeking Active Learners',
      },
    ],
    markdownTable: `| Metric / Feature | The Fidget Game: Sight Words | Word Pop! | Math Ahoy | Squishyland |
|---|---|---|---|---|
| Target Grade Level | Pre-K, Kindergarten & Grade 1 | Kindergarten & Grade 1 | Grades 1 to 3 | Pre-K to Grade 2 |
| Core Learning Focus | 220 High-Frequency Dolch & Fry Sight Words | CVC Phonics & Rhyming Word Families | Addition, Subtraction & Math Fact Fluency | Blends, Digraphs & Early Phonics |
| Sensory Component | Patented Rainbow Silicone Popping Mat | Tactile Letter Sliders | Kinesthetic Number Pop Board | Collectible Tactile Squishy Animal Tokens |
| Play Style | Fast-Paced Competitive or Cooperative Popping | Solo or Partner Word Building | Timed Math Duel Gameplay | Storybook Island Exploration |
| Best For | Stopping Nightly Reading Homework Tears | Early Sound Decoding & Blending | Eliminating Early Elementary Math Anxiety | Sensory-Seeking Active Learners |`,
  },
  complianceAudit: [
    {
      rule: 'Amazon Restricted Claim: "100% Guaranteed"',
      status: 'PASSED',
      details: 'Zero instances of satisfaction or money-back guarantees in A+ text (restricted under Amazon Brand Content Guidelines). Replaced with verified curriculum specifications.',
    },
    {
      rule: 'Amazon Restricted Claim: "Best Seller" / "#1 Rated"',
      status: 'PASSED',
      details: 'Zero superlative rank claims used. Replaced with factual, substantiated metric: "trusted by over 50,000 classrooms nationwide".',
    },
    {
      rule: 'Amazon Restricted Claim: "Free Shipping" / Pricing',
      status: 'PASSED',
      details: 'Zero shipping, price promotional, or coupon language. Fully compliant with Amazon Section 4.1 Content Policy.',
    },
    {
      rule: 'Medical & Clinical Treatment Claims',
      status: 'PASSED',
      details: 'Zero unapproved medical/clinical diagnostic claims (e.g. cures ADHD/Dyslexia). Framed strictly around pedagogical multisensory reading practice.',
    },
    {
      rule: 'Mobile Scannability & Heading Contrast',
      status: 'PASSED',
      details: 'Hero headline is under 7 words. All body paragraphs are under 3 sentences for seamless rendering on the Amazon Mobile Shopping App.',
    },
  ],
};
