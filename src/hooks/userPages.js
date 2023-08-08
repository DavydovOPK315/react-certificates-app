import { useMemo } from "react"

export const usePages = (totalPages, page) => {
    const pagesArray = useMemo(() => {
        const result = [];

        if (totalPages === 1) {
            return result.push(1);
        } else if (page < 7) {
            for (let i = 2; i < totalPages - 1 && i < 7; i++) {
                result.push(i);
            }
        } else if (page > 6) {
            for (let i = page - 2; i < totalPages && i < page + 3; i++) {
                result.push(i);
            }
        }

        return result;
    }, [totalPages, page]);
    return pagesArray;
}