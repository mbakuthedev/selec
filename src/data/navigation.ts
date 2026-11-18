export type NavLink = { label: string; to: string }

export type NavGroup = {
  label: string
  items: NavLink[]
}

export const productGroups: NavGroup[] = [
  {
    label: 'Electrical Measurements',
    items: [
      { label: 'Multifunction Meters', to: '/pro-series/multifunction-meters' },
      { label: 'Energy Meters', to: '/pro-series/energy-meters' },
      { label: 'Digital Panel Meters', to: '/pro-series/digital-panel-meters' },
      { label: 'Current Transformers', to: '/pro-series/current-transformers' },
    ],
  },
  {
    label: 'Electrical Protection and Control',
    items: [
      { label: 'Line Monitoring', to: '/pro-series/line-monitoring' },
      { label: 'Current Protection', to: '/pro-series/current-protection' },
      { label: 'Earth Leakage', to: '/pro-series/earth-leakage' },
      { label: 'Earth Fault', to: '/pro-series/earth-fault' },
      { label: 'Motor Protection', to: '/pro-series/motor-protection' },
      { label: 'Pump Protection', to: '/pro-series/pump-protection' },
      { label: 'Liquid Level Controller', to: '/pro-series/liquid_level_controller' },
      { label: 'Time Relays', to: '/pro-series/time-relays' },
      { label: 'Time Switches', to: '/pro-series/time-switches' },
    ],
  },
  {
    label: 'Power Quality',
    items: [
      { label: 'Advance Static Var Generator', to: '/pro-series/advance-static-var-generator' },
      { label: 'Automatic Power Factor Controller', to: '/pro-series/automatic-power-factor-controller' },
      { label: 'Active Harmonic Filter', to: '/pro-series/active_harmonic_filter' },
    ],
  },
  {
    label: 'Industrial Automation',
    items: [
      { label: 'PLC-Modular MiBRX', to: '/pro-series/PLC-Modular-MiBRX' },
      { label: 'PLC-Modular FLEXYS', to: '/pro-series/PLC-Modular-FLEXYS' },
      { label: 'PLC-Fixed IO', to: '/pro-series/plc-fixed-io' },
      { label: 'HMI', to: '/pro-series/hmi' },
      { label: 'Drives', to: '/pro-series/drives' },
      { label: 'Relay Modules', to: '/pro-series/relay-modules' },
      { label: 'Industrial Communication Accessories', to: '/pro-series/industrial-communication-accessories' },
    ],
  },
  {
    label: 'Indicators and Controllers',
    items: [
      { label: 'Digital Timers', to: '/pro-series/digital-timers' },
      { label: 'Counters', to: '/pro-series/counters' },
      { label: 'Temperature Controllers', to: '/pro-series/temperature-controllers' },
      { label: 'Process PID Controller', to: '/pro-series/process_pid_controller' },
      { label: 'Process Indicators', to: '/pro-series/process_indicators' },
      { label: 'Solid State Relay', to: '/pro-series/solid_state_relay' },
      { label: 'Humidity and Temperature Controllers', to: '/pro-series/humidity_and_temperature_controllers' },
    ],
  },
  {
    label: 'Power Supply and Control',
    items: [{ label: 'Power Supplies', to: '/pro-series/power-supplies' }],
  },
  {
    label: 'Solar',
    items: [{ label: 'On Grid Inverter', to: '/pro-series/on_grid_inverter' }],
  },
]

export const topCategories: NavLink[] = [
  { label: 'Multifunction Meters', to: '/pro-series/multifunction-meters' },
  { label: 'Line Monitoring', to: '/pro-series/line-monitoring' },
  { label: 'Digital Timers', to: '/pro-series/digital-timers' },
  { label: 'Current Protection', to: '/pro-series/current-protection' },
  { label: 'Counter', to: '/pro-series/counters' },
  { label: 'PLC-Modular FLEXYS', to: '/pro-series/PLC-Modular-FLEXYS' },
  { label: 'Digital Panel Meters', to: '/pro-series/digital-panel-meters' },
  { label: 'HMI', to: '/pro-series/hmi' },
  { label: 'Temperature Controllers', to: '/pro-series/temperature-controllers' },
  { label: 'Time Switches', to: '/pro-series/time-switches' },
]

export const aboutLinks: NavLink[] = [
  { label: 'Overview', to: '/about' },
  { label: 'Milestones', to: '/about/milestones' },
  { label: 'Global Network', to: '/about/global-network' },
]

export const downloadLinks: NavLink[] = [
  { label: 'Download Center', to: '/datasheet' },
  { label: 'Catalog & Brochures', to: '/catalog' },
  { label: 'Software', to: '/software' },
]

export const regions = [
  { label: 'Selec Global', href: 'https://www.selec.com', flag: 'https://www.selec.com/apps/web-in/media/images/flags/global.png' },
  { label: 'Selec USA', href: 'https://www.selec.com/us//home', flag: 'https://www.selec.com/apps/web-in/media/images/flags/us.svg.png' },
  { label: 'Selec Germany', href: 'https://selec-europe.com', flag: 'https://www.selec.com/apps/web-in/media/images/flags/de.svg.png' },
  { label: 'Selec Australia', href: 'https://www.selec.com/au//home', flag: 'https://www.selec.com/apps/web-in/media/images/flags/au.svg.png' },
]

export const LOGO = 'https://www.selec.com/apps/web-in/media/logos/seleclogo.png'
export const MENU_IMAGE = 'https://www.selec.com/apps/web-in/media/images/product%20menu%20img_cat%20frnt.jpg'
export const INDIA_FLAG = 'https://www.selec.com/apps/web-in/media/images/flags/in.svg.png'

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/seleccontrol/' },
  { label: 'Youtube', href: 'https://www.youtube.com/c/SelecControlsvideos' },
  { label: 'Instagram', href: 'https://www.instagram.com/seleccontrols/' },
  { label: 'Linkedin', href: 'https://www.linkedin.com/company/selec-controls-pvt--ltd-' },
  { label: 'Twitter', href: 'https://twitter.com/SelecControls' },
]
