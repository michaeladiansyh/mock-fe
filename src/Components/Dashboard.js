import React, { useEffect } from 'react'
import {
    Box, Image, Button, useDisclosure,
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useProduct } from "../Context/ProductContext"
const Dashboard = () => {
    const { products, handleGetData,
        handleDelete, handleGetDataById,
        setName, setPrice, setImageUrl, handleUpdate,
        name, price, imageUrl } = useProduct()

    useEffect(() => {
        handleGetData()
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const handleClick = (id) => {
        onOpen()
        handleGetDataById(id)
    }
    return (
        <div className='mx-auto mt-10'>
            <div className='grid grid-cols-3 gap-10 justify-items-center'>
                {products.map((item) => (
                    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={item.id}>
                        <div className='relative'>
                            <Image className='block' minH="sm" maxH="sm" minW="sm" src={item.imageurl} alt={item.name} />
                            <div className='flex absolute top-0 right-0 m-2 space-x-2 justify-end container--btn'>
                                <Button onClick={() => handleClick(item.id)} ><EditIcon /></Button>
                                <Button onClick={() => handleDelete(item.id)}><DeleteIcon /></Button>
                            </div>
                        </div>
                        <Box p='6' className='text-start'>
                            <Box
                                mt='1'
                                fontWeight='semibold'
                                as='h4'
                                lineHeight='tight'
                            >
                                {item.name}
                            </Box>
                            <Box>
                                Rp. {item.price}
                            </Box>
                        </Box>
                    </Box>
                ))
                }
            </div>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleUpdate}>
                        <ModalHeader>Update Data</ModalHeader>
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
                            <Button type='submit' colorScheme='blue' onClick={onClose} mr={3}>
                                Update
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Dashboard