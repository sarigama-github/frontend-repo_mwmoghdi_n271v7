import React from 'react'
import Hero from './components/Hero'
import TrainForm from './components/TrainForm'
import PredictForm from './components/PredictForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 md:p-10">
        <Hero />
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 mt-4">
          <TrainForm />
          <PredictForm />
        </div>
        <p className="text-center text-blue-300/60 text-sm mt-8">Set VITE_BACKEND_URL in the environment if needed. Use /test route to verify backend.</p>
      </div>
    </div>
  )
}

export default App
