// import { Suspense } from 'react'
import { Outlet } from "react-router";
import "./App.css";
// import Users from './components/Users'
import Users2 from "./components/Users2";
import Header from "./components/Header";

/* const userPromise = fetch(`http://localhost:5000/users`).then((res) =>
  res.json()
); */
function App() {
  return (
    <>
      <h2>Users Management</h2>
      <header>
        <Header></Header>
      </header>


      {/* <Users2 userPromise={userPromise}></Users2> */}
      <Outlet></Outlet>
      {/*   <Suspense fallback={<p>Loading...</p>}>
     <Users userPromise={userPromise}></Users>
     </Suspense> */}  
    </>
  );
}

export default App;
