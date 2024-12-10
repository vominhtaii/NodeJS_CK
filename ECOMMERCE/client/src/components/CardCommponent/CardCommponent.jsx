import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';

const CardCommponent = (props) => {
    const navigate = useNavigate();
    const { id, key, name, image, price, rating, description, countInStock, selled, productTypeData } = props;

    const handleDetails = (id) => {
        navigate(`productdetails/${id}`);
    };

    const handleDetailType = (id) => {
        navigate(`/productdetails/${id}`);
    };

    return (
        <>
            {id && (
                <>
                    <div className="d-lg-flex justify-content-center">
                        <Card
                            style={{
                                background: 'rgb(230,230,230)',
                                width: '218px',
                                cursor: countInStock > 0 ? 'pointer' : 'not-allowed',
                                opacity: countInStock > 0 ? 1 : 0.6,
                                height: '400px', // Ensure all cards have the same height
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onClick={countInStock > 0 ? () => handleDetails(id) : null}
                        >
                            <Card.Img
                                variant="top"
                                src={image}
                                style={{
                                    width: '100%',  // Ensure the image fills the container
                                    height: '180px',  // Set a smaller fixed height for the image
                                    objectFit: 'cover'  // Maintain aspect ratio while cropping the image if necessary
                                }}
                            />
                            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text style={{ marginTop: 'auto' }}>Giá: {convertPrice(price)}</Card.Text>
                                <p className="card-rating" style={{ marginTop: 'auto' }}>
                                    {rating} ⭐ | Đã bán {selled || 2}
                                </p>
                                <Card.Text style={{ marginTop: 'auto' }}>Mô tả: {description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    {countInStock === 0 && (
                        <p style={{ color: 'red', fontWeight: 'bold', margin: '5px 20px' }}>
                            Sản phẩm đã hết hàng
                        </p>
                    )}
                </>
            )}

            {productTypeData && (
                <div className="d-lg-flex justify-content-center">
                    <Card
                        style={{
                            width: '218px',
                            height: '400px', // Ensuring product type cards have the same height
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        className="d-flex"
                    >
                        <Card.Img
                            variant="top"
                            src={productTypeData.image}
                            style={{
                                width: '100%',  // Ensure the image fills the container
                                height: '180px',  // Set a smaller fixed height for the image
                                objectFit: 'cover'  // Maintain aspect ratio while cropping the image if necessary
                            }}
                            alt="Tools"
                            onClick={() => handleDetailType(productTypeData._id)}
                        />
                        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                            <Card.Title>{productTypeData.name}</Card.Title>
                            <Card.Text style={{ marginTop: 'auto' }}>Giá: {convertPrice(productTypeData.price)}</Card.Text>
                            <p className="card-rating" style={{ marginTop: 'auto' }}>
                                {productTypeData.rating} ⭐ | Đã bán 30% +
                            </p>
                            <Card.Text style={{ marginTop: 'auto' }}>Mô tả: {productTypeData.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    );
};

export default CardCommponent;
