/** Static definitions for every desktop window. Sizes/positions are px defaults for desktop. */

export interface WindowDef {
  id: string
  title: string
  icon:
    | 'computer'
    | 'folder'
    | 'floppy'
    | 'gear'
    | 'book'
    | 'globe'
    | 'chip'
    | 'chart'
    | 'terminal'
  /** desktop icon caption */
  label: string
  w: number
  h: number
  x: number
  y: number
  /** listed in the Start menu */
  start?: boolean
  startLabel?: string
  desktopIcon?: boolean
}

export const windowDefs: WindowDef[] = [
  {
    id: 'welcome',
    title: "welcome.exe — hamza's little corner",
    icon: 'computer',
    label: 'welcome.exe',
    w: 640,
    h: 460,
    x: 90,
    y: 40,
    start: true,
    startLabel: 'Welcome',
    desktopIcon: true,
  },
  {
    id: 'about',
    title: 'about_me.exe',
    icon: 'folder',
    label: 'about_me.exe',
    w: 560,
    h: 420,
    x: 140,
    y: 80,
    start: true,
    startLabel: 'About Me',
    desktopIcon: true,
  },
  {
    id: 'projects',
    title: 'projects.exe',
    icon: 'floppy',
    label: 'projects.exe',
    w: 720,
    h: 520,
    x: 180,
    y: 60,
    start: true,
    startLabel: 'Projects',
    desktopIcon: true,
  },
  {
    id: 'currently',
    title: 'currently.exe — work in progress',
    icon: 'gear',
    label: 'currently.exe',
    w: 560,
    h: 440,
    x: 220,
    y: 100,
    start: true,
    startLabel: 'Currently Working On',
    desktopIcon: true,
  },
  {
    id: 'guestbook',
    title: 'guestbook.exe',
    icon: 'book',
    label: 'guestbook.exe',
    w: 540,
    h: 300,
    x: 250,
    y: 90,
    start: true,
    startLabel: 'Guestbook',
    desktopIcon: true,
  },
  {
    id: 'links',
    title: 'links.exe',
    icon: 'globe',
    label: 'links.exe',
    w: 460,
    h: 340,
    x: 280,
    y: 120,
    start: true,
    startLabel: 'Links',
    desktopIcon: true,
  },
  {
    id: 'sysinfo',
    title: 'sysinfo.exe — system properties',
    icon: 'chip',
    label: 'sysinfo.exe',
    w: 380,
    h: 320,
    x: 640,
    y: 60,
    desktopIcon: true,
  },
  {
    id: 'activity',
    title: 'activity.exe — git log',
    icon: 'chart',
    label: 'activity.exe',
    w: 660,
    h: 380,
    x: 200,
    y: 140,
    desktopIcon: true,
  },
  {
    id: 'terminal',
    title: 'MS-DOS Prompt — C:\\HAMZA',
    icon: 'terminal',
    label: 'terminal.exe',
    w: 580,
    h: 400,
    x: 300,
    y: 150,
    start: true,
    startLabel: 'Terminal',
    desktopIcon: true,
  },
]

export const windowDefMap: Record<string, WindowDef> = Object.fromEntries(
  windowDefs.map((d) => [d.id, d])
)
