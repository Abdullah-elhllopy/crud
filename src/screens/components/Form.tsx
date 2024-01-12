import { addNewData, setData, updateData } from 'store/index';
import { v4 as uuidv4 } from 'uuid';
import { validateField } from 'common/Validation';
import InputField from 'components/InputField'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'main';

const Form = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.crud.updatedItem);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [priceError, setPriceError] = useState<string>('');
    const [quantityError, setQuantityError] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
    useEffect(() => {
        if (data.id !== '') {
            setName(data.name);
            setPrice(data.price);
            setQuantity(data.quantity);
        }
    }, [data.id, data.name, data.price, data.quantity])
    // console.log('data' ,data);
    const handleBlur = (type: 'name' | 'price' | 'quantity') => {
        switch (type) {
            case 'name':
                validateField(type, name, setNameError);
                break;
            case 'price':
                validateField(type, price, setPriceError);
                break;
            case 'quantity':
                validateField(type, quantity, setQuantityError);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateField('name', name, setNameError);
        validateField('price', price, setPriceError);
        validateField('quantity', quantity, setQuantityError);
        if (!nameError && !priceError && !quantityError) {
            if (!data.id) {
                dispatch(addNewData({ item: { id: uuidv4(), name: name, price: price, quantity: quantity } }));
            } else {
                dispatch(updateData({
                    id: data.id, newData: {
                        id: data.id, name: name, price: price, quantity: quantity
                    }
                }));
                dispatch(setData({
                    data: {
                        id: "", name: "", price: "", quantity: ""
                    }
                }))
            }
            setName("");
            setPrice("");
            setQuantity("")
        } else {
            setFormSubmitted(true);
        }
    };
    return (
        <form className='d-flex form_data' onSubmit={handleSubmit}>
            <InputField
                label='Name'
                placeholder='Enter your name'
                type='text' value={name}
                setInputValue={setName}
                errorState={(formSubmitted || nameError !== '')}
                errorMessage={nameError}
                handleBlur={() => handleBlur('name')}
            />
            <InputField
                label='Price'
                placeholder='Enter your price'
                type='text' value={price}
                setInputValue={setPrice}
                errorState={(formSubmitted || priceError !== '')}
                errorMessage={priceError}
                handleBlur={() => handleBlur('price')}
            />
            <InputField
                label='Quantity'
                placeholder='Enter your quantity'
                type='text' value={quantity}
                setInputValue={setQuantity}
                errorState={(formSubmitted || quantityError !== '')}
                errorMessage={quantityError}
                handleBlur={() => handleBlur('quantity')}
            />
            <button type='submit' className='submit_btn'>
                {
                    !data.id ? 'Add' : 'Update'
                }
            </button>
        </form>
    )
}

export default Form