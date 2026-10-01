/**
 * All hand-written site content lives here — presentation components import
 * from this file and never hardcode copy. Machine-generated GitHub data stays
 * in the sibling github-*.json files.
 */

export type CurrentStatus =
  | 'Experimenting'
  | 'In Development'
  | 'On Hold'
  | 'Probably Never Finished'

export interface CurrentlyEntry {
  name: string
  note: string
  status: CurrentStatus
  url?: string
}

export interface SystemInfoRow {
  label: string
  value: string
}

export const site = {
  title: "hamza's little corner of the internet",
  greeting: "hi! i'm hamza.",
  intro:
    "i'm a developer who likes making computers do things they probably shouldn't.",
  interests:
    'mostly interested in systems programming, language design, and building weird little tools.',
  about: [
    "hi! i'm hamza.",
    'i like building things from scratch, breaking them, and figuring out why they broke.',
    'my main interests are rust, c, systems programming, and language design.',
    'i also use go and python when i need to build little tools.',
    'currently learning: systems programming, compilers, graphics, and whatever rabbit hole i fall into next.',
  ],
  email: 'mehmethamzaakca@tutamail.com',
  github: 'https://github.com/hamajj',
  marquee:
    '~*~ welcome to my homepage ~*~ this site is best viewed at 800x600 ~*~ you are visitor number 000001 ~*~ sign my guestbook ~*~ under construction since 2026 ~*~',
}

/** Homepage interest badges — interests, not claimed mastery. */
export const techBadges = [
  { name: 'Rust', color: 'bg-acc-orange text-black' },
  { name: 'C', color: 'bg-acc-cyan text-black' },
  { name: 'Go', color: 'bg-acc-lime text-black' },
  { name: 'Python', color: 'bg-acc-yellow text-black' },
]

/** Accent + display order for project language groups. */
export const languageMeta: Record<
  string,
  { label: string; chip: string; strip: string; order: number }
> = {
  Rust: { label: 'Rust', chip: 'bg-acc-orange text-black', strip: 'bg-acc-orange', order: 1 },
  C: { label: 'C', chip: 'bg-acc-cyan text-black', strip: 'bg-acc-cyan', order: 2 },
  Go: { label: 'Go', chip: 'bg-acc-lime text-black', strip: 'bg-acc-lime', order: 3 },
  Python: { label: 'Python', chip: 'bg-acc-yellow text-black', strip: 'bg-acc-yellow', order: 4 },
  JavaScript: { label: 'JavaScript', chip: 'bg-acc-yellow text-black', strip: 'bg-acc-yellow', order: 5 },
  TypeScript: { label: 'TypeScript', chip: 'bg-acc-cyan text-black', strip: 'bg-acc-cyan', order: 6 },
  Vue: { label: 'Vue', chip: 'bg-acc-lime text-black', strip: 'bg-acc-lime', order: 7 },
  HTML: { label: 'HTML', chip: 'bg-acc-pink text-black', strip: 'bg-acc-pink', order: 8 },
  Shell: { label: 'Shell', chip: 'bg-acc-purple text-white', strip: 'bg-acc-purple', order: 9 },
  UNKNOWN: { label: 'assorted bits', chip: 'bg-acc-purple text-white', strip: 'bg-acc-purple', order: 10 },
}

export const languageFallback = {
  label: 'other',
  chip: 'bg-win-mid text-black',
  strip: 'bg-win-mid',
  order: 99,
}

/**
 * "Currently Working On" — seeded from real repositories on GitHub.
 * Edit freely; keep notes honest.
 */
export const currentlyWorkingOn: CurrentlyEntry[] = [
  {
    name: 'hamajj.github.io',
    note: 'this website. it is always half-finished on purpose.',
    status: 'In Development',
    url: 'https://github.com/hamajj/hamajj.github.io',
  },
  {
    name: 'ranalang',
    note: 'a little language experiment in Go. mostly parsers, mostly questions.',
    status: 'In Development',
    url: 'https://github.com/hamajj/ranalang',
  },
  {
    name: 'hsdwm',
    note: "Hamajj's Super Duper Window Manager. windows, but angry.",
    status: 'Experimenting',
    url: 'https://github.com/hamajj/hsdwm',
  },
  {
    name: 'krypton',
    note: 'hiding messages inside images. pixels keep secrets well.',
    status: 'On Hold',
    url: 'https://github.com/hamajj/krypton',
  },
  {
    name: 'a rust project (soon™)',
    note: 'the rust badge on the homepage is a promise, not a product.',
    status: 'Probably Never Finished',
  },
]

export const systemInfo: SystemInfoRow[] = [
  { label: 'OS', value: 'NixOS' },
  { label: 'Editor', value: 'Neovim' },
  { label: 'Shell', value: 'zsh' },
  { label: 'CPU', value: 'Ryzen 5 5600' },
  { label: 'GPU', value: 'GTX 1080 Ti' },
]

/** Rotating "tip of the day" lines for the welcome window. */
export const tips: string[] = [
  'click the icons to open windows. drag the title bars to move them.',
  'on a phone? just tap things. the windows stack up nicely.',
  'press Ctrl+K (or Cmd+K) to open the Run dialog. try typing "godmode".',
  'the terminal has commands. type "help" in there to see them.',
  "there's a konami code. you know the one. ↑ ↑ ↓ ↓ ← → ← → B A",
  'this visitor counter only counts you. it is a very personal counter.',
  'everything on this site was made by hand, which is why it looks like this.',
]

/** Short messages that rotate in the taskbar tray. */
export const trayMessages: string[] = [
  '0 errors (that i know of)',
  'compiling…',
  'thinking about pointers again',
  'uptime: questionable',
  'now accepting visitor #1',
  'do not trust the progress bars',
  'made with nuxt + stubbornness',
]

/** Lines the little desktop pet says when clicked. */
export const petLines: string[] = [
  'beep boop.',
  'i live here now.',
  'have you tried turning it off and on again?',
  'the terminal remembers you.',
  'i am not a bug, i am a feature with legs.',
  'clicking me counts as interaction. nice.',
  'somebody once dragged me off the screen. rude.',
]

/** Decorative jukebox — there is no audio, ever. */
export const jukebox = {
  track: 'dial-up dreams — modem & the 56k',
  album: 'personal homepages, vol. 1',
  note: 'DECORATIVE PLAYER — NO SOUND',
}

export const jokes = {
  dontClick: 'i did warn you.',
  konami: 'the classics never die.',
  aboutThisWindow:
    'this dialog exists to prove the Help menu works. mission accomplished.',
}
