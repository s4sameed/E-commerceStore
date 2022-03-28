import React,{useState, useEffect} from "react"
import Base from "./Base"
import Card from "./Card"
import {getAllProducts} from "./helper/coreapicalls"


const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);


    const loadProducts = () => {
        getAllProducts()
        .then(data => {
            if(data?.error){
                setError(data?.error)
            }else{
                setProducts(data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }


    useEffect(()=>{
        loadProducts()
    }, [])

    

    return (
        <Base title="Home Page" description="Welcome to T-shirt Store">
            <div className="row text-center">
                {products.map((product, index) => {
                    return(
                        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}

export default Home;