// import { Suspense } from 'react'
import { Outlet } from "react-router";
// import Users from './components/Users'
import Users2 from "./components/Users2";
import Header from "./components/Header";

/* const userPromise = fetch(`http://localhost:5000/users`).then((res) =>
  res.json()
); */
function App() {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main className="w-11/12 my-3 mx-auto">
        <Outlet></Outlet>
      </main>
      {/* UIVERSE.io, check index.css*/}
      {/* <div className="loader"></div> */}
      {/* <Users2 userPromise={userPromise}></Users2> */}
      {/*   <Suspense fallback={<p>Loading...</p>}>
     <Users userPromise={userPromise}></Users>
     </Suspense> */}
    </>
  );
}

export default App;
