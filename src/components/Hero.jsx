import React from 'react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_120%,rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Second‑Hand Car Price Predictor
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
          Train a model on your dataset and predict resale prices instantly — built for Data Science for Engineers projects.
        </p>
      </div>
    </section>
  )
}
