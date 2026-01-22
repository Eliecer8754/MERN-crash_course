import { useState } from "react"
import { useProductStore } from "../store/product"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePage = ({colorMode}) => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })
  const {createProduct } = useProductStore()
  const handleAddProduct = async() =>{
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("All fields are required");
      return;
    }
    const {success, message} = await createProduct(newProduct);
    if(success===true){
      navigate("/");
      toast.success("Saved successfully!");
      setNewProduct({
        name: "",
        price: "",
        image: ""
      })
    } else{
      toast.error(message);
    }
  }
  return (
    <div className="flex w-3xl justify-center ">
      <ToastContainer position="top-right" autoClose={3000} /><ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col justify-center w-full"> 
        <h1 className={`flex text-6xl justify-center items-center mt-4 mb-8 ${colorMode ? "text-white": " text-gray-950"}`}>Create new Product</h1>
        <div className={`flex flex-col  gap-2 w-full bg ${colorMode ? "bg-gray-700" : "bg-white"} gap-5 p-6 shadow-2xl rounded-sm`}>
          
            <input type="text" className={`border-2 p-2 border-gray-600 text-xl ${colorMode ? "text-white placeholder-gray-400" : "text-black placeholder-gray-400"}`} placeholder="product name" name="name" value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct, name: e.target.value})} />

            <input type="number" className={`border-2 p-2 border-gray-600 text-xl ${colorMode ? "text-white placeholder-gray-400" : "text-black placeholder-gray-400"}`} placeholder="product price" name="price" value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct, price: e.target.value})} />

            <input type="text" className={`border-2 p-2 border-gray-600 text-xl ${colorMode ? "text-white placeholder-gray-400" : "text-black placeholder-gray-400"}`} placeholder="img URL" name="image" value={newProduct.image} onChange={(e)=>setNewProduct({...newProduct, image: e.target.value})} />

            <button onClick={handleAddProduct} className={`w-full bg-blue-300 p-4 rounded-md text-gray-950 text-xl`}>
              Add product
            </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
