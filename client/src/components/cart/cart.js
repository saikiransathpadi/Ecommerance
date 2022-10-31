import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Cart = () => {
    const authToken = localStorage.getItem('authorization');
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/cart', {
            headers: {
                authorization: authToken,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCartData(data.cart);
            });
    }, []);
    return (
        <>
            {authToken.length ? (
                <section>
                    Cart {cartData.length}
                    {cartData.map((item) => {
                        return (
                            <div className='item-card'>
                                <div className='item-heading'>Name: {item.item_name}</div>
                                <div className='item-heading'>Category: {item.item_category}</div>
                                <div className='item-price'>{`Rs. ${item.price}`}</div>
                                <button type="button" onClick={() => {}}>Buy Now</button> 
                            </div>
                        );
                    })}
                </section>
            ) : (
                <section>
                    <div>User Not LoggedIn please login or signup</div>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </section>
            )}
        </>
    );
};
export default Cart;
