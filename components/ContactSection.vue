<template>
  <section id="contact" class="py-24 px-6 flex flex-col justify-center items-center min-h-screen relative">
    <div class="max-w-2xl w-full border-2 border-white bg-black/90 p-8 relative">
       <!-- Header -->
       <div class="border-b-2 border-white pb-4 mb-8 flex justify-between items-end">
         <h2 class="text-4xl font-black italic text-white">
           <span class="text-blue-400">03 //</span> TRANSMISSION
         </h2>
         <div class="text-xs font-mono text-gray-400 animate-pulse">
           STATUS: ONLINE
         </div>
       </div>

       <!-- Form / Links -->
       <div class="space-y-6">
         <p class="text-gray-300 font-mono text-lg">
           ESTABLISH CONNECTION WITH DEVELOPER?
         </p>

         <div class="grid gap-4">
           <a href="mailto:mehmethamzaakca@tutamail.com" class="group flex items-center justify-between border border-gray-600 p-4 hover:border-blue-400 hover:bg-blue-900/20 transition-all cursor-pointer">
             <span class="font-bold text-white group-hover:text-blue-400">>> EMAIL_UPLINK</span>
             <span class="text-xs text-gray-500 group-hover:text-blue-300">[SEND]</span>
           </a>
           
           <a href="https://github.com/hamajj" target="_blank" class="group flex items-center justify-between border border-gray-600 p-4 hover:border-purple-400 hover:bg-purple-900/20 transition-all cursor-pointer">
             <span class="font-bold text-white group-hover:text-purple-400">>> GITHUB</span>
             <span class="text-xs text-gray-500 group-hover:text-purple-300">[ACCESS]</span>
           </a>
         </div>
       </div>

       <div class="mt-8 pt-4 border-t border-gray-800 flex justify-between text-xs text-gray-600 font-mono">
         <span>ID: 1234-5678-AB</span>
         <span>ENCRYPTION: NONE</span>
       </div>
    </div>
  </section>
</template>
