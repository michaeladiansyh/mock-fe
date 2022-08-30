import React from 'react'
import { Link } from 'react-router-dom';
import { removeUserLocal } from "../utils/auth"
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth"
import { useProduct } from "../Context/ProductContext"
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Input
} from '@chakra-ui/react'

const Navbar = () => {
    const { name, setName, price, setPrice, imageUrl, setImageUrl, handleAddData } = useProduct()
    const token = getToken()
    const navigate = useNavigate()
    const handleLogOut = () => {
        removeUserLocal()
        navigate("/", { replace: true })
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <nav className={`${token ? "block" : "hidden"} bg-white border-gray-200 px-2 py-2.5 dark:bg-gray-900`}>
            <div className="relative flex space-x-10">
                <Link to="/">
                    <span className="col-span-1 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Product List</span>
                </Link>
                <Button type='submit' onClick={onOpen}>Create New</Button>
                <div className='absolute right-10'>
                    <Button onClick={handleLogOut}>Logout</Button>
                </div>
            </div>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleAddData}>
                        <ModalHeader>Create New</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <Input ref={initialRef} placeholder='Product Name' onChange={e => setName(e.target.value)} value={name} />
                            </FormControl>

                            <FormControl mt={4}>
                                <Input placeholder='Price (Dollar USD)' onChange={e => setPrice(e.target.value)} value={price} />
                            </FormControl>

                            <FormControl mt={4}>
                                <Input placeholder='Image url' onChange={e => setImageUrl(e.target.value)} value={imageUrl} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter className='space-x-5'>
                            <Button onClick={onClose}>Back</Button>
                            <Button type='submit' colorScheme='blue' mr={3} onClick={onClose}>
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </nav >
    )
}

export default Navbar