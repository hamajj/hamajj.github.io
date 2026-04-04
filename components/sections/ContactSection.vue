<script setup lang="ts">
</script>

<template>
  <section id="contact" class="relative z-10 py-20">
    <div class="container mx-auto px-4 max-w-3xl text-center">
      <!-- Terminal Header -->
      <div class="mb-10 text-left">
        <span class="text-terminal-green font-mono text-sm">$ </span>
        <span class="text-terminal-cyan font-mono text-sm">echo "Hello" | mail</span>
      </div>

      <div class="border border-border bg-card/50 backdrop-blur-sm p-10 space-y-8">
        <div class="space-y-2">
          <h2 class="text-2xl font-vcr text-terminal-cyan tracking-wider">ESTABLISH CONNECTION?</h2>
          <p class="text-sm text-muted-foreground font-mono">
            Ready to collaborate or just want to say hello?
          </p>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:mehmethamzaakca@tutamail.com"
            class="px-6 py-3 border border-terminal-cyan text-terminal-cyan font-mono text-sm hover:bg-terminal-cyan/10 transition-colors inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            SEND EMAIL
          </a>
          <a
            href="https://github.com/hamajj"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 border border-border text-muted-foreground font-mono text-sm hover:border-terminal-cyan hover:text-terminal-cyan transition-colors inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            VIEW GITHUB
          </a>
        </div>

        <!-- Terminal Status -->
        <div class="text-xs text-muted-foreground font-mono pt-4 border-t border-border">
          <span class="text-terminal-green">STATUS:</span> Accepting connections on all ports
        </div>
      </div>
    </div>
  </section>
</template>
