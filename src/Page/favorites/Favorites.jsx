import React, { useContext } from 'react'
import { CartContext } from '../../Component/context/CartContext';
import PageTranistion from './../../Component/PageTranistion';
import Product from '../../Component/slideproduct/Product';





export default function Favorites() {

  const {  favorites } = useContext(CartContext)


  return (
    <PageTranistion>
        <div className="category_products FavoritesPage">
            <div className="container">
                <div className="top_Slide">
                    <h2>Your Favorites</h2>
                </div>
                {favorites.length === 0 ? (
                    <p>No Favorites Products Yet.</p>
                ) : (
                    <div className="products">
                        {favorites.map(item =>(
            <Product item={item} key={item.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    </PageTranistion>
  )
}
