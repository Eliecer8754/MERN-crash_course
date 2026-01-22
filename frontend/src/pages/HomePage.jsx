import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';
import { ToastContainer, toast } from "react-toastify";

const HomePage = ({colorMode}) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {fetchProducts,products} = useProductStore();
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    image: ""
  });
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]);

  useEffect(() => {
  if (selectedProduct) {
    setEditedProduct({
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
    });
  }
}, [selectedProduct]);

  
  const {editProduct} = useProductStore();
  const handleEditProduct = async() =>{
    if (!editedProduct.name || !editedProduct.price || !editedProduct.image) {
      toast.error("All fields are required");
      return;
    }
    const {success, message} = await editProduct(selectedProduct._id, editedProduct);
    if(success===true){
      toast.success("edited successfully!");
      setOpenModalEdit(false)
    } else{
      toast.error(message);
    }
  }
  return (
    <div className='w-4xl flex items-center justify-center mt-12'>
      <div className={`flex flex-col gap-4 `} >
        <span className='h-full flex justify-center text-4xl  bg-linear-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text font-bold'>
          Current Products 🚀
        </span>

        <div className='grid grid-cols-3 gap-6 w-full'>
          {products.map((product)=>(
            <ProductCard 
              key={product._id} 
              product={product} 
              setOpenModalEdit={setOpenModalEdit}
              setSelectedProduct={setSelectedProduct}
              colorMode={colorMode}
            />
          ))}
        </div>

        { openModalEdit &&(
          <div className='flex fixed inset-0 justify-center items-center w-full bg-black/90 z-50'>
            <div className={`flex w-140  ${colorMode ? "bg-gray-800" : "bg-blue-400"} flex-col py-10 px-14  rounded-md`}>
              <h2 className='flex text-3xl mb-6'>Update product</h2>
              <input type="text" value={editedProduct.name} className={`mb-4 border-2 p-2 border-gray-600 text-xl  ${colorMode ?  " placeholder-gray-400"  : "text-white placeholder-gray-400"}`} placeholder="product name" name="name" onChange={(e)=>setEditedProduct({...editedProduct, name: e.target.value})} />

              <input type="number" value={editedProduct.price} className={`mb-4 border-2 p-2 border-gray-600 text-xl  ${colorMode ?  " placeholder-gray-400"  : "text-white placeholder-gray-400"}`} placeholder="product price" name="price" 
              onChange={(e)=>setEditedProduct({...editedProduct, price: e.target.value})}
              />

              <input type="text"  value={editedProduct.image} className={`border-2 p-2 border-gray-600 text-xl  ${colorMode ?  " placeholder-gray-400"  : "text-white placeholder-gray-400"}`} placeholder="img URL" name="image" 
              onChange={(e)=>setEditedProduct({...editedProduct, image: e.target.value})}
              />

              <div className='w-full flex justify-center mt-4'>
                <button onClick={handleEditProduct} className='font-bold p-2 mr-4 w-24 bg-green-600 rounded-sm' >Enviar</button>
                <button className='font-bold p-2 w-24 rounded-sm bg-red-600'onClick={()=>setOpenModalEdit(false)} >Cancelar</button>
              </div>
              
            </div>
          </div>
        )

        }

        {products.length === 0 && (
          <span className='text-xl flex justify-center font-bold text-gray-500 '>
            No products found 😢 { " " }
            <Link to={"/create"} >
              <span className='underline hover:text-blue-300' >Create a product</span>
            </Link>
          </span>
        )}
      </div>
    </div>
  )
}

export default HomePage
