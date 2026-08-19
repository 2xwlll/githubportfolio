export type ResearchTopic = {
  slug: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  summary: string;
  introduction: string;
  image: string;
  imageAlt: string;
  status: string;
  questions: string[];
  methods: string[];
};

export const researchTopics: ResearchTopic[] = [
  {
    slug: "agn",
    shortTitle: "AGN",
    title: "Active Galactic Nuclei",
    eyebrow: "Galaxies · black holes · feedback",
    summary: "Finding the structures carved by accreting supermassive black holes—and connecting their morphology to the physics of galaxy evolution.",
    introduction: "My current work focuses on the systematic identification of AGN ionization cones. These extended regions of ionized gas trace where radiation from an active nucleus escapes into its host galaxy. I am developing a physically motivated machine-learning framework that can recognize these structures in astronomical imaging while remaining connected to the geometry and physics that produce them.",
    image: "/images/research/ngc1068_prediction.png",
    imageAlt: "Model prediction for the active galaxy NGC 1068",
    status: "Active research",
    questions: [
      "How reliably can ionization cones be identified across large, heterogeneous samples?",
      "What can cone geometry reveal about obscuration and the orientation of an AGN?",
      "How do these energetic regions influence gas in their host galaxies?",
    ],
    methods: ["Astronomical image analysis", "Synthetic AGN systems", "Segmentation and morphology", "Physically motivated ML"],
  },
  {
    slug: "seti",
    shortTitle: "SETI",
    title: "Search for Extraterrestrial Intelligence",
    eyebrow: "Radio astronomy · technosignatures · signal processing",
    summary: "Searching radio observations for narrowband drifting signals that stand out from terrestrial interference and cosmic noise.",
    introduction: "I work with radio technosignature data and the pipelines that turn raw telescope recordings into searchable observations. My experience includes OSCAR-to-SETI mid-resolution data processing and examining diagnostic waterfall plots, where frequency, time, and signal strength make candidate signals visible. Voyager 1 provides a useful known signal for validating that these tools recover what they should.",
    image: "/images/research/spliced_blc00010203040506o7o0111213141516o7o021222324252627_guppi_59046_81310_DIAG_VOYAGER-1_0015.rawspec.0002_waterfall.png",
    imageAlt: "Radio waterfall plot showing a Voyager 1 signal",
    status: "Active research",
    questions: [
      "How can weak drifting signals be separated from radio-frequency interference?",
      "Which representations preserve the information needed for reliable candidate detection?",
      "How can search pipelines remain fast, reproducible, and scientifically interpretable?",
    ],
    methods: ["Radio waterfall analysis", "Narrowband signal searches", "Data-pipeline development", "Candidate validation"],
  },
  {
    slug: "ml",
    shortTitle: "ML",
    title: "Machine Learning for Astronomy",
    eyebrow: "Scientific ML · computer vision · inference",
    summary: "Building machine-learning tools around physical questions, with an emphasis on useful predictions rather than black-box answers.",
    introduction: "Machine learning is a method running through much of my research rather than an end in itself. I use synthetic data, controlled signal injection, preprocessing pipelines, and model evaluation to ask what a system has actually learned. The goal is to scale astronomical analysis without losing sight of uncertainty, selection effects, or the physical meaning of a prediction.",
    image: "/images/research/NGC7640_Injection.png",
    imageAlt: "Synthetic structure injected into an astronomical observation of NGC 7640",
    status: "Active research",
    questions: [
      "How can physical assumptions be built into training data and model design?",
      "When does a model generalize to real observations rather than memorize simulations?",
      "How should uncertainty and failure cases be communicated to astronomers?",
    ],
    methods: ["Deep learning", "Synthetic-data generation", "Signal injection", "Validation and interpretability"],
  },
  {
    slug: "hwo",
    shortTitle: "HWO",
    title: "Habitable Worlds Observatory",
    eyebrow: "Future direction · exoplanets · data post-processing",
    summary: "Preparing for the post-processing challenges behind direct observations of potentially habitable worlds.",
    introduction: "This is a future research direction I plan to grow into. NASA's Habitable Worlds Observatory concept will demand exceptionally careful post-processing to separate faint planetary light from residual starlight, instrumental structure, and noise. I am interested in how physically informed computational methods can improve that separation while preserving trustworthy measurements of exoplanet signals.",
    image: "/images/general/research-exoplanet.jpg",
    imageAlt: "Artist's view of a distant planetary system",
    status: "Future direction",
    questions: [
      "How can post-processing suppress residual starlight without erasing a planet signal?",
      "Where can ML complement established high-contrast imaging methods responsibly?",
      "How do we propagate processing uncertainty into claims about potentially habitable worlds?",
    ],
    methods: ["High-contrast imaging", "Data post-processing", "Signal recovery", "Uncertainty-aware ML"],
  },
];

export function getResearchTopic(slug: string) {
  return researchTopics.find((topic) => topic.slug === slug);
}
