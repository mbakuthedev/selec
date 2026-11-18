import type { Product } from './types'

const base = {
  summary: [] as string[],
  specs: [] as Product['specs'],
  variantHeaders: [] as string[],
  variants: [] as string[][],
  downloads: [] as Product['downloads'],
}

export const highlights: Product[] = [
  {
    ...base,
    slug: '6m-sized-modular-plc-1',
    name: '6M sized Modular PLC',
    tag: '6M sized Modular PLC',
    blurb: 'Rail Mount Modular PLC with 6 IO Slots',
    model: 'MiBRX 6M',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/3806734b256c27e41ec2c6bffa26d9e7/MIBRX-6M_webshop_013348b6dd797ef54e61677f86cb0f4d.jpg',
    seriesSlug: 'mibrx',
    categorySlug: 'PLC-Modular-MiBRX',
    featured: true,
    summary: ['Rail mount modular PLC with 6 IO slots.'],
  },
  {
    ...base,
    slug: 'special-type-current-transformer',
    name: 'Special type current transformer',
    tag: 'Special type current transformer',
    blurb: 'Busbar Type Current Transformer',
    model: 'SPCT',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/7cce53cf90577442771720a370c3c723/SPCT-50-30_c17f8c3b639a8f4d47b287fa3c7bd9b1.jpg',
    seriesSlug: 'busbar-ct',
    categorySlug: 'current-transformers',
    featured: true,
  },
  {
    ...base,
    slug: 'selec-s-vfd-with-4-user-selectble-input',
    name: 'VFD-L',
    tag: 'VFD-L',
    blurb:
      'VFD-L compact series of variable frequency drive with Single Phase 230 V Input to Three Phase 230 V Output, 0.25 HP to 1 HP',
    model: 'VFD-L-1',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/f197002b9a0853eca5e046d9ca4663d5/VFD_L_webshop_fdba79d3bb80cfcf0aaf2bfec9ac4670.jpg',
    seriesSlug: 'vfd',
    categorySlug: 'drives',
    featured: true,
  },
  {
    ...base,
    slug: '30kvar-3phase-4wire-rack-or-wall-mount-with-or-without-hmi-display-43-inch-advanced-static-var-generator',
    name: '30kVAr Advanced Static Var Generator',
    tag: '30kVAr, 3Phase 4Wire, Rack Or Wall Mount, Advanced Static Var Generator',
    blurb:
      '30kVAr, 3Phase 4Wire, Rack Or Wall Mount, with or without HMI Display 4.3 inch, Advanced Static Var Generator for Power factor correction, Harmonic mitigation, Load balancing',
    model: 'ASVG-030',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/655ea4bd3b5736d88afc30c9212ccddf/ASVG%2030kVAr%20GROUP%20IMAGE_1%20%281%29_72daaa729b913282b236ebac3f1d406a.jpg',
    seriesSlug: 'asvg',
    categorySlug: 'advance-static-var-generator',
    featured: true,
  },
  {
    ...base,
    slug: 'energy-meter-direct-operated-em2m',
    name: 'Single phase DIN RAIL Energy Meter',
    tag: 'Single phase DIN RAIL Energy Meter',
    blurb: 'Single phase digital energy meter, 2 module Rail Mount, CE certified with 100A direct current connection',
    model: 'EM2M',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/a5e00132373a7031000fd987a3c9f87b/EM2M_WEBSHOP_174269f2fe9e94ff676c0e1a6436afcb.jpg',
    seriesSlug: 'direct-measuring-em',
    categorySlug: 'energy-meters',
    isNew: true,
  },
  {
    ...base,
    slug: '50w-series',
    name: 'Panel Mount 50W Power Supply',
    tag: 'Panel Mount 50W Power Supply',
    blurb: '50W Industrial Grade, Surface Mount Table Top Power Supply',
    model: 'TPS50',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/83adc9225e4deb67d7ce42d58fe5157c/TPS50-24%20%281%29_54e0b4181c34d3b3f0a17561aea591ec.jpg',
    seriesSlug: 'power-supply',
    categorySlug: 'power-supplies',
    isNew: true,
  },
  {
    ...base,
    slug: 'precision-process-indicator-48-x-96-mm',
    name: 'Precision Process Indicator, 48 x 96 mm',
    tag: 'Precision Process Indicator, 48 x 96 mm',
    blurb:
      '0.1% Accuracy, Capacitive touch keypad with Universal input, Retransmission output, 24V DC Sensor Supply, RS485 MODBUS communication, 85 to 270V AC/DC Supply',
    model: 'PIC153-P-C-1',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/8fb21ee7a2207526da55a679f0332de2/PIC153P_5b8feb891839f816eb724d7f261c2979.jpg',
    seriesSlug: 'process-indicator',
    categorySlug: 'process_indicators',
    isNew: true,
  },
  {
    ...base,
    slug: '150kvar-3phase-4wirerack-or-wall-mount-advanced-static-var-generator',
    name: '150kVAr Advanced Static Var Generator',
    tag: '150kVAr, 3Phase 4Wire, Rack Or Wall Mount, Advanced Static Var Generator',
    blurb: '150KVAr, 3Phase 4Wire, Rack Or Wall Mount, Advanced Static Var Generator',
    model: 'ASVG-150',
    image:
      'https://selec2021.s3.amazonaws.com/CATALOG/dc5c768b5dc76a084531934b34601977/ASVG%20150kVAr%20GROUP%20IMAGE_1_9e47de5f4402501f7b10877a49866a54.jpg',
    seriesSlug: 'asvg',
    categorySlug: 'advance-static-var-generator',
    isNew: true,
  },
]

export const featuredSlugs = highlights.filter((item) => item.featured).map((item) => item.slug)
export const newSlugs = highlights.filter((item) => item.isNew).map((item) => item.slug)
