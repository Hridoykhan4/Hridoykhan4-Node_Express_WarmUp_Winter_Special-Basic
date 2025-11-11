import axios from "axios";

const AddCoffee = () => {
  const handleAddCoffee = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { ...rest } =
      Object.fromEntries(formData.entries());
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/coffees`, rest);
    console.log(data);
    if(data?.insertedId){
        alert('Success')
    }
  };
  return (
    <div>
      <h2 className="text-center font-semibold underline">Add New Coffee</h2>
      <section className="p-6 mt-4 rounded-md  bg-white/80 text-gray-900">
        <form
          onSubmit={handleAddCoffee}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
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
                  required
                  defaultValue="Pick a category"
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
                  name="photo"
                  type="url"
                  className="input w-full link text-white"
                  required
                />
              </div>

              <div className="w-full">
                <input type="submit" className="btn " value="Add Coffee" />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default AddCoffee;
