import React from 'react'

export default function Nav() {
  return (
    <nav className="flex justify-between items-center mb-8 bg-slate-800 text-slate-200 p-5">
    <div>
      <h2 className="text-2xl font-bold">User Dashboard</h2>
    </div>
   

      <div>
        <Link to="/face" class="text-white font-bold text-xl">Face Recogination</Link>
      </div>
      
      <div>
      <Link to="/message" class="text-white font-bold  m-5">Inbox</Link>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
</nav>
  )
}
