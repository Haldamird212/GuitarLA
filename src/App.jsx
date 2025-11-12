import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/guitar"
import { db } from "./data/db"

function App() {

    // state
    const [data, setData] = useState([])
    const [cart, setCart] = useState([])

    // recomendado para API's
    useEffect(() => {
        setData(db)
    },[])
    
    function addToCart(item){
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExist >= 0){
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart(prevCart => [...prevCart, item])
        }
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id){
        const item = cart.findIndex(guitar => guitar.id === id)
        const updatedQuantity = [...cart]
        updatedQuantity[item].quantity++
        setCart(updatedQuantity)
    }
    function decreaseQuantity(id){
        const item = cart.findIndex(guitar => guitar.id = id)
        const updatedquantity = [...cart]
        console.log(updatedquantity[item].quantity);
        if(updatedquantity[item].quantity > 1){
            updatedquantity[item].quantity--;
        }else{
            setCart((prevCart) =>
              prevCart.filter((guitar) => guitar.id !== item));
        }
        setCart(updatedquantity)
    }

  return (
    <>
    <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity={decreaseQuantity}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=>(
                <Guitar
                key={guitar.id}
                guitar = {guitar}
                addToCart = {addToCart}
                />
            ))}
            

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
