import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useProductStore } from '../store/product';
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({colorMode,product, setOpenModalEdit, setSelectedProduct}) => {
  console.log(colorMode)
  const {deleteProduct} = useProductStore()
  const handleDeleteProduct = async(pid) =>{
    const {success, message} = await deleteProduct(pid);
    if(!success){
      toast.error(message);
    }else{
       toast.success(message);
    }
  }

  return (
    <div className={`shadow-2xl rounded-md overflow-hidden hover:translate-y-1 hover:shadw-xl font-bold ${colorMode ? "bg-gray-700" : "bg-blue-400"}  pb-2 w-70`}  onClick={()=>{
    } }>
      <img src={product.image} alt={ProductCard.name} className='h-48 w-full object-cover' />

      <div className='pl-4 grid mt-3'>
        <div className='flex flex-col'>
          <span className='mb-2 text-xl'>{product.name}</span>
          <span className='mb-2 font-bold'>${product.price}</span>
        </div>
        <div className='flex w-18 justify-between'>
          <FaEdit fontSize={30} onClick={()=>{
            setSelectedProduct(product)
            setOpenModalEdit(true)
          }}/>
          <FaTrash fontSize={30} onClick={()=>handleDeleteProduct(product._id)}/>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
