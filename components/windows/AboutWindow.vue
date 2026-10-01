<script setup lang="ts">
import { site } from '~/data/site'
import profileData from '~/data/github-profile.json'

const profile = profileData.profile

const interests = ['rust', 'c', 'systems programming', 'language design', 'go', 'python']
</script>

<template>
  <div class="bg-win-gray p-4">
    <div class="grid gap-4 md:grid-cols-[1fr_200px]">
      <!-- letter -->
      <article class="bevel-in bg-white p-4">
        <h3 class="mb-3 font-pixel text-[10px] leading-relaxed text-title-blue">
          README.TXT
        </h3>
        <div class="space-y-3">
          <p
            v-for="(line, i) in site.about"
            :key="i"
            class="font-ui text-[13px] leading-relaxed text-black"
            :class="i === 0 ? 'font-bold' : ''"
          >
            {{ line }}
          </p>
        </div>

        <div class="dotted-sep my-4" />

        <p class="font-ui text-[12px] text-black">
          <b>things i poke at:</b>
        </p>
        <ul class="mt-2 flex flex-wrap gap-1.5">
          <li
            v-for="interest in interests"
            :key="interest"
            class="bevel-out-sm bg-win-gray px-2 py-[3px] font-vt text-[15px] leading-none text-black"
          >
            {{ interest }}
          </li>
        </ul>
      </article>

      <!-- profile card -->
      <aside class="bevel-in bg-win-gray p-3">
        <img
          :src="profile.avatar"
          :alt="`${profile.name}'s avatar`"
          width="72"
          height="72"
          class="bevel-out-sm mx-auto bg-white p-1"
          loading="lazy"
        />
        <p class="mt-2 text-center font-pixel text-[9px] text-black">
          {{ profile.name }}
        </p>
        <p class="text-center font-ui text-[12px] text-title-blue">@{{ profile.login }}</p>

        <div class="dotted-sep my-3" />

        <p class="font-ui text-[11px] leading-relaxed text-black">
          <b>bio:</b> {{ profile.bio || 'writing code, breaking things, fixing them again' }}
        </p>

        <div class="mt-3 flex flex-col gap-2">
          <a
            :href="profile.html_url"
            target="_blank"
            rel="noopener"
            class="win98-btn text-center font-ui text-[12px] no-underline"
            >github profile ↗</a
          >
          <a
            :href="`mailto:${site.email}`"
            class="win98-btn text-center font-ui text-[12px] no-underline"
            >email me</a
          >
        </div>

        <p class="mt-3 text-center font-ui text-[11px] italic leading-snug text-win-mid">
          not a professional — just someone who likes taking things apart.
        </p>
      </aside>
    </div>
  </div>
</template>
