export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProductSpecs {
  chassis?: string;
  optics?: string;
  network?: string;
  battery?: string;
  weight?: string;
  materials?: string;
  edition?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: "Wearables" | "Optics" | "Sound" | "Neural" | "Horology" | "Accessories";
  categoryLabel: string;
  price: number;
  image: string;
  images: string[];
  specs: ProductSpecs;
  reviews: ProductReview[];
  tag?: string;
  inStock: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "vector-optics-x1",
    name: "Vector Optics X1",
    subtitle: "Modular Vision Enhancement",
    description: "Precision-engineered modular eyewear designed for the digital vanguard. The Vector Optics X1 fuses high-performance carbon frames with reactive lenses that filter digital fatigue and enhance real-world environmental fidelity.",
    category: "Optics",
    categoryLabel: "OPTICS",
    price: 1250,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNobQCSm8TMO3UF2CzLCmWTe5rhwOiY3U9_vQs4TNLa2zq0N_vQhdaTUWHEYY1sonIixqwSUvufUarakcIcJpWFYtU6ALWj2PUH-fCgjezaTmxYxh6ek43dgN2HGPvoVYyy81U3Qn9Jh4fyH-p4X3VufS3GzMb8ruhkiDbGQvUnJT1vAGRiP1-bvmL_S0iWo2sf9Xs0UthvyC0XnmTwiNrcddwmZiDGCCNX_5tUiXFHbieNFc98iTz1PlW3JUjPGyZKQbTI87lCw",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNobQCSm8TMO3UF2CzLCmWTe5rhwOiY3U9_vQs4TNLa2zq0N_vQhdaTUWHEYY1sonIixqwSUvufUarakcIcJpWFYtU6ALWj2PUH-fCgjezaTmxYxh6ek43dgN2HGPvoVYyy81U3Qn9Jh4fyH-p4X3VufS3GzMb8ruhkiDbGQvUnJT1vAGRiP1-bvmL_S0iWo2sf9Xs0UthvyC0XnmTwiNrcddwmZiDGCCNX_5tUiXFHbieNFc98iTz1PlW3JUjPGyZKQbTI87lCw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfelaYVXay8PwaPNwtPypSOKXYbLxh6ZcDl06LwU2LD2OOQJiFtudCWOi_394JhSpYv-UYzJP5XU-ClP7MrODcsjzOCvfsfJdQ1YXHWcGtBFBL4UNS10lX-yKJTFNd9psMS7oFdimir9-fE5fKi_p4NVPjjd4VggU74Awj_aTr4M2FB-mhWyUiIuA82oZE0Hm0VDUOX28JpkCsF3AkCwX3xJFRvpddy4XIDlTMVjKMWY05Ua9-C4XYeIt3XL-GS0mKcUHmgAfR2w"
    ],
    specs: {
      chassis: "Carbon Fiber Hybrid",
      optics: "Prismatic Waveguide Lenses",
      network: "5.8G Direct Link",
      battery: "12h Active HUD HUD",
      weight: "48g"
    },
    reviews: [
      { id: "r1", author: "Dr. Alexander V.", rating: 5, date: "2026-04-12", comment: "The field of view clarity is mind-bending. The modular swap is seamless." },
      { id: "r2", author: "Evelyn K.", rating: 4, date: "2026-05-02", comment: "Excellent build. HUD is lightweight and doesn't stress the eyes." }
    ],
    tag: "New Release",
    inStock: true
  },
  {
    id: "aura-sound-p2",
    name: "Aura Sound P2",
    subtitle: "Spatial Audio Engine",
    description: "Suspended in pure acoustic space, the Aura Sound P2 represents the pinnacle of over-ear high-fidelity spatial reproduction. Engineered with proprietary biometric active dampening.",
    category: "Sound",
    categoryLabel: "AUDIO",
    price: 890,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1E6D7Ht1-RuCKVwSXw8sxHirhvyw5K2Ht0PIxrwyGqx0GiBy_6gpE7g4LEKu5IBgkcwimW5TybDaW_ieKtEXwOYMHJ8wiZ1w4_G6LjqNWg2TN9RhQDtKrxKZdNL6g2EGuMKb4ImccA-K4HX29orlr5VVDK4YNr4fHKWixCj95rsM2GMgWtceUlU6Dm0IYmoqjfzJ2oeqaUwZJ53qkNVjk6Bx9riajXC_3HGE_zb46XZET6sx9Zp2ARnGtxkZ4VP06OW8Kj3K6XA",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1E6D7Ht1-RuCKVwSXw8sxHirhvyw5K2Ht0PIxrwyGqx0GiBy_6gpE7g4LEKu5IBgkcwimW5TybDaW_ieKtEXwOYMHJ8wiZ1w4_G6LjqNWg2TN9RhQDtKrxKZdNL6g2EGuMKb4ImccA-K4HX29orlr5VVDK4YNr4fHKWixCj95rsM2GMgWtceUlU6Dm0IYmoqjfzJ2oeqaUwZJ53qkNVjk6Bx9riajXC_3HGE_zb46XZET6sx9Zp2ARnGtxkZ4VP06OW8Kj3K6XA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZV0OLcBqbnJ7BNo-ew_-QFihPPfQgyVO_5IuECBdyDNnzfjvHZBYGYj5nGkBiIdepNbVFNv63GhQFSEMvYO12eUthadoXa8aM2FWoj-zvQso3lznOU7Wk_goBQ5BIthJymYRmPlvO97riuVJxCkewoD6oQtnw2WfZlOCW0UExExq8RBJjDiqb4uWEEbuukK-9djapGzcLvTBURny6tCJWiBJeUB1FDaRpLVV1bLx0_XUbcZLmGBquqpPWyHg9eWhljNRnAia6Uw"
    ],
    specs: {
      chassis: "Brushed Aluminum & Premium Knit",
      optics: "Beryllium Dynamic Drivers",
      network: "6G Ultra-Low Latency",
      battery: "36h Continuous Playback",
      weight: "285g"
    },
    reviews: [
      { id: "r3", author: "Liam S.", rating: 5, date: "2026-03-22", comment: "The soundstage feels wider than a studio room. Deep, responsive lows." }
    ],
    inStock: true
  },
  {
    id: "chronos-core",
    name: "Chronos Core",
    subtitle: "Biometric Sync Wearable",
    description: "Limited edition biometric wrist engine. Utilizing microscopic fluidic sensors that record, balance, and synchronize dynamic human vitals in real-time.",
    category: "Neural",
    categoryLabel: "BIOMETRIC",
    price: 2400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYuogL1voUkFPemnIzRy-_vucky81na_TgUDPYx_B-_7544pRCKJnMUl-_m6BtzK9wxqfNhHOf1O2bOlQy7rjo9xwNVD54CXe1HxWezWh97IdrsNugskrclENSKIdlTvzxQL9y89BZ19dimgByAjntThd83JjGMaCzf5YeGY05dj_cb0u6yhmoGlsFOv98TTGLnwdohdoXhRBoK9Sz3TdIOzmYYm-Qo17V9DbuUz_hURvbTrcUEVngckYNZh8C8-s6fipl70cYQw",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYuogL1voUkFPemnIzRy-_vucky81na_TgUDPYx_B-_7544pRCKJnMUl-_m6BtzK9wxqfNhHOf1O2bOlQy7rjo9xwNVD54CXe1HxWezWh97IdrsNugskrclENSKIdlTvzxQL9y89BZ19dimgByAjntThd83JjGMaCzf5YeGY05dj_cb0u6yhmoGlsFOv98TTGLnwdohdoXhRBoK9Sz3TdIOzmYYm-Qo17V9DbuUz_hURvbTrcUEVngckYNZh8C8-s6fipl70cYQw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoReltQL9-HX4dttGA4PPvCUInW4JSBjtmlRjz4GU73b3D9zH6SbU1JSMU7Y1yCcfrTg7cPDGtMbOmygMyFsm4vFK5HQlIYU2jg0nv6dfRXXSVjrZYUORDN0qN_N2IHkqpgKkb-Tyyh0mt--8NIoL8FG3tcAdVg8R_WLL1qQAgpfpWFyrjrgRRU7HWQY3L8wqBXzyOoL1Awext2RKbouzK8p7GzHVhi_ATRew8IAbiUCv7QxIHr0oauEZcHjQ9X71sfE5iczqGjQ"
    ],
    specs: {
      chassis: "Full Ceramic Monoblock",
      optics: "Generative Holographic Display",
      network: "Neural Web Access",
      battery: "7-day Constant Bio-tracking",
      edition: "04/50 Limited Release"
    },
    reviews: [
      { id: "r4", author: "Julian M.", rating: 5, date: "2026-05-18", comment: "Bespoke piece of technology. Feels like wearing an organic sculpture." }
    ],
    tag: "Limited Edition",
    inStock: true
  },
  {
    id: "spectral-s1",
    name: "Spectral S1",
    subtitle: "Light Filter Array",
    description: "Designed for intensive visual computing environments. The Spectral S1 shields optoelectronic channels from high-power radiation while preserving luxurious geometric frame precision.",
    category: "Optics",
    categoryLabel: "VISION",
    price: 650,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClcGRdGl0Z2ckxLAAjgGnHZBHe-qAkElC5nx9XRD0tVUf1QlazCwZvd4OlywccD-WuN-kKHENm2_OJK2aw4vzqRDwfT3jHWc9-77Dyw4GJaa75d-bvK3OFZiJIo14HZomYV_lwKM3C3HQdp4ggmF13m7oCJqeBdkV_9MGmvu03RrCE3nXatBgdXdgaccUmnh-qx5TsxPFvMjpPzEwgFDeivFJuqQwzFvoLuDlvXTCj5krrtVAVj99p4RvHUsRNIcN_XFLMGDp8DQ",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClcGRdGl0Z2ckxLAAjgGnHZBHe-qAkElC5nx9XRD0tVUf1QlazCwZvd4OlywccD-WuN-kKHENm2_OJK2aw4vzqRDwfT3jHWc9-77Dyw4GJaa75d-bvK3OFZiJIo14HZomYV_lwKM3C3HQdp4ggmF13m7oCJqeBdkV_9MGmvu03RrCE3nXatBgdXdgaccUmnh-qx5TsxPFvMjpPzEwgFDeivFJuqQwzFvoLuDlvXTCj5krrtVAVj99p4RvHUsRNIcN_XFLMGDp8DQ"
    ],
    specs: {
      chassis: "Carbon Fiber Base",
      optics: "Iridescent Lens Matrix",
      network: "Passive Ambient Blocking",
      battery: "N/A",
      weight: "32g"
    },
    reviews: [],
    inStock: true
  },
  {
    id: "pulse-buds-3",
    name: "Pulse Buds 3",
    subtitle: "Neural Audio Interface",
    description: "Compact in-ear wireless architecture that provides direct neural spatial feedback. Immersive ambient noise translation mimics high-fidelity listening booths in real-time.",
    category: "Sound",
    categoryLabel: "AUDIO",
    price: 420,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-Pt1FoUx5cfHyhjbsUVYqfow2H9EhxaauwhEyUTy8vdt_BOsgMH_3iXrgG8efE7CVVmriTp_14CelZxXUJHZTn54hvKbTOFLLq4iEEg-qH20jN21Tq6BjcGs_LSYMSTbduM3VnqHrlXxxge9aVXsJwiBH67K0v3Q4miLvw9DWzApInDSkPaHgeimLSL_LQLiMDYpvItvpBoXTwm3hWWmXHrNn0AXInP5QbKdG8wu2q_PcCNjyKASJtNUGCFehvzEVrsjJ227g",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-Pt1FoUx5cfHyhjbsUVYqfow2H9EhxaauwhEyUTy8vdt_BOsgMH_3iXrgG8efE7CVVmriTp_14CelZxXUJHZTn54hvKbTOFLLq4iEEg-qH20jN21Tq6BjcGs_LSYMSTbduM3VnqHrlXxxge9aVXsJwiBH67K0v3Q4miLvw9DWzApInDSkPaHgeimLSL_LQLiMDYpvItvpBoXTwm3hWWmXHrNn0AXInP5QbKdG8wu2q_PcCNjyKASJtNUGCFehvzEVrsjJ227g"
    ],
    specs: {
      chassis: "Translucent Frosted Casing",
      optics: "Beryllium Micro Drivers",
      network: "Neural Sync v4",
      battery: "8h Earbuds / 32h Case",
      weight: "6.2g per bud"
    },
    reviews: [
      { id: "r5", author: "Sarah L.", rating: 4, date: "2026-05-10", comment: "Tiny but insanely detailed sound. The neural EQ adjustment is incredibly fast." }
    ],
    inStock: true
  },
  {
    id: "lumina-handheld",
    name: "Lumina Handheld",
    subtitle: "Personal Intelligence Hub",
    description: "Crafted with micro-machined Grade 5 Titanium chassis, this personal node holds a custom AI companion matrix and operates on direct quantum networking layers.",
    category: "Neural",
    categoryLabel: "INTELLIGENCE",
    price: 3200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgjpsPyvmh54JJLvzXDH8w-kbdGrt-gh1ggNDfAe5rUtxoDKj804IFah9p7qu8RKl77CIYCvXYKB79ca5t0OebLjAWNkZ6d_yncRQz7qRgRyNdc1ZG8pAu6oSGm0iA_017Sk0C1wMxabs-PpK4zwMWpSl9y2d4t2yX2Yl4IUZoplr-fJYAxl3HDOVct8UfWbu88gHlkEMW5Iyenpe0ErCZQEcdxtHpjqmyRoC-1PT45-4Jfp2EwnEa16F5SME5os82UXHn6_JSuw",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgjpsPyvmh54JJLvzXDH8w-kbdGrt-gh1ggNDfAe5rUtxoDKj804IFah9p7qu8RKl77CIYCvXYKB79ca5t0OebLjAWNkZ6d_yncRQz7qRgRyNdc1ZG8pAu6oSGm0iA_017Sk0C1wMxabs-PpK4zwMWpSl9y2d4t2yX2Yl4IUZoplr-fJYAxl3HDOVct8UfWbu88gHlkEMW5Iyenpe0ErCZQEcdxtHpjqmyRoC-1PT45-4Jfp2EwnEa16F5SME5os82UXHn6_JSuw"
    ],
    specs: {
      chassis: "Grade 5 Titanium Monocoque",
      optics: "Edge-to-Edge Liquid Crystal OLED",
      network: "6G Quantum Telemetry",
      battery: "144h Standby Runtime",
      weight: "162g"
    },
    reviews: [],
    inStock: true
  },
  {
    id: "lumina-core-v1",
    name: "Lumina Core v.1",
    subtitle: "Precision Interactive Hub",
    description: "The core smart accessory that serves as your central command. A polished ceramic dial syncs with all wearables to manage smart interfaces seamlessly.",
    category: "Accessories",
    categoryLabel: "ACCESSORIES",
    price: 2450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_bKfyArAVFvKFL9Mh2iqK6A8NYlfIKr-hDBK3xP-et0XWZshRmTCgPW1n0UEwZ8iKkF47IjcrCNpPOfIWFZBWaMUnmTwi9oy0PjLWZEXWiFDD157YXmQ-_0XhWU1XTRkZfIffqlYnprr-iqDGLwVe0RcQAOI-v2f1d-0qTXhQ-OE53PUgVb6l_gXF5r-Yaag70o8gnmdGPqfvGky2G8mLIAcuohowz2aM1SL3t6UrwScJavWE10EWLrXF36MGIcRBXWlKEIzNrg",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_bKfyArAVFvKFL9Mh2iqK6A8NYlfIKr-hDBK3xP-et0XWZshRmTCgPW1n0UEwZ8iKkF47IjcrCNpPOfIWFZBWaMUnmTwi9oy0PjLWZEXWiFDD157YXmQ-_0XhWU1XTRkZfIffqlYnprr-iqDGLwVe0RcQAOI-v2f1d-0qTXhQ-OE53PUgVb6l_gXF5r-Yaag70o8gnmdGPqfvGky2G8mLIAcuohowz2aM1SL3t6UrwScJavWE10EWLrXF36MGIcRBXWlKEIzNrg"
    ],
    specs: {
      chassis: "Polished Ceramic & Black Marble",
      optics: "Circular Fiber Optic Ring",
      network: "Ultra-Wideband Link",
      battery: "48h Runtime",
      weight: "115g"
    },
    reviews: [
      { id: "r6", author: "Harlan F.", rating: 5, date: "2026-04-20", comment: "Subtle and absolutely luxurious dial feel. Highly recommend." }
    ],
    inStock: true
  },
  {
    id: "eclipse-chronograph",
    name: "Eclipse Chronograph",
    subtitle: "High-End Mechanical Precision",
    description: "Designed for the ultimate connoisseur. High-performance mechanical chronograph utilizing gold-etched components and full sapphire glass display parameters.",
    category: "Horology",
    categoryLabel: "HOROLOGY",
    price: 8900,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0csJvyNduaDr8FvNQNim2hDDhvKOrWnZ2-oUHLDUV3xSgQL9tjfa-C7Q3o2ywJD8T0cTYIwUkS1nK9AUVh1XJCqca7bAf3d0c7clM4n8GB9xGXHD5j-2PKKdIYQ33DwLXT1Sdbul7OACqHDd7X0Y7mR9D2GS39CaGBG92yyAQs2hlaJClqtQqaBbFf0sS6wz08zq0paP8pQehhbstSW5nXHMB04lO6RQbEc_pxtFFRjM82Lu4ca_-Md5z3_jKkWPnx22-gSvzVA",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0csJvyNduaDr8FvNQNim2hDDhvKOrWnZ2-oUHLDUV3xSgQL9tjfa-C7Q3o2ywJD8T0cTYIwUkS1nK9AUVh1XJCqca7bAf3d0c7clM4n8GB9xGXHD5j-2PKKdIYQ33DwLXT1Sdbul7OACqHDd7X0Y7mR9D2GS39CaGBG92yyAQs2hlaJClqtQqaBbFf0sS6wz08zq0paP8pQehhbstSW5nXHMB04lO6RQbEc_pxtFFRjM82Lu4ca_-Md5z3_jKkWPnx22-gSvzVA"
    ],
    specs: {
      chassis: "Gold-Etched Titanium Alloy",
      optics: "Sapphire Anti-Reflective Lens",
      network: "Mechanical Automatic Movement",
      battery: "72h Power Reserve",
      weight: "148g"
    },
    reviews: [
      { id: "r7", author: "Cynthia R.", rating: 5, date: "2026-05-11", comment: "Breathtaking precision. The gold etch details shimmer under light leaks beautifully." }
    ],
    tag: "NEW",
    inStock: true
  }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getRelatedProducts(id: string, count = 4): Product[] {
  return mockProducts.filter(p => p.id !== id).slice(0, count);
}
