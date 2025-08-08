import { useState, useEffect } from 'react'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [search, setSearch] = useState('')
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
    </div>
  )
}
