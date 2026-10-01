import { ref } from 'vue'
import { useMsgBox } from './useMsgBox'

const startMenuOpen = ref(false)
const runOpen = ref(false)
const shutDown = ref(false)
const devMode = ref(false)
const jukeboxOpen = ref(false)

export const useShell = () => {
  const toggleStartMenu = () => {
    startMenuOpen.value = !startMenuOpen.value
  }

  const closeStartMenu = () => {
    startMenuOpen.value = false
  }

  const openRun = () => {
    startMenuOpen.value = false
    runOpen.value = true
  }

  const closeRun = () => {
    runOpen.value = false
  }

  const shutDownSite = async () => {
    startMenuOpen.value = false
    const { confirmBox } = useMsgBox()
    const confirmed = await confirmBox({
      title: 'Shut Down',
      message: "Are you sure you want to shut down Hamza's website?",
      yes: 'Yes',
      no: 'No',
    })
    if (confirmed) shutDown.value = true
  }

  const restartSite = () => {
    shutDown.value = false
  }

  const enableDevMode = () => {
    devMode.value = true
  }

  const toggleJukebox = () => {
    jukeboxOpen.value = !jukeboxOpen.value
  }

  return {
    startMenuOpen,
    runOpen,
    shutDown,
    devMode,
    jukeboxOpen,
    toggleStartMenu,
    closeStartMenu,
    openRun,
    closeRun,
    shutDownSite,
    restartSite,
    enableDevMode,
    toggleJukebox,
  }
}
