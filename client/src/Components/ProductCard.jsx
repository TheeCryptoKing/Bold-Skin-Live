import React, { useState, useEffect, useContext } from "react";
import Context from "./Context";
import { Card, Pagination, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function ProductCard({ products, searchQuery }) {
    const { user } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const paginationRange = 2;
    const [quantities, setQuantities] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    // const [cardAnimationLoaded, setCardAnimationLoaded] = useState(false);
    const [loadedCards, setLoadedCards] = useState(0);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    useEffect(() => {
        fetch("/api/carts")
        .then((response) => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error("Error fetching cart items");
            }
        })
        .then((cart) => {
            const productIds = cart.items.map((item) => item.product_id);
            setCartItems(productIds);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }, []);

    const addToCart = (product, quantity) => {
        const data = {
        product_id: product.id,
        quantity: quantity,
        };

        fetch("/api/carts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
            console.log("Item added to cart");
            setCartItems((prevCartItems) => [...prevCartItems, product.id]);
            } else {
            throw new Error("Error adding item to cart");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const handleQuantityChange = (index, event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = newQuantity;
        setQuantities(updatedQuantities);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setLoadedCards(0);
        window.scrollTo(0, 0);
    };

    const isInCart = (productId) => {
        return cartItems.includes(productId);
    };

    const renderAddToCartButton = (product, index) => {
        const quantity = quantities[index] || 1;

        if (isInCart(product.id)) {
        return <Button disabled style={{ padding: '1vh',backgroundColor: '#fe5f55', borderColor: '#f4f2dd' , color: '#f4f2dd', font: "'Pacifico', cursive;" ,cursor: 'not-allowed' }}>In Cart</Button>;
        } else {
        return (
            <>                    
            <input
            type="number"
            style={{ width: "35px", marginRight: "10px" }}
            value={quantity}
            onChange={(event) => handleQuantityChange(index, event)}
            />
            <Button className="edit-profile-button" onClick={() => addToCart(product, quantity)}>
            Add to Cart
            </Button>
            </>
        );
        }
    };

    const totalPages = Math.ceil(products.length / productsPerPage);

    const renderPaginationItems = () => {
        const paginationItems = [];

        // Previous arrow
        paginationItems.push(
        <Pagination.Prev
            key="prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
        />
        );

        // First page
        paginationItems.push(
        <Pagination.Item
            key={1}
            active={currentPage === 1}
            onClick={() => handlePageChange(1)}
        >
            {1}
        </Pagination.Item>
        );

        let lastPage = 1;
        let ellipsisDisplayed = false;

        for (let i = 2; i <= totalPages; i++) {
        if (
            i === currentPage ||
            (i >= currentPage - paginationRange &&
            i <= currentPage + paginationRange)
        ) {
            paginationItems.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </Pagination.Item>
            );

            lastPage = i;
            ellipsisDisplayed = false;
        } else if (!ellipsisDisplayed) {
            paginationItems.push(<Pagination.Ellipsis key="ellipsis" />);
            ellipsisDisplayed = true;
        }
        }

        // Last page
        if (lastPage < totalPages) {
        paginationItems.push(
            <Pagination.Item
            key={totalPages}
            active={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
            >
            {totalPages}
            </Pagination.Item>
        );
        }

        // Next arrow
        paginationItems.push(
        <Pagination.Next
            key="next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        />
        );
        return paginationItems;
    };

    // const handleCardAnimationLoad = () => {
    //     setCardAnimationLoaded(true);
    //   };

    useEffect(() => {
        const timer = setInterval(() => {
            setLoadedCards((prevCount) => prevCount + 1);
            }, 100);
        
            return () => {
            clearInterval(timer);
            };
        }, []);
        

    return (
        <div>
        <div className="row deck preload">
            {currentProducts.map((product, index) => {
            const url = `/product/${product.id}`;
            const quantity = quantities[index] || 1;
            const isCardLoaded = loadedCards >= index + 1;

            return (
                <Card
                className={`col-sm-3 card-animation product-margining card-ani-load ${
                    isCardLoaded ? "loaded" : ""
                }`}
                key={product.id}
                >
                <Link to={url}>
                    <Card.Img src={product.image_1} className='card-img'/>
                </Link>
                <Card.Body >
                    <Link
                    to={url}
                    style={{  textDecoration: "none", color: "#31343C" }}
                    >
                    <Card.Subtitle className=' d-flex justify-content-center align-items-center smMT'>{product.name}</Card.Subtitle>
                    </Link>
                    {/* <hr /> */}
                    <h3></h3>
                    <Card.Subtitle className='d-flex justify-content-center align-items-center smMB'>${product.price}</Card.Subtitle>
                    <hr />
                    {user ? (
                    <div className="d-flex justify-content-center align-items-center">
                        {renderAddToCartButton(        
                            product,
                            index)}
                    </div>
                    ) : (
                    <></>
                    )}
                </Card.Body>
                </Card>
            );
            })}
        </div>
        <div className="">
            <div className="pagination justify-content-center align-items-center mdMT mdMB">
                <a 
                className={currentPage === 1 ? 'active' : ''} 
                onClick={() => handlePageChange(1)}
                >
                First
                </a>
                {currentPage > 1 && (
                <a onClick={() => handlePageChange(currentPage - 1)}>&laquo;</a>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                <a
                    key={index}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </a>
                ))}
                {currentPage < totalPages && (
                <a onClick={() => handlePageChange(currentPage + 1)}>&raquo;</a>
                )}
                <a
                className={currentPage === totalPages ? 'active' : ''}
                onClick={() => handlePageChange(totalPages)}
                >
                Last
                </a>
            </div>
        </div>
        </div>
    );
}

export default ProductCard;