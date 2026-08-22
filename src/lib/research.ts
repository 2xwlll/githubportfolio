export type ResearchTopic = {
  slug: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  summary: string;
  whyItMatters: string;
  challenge: string;
  introduction: string;
  image: string;
  imageAlt: string;
  status: string;
  stats: { value: string; label: string }[];
  questions: string[];
  methods: string[];
  progress: string[];
  nextSteps: string[];
  resources?: { label: string; href: string; detail: string }[];
};

export const researchTopics: ResearchTopic[] = [
  {
    slug: "agn",
    shortTitle: "AGN",
    title: "Active Galactic Nuclei",
    eyebrow: "Galaxies · black holes · feedback",
    summary: "Finding the structures carved by accreting supermassive black holes—and connecting their morphology to the physics of galaxy evolution.",
    whyItMatters: "Ionization cones show us where radiation from an accreting supermassive black hole escapes into its surroundings. Their shape can reveal the geometry and obscuration of the nucleus, while their reach helps us investigate how an AGN interacts with gas across its host galaxy.",
    challenge: "Cones do not arrive as clean geometric shapes. Projection effects, host-galaxy contamination, clumpy gas, irregular morphologies, and observational noise can all obscure their boundaries. Manual inspection and model-dependent fitting also make it difficult to analyze large samples consistently.",
    introduction: "My current work focuses on the systematic identification of AGN ionization cones. These extended regions of ionized gas trace where radiation from an active nucleus escapes into its host galaxy. I am developing a physically motivated machine-learning framework that can recognize these structures in astronomical imaging while remaining connected to the geometry and physics that produce them.",
    image: "/images/research/ngc1068_prediction.png",
    imageAlt: "Model prediction for the active galaxy NGC 1068",
    status: "Active research",
    stats: [
      { value: "1,000", label: "synthetic validation images" },
      { value: "0.647", label: "mean intersection-over-union" },
      { value: "3.7°", label: "mean position-angle error" },
    ],
    questions: [
      "How reliably can ionization cones be identified across large, heterogeneous samples?",
      "What can cone geometry reveal about obscuration and the orientation of an AGN?",
      "How do these energetic regions influence gas in their host galaxies?",
    ],
    methods: ["Astronomical image analysis", "Synthetic AGN systems", "Segmentation and morphology", "Physically motivated ML"],
    progress: [
      "Built a U-Net semantic-segmentation pipeline that produces pixel-level masks of diffuse ionized emission.",
      "Validated on 1,000 synthetic inputs, reaching a mean intersection-over-union of 0.647 ± 0.199, a mean position-angle error of 3.7° ± 2.7°, and a mean opening-angle error of 13.1° ± 7.1°.",
      "Demonstrated foundational transfer to HST imaging of NGC 1068; the recovered position angle was within 3.4% of the reference value.",
      "Identified opening-angle recovery as a key limitation: the NGC 1068 result had 57.6% error, exposing sensitivity to brightness structure and simplified synthetic training data.",
    ],
    nextSteps: [
      "Expand testing to the full GATOS sample and other nearby Seyfert galaxies.",
      "Improve the synthetic physics, especially host-galaxy extinction and line-of-sight projection.",
      "Test how robustly recovered morphology can support large, consistently analyzed AGN samples.",
    ],
    resources: [
      { label: "View research poster", href: "/presentations/20260508_A%20Physically%20Motivated%20Machine%20Learning%20Framework%20for%20Systematic%20Identification%20of%20AGN%20Ionization%20Cones_olsonwilliam_21.pdf", detail: "Methods, validation results, and the NGC 1068 proof of concept · PDF" },
      { label: "View the analysis code", href: "https://github.com/2xwlll/IonizationCone-Automation", detail: "Synthetic data, U-Net segmentation, and geometric measurements · GitHub" },
    ],
  },
  {
    slug: "seti",
    shortTitle: "SETI",
    title: "Search for Extraterrestrial Intelligence",
    eyebrow: "Radio astronomy · technosignatures · signal processing",
    summary: "Searching radio observations for narrowband drifting signals that stand out from terrestrial interference and cosmic noise.",
    whyItMatters: "A credible technosignature search asks whether a signal is better explained by technology than by known astrophysical or terrestrial sources. Radio observations give us a powerful way to conduct that search systematically across wide frequency ranges and many targets.",
    challenge: "The data volume is large, candidate signals can be weak, and human technology fills the radio spectrum with interference. Real signals can also drift in frequency with time, so a useful pipeline must preserve that behavior while reducing raw telescope recordings into products that can be inspected and searched.",
    introduction: "As an NSF REU researcher with the Breakthrough Listen Initiative, I use Green Bank Telescope observations to compare technosignature-search methods across narrowband, mid-resolution, and rawspec data products. I evaluate turboSETI and BLISS with known spacecraft transmissions, including Voyager 1, before interpreting unknown candidates.",
    image: "/images/research/spliced_blc00010203040506o7o0111213141516o7o021222324252627_guppi_59046_81310_DIAG_VOYAGER-1_0015.rawspec.0002_waterfall.png",
    imageAlt: "Radio waterfall plot showing a Voyager 1 signal",
    status: "Active research",
    stats: [
      { value: "3", label: "data resolutions compared" },
      { value: "2", label: "search pipelines evaluated" },
      { value: "Voyager 1", label: "known-signal validation source" },
    ],
    questions: [
      "How can weak drifting signals be separated from radio-frequency interference?",
      "Which representations preserve the information needed for reliable candidate detection?",
      "How can search pipelines remain fast, reproducible, and scientifically interpretable?",
    ],
    methods: ["Radio waterfall analysis", "Narrowband signal searches", "Data-pipeline development", "Candidate validation"],
    progress: [
      "Conducting radio technosignature searches with Green Bank Telescope observations through the Breakthrough Listen REU.",
      "Comparing turboSETI and BLISS across narrowband, MidRes, and rawspec datasets to test the effect of spectral resolution.",
      "Using known spacecraft transmissions to evaluate recovery and candidate-validation workflows before interpreting unknown signals.",
    ],
    nextSteps: [
      "Quantify how spectral resolution changes detection sensitivity and recovered signal properties.",
      "Document the pipeline from raw input through candidate comparison and validation.",
      "Identify where automated searches confuse spacecraft signals, radio-frequency interference, and candidate technosignatures.",
    ],
    resources: [
      { label: "Open the MidRes tutorial", href: "https://github.com/2xwlll/midres-tutorial", detail: "A notebook introduction to the data and workflow · GitHub" },
      { label: "View the narrowband test", href: "https://github.com/2xwlll/midres_narrow", detail: "Testing a turboSETI workflow on narrowband and MidRes data · GitHub" },
    ],
  },
  {
    slug: "ml",
    shortTitle: "ML",
    title: "Machine Learning for Astronomy",
    eyebrow: "Scientific ML · computer vision · inference",
    summary: "Building machine-learning tools around physical questions, with an emphasis on useful predictions rather than black-box answers.",
    whyItMatters: "Modern astronomical observations are too large and complex to interpret by hand alone. Machine learning can make analysis scalable, but its scientific value depends on whether its outputs remain testable, interpretable, and connected to the physical question that motivated the model.",
    challenge: "Astronomical labels are scarce, observations contain selection effects and noise, and simulations never reproduce reality perfectly. A model can perform well on a benchmark while learning shortcuts that fail on the sky, making validation and failure analysis as important as model accuracy.",
    introduction: "Machine learning is a method running through much of my research rather than an end in itself. I use synthetic data, controlled signal injection, preprocessing pipelines, and model evaluation to ask what a system has actually learned. The goal is to scale astronomical analysis without losing sight of uncertainty, selection effects, or the physical meaning of a prediction.",
    image: "/images/research/NGC7640_Injection.png",
    imageAlt: "Synthetic structure injected into an astronomical observation of NGC 7640",
    status: "Active research",
    stats: [
      { value: "4", label: "core validation methods" },
      { value: "Pixel-level", label: "segmentation predictions" },
      { value: "Synthetic → real", label: "transfer being tested" },
    ],
    questions: [
      "How can physical assumptions be built into training data and model design?",
      "When does a model generalize to real observations rather than memorize simulations?",
      "How should uncertainty and failure cases be communicated to astronomers?",
    ],
    methods: ["Deep learning", "Synthetic-data generation", "Signal injection", "Validation and interpretability"],
    progress: [
      "Generating controlled synthetic systems where geometry and physical parameters are known by construction.",
      "Using signal injection to test whether processing and recovery methods retain scientifically meaningful structure.",
      "Applying image segmentation to recover extended, irregular emission rather than only assigning a class label.",
      "Testing transfer from synthetic training data to real astronomical observations and examining where it fails.",
    ],
    nextSteps: [
      "Make uncertainty and failure modes first-class outputs of the analysis.",
      "Compare physically informed training strategies with simpler baselines.",
      "Turn reusable preprocessing, simulation, and evaluation code into documented research tools.",
    ],
    resources: [
      { label: "View the segmentation pipeline", href: "https://github.com/2xwlll/IonizationCone-Automation", detail: "A working example of physically informed machine learning · GitHub" },
    ],
  },
  {
    slug: "hwo",
    shortTitle: "HWO",
    title: "Habitable Worlds Observatory",
    eyebrow: "Future direction · exoplanets · data post-processing",
    summary: "Preparing for the post-processing challenges behind direct observations of potentially habitable worlds.",
    whyItMatters: "Directly observing a potentially habitable planet would let astronomers separate its light from its star and study the information carried by that light. The scientific return, however, depends on extracting an extraordinarily faint signal without introducing processing artifacts that could be mistaken for a planet or atmospheric feature.",
    challenge: "A planet can be billions of times fainter than its host star. Even after a coronagraph suppresses most starlight, residual speckles, detector effects, telescope stability, and astrophysical backgrounds remain. Post-processing must remove those signals while preserving accurate planet photometry and spectra.",
    introduction: "This is a future research direction I plan to grow into. NASA's Habitable Worlds Observatory concept will demand exceptionally careful post-processing to separate faint planetary light from residual starlight, instrumental structure, and noise. I am interested in how physically informed computational methods can improve that separation while preserving trustworthy measurements of exoplanet signals.",
    image: "/images/general/research-exoplanet.jpg",
    imageAlt: "Artist's view of a distant planetary system",
    status: "Future direction",
    stats: [
      { value: "3", label: "stages: suppress, recover, validate" },
      { value: "Faint planets", label: "signals to preserve" },
      { value: "Uncertainty", label: "must remain measurable" },
    ],
    questions: [
      "How can post-processing suppress residual starlight without erasing a planet signal?",
      "Where can ML complement established high-contrast imaging methods responsibly?",
      "How do we propagate processing uncertainty into claims about potentially habitable worlds?",
    ],
    methods: ["High-contrast imaging", "Data post-processing", "Signal recovery", "Uncertainty-aware ML"],
    progress: [
      "Defining this as a future direction that connects my interests in astronomical imaging, signal recovery, and physically informed machine learning.",
      "Building relevant experience through synthetic-data generation, controlled injection tests, segmentation, and validation on real observations.",
      "Following the computational problems that will shape future direct-imaging and exoplanet-characterization pipelines.",
    ],
    nextSteps: [
      "Develop a small high-contrast-imaging testbed using public or simulated data.",
      "Compare classical starlight-subtraction methods with uncertainty-aware ML approaches.",
      "Study how post-processing choices propagate into recovered planet brightness and spectra.",
    ],
  },
];

export function getResearchTopic(slug: string) {
  return researchTopics.find((topic) => topic.slug === slug);
}
