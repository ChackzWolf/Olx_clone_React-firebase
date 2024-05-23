import React, { useEffect, useContext, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { PostContext } from "./../../App";



function Posts(props) {
    const {searchResult} = props
    const { firebase } = useContext(FirebaseContext);
    const [products, setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([])
    const { setPostDetails } = useContext(PostContext);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const firestore = getFirestore(firebase);
            const querySnapshot = await getDocs(collection(firestore, "products"));
            const data = querySnapshot.docs.map((product) => {
                return {
                  ...product.data(),
                  id: product.id,
                };
            });
            setProducts(data);
        };
        fetchData();
    }, [firebase]);



    useEffect(() => {
        if (searchResult) {
            const updatedProducts = products.filter(product =>{
                const lowerCaseMovieName = product.name.toLowerCase()
                const lowerCaseMovieSearch = searchResult
                return lowerCaseMovieName.includes(lowerCaseMovieSearch)
            });
         
            setFilteredProducts(updatedProducts);
        } else {
            setFilteredProducts([]);
        }

    }, [searchResult, products]);




    return (
      <div className="postParentDiv">


        {filteredProducts.length > 0 ?
        <div className="moreView">

            <div className="heading">
                <span>Search Result</span>
                <span>View more</span>
            </div>

          <div className="cards">
            {filteredProducts.map((product) => {
              return (
                <div className="card" onClick={()=>{
                  setPostDetails(product)
                  navigate("/view")
                }}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageURL} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        : <div>
                    { searchResult.length > 0 && filteredProducts.length === 0?
                                  <div className="heading">
                                  <span>No result found</span>
                                  <span>View more</span>
                                </div>
                        :
                                <div className="heading">
                           
                                </div>

                        }
        </div>
       }









        <div className="moreView">
          <div className="heading">
            <span>Quick Menu</span>
            <span>View more</span>
          </div>
          <div className="cards">
            {products.map((product) => {
              return (
                <div className="card" onClick={()=>{
                  setPostDetails(product)
                  navigate("/view")
                }}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageURL} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
                    {/* <div className="recommendations">
                        <div className="heading">
                        <span>Fresh recommendations</span>
                        </div>
                        <div className="cards">
                        <div className="card">
                            <div className="favorite">
                            <Heart></Heart>
                            </div>
                            <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt="" />
                            </div>
                            <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                            </div>
                            <div className="date">
                            <span>10/5/2021</span>
                            </div>
                        </div>
                        </div>
                    </div> */}
      </div>
    );
}

export default Posts;
