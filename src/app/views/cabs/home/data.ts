const vehicle1 = 'assets/images/category/cab/seadan.svg'
const vehicle2 = 'assets/images/category/cab/micro.svg'
const vehicle3 = 'assets/images/category/cab/suv.svg'
const vehicle4 = 'assets/images/category/cab/suv-2.svg'
const vehicle5 = 'assets/images/category/cab/pickup.svg'
const vehicle6 = 'assets/images/category/cab/coupe.svg'

type CabVehicleType = {
  image: string
  name: string
  availableCar: number
}

type FeatureType = {
  icon: string
  variant: string
  title: string
  description: string
}

type FAQType = {
  title: string
  description: string
}

const cabVehicles: CabVehicleType[] = [
  {
    image: vehicle1,
    name: 'Sedan',
    availableCar: 6,
  },
  {
    image: vehicle2,
    name: 'Micro',
    availableCar: 8,
  },
  {
    image: vehicle3,
    name: 'Micro',
    availableCar: 8,
  },
  {
    image: vehicle4,
    name: 'CUV',
    availableCar: 4,
  },
  {
    image: vehicle5,
    name: 'Pick up',
    availableCar: 3,
  },
  {
    image: vehicle6,
    name: 'Coupe',
    availableCar: 9,
  },
]

const cabsFeatures: FeatureType[] = [
  {
    title: "Driver running late? We'll compensate you!",
    description:
      "Happiness prosperous impression had conviction. For every delay in they extremity now.",
    variant: "bg-primary text-primary",
    icon: "/assets/images/icons/clock.png",
  },
  {
    title: "Compensation for no service",
    description:
      "Extremity now strangers contained breakfast him discourse additions. Sincerity.",
    variant: "bg-success text-success",
    icon: "/assets/images/icons/notepad.png",
  },
  {
    title: "Free cancellation 24 hours before pick-up time",
    description:
      "Perpetual extremity now strangers contained breakfast him discourse additions.",
    variant: "bg-warning text-warning",
    icon: "/assets/images/icons/shield.png",
  },
  {
    title: "Flight delayed? We'll wait!",
    description:
      "The prosperous impression had conviction. For every delay in they extremity now.",
    variant: "bg-danger text-danger",
    icon: "/assets/images/icons/umbrella.png",
  },
];



const faqContents: FAQType[] = [
  {
    title: 'How Does it Work?',
    description:
      'Yet remarkably appearance gets him his projection. Diverted endeavor bed peculiar men the not desirous. Acuteness abilities ask can offending furnished fulfilled sex. Warrant fifteen exposed ye at mistake. Blush since so in noisy still built up an again. As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. In mention perhaps attempt pointed suppose. Unknown ye chamber of warrant of Norland arrived.',
  },
  {
    title: 'What are monthly tracked users?',
    description:
      'What deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be.',
  },
  {
    title: 'What if I go with my prepaid monthly',
    description:
      'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors.',
  },
  {
    title: "What's the difference between cabs and taxi",
    description:
      'What deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be. At the moment, we only accept Credit/Debit cards and Paypal payments. Paypal is the easiest way to make payments online. While checking out your order. Be sure to fill in correct details for fast & hassle-free payment processing.',
  },
  {
    title: 'How can I check the fare for my Booking ride?',
    description:
      'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors.',
  },
  {
    title: "Do and Don'ts - Tips for a Safe Trip",
    description:
      'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors.',
  },
]

export { cabVehicles, cabsFeatures, faqContents }
