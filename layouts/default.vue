<template>
  <div class="crt min-h-screen relative overflow-hidden">
    <!-- HUD Top Bar -->
    <header class="fixed top-0 left-0 w-full z-50 p-4 pointer-events-none">
      <div class="flex justify-between items-start">
        <!-- Health / Status -->
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 bg-black/80 p-2 border-2 border-white pointer-events-auto">
            <div class="text-4xl font-bold text-red-600 leading-none">100</div>
            <div class="flex flex-col">
              <span class="text-xs text-white tracking-widest">HP</span>
              <div class="w-32 h-2 bg-red-900/50">
                <div class="w-full h-full bg-red-600 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 bg-black/80 p-2 border-2 border-blue-400 pointer-events-auto mt-1">
            <div class="text-4xl font-bold text-blue-400 leading-none">100</div>
            <div class="flex flex-col">
              <span class="text-xs text-white tracking-widest">ARMOR</span>
              <div class="w-32 h-2 bg-blue-900/50">
                <div class="w-full h-full bg-blue-400"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation / Weapon Select Style -->
        <nav class="pointer-events-auto">
          <ul class="flex gap-2">
            <li>
              <a href="#about" class="block bg-black/80 border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
                <span class="text-xs text-gray-500">01</span> ABOUT
              </a>
            </li>
            <li>
              <a href="#projects" class="block bg-black/80 border border-white px-4 py-2 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                <span class="text-xs text-gray-500">02</span> PROJECTS
              </a>
            </li>
            <li>
              <a href="#contact" class="block bg-black/80 border border-white px-4 py-2 hover:bg-blue-400 hover:text-black hover:border-blue-400 transition-colors">
                <span class="text-xs text-gray-500">03</span> CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-32 pb-20">
      <slot />
    </main>

    <!-- HUD Bottom / Style Meter Placeholder -->
    <div class="fixed bottom-8 right-8 z-50 pointer-events-none">
       <StyleMeter />
    </div>
    
    <!-- Background Grid -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  </div>
</template>

<style scoped>
/* Additional scoped styles if needed, mostly handled by global CSS */
</style>
