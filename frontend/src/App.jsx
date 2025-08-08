import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', realName: '', universe: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchCharacters() {
    setLoading(true)
    setError(null)
    try {
      const url = search ? `/characters/search?name=${encodeURIComponent(search)}` : '/characters'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch characters')
      const data = await res.json()
      setCharacters(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [search])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name || !form.realName || !form.universe) {
      alert('Please fill all fields')
      return
    }
    try {
      const res = await fetch('/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to add character')
      setForm({ name: '', realName: '', universe: '' })
      fetchCharacters()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="container">
      <h1>Characters</h1>

      <input
        type="text"
        placeholder="Search characters by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="characters-list">
        {characters.map(c => (
          <li key={c.id} className="character-item">
            <strong>{c.name}</strong> ({c.realName}) — {c.universe}
          </li>
        ))}
      </ul>

      <h2>Add Character</h2>
      <form onSubmit={handleAdd} className="add-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="form-input"
        />
        <input
          placeholder="Real Name"
          value={form.realName}
          onChange={e => setForm({ ...form, realName: e.target.value })}
          className="form-input"
        />
        <input
          placeholder="Universe"
          value={form.universe}
          onChange={e => setForm({ ...form, universe: e.target.value })}
          className="form-input"
        />
        <button type="submit" className="btn-submit">Add Character</button>
      </form>
    </div>
  )
}
