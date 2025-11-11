import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

const CoffeeCard = ({ coffee = {}, setCoffees }) => {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async (id) => {
    const confirmationResult = window.confirm("You want to Delete ?");

    if (confirmationResult) {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/coffees/${id}`
      );
      console.log(data);
      if (data?.deletedCount) {
        alert("Deleted");
        setCoffees((prev) => prev.filter((c) => c._id !== id));
      }
    }
  };
  const { name, photo, category } = coffee;

  const handleUpdateCoffee = async (e, id) => {
    e.preventDefault();
    const { ...rest } = Object.fromEntries(new FormData(e.target).entries());
    const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/coffees/${id}`, rest)
    if(data?.modifiedCount){
        alert('Success')
    }
    
  };

  return (
    <div className="card bg-slate-900 shadow-sm">
      <figure>
        <img src={photo} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Category: {category}</p>
        <div className="card-actions justify-end">
          <Link to={`/coffees/${coffee?._id}`} className="btn btn-primary">
            Details
          </Link>
          <button
            onClick={() => setShowModal(!showModal)}
            className="btn btn-success"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(coffee._id)}
            className="btn btn-error"
          >
            X
          </button>
          {/* Modal */}
          {showModal && (
            <dialog id="my_modal_1" className="modal modal-open">
              <div className="modal-box">
                <h2>Update Coffee</h2>
                <form
                  onSubmit={(e) => handleUpdateCoffee(e, coffee._id)}
                  className="container flex flex-col mx-auto space-y-12"
                >
                  <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="name" className="text-sm">
                          Name
                        </label>
                        <input
                          defaultValue={coffee?.name}
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Coffee name"
                          className="w-full input rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="quantity" className="text-sm">
                          Quantity
                        </label>
                        <input
                          defaultValue={coffee?.quantity}
                          id="quantity"
                          type="number"
                          name="quantity"
                          placeholder="quantity"
                          className="w-full input rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="supplier" className="text-sm">
                          Supplier
                        </label>
                        <input
                          defaultValue={coffee?.supplier}
                          id="supplier"
                          name="supplier"
                          type="text"
                          placeholder="Supplier Name"
                          className="w-full input rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="taste" className="text-sm">
                          Taste
                        </label>

                        <input
                          id="taste"
                          defaultValue={coffee?.taste}
                          name="taste"
                          type="text"
                          placeholder="Enter Taste"
                          className="w-full input rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="category" className="text-sm">
                          Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          required
                          defaultValue={coffee?.category}
                          className="select w-full text-white select-accent"
                        >
                          <option disabled={true}>Pick a category</option>
                          <option>Balanced and nutty</option>
                          <option>Earthy and bold</option>
                          <option>Rich and chocolaty</option>
                          <option>Wine-like and vibrant</option>
                          <option>Nutty and Sweet</option>
                        </select>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="bio" className="text-sm">
                          Details
                        </label>
                        <textarea
                          defaultValue={coffee?.details}
                          name="details"
                          id="bio"
                          placeholder="Details"
                          className="w-full textarea textarea-error rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        ></textarea>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="photo" className="text-sm">
                          Photo
                        </label>
                        <input
                          defaultValue={coffee?.photo}
                          name="photo"
                          type="url"
                          className="input w-full link text-white"
                          required
                        />
                      </div>

                      <div className="w-full">
                        <input
                          type="submit"
                          className="btn "
                          value="Update Coffee"
                        />
                      </div>
                    </div>
                  </fieldset>
                </form>

                <div className="modal-action">
                  <div method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={() => setShowModal(false)} className="btn">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
