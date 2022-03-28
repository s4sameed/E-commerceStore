const { API } = require("../../backend")

export const getAllProducts = () => {
    //TODO: try to implement infinite scroll
    return fetch(`${API}/product`,{
        method:"GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}