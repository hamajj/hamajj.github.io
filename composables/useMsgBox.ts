import { reactive, computed } from 'vue'

export interface MsgBoxButton {
  label: string
  value: unknown
}

export interface MsgBoxRequest {
  title: string
  message: string
  icon?: 'info' | 'warn' | 'error' | 'question'
  buttons?: MsgBoxButton[]
}

interface QueueItem extends MsgBoxRequest {
  resolve: (value: unknown) => void
}

const queue = reactive<QueueItem[]>([])

const current = computed<QueueItem | null>(() => queue[0] ?? null)

const show = (req: MsgBoxRequest): Promise<unknown> =>
  new Promise((resolve) => {
    queue.push({ ...req, resolve })
  })

const msgBox = (req: MsgBoxRequest) =>
  show({
    icon: 'info',
    buttons: [{ label: 'OK', value: true }],
    ...req,
  })

const confirmBox = (req: Omit<MsgBoxRequest, 'buttons'> & { yes?: string; no?: string }) =>
  show({
    icon: 'question',
    buttons: [
      { label: req.yes ?? 'Yes', value: true },
      { label: req.no ?? 'No', value: false },
    ],
    title: req.title,
    message: req.message,
  }).then((v) => v === true)

const settle = (value: unknown) => {
  const item = queue.shift()
  item?.resolve(value)
}

/** Esc / ✕ resolves the last button (the "no" option) if any, else false. */
const dismiss = () => {
  const item = queue[0]
  if (!item) return
  const buttons = item.buttons ?? [{ label: 'OK', value: true }]
  settle(buttons.at(-1)?.value)
}

export const useMsgBox = () => ({
  current,
  msgBox,
  confirmBox,
  settle,
  dismiss,
})
