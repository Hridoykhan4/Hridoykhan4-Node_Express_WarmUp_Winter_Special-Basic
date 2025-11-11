import { useLoaderData } from "react-router";

const CoffeeDetails = () => {
    const coffee = useLoaderData() || {}
    return (
        <div>
            <img src={coffee?.photo} alt="" />
            <h2>Name: {coffee?.name}</h2>
            <p>Supplier: {coffee?.supplier}</p>
            <p>Taste: {coffee?.taste}</p>
            <p>Category: {coffee?.category}</p>
            <p>Quantity: {coffee?.quantity}</p>
            <p>{coffee?.details}</p>
            <button className="btn">Order Now</button>
        </div>
    );
};

export default CoffeeDetails;