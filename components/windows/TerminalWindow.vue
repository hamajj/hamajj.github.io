<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'
import { useShell } from '~/composables/useShell'
import { windowDefs } from '~/data/windows'
import { systemInfo, site } from '~/data/site'

interface TermLine {
  text: string
  tone?: 'dim' | 'accent' | 'warn'
}

const { open, close, isOpen } = useWindowManager()
const { devMode } = useShell()

const lines = ref<TermLine[]>([])
const command = ref('')
const history = ref<string[]>([])
const histIdx = ref(-1)
const busy = ref(false)
const phosphor = ref('#32cd32')
const shake = ref(false)
const bodyEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

const promptText = computed(() => 'C:\\HAMZA>')

const toneClass = (tone?: TermLine['tone']) => {
  if (tone === 'dim') return 'opacity-60'
  if (tone === 'accent') return 'font-bold'
  if (tone === 'warn') return 'text-acc-pink'
  return ''
}

const scrollDown = async () => {
  await nextTick()
  const container = bodyEl.value?.closest('.overflow-y-auto')
  if (container instanceof HTMLElement) container.scrollTop = container.scrollHeight
  if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
}

const print = (...entries: (string | TermLine)[]) => {
  for (const entry of entries) {
    lines.value.push(typeof entry === 'string' ? { text: entry } : entry)
  }
  scrollDown()
}

const focusInput = async () => {
  if (!isOpen('terminal')) return
  await nextTick()
  inputEl.value?.focus()
}

watch(
  () => isOpen('terminal'),
  async (openNow) => {
    if (openNow) {
      await focusInput()
      await scrollDown()
    }
  }
)

onMounted(() => {
  print(
    'Microsoft(R) Windows 98 (hamza edition)',
    '(c) 1998-2026 hamza. no rights reserved, really.',
    { text: 'type "help" for a list of commands.', tone: 'dim' },
    ''
  )
})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const typeOut = async (text: string, tone?: TermLine['tone'], msPerChar = 16) => {
  const line: TermLine = { text: '', tone }
  lines.value.push(line)
  for (const char of text) {
    line.text += char
    await sleep(msPerChar)
  }
  scrollDown()
}

const doShake = async () => {
  shake.value = true
  await sleep(950)
  shake.value = false
}

const runArise = async () => {
  busy.value = true
  await sleep(200)
  await typeOut('> SYSTEM_OVERRIDE.EXE starting...', 'accent', 18)
  await sleep(160)
  await typeOut('> scanning sectors .............. ok', undefined, 12)
  await sleep(120)
  await typeOut('> permission .................... GRANTED', 'accent', 12)
  await sleep(120)
  await typeOut('> shadow protocol ............... LOADED', 'accent', 12)
  await doShake()
  await typeOut('', undefined, 0)
  await typeOut('> A R I S E', 'warn', 90)
  await sleep(400)
  print(
    { text: '> (that is the whole egg. the old version had better graphics.)', tone: 'dim' },
    ''
  )
  busy.value = false
  focusInput()
}

const listDir = () => {
  print(
    ' Volume in drive C is HAMZA98',
    ' Directory of C:\\HAMZA',
    ''
  )
  const padEnd = (s: string, n: number) => s.padEnd(n, ' ')
  for (const def of windowDefs) {
    const name = def.label.replace('.exe', '').slice(0, 8).toUpperCase()
    const ext = 'EXE'
    print(
      `${padEnd(name, 10)} ${ext}    ${String(2048 + def.label.length * 137).padStart(6, ' ')}kb   ${
        def.startLabel ?? def.label
      }`
    )
  }
  print(
    `${padEnd('SECRETS', 10)} <DIR>              access denied, obviously`,
    `${padEnd('README', 10)} TXT              a friendly homepage`,
    '',
    ' 1 dir(s)   640,000,000 bytes free'
  )
}

const exec = (raw: string) => {
  const input = raw.trim()
  if (!input) return

  print(`${promptText.value} ${input}`)
  history.value.push(input)
  histIdx.value = -1

  const [cmdRaw, ...args] = input.split(/\s+/)
  const cmd = (cmdRaw ?? '').toLowerCase()

  switch (cmd) {
    case 'help':
      print(
        'Available commands:',
        '  help             show this list',
        '  dir | ls         list C:\\HAMZA',
        '  whoami           who is asking',
        '  sysinfo          machine details',
        '  date             what day is it',
        '  open <window>    about, projects, currently, guestbook, links, ...',
        '  github           open github in a new tab',
        '  mail             send an email',
        '  color g | a      green or amber phosphor',
        '  clear            clear the screen',
        '  exit             close this window',
        ''
      )
      break

    case 'dir':
    case 'ls':
      listDir()
      break

    case 'whoami':
      print('hamza — hobbyist developer, professional button-presser', '')
      break

    case 'sysinfo':
    case 'neofetch':
      print('hamza@corner-of-internet', '---------------------------')
      for (const row of systemInfo) {
        print(`  ${row.label.padEnd(8, ' ')} ${row.value}`)
      }
      print('')
      break

    case 'date':
      print(new Date().toString(), '')
      break

    case 'clear':
    case 'cls':
      lines.value = []
      break

    case 'exit':
      close('terminal')
      break

    case 'open': {
      const target = (args[0] ?? '').toLowerCase().replace('.exe', '')
      const hit = windowDefs.find(
        (def) => def.id === target || def.label.toLowerCase().startsWith(target)
      )
      if (!target) {
        print({ text: 'open what? try: open projects', tone: 'dim' })
      } else if (hit) {
        print({ text: `starting ${hit.label}...`, tone: 'accent' })
        open(hit.id)
      } else {
        print({ text: `Cannot find the window '${args[0]}'.`, tone: 'warn' })
      }
      print('')
      break
    }

    case 'github':
      print({ text: 'opening https://github.com/hamajj ...', tone: 'accent' })
      window.open(site.github, '_blank', 'noopener')
      print('')
      break

    case 'mail':
    case 'email':
      print({ text: 'opening your mail client...', tone: 'accent' })
      window.location.href = `mailto:${site.email}`
      break

    case 'color': {
      const arg = (args[0] ?? '').toLowerCase()
      if (arg === 'g' || arg === 'green') {
        phosphor.value = '#32cd32'
        print({ text: 'phosphor: green', tone: 'accent' })
      } else if (arg === 'a' || arg === 'amber' || arg === 'e') {
        phosphor.value = '#ffb000'
        print({ text: 'phosphor: amber', tone: 'accent' })
      } else {
        print({ text: 'usage: color g (green) | color a (amber)', tone: 'dim' })
      }
      print('')
      break
    }

    case 'sudo': {
      const rest = input.slice(4).trim().toLowerCase()
      if (rest.startsWith('rm -rf /') || rest === 'rm -rf /') {
        print({ text: 'nice try.', tone: 'warn' })
      } else {
        print({ text: 'hamza is not in the sudoers file. this incident has been reported.', tone: 'warn' })
      }
      print('')
      break
    }

    case 'godmode':
      if (devMode.value) {
        print(
          'GOD MODE ACTIVATED',
          '∞ health · 999 damage · max style',
          '> you are unstoppable (in this terminal, at least)',
          ''
        )
      } else {
        print(
          "'godmode' is not recognized. or is it?",
          '(some sequences must be entered first: ↑ ↑ ↓ ↓ ← → ← → B A)',
          ''
        )
      }
      break

    case 'arise':
      runArise()
      break

    default:
      print(
        `'${input}' is not recognized as an internal or external command,`,
        'operable program or batch file.',
        ''
      )
  }
}

const submit = () => {
  if (busy.value) return
  const raw = command.value
  command.value = ''
  exec(raw)
}

const onInputKeydown = (event: KeyboardEvent) => {
  if (busy.value) {
    event.preventDefault()
    return
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!history.value.length) return
    histIdx.value = histIdx.value <= 0 ? 0 : histIdx.value - 1
    command.value = history.value[history.value.length - 1 - histIdx.value] ?? ''
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (histIdx.value === -1) return
    histIdx.value += 1
    if (histIdx.value >= history.value.length) {
      histIdx.value = -1
      command.value = ''
    } else {
      command.value = history.value[history.value.length - 1 - histIdx.value] ?? ''
    }
  }
}
</script>

<template>
  <div
    ref="bodyEl"
    class="min-h-full cursor-text select-text bg-black p-3 font-vt text-[18px] leading-[1.35]"
    :class="shake ? 'animate-shake' : ''"
    :style="{ color: phosphor }"
    @click="focusInput"
  >
    <p
      v-for="(line, i) in lines"
      :key="i"
      class="whitespace-pre-wrap break-words"
      :class="toneClass(line.tone)"
    >
      <span v-if="line.text">{{ line.text }}</span>
      <span v-else>&nbsp;</span>
    </p>

    <div class="flex items-baseline gap-1" :class="busy ? 'opacity-50' : ''">
      <span class="shrink-0 whitespace-pre">{{ promptText }}</span>
      <input
        ref="inputEl"
        v-model="command"
        type="text"
        class="min-w-0 flex-1 border-0 bg-transparent p-0 font-vt text-[18px] outline-none"
        style="caret-color: currentColor; color: inherit"
        :aria-label="`Terminal input after ${promptText}`"
        :disabled="busy"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        @keydown.enter.prevent="submit"
        @keydown="onInputKeydown"
      />
      <span
        v-if="!command && !busy"
        class="animate-blink -ml-1 inline-block"
        aria-hidden="true"
        >█</span
      >
    </div>
  </div>
</template>
