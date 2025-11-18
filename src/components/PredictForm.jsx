import React, { useState } from 'react'

const initial = {
  brand: 'Maruti',
  model: 'Swift',
  year: 2017,
  km_driven: 45000,
  fuel: 'Petrol',
  seller_type: 'Individual',
  transmission: 'Manual',
  owner: 'First Owner',
  mileage: 19.0,
  engine: 1197,
  max_power: 82.0,
  seats: 5,
}

export default function PredictForm() {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(null)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPrice(null)
    try {
      const res = await fetch(`${baseUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, year: Number(form.year), km_driven: Number(form.km_driven), mileage: Number(form.mileage), engine: Number(form.engine), max_power: Number(form.max_power), seats: Number(form.seats) }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setPrice(data.predicted_price)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white font-semibold text-lg mb-3">Predict Price</h3>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.keys(initial).map((k) => (
          <div key={k} className="flex flex-col">
            <label className="text-xs text-blue-300 mb-1">{k}</label>
            <input
              value={form[k]}
              onChange={(e) => update(k, e.target.value)}
              className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100"
            />
          </div>
        ))}
        <div className="md:col-span-3 flex items-center gap-3 mt-2">
          <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-60">
            {loading ? 'Predicting…' : 'Predict'}
          </button>
          {price !== null && (
            <div className="text-emerald-300 font-semibold">Estimated Price: ₹ {price.toLocaleString('en-IN')}</div>
          )}
        </div>
      </form>
      {error && <p className="mt-3 text-red-300 text-sm break-all">{error}</p>}
    </div>
  )
}
