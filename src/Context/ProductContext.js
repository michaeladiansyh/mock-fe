import {
    createContext, useContext, useState,
} from "react";
import axios from "axios"
import { getToken } from "../utils/auth"
import Swal from 'sweetalert2'

const productContext = createContext()
export function ProductContextProvider({ children }) {
    const token = getToken();
    const [products, setProducts] = useState([])
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    var data = {
        name: name,
        price: price,
        imageurl: imageUrl
    }
    const PROXY_URL = "https://test-binar.herokuapp.com/"
    const URL = 'v1/products';
    const handleClear = () => {
        setId("")
        setName("")
        setPrice("")
        setImageUrl("")
    }

    const handleGetData = async () => {
        try {
            const response = await axios.get("https://test-binar.herokuapp.com/v1/products",
                { headers: { "Authorization": `${token}` } })
            if (response) {
                setProducts(response.data.result)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleGetDataById = async (id) => {
        try {
            const response = await axios.get(`${PROXY_URL}${URL}/${id}`,
                { headers: { "Authorization": `${token}` } })
            if (response) {
                setId(response.data.result.id)
                setName(response.data.result.name)
                setPrice(response.data.result.price)
                setImageUrl(response.data.result.imageurl)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddData = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://test-binar.herokuapp.com/v1/products/",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `${token}`
                    },
                })
            if (response.data.result) {
                Swal.fire({
                    title: 'Succeess!',
                    text: 'Add data Success',
                    icon: 'success',
                })
                window.location.reload(true)
            }
        } catch (error) {

        }
    }
    console.log(token);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/v1/products/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `${token}`,
                    },
                })
            if (response.data.result) {
                Swal.fire({
                    title: 'Succeess!',
                    text: 'Update data Success',
                    icon: 'success',
                })
                handleGetData()
                console.log("sukse");
                console.log(response.data.result);
            } else {
                console.log("Data Gagal di Update");
            }
        } catch (error) {

        }
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/v1/products/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Accept": 'application/json',
                            'Authorization': `${token}`,
                        }
                    },

                ).then(response => {
                    Swal.fire("Deleted!", "Product has been deleted.", "success")
                    handleGetData()

                })
                    .catch(error => Swal.fire(error.message, `Product with id  ${id} is not found.`, "warning"))
            }
        })
    }

    const value = {
        products,
        handleGetData,
        handleAddData,
        setName,
        setPrice,
        setImageUrl,
        id,
        name,
        price,
        imageUrl,
        handleDelete,
        handleGetDataById,
        handleUpdate,
        handleClear
    }
    return (
        <productContext.Provider value={value}>{children}</productContext.Provider>
    )
}

export const useProduct = () => useContext(productContext)