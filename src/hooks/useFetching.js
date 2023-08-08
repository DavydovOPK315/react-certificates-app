import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            console.log("Fetching errror login: ", e)
            console.log("Fetching errror login: ", e.message)
            console.log("Fetching errror login: ", e.response.status)
            setError(e.message)
            setTimeout(() => {
                setError('');
            }, 10000);
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error];
}