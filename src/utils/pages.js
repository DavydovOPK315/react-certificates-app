export const getPageCount = (totalPostCount, limit) => {
    return Math.ceil(totalPostCount / limit)
}