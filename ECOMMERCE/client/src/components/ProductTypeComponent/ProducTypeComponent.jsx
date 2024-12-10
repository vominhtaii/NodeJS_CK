import React, { useEffect, useState } from 'react';
import * as ProductService from '../../Service/ProductService';
import { useParams } from 'react-router-dom';
import { useMutationHook } from '../../hooks/useMutationHook';
import CardCommponent from '../CardCommponent/CardCommponent';

const ProducTypeComponent = () => {
    const [loading, setLoading] = useState(false);
    const mutation = useMutationHook((type) => ProductService.filterTypeProduct(type));
    const { data: productType } = mutation;
    const param = useParams();
    const [currentType, setCurrentType] = useState(''); 
    const [allTypes, setAllTypes] = useState([]); 

    const fetchAllTypes = async () => {
        try {
            const response = await ProductService.getAllType();
            setAllTypes(response?.data || []);
        } catch (error) {
            console.error('Failed to fetch product types:', error);
        }
    };

    const fetchFilterType = (type) => {
        setLoading(true);
        mutation.mutate(type);
        setCurrentType(type); 
        setLoading(false);
    };

    useEffect(() => {
        fetchAllTypes();

        if (param?.type) {
            const newType = param?.type.split('_').join(' ');
            fetchFilterType(newType);
        }
    }, [param?.type]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-2">
                    <div className="list-group">
                        {allTypes.map((type) => (
                            <a
                                key={type}
                                href={`/product-type/${type.replace(/\s+/g, '_')}`}
                                className={`list-group-item list-group-item-action ${
                                    type === currentType ? 'active' : ''
                                }`}
                            >
                                {type}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="col-md-9 ms-4">
                    <div className="row">
                        {productType?.data?.map((product) => (
                            <div key={product.id} className="col-md-3 mb-2">
                                <CardCommponent productTypeData={product} />|
                            </div>
                        ))}
                    </div>
                    <nav>
                        <ul className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ProducTypeComponent;
