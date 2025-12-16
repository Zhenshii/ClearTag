import { Brand, Material, MaterialCategory } from './types';

export const BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Rawganique',
    description: 'Chemical-free organic cotton, linen, and hemp clothing made in USA & Europe.',
    priceRange: '$$',
    categories: ['Men', 'Women', 'Home'],
    primaryFabrics: ['Hemp', 'Linen', 'Organic Cotton'],
    location: 'USA / Canada',
    shipping: 'Worldwide',
    websiteUrl: 'https://rawganique.com',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Mate the Label',
    description: 'Clean essentials made with organic cotton and non-toxic dyes.',
    priceRange: '$$',
    categories: ['Women', 'Activewear'],
    primaryFabrics: ['Organic Cotton', 'Tencel'],
    location: 'Los Angeles, USA',
    shipping: 'International',
    websiteUrl: 'https://matethelabel.com',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Harvest & Mill',
    description: '100% USA grown, spun, and sewn organic cotton clothing.',
    priceRange: '$$',
    categories: ['Unisex', 'Basics'],
    primaryFabrics: ['Organic Cotton'],
    location: 'USA',
    shipping: 'USA',
    websiteUrl: 'https://harvestandmill.com',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Industry of All Nations',
    description: 'Unbleached, undyed, and naturally dyed alpaca and organic cotton.',
    priceRange: '$$$',
    categories: ['Men', 'Women'],
    primaryFabrics: ['Alpaca', 'Organic Cotton'],
    location: 'USA',
    shipping: 'Worldwide',
    websiteUrl: 'https://industryofallnations.com',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Pact',
    description: 'Affordable organic cotton basics produced in Fair Trade factories.',
    priceRange: '$',
    categories: ['Men', 'Women', 'Kids'],
    primaryFabrics: ['Organic Cotton'],
    location: 'USA',
    shipping: 'USA',
    websiteUrl: 'https://wearpact.com',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Eileen Fisher',
    description: 'Timeless designs focused on circularity and organic fibers.',
    priceRange: '$$$$',
    categories: ['Women'],
    primaryFabrics: ['Linen', 'Organic Cotton', 'Wool', 'Silk'],
    location: 'USA',
    shipping: 'International',
    websiteUrl: 'https://eileenfisher.com',
    imageUrl: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'Kotn',
    description: 'Ethically made Egyptian cotton staples supporting farming communities.',
    priceRange: '$$',
    categories: ['Men', 'Women', 'Home'],
    primaryFabrics: ['Egyptian Cotton', 'Linen'],
    location: 'Canada',
    shipping: 'International',
    websiteUrl: 'https://kotn.com',
    imageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Beaumont Organic',
    description: 'Contemporary conscious clothing from the home of Manchester cotton.',
    priceRange: '$$$',
    categories: ['Women'],
    primaryFabrics: ['Organic Cotton', 'Linen'],
    location: 'UK',
    shipping: 'Worldwide',
    websiteUrl: 'https://beaumontorganic.com',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '9',
    name: 'Fair Indigo',
    description: 'Ethical clothing made from soft, organic Pima cotton, supporting fair wages in Peru.',
    priceRange: '$$',
    categories: ['Women', 'Men', 'Baby'],
    primaryFabrics: ['Organic Pima Cotton', 'Alpaca'],
    location: 'USA / Peru',
    shipping: 'USA',
    websiteUrl: 'https://www.fairindigo.com',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '10',
    name: 'Known Supply',
    description: 'Humanizing the apparel industry. Every item is hand-signed by the maker.',
    priceRange: '$$',
    categories: ['Men', 'Women', 'Unisex'],
    primaryFabrics: ['Organic Cotton'],
    location: 'USA',
    shipping: 'International',
    websiteUrl: 'https://knownsupply.com',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '11',
    name: 'People of Leisure',
    description: 'Small batch, slow fashion brand using deadstock fabrics and organic cotton.',
    priceRange: '$$',
    categories: ['Women', 'Unisex'],
    primaryFabrics: ['Organic Cotton', 'Hemp', 'Deadstock'],
    location: 'Los Angeles, USA',
    shipping: 'International',
    websiteUrl: 'https://peopleofleisure.co',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '12',
    name: 'Toad & Co',
    description: 'Socially and environmentally committed outdoor lifestyle brand suitable for trail to tavern.',
    priceRange: '$$',
    categories: ['Men', 'Women'],
    primaryFabrics: ['Organic Cotton', 'Tencel', 'Hemp'],
    location: 'USA',
    shipping: 'International',
    websiteUrl: 'https://www.toadandco.com',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '13',
    name: 'Reistor',
    description: 'Minimalist sustainable fashion focusing on hemp and organic cotton.',
    priceRange: '$$',
    categories: ['Women'],
    primaryFabrics: ['Hemp', 'Organic Cotton'],
    location: 'India',
    shipping: 'Worldwide',
    websiteUrl: 'https://reistor.com/collections/fabric-organic-cotton',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'
  }
];

export const MATERIALS: Material[] = [
  // --- NATURAL ---
  {
    id: 'm1',
    name: 'Organic Cotton',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'A',
    description: 'Cotton grown without toxic chemicals or GMOs. Uses significantly less water than conventional cotton.',
    pros: ['Biodegradable', 'Breathable', 'Soft', 'Hypoallergenic'],
    cons: ['Can be water-intensive if not rain-fed', 'Wrinkles easily'],
    careInstructions: ['Machine wash warm (40°C) or cold', 'Tumble dry low or line dry', 'Warm iron if needed'],
    ecoImpact: 'Low environmental impact when certified (GOTS).'
  },
  {
    id: 'm2',
    name: 'Linen (Flax)',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'A',
    description: 'Made from the flax plant. Very strong, absorbent, and dries faster than cotton.',
    pros: ['Requires minimal water/pesticides', 'Biodegradable', 'Durable', 'Cooling'],
    cons: ['Wrinkles very easily', 'Can feel stiff initially'],
    careInstructions: ['Machine wash gentle', 'Line dry preferred to prevent shrinkage', 'Iron while damp for crispness'],
    ecoImpact: 'Excellent. Flax improves soil quality and requires no irrigation.'
  },
  {
    id: 'm3',
    name: 'Hemp',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'A',
    description: 'One of the most eco-friendly fibers. Grows quickly, requires no pesticides, and returns nutrients to the soil.',
    pros: ['Extremely durable', 'UV resistant', 'Antimicrobial', 'Carbon negative'],
    cons: ['Can be rough until broken in', 'More expensive processing'],
    careInstructions: ['Machine wash cold/gentle', 'Line dry out of direct sun', 'Becomes softer with every wash'],
    ecoImpact: 'Superior. High yield per acre and soil regenerating.'
  },
  {
    id: 'm4',
    name: 'Wool',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'B',
    description: 'Animal fiber usually from sheep. Excellent insulator and naturally moisture-wicking.',
    pros: ['Biodegradable', 'Insulating', 'Wrinkle-resistant', 'Odor-resistant'],
    cons: ['Animal welfare concerns', 'Can be itchy', 'Methane emissions from sheep'],
    careInstructions: ['Hand wash cold or dry clean', 'Lay flat to dry', 'Do not wring or hang to avoid stretching'],
    ecoImpact: 'Moderate. Land use and methane are concerns, but it is renewable and long-lasting.'
  },
  {
    id: 'm5',
    name: 'Silk',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'B',
    description: 'Protein fiber produced by silkworms. Luxurious, soft, and strong.',
    pros: ['Biodegradable', 'Temperature regulating', 'Luxurious feel'],
    cons: ['Ethical concerns (silkworms killed)', 'Delicate care required'],
    careInstructions: ['Hand wash cold with pH neutral detergent', 'Air dry in shade', 'Cool iron or steam only'],
    ecoImpact: 'Moderate. Energy intensive processing. Peace silk is a better alternative.'
  },
  {
    id: 'm14',
    name: 'Cashmere (Cashmere Wool)',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'C',
    description: 'Luxury hair fiber from Cashmere goats. Extremely soft and warm.',
    pros: ['Ultra-soft', 'Excellent insulation', 'Lightweight'],
    cons: ['Land degradation from overgrazing', 'Expensive', 'High maintenance'],
    careInstructions: ['Hand wash strictly in cold water', 'Use wool-specific detergent', 'Lay flat to dry; never hang'],
    ecoImpact: 'High. Goats pull grass by roots, causing desertification in Mongolia/China.'
  },
  {
    id: 'm15',
    name: 'Alpaca',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'A',
    description: 'Fiber from alpacas. Warmer and stronger than sheep wool, and contains no lanolin.',
    pros: ['Hypoallergenic', 'Soft', 'Water-repellent', 'Durable'],
    cons: ['Expensive', 'Careful washing needed'],
    careInstructions: ['Hand wash cold gently', 'Lay flat to dry', 'Store folded, not hung'],
    ecoImpact: 'Low. Alpacas have soft pads (don\'t damage soil) and graze gently.'
  },
  {
    id: 'm16',
    name: 'Mohair',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'C',
    description: 'Silk-like yarn from the hair of the Angora goat. Known for high luster and sheen.',
    pros: ['Durable', 'Resilient', 'Takes dye well', 'Insulating'],
    cons: ['Can be scratchy', 'Ethical concerns in some supply chains'],
    careInstructions: ['Hand wash with gentle detergent', 'Avoid agitation', 'Lay flat to dry'],
    ecoImpact: 'Moderate to High. Land use and animal welfare are primary concerns.'
  },
  {
    id: 'm17',
    name: 'Angora',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'C',
    description: 'Downy coat of the Angora rabbit. Known for extreme softness and "halo" effect.',
    pros: ['Incredibly soft', 'Very warm (hollow fibers)', 'Lightweight'],
    cons: ['Sheds easily', 'Felts easily', 'Severe animal welfare concerns (plucking)'],
    careInstructions: ['Strictly hand wash cold', 'Handle very gently to avoid shedding', 'Lay flat to dry'],
    ecoImpact: 'Moderate. Small land footprint but high ethical risks.'
  },
  {
    id: 'm18',
    name: 'Leather (Genuine)',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'D',
    description: 'Tanned animal skin. Durable and ages well but has a heavy environmental footprint.',
    pros: ['Very durable', 'Repairable', 'Biodegradable (if veg-tanned)'],
    cons: ['Methane emissions', 'Toxic tanning chemicals (Chromium)', 'Animal welfare'],
    careInstructions: ['Professional leather clean only', 'Condition regularly', 'Keep away from direct heat and water'],
    ecoImpact: 'High. Cattle ranching causes deforestation; tanning pollutes water.'
  },
  {
    id: 'm19',
    name: 'Suede',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'D',
    description: 'Type of leather with a napped finish. Softer but less durable than full-grain leather.',
    pros: ['Soft texture', 'Pliable', 'Luxurious look'],
    cons: ['Stains easily', 'Not water resistant', 'Same eco-issues as leather'],
    careInstructions: ['Protect with suede spray', 'Use suede brush to remove dirt', 'Keep dry; professional clean only'],
    ecoImpact: 'High. Byproduct of livestock industry with chemically intensive processing.'
  },
  {
    id: 'm20',
    name: 'Jute',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'A',
    description: 'Long, soft, shiny vegetable fiber. Known as the "Golden Fiber".',
    pros: ['Biodegradable', 'Carbon dioxide absorber', 'Low pesticide needs'],
    cons: ['Coarse texture', 'Brittle', 'Yellows in sunlight'],
    careInstructions: ['Spot clean preferred', 'Do not wring/twist', 'Air dry only'],
    ecoImpact: 'Excellent. Rain-fed and improves soil fertility.'
  },
  {
    id: 'm21',
    name: 'Ramie',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'B',
    description: 'Flowering plant in the nettle family. One of the oldest fiber crops.',
    pros: ['Resistant to bacteria/mildew', 'Strong', 'Lustrous'],
    cons: ['Wrinkles easily', 'Stiff/brittle', 'Labor intensive extraction'],
    careInstructions: ['Machine wash gentle or hand wash', 'Line dry to prevent brittleness', 'Iron while damp'],
    ecoImpact: 'Good. Requires few chemicals but processing is energy intensive.'
  },
  {
    id: 'm22',
    name: 'Bamboo Linen',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'A',
    description: 'Bamboo fiber processed mechanically (retting) like flax, not chemically like viscose.',
    pros: ['Very sustainable', 'Durable', 'Antimicrobial'],
    cons: ['Rougher texture than bamboo rayon', 'Expensive', 'Hard to find'],
    careInstructions: ['Machine wash cool', 'Tumble dry low', 'Iron on low heat'],
    ecoImpact: 'Excellent. Bamboo grows fast without pesticides; mechanical processing is clean.'
  },

  // --- SEMI-SYNTHETIC ---
  {
    id: 'm6',
    name: 'Tencel (Lyocell)',
    category: MaterialCategory.SemiSynthetic,
    sustainabilityRating: 'B',
    description: 'Cellulose fiber made from wood pulp (usually eucalyptus) in a closed-loop system.',
    pros: ['Closed-loop production', 'Soft', 'Drapes well', 'Biodegradable'],
    cons: ['Energy intensive manufacturing', 'Chemical processing (though recovered)'],
    careInstructions: ['Machine wash cold/gentle', 'Line dry preferred', 'Cool iron if needed'],
    ecoImpact: 'Good. Solvents are recycled, but relies on forestry.'
  },
  {
    id: 'm7',
    name: 'Rayon (Viscose)',
    category: MaterialCategory.SemiSynthetic,
    sustainabilityRating: 'D',
    description: 'Cellulose fiber from wood pulp. Often involves heavy chemical use and deforestation.',
    pros: ['Cheap', 'Silk-like feel', 'Drapes well'],
    cons: ['Toxic chemicals (CS2)', 'Deforestation links', 'Weak when wet'],
    careInstructions: ['Hand wash cold usually required', 'Lay flat to dry', 'Iron inside out on low heat'],
    ecoImpact: 'Poor. Unless certified (e.g., EcoVero), often harmful to workers and environment.'
  },
  {
    id: 'm23',
    name: 'Modal',
    category: MaterialCategory.SemiSynthetic,
    sustainabilityRating: 'C',
    description: 'A type of rayon made specifically from beech tree pulp. Softer and more durable than viscose.',
    pros: ['Very soft', 'Resists shrinking', 'Breathable'],
    cons: ['Chemical processing', 'Can stretch out'],
    careInstructions: ['Machine wash gentle cycle', 'Tumble dry low or line dry', 'Low heat iron'],
    ecoImpact: 'Moderate. Better if it uses closed-loop (e.g. Tencel Modal), otherwise similar to viscose.'
  },
  {
    id: 'm24',
    name: 'Acetate',
    category: MaterialCategory.SemiSynthetic,
    sustainabilityRating: 'D',
    description: 'Semi-synthetic fiber derived from cellulose combined with acetic anhydride.',
    pros: ['Crisp hand', 'High luster', 'Drapes well'],
    cons: ['Melts easily', 'Dry clean only usually', 'Non-durable'],
    careInstructions: ['Dry clean is best', 'Hand wash cold if label permits', 'Do not tumble dry'],
    ecoImpact: 'Poor to Moderate. Production involves harsh chemicals.'
  },
  {
    id: 'm25',
    name: 'Bamboo Rayon',
    category: MaterialCategory.SemiSynthetic,
    sustainabilityRating: 'D',
    description: 'Viscose fabric made from bamboo. While the plant is sustainable, the chemical process is toxic.',
    pros: ['Soft', 'Antibacterial (debated)', 'Wicks moisture'],
    cons: ['Toxic production (CS2)', 'Misleading marketing'],
    careInstructions: ['Machine wash gentle cold', 'Tumble dry low', 'Cool iron'],
    ecoImpact: 'Poor. Often marketed as "Green" but process is chemically heavy and not closed-loop.'
  },
  {
    id: 'm13',
    name: 'Cupro',
    category: MaterialCategory.SemiSynthetic,
    sustainabilityRating: 'C',
    description: 'Regenerated cellulose fiber made from cotton linter (waste product) using the cuprammonium process.',
    pros: ['Silk-like feel', 'Breathable', 'Antistatic', 'Biodegradable'],
    cons: ['Chemical intensive production', 'Expensive to produce'],
    careInstructions: ['Machine wash gentle cold', 'Do not tumble dry', 'Iron on low heat'],
    ecoImpact: 'Moderate. Uses waste product (cotton linter), but chemical recovery varies by manufacturer.'
  },

  // --- SYNTHETIC ---
  {
    id: 'm8',
    name: 'Polyester',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Plastic fiber made from petroleum. The most common fabric in the world.',
    pros: ['Cheap', 'Durable', 'Wrinkle-free', 'Quick-drying'],
    cons: ['Non-biodegradable', 'Microplastic pollution', 'Not breathable', 'Relies on fossil fuels'],
    careInstructions: ['Machine wash warm/cool', 'Tumble dry low', 'Use Guppyfriend bag to catch microplastics'],
    ecoImpact: 'Very Poor. Major source of microplastics and carbon emissions.'
  },
  {
    id: 'm9',
    name: 'Recycled Polyester (rPET)',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'C',
    description: 'Polyester made from recycled plastic bottles.',
    pros: ['Diverts waste from landfills', 'Lower energy than virgin poly'],
    cons: ['Still sheds microplastics', 'Not infinitely recyclable', 'Can contain toxins'],
    careInstructions: ['Machine wash cool', 'Air dry preferred', 'Wash in filtration bag (e.g. Guppyfriend)'],
    ecoImpact: 'Better than virgin, but still problematic due to microplastics.'
  },
  {
    id: 'm10',
    name: 'Acrylic',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Synthetic fiber often used as a wool substitute.',
    pros: ['Cheap', 'Warm', 'Soft'],
    cons: ['Pills easily', 'Non-biodegradable', 'Microplastic shedder', 'Carcinogenic production chemicals'],
    careInstructions: ['Machine wash warm', 'Tumble dry low', 'Remove pilling with fabric shaver'],
    ecoImpact: 'Very Poor. Highly toxic production and microplastic pollution.'
  },
  {
    id: 'm11',
    name: 'Nylon',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Synthetic plastic fiber known for its strength and elasticity.',
    pros: ['Very durable', 'Elastic', 'Water-resistant'],
    cons: ['Non-biodegradable', 'Sheds microplastics', 'Energy intensive', 'Nitrous oxide emissions'],
    careInstructions: ['Machine wash cold', 'Line dry', 'Wash infrequently'],
    ecoImpact: 'Very Poor. Production releases nitrous oxide, a potent greenhouse gas.'
  },
  {
    id: 'm12',
    name: 'Elastane (Lycra)',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Polyether-polyurea copolymer known for its exceptional elasticity. Also known as Spandex.',
    pros: ['Stretchy', 'Comfortable', 'Shape retention'],
    cons: ['Non-biodegradable', 'Hard to recycle blends', 'Microplastics'],
    careInstructions: ['Wash cold to maintain elasticity', 'Do not use fabric softener', 'Air dry - heat damages elasticity'],
    ecoImpact: 'Poor. Makes recycling other fabrics difficult when blended.'
  },
  {
    id: 'm26',
    name: 'Polypropylene (Olefin)',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'D',
    description: 'Thermoplastic polymer used in activewear and thermal underwear.',
    pros: ['Moisture wicking', 'Lightweight', 'Stain resistant'],
    cons: ['Hard to dye', 'Melts at low heat', 'Petroleum based'],
    careInstructions: ['Machine wash cold/warm', 'Air dry only - melts easily in dryer', 'No iron'],
    ecoImpact: 'Poor/Moderate. Less energy intensive than other synthetics, but still plastic.'
  },
  {
    id: 'm27',
    name: 'PVC',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Polyvinyl chloride. Used for raincoats and faux leather.',
    pros: ['Waterproof', 'Cheap', 'Durable'],
    cons: ['Releases carcinogens (dioxins)', 'Not breathable', 'Very toxic to produce/dispose'],
    careInstructions: ['Wipe clean with damp cloth', 'Do not wash', 'Keep away from heat'],
    ecoImpact: 'Very Poor. Known as the "poison plastic" due to chlorine content and toxic additives.'
  },
  {
    id: 'm28',
    name: 'Polyurethane (PU)',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Plastic material used for coatings, foams, and faux leathers.',
    pros: ['Versatile', 'Waterproof', 'Flexible'],
    cons: ['Fossil fuel based', 'Non-biodegradable', 'Releases VOCs'],
    careInstructions: ['Spot clean with mild soap', 'Do not machine wash', 'Air dry'],
    ecoImpact: 'Poor. Less toxic than PVC but still environmentally damaging.'
  },
  {
    id: 'm29',
    name: 'Vegan Leather (PU Leather)',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Leather alternative made from polyurethane. Often marketed as ethical.',
    pros: ['Animal-free', 'Cheaper than leather', 'Consistent finish'],
    cons: ['Plastic based', 'Cracks over time', 'Microplastic pollution'],
    careInstructions: ['Wipe with damp cloth', 'Do not use harsh chemicals', 'Condition with synthetic conditioner'],
    ecoImpact: 'Poor. While it saves cows, it contributes to plastic pollution and landfill waste.'
  },
  {
    id: 'm31',
    name: 'Faux Leather (Pleather)',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Generic term for artificial leather, often made from PVC or PU.',
    pros: ['Cheap', 'Easy to clean', 'Vegan'],
    cons: ['Not breathable', 'Sweaty', 'Short lifespan'],
    careInstructions: ['Wipe clean only', 'Avoid direct sunlight', 'Do not iron'],
    ecoImpact: 'Very Poor. Disposable fashion item that persists in landfills for centuries.'
  },
  {
    id: 'm30',
    name: 'Microfiber',
    category: MaterialCategory.Synthetic,
    sustainabilityRating: 'F',
    description: 'Fine synthetic fiber (usually polyester/nylon blend) thinner than a human hair.',
    pros: ['Soft', 'Absorbent', 'Lightweight'],
    cons: ['Major microplastic polluter', 'Traps odors', 'Static prone'],
    careInstructions: ['Machine wash cold', 'Do not use fabric softener (clogs fibers)', 'Hang dry'],
    ecoImpact: 'Very Poor. One of the biggest contributors to oceanic microplastic pollution.'
  },
  {
    id: 'm32',
    name: 'Pashmina',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'B',
    description: 'The finest variant of cashmere wool, obtained from the Changthangi goat in the high Himalayas.',
    pros: ['Softer and lighter than generic cashmere', 'Extremely warm', 'Hand-spun heritage'],
    cons: ['Very expensive', 'Delicate care required', 'Often counterfeited'],
    careInstructions: ['Professional dry clean only recommended', 'Store in breathable cotton bag', 'Avoid friction/rubbing'],
    ecoImpact: 'Moderate. Traditional small-scale herding is better, but scale is limited.'
  },
  {
    id: 'm33',
    name: 'Kashmir',
    category: MaterialCategory.Natural,
    sustainabilityRating: 'C',
    description: 'The historical and regional name for cashmere fiber originating from the Kashmir valley.',
    pros: ['Cultural heritage', 'Soft texture', 'Biodegradable'],
    cons: ['Confusion with generic terms', 'Supply chain transparency issues'],
    careInstructions: ['Hand wash cold with wool wash', 'Lay flat to dry', 'Comb gently to remove pills'],
    ecoImpact: 'Moderate to High. Similar land-use concerns as general cashmere.'
  }
];