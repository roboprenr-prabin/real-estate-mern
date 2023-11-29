export const errorHandler = (statusCode,messgae)=>{
    const error = new Error()
    error.statusCode = statusCode
    error.message  = messgae
    return error
}