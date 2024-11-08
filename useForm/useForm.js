import { useState } from 'react';

export const useForm = ( initialForm = {}) => {
    const [state, setFormState] = useState(initialForm);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...state,
            [name]: value
        });
    };

    const handleResetForm = () => {
        setFormState(initialForm);
    }

    return {
        state,
        ...state,
        handleInputChange,
        handleResetForm
    };
}
