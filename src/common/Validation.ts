import React from "react";
export const validateField = (type: string, value: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    switch (type) {
        case 'name':
            if (!value) {
                setError('Name is required');
            } else {
                setError('');
            }
            break;
        case 'email':
            if (!value) {
                setError('Email is required');
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                setError('Invalid email format');
            } else {
                setError('');
            }
            break;
        case 'password':
            if (!value) {
                setError('Password is required');
            } else if (value.length < 8) {
                setError('Password must be at least 8 characters');
            } else {
                setError('');
            }
            break;
        case 'price':
            if (!value) {
                setError('price is required');
            } else if (isNaN(Number(value))) {
                setError('price must be number');
            } else {
                setError('');
            }
            break;
        case 'quantity':
            if (!value) {
                setError('quantity is required');
            } else if (isNaN(Number(value))) {
                setError('quantity must be number');
            } else {
                setError('');
            }
            break;
        default:
            break;
    }
};