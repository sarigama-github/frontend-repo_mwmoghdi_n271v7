import React, { useState } from 'react'

export default function TrainForm({ onTrained }) {
  const [csvUrl, setCsvUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleTrain = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/train`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv_url: csvUrl || null, rows: null }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResult(data)
      onTrained?.(data)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white font-semibold text-lg mb-3">Train Model</h3>
      <p className="text-sm text-blue-200/80 mb-3">Provide a CSV URL with a column named <span className="font-mono">selling_price</span> and features like brand, model, year, km_driven, fuel, seller_type, transmission, owner, mileage, engine, max_power, seats.</p>
      <form onSubmit={handleTrain} className="flex flex-col md:flex-row gap-3">
        <input
          value={csvUrl}
          onChange={(e) => setCsvUrl(e.target.value)}
          placeholder="Paste CSV URL (e.g., from GitHub raw)"
          className="flex-1 px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100 placeholder:text-blue-300/50"
        />
        <button type="submit" disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60">
          {loading ? 'Training…' : 'Train'}
        </button>
      </form>
      {error && <p className="mt-3 text-red-300 text-sm break-all">{error}</p>}
      {result && (
        <div className="mt-4 text-blue-100 text-sm">
          <p>Version: <span className="font-mono">{result.version}</span></p>
          <p>Algorithm: {result.algorithm}</p>
          <p>R²: {result.r2?.toFixed?.(3)}</p>
          <p>MAE: {result.mae?.toFixed?.(2)}</p>
        </div>
      )}
    </div>
  )
}
