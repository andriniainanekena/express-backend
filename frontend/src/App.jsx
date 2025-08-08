import { useState, useEffect } from 'react'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchCharacters() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/characters')
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
  }, [])

  return (
    <div className="container">
      <h1>Characters</h1>

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
