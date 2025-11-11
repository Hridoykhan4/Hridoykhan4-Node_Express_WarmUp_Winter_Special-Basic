import { useLoaderData } from "react-router";
import CoffeeCard from "./CoffeeCard";
import { useState } from "react";

const Home = () => {
    const loadedCoffees = useLoaderData() || [];
    const [coffees, setCoffees] = useState(() => loadedCoffees || [])
    return (
        <div>
            <h2 className="text-center font-semibold underline">Our coffees: {coffees?.length}</h2>
            <div className="grid grid-cols-2 my-3 gap-6">
                {
                    coffees?.map(coffee => <CoffeeCard setCoffees={setCoffees} key={coffee._id} coffee={coffee}></CoffeeCard>)
                }
            </div>
        </div>
    );
};

export default Home;