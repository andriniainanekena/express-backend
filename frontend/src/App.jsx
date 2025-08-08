import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', realName: '', universe: '' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', realName: '', universe: '' })
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

  function startEdit(character) {
    setEditingId(character.id)
    setEditForm({ name: character.name, realName: character.realName, universe: character.universe })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm({ name: '', realName: '', universe: '' })
  }

  async function handleEdit(e) {
    e.preventDefault()
    if (!editForm.name || !editForm.realName || !editForm.universe) {
      alert('Please fill all fields in edit form')
      return
    }
    try {
      const res = await fetch(`/characters/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error('Failed to update character')
      setEditingId(null)
      setEditForm({ name: '', realName: '', universe: '' })
      fetchCharacters()
    } catch (e) {
      alert(e.message)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this character?')) return
    try {
      const res = await fetch(`/characters/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete character')
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
            {editingId === c.id ? (
              <form onSubmit={handleEdit} className="edit-form">
                <input
                  className="form-input"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  className="form-input"
                  value={editForm.realName}
                  onChange={e => setEditForm({ ...editForm, realName: e.target.value })}
                  placeholder="Real Name"
                />
                <input
                  className="form-input"
                  value={editForm.universe}
                  onChange={e => setEditForm({ ...editForm, universe: e.target.value })}
                  placeholder="Universe"
                />
                <button type="submit" className="btn-submit">Save</button>
                <button type="button" onClick={cancelEdit} style={{ marginLeft: 8 }}>Cancel</button>
              </form>
            ) : (
              <>
                <div className="character-info">
                  <strong>{c.name}</strong> ({c.realName}) — {c.universe}
                </div>
                <div className="buttons-group">
                  <button className="btn-edit" onClick={() => startEdit(c)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(c.id)}>Delete</button>
                </div>
              </>
            )}
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
