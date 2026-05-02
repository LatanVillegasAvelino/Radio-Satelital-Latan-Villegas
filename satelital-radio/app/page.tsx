"use client"
import React from 'react'
import Player from '../components/Player'
import StationGrid from '../components/StationGrid'
import SideMenu from '../components/SideMenu'

export default function Page() {
  return (
    <main className="app-root">
      <aside className="left-col">
        <Player />
      </aside>
      <section className="right-col">
        <StationGrid />
      </section>
      <SideMenu />
    </main>
  )
}
