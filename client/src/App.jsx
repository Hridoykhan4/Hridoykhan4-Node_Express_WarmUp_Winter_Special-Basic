import { Suspense } from 'react'
import './App.css'
import Users from './components/Users'

const userPromise = fetch(`http://localhost:5000/users`).then(res => res.json())
function App() {

  return (
    <>
     <h2>Users Management</h2>
     <Suspense fallback={<p>Loading...</p>}>
     <Users userPromise={userPromise}></Users>
     </Suspense>
    </>
  )
}

export default App
