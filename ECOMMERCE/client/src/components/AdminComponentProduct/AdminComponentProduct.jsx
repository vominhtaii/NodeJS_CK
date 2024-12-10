import {
  faPenToSquare,
  faPlus,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Upload, Space, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import * as message from "../MessagComponent/MessagComponent";
import "./productAdmin.scss";
import { getBase64, renderOptions } from "../../utils";
import {
  createProduct,
  getAllProduct,
  getDetailsProduct,
  upDateProduct,
  deleteProduct as SeverviceDelete,
  deleteProductMany,
  getAllType,
} from "../../Service/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const AdminComponentProduct = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const mutation = useMutationHook((dataProduct) => createProduct(dataProduct));
  const mutationUpdate = useMutationHook(({ id, data, acces_token }) =>
    upDateProduct(id, data, acces_token)
  );
  const mutationDelete = useMutationHook((id) => SeverviceDelete(id));
  const mutationDeleteMany = useMutationHook(({ data, acces_token }) =>
    deleteProductMany(data, acces_token)
  );
  const { data } = mutation;
  const { data: DataUpdateProduct } = mutationUpdate;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [openDrawer, setOpenDrawer] = useState("");
  const [loadingDrawer, setLoadingDrawer] = useState(false);
  const [isOpenModalDelete, setIsopenModalDelete] = useState(false);
  const [slectType, setSelectType] = useState("");
  const messageProduct = data?.status === "OK";
  const messageUpdateProduct = DataUpdateProduct?.status === "OK";
  const messageDeleteProduct = mutationDelete?.data?.status === "ok";
  const messgaeDeleteProductMany = mutationDeleteMany?.data?.status === "OK";

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [valueProduc, setValueProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
  });

  const [stateProductDetails, setStateProducDetails] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
  });
  const fetchProductAll = async () => {
    const res = await getAllProduct();
    return res;
  };
  const queryGetAllProduct = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });
  const { isLoading, data: product } = queryGetAllProduct;

  const fetchProductAllType = async () => {
    const res = await getAllType();
    return res;
  };

  const { data: typeProduct } = useQuery({
    queryKey: ["product-Type"],
    queryFn: fetchProductAllType,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (messageProduct) {
      message.success("Thêm thành công sản phẩm");
      handleCancel();
    }
  }, [messageProduct]);

  useEffect(() => {
    if (messageUpdateProduct) {
      message.success("Update thành công sản phẩm");
      handleCancelUpdateProduct();
    }
  }, [messageUpdateProduct]);

  useEffect(() => {
    if (messageDeleteProduct) {
      message.success("Delete thành công sản phẩm");
      handleCloseModalDelete();
    }
  }, [messageDeleteProduct]);

  useEffect(() => {
    if (messgaeDeleteProductMany) {
      message.success("DeleteMany thành công sản phẩm");
    }
  }, [messgaeDeleteProductMany]);

  const handleOnchangeInput = (e) => {
    setValueProduct({
      ...valueProduc,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProducDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOk = () => {
    mutation.mutate(
      {
        name: valueProduc.name,
        image: valueProduc.image,
        type: valueProduc.type,
        price: valueProduc.price,
        countInStock: valueProduc.countInStock,
        rating: valueProduc.rating,
        description: valueProduc.description,
      },
      {
        onSettled: () => queryGetAllProduct.refetch(),
      }
    );
  };

  const handleChangeImage = async (info) => {
    const file = info.fileList[0];
    if (!file) {
      return;
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setValueProduct({
      ...valueProduc,
      image: file.preview,
    });
  };

  const handleChangeImageDetails = async (info) => {
    const file = info.fileList[0];
    if (!file) {
      return;
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProducDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValueProduct({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
    });
    form.resetFields(); // Reset the form fields
  };

  const handleCloseModalDelete = () => {
    setIsopenModalDelete(false);
  };
  const handleCancelUpdateProduct = () => {
    setOpenDrawer(false);
    setValueProduct({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
    });
    form.resetFields(); // Reset the form fields
  };
  const handleOnClickTrash = (e) => {
    setIsopenModalDelete(true);
  };
  const handleDeleteProduct = () => {
    mutationDelete.mutate(rowSelected, {
      onSettled: () => queryGetAllProduct.refetch(),
    });
  };
  const renderAction = () => {
    return (
      <div>
        <Button
          style={{ width: "40px", color: "red", fontSize: "18px" }}
          onClick={handleOnClickTrash}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button
          style={{ marginLeft: "18px", width: "40px", fontSize: "18px" }}
          onClick={handleOnclickSquare}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </div>
    );
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image}
          alt="product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Kiểu",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: "Tồn kho",
      dataIndex: "countInStock",
      sorter: (a, b) => a.countInStock.length - b.countInStock.length,
    },
    {
      title: "Sao đánh giá",
      dataIndex: "rating",
      sorter: (a, b) => a.rating.length - b.rating.length,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Hoạt động",
      dataIndex: "description",
      render: renderAction,
    },
  ];

  const fetchGettailsProduct = async () => {
    const res = await getDetailsProduct(rowSelected);
    const data = res?.data;
    if (data) {
      await setStateProducDetails({
        name: data?.name,
        image: data?.image,
        type: data?.type,
        price: data?.price,
        countInStock: data?.countInStock,
        rating: data?.rating,
        description: data?.description,
      });
    }
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGettailsProduct();
    }
  }, [rowSelected]);

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
    setLoadingDrawer(false);
  }, [form, stateProductDetails]);

  const handleOnclickSquare = () => {
    if (rowSelected) {
      fetchGettailsProduct();
    }
    setOpenDrawer(true);
    setLoadingDrawer(true);
  };

  const handleSumitDetails = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        data: stateProductDetails,
        acces_token: user?.acces_token,
      },
      {
        onSettled: () => queryGetAllProduct.refetch(),
      }
    );
  };
  const handleDeleteAllProduct = (ids) => {
    mutationDeleteMany.mutate(
      {
        data: { id: ids },
        acces_token: user?.acces_token,
      },
      {
        onSettled: () => queryGetAllProduct.refetch(),
      }
    );
  };

  const handleChangeSelect = (value) => {
    if (value !== "Add_type") {
      // neu khac type
      setValueProduct({
        ...valueProduc,
        type: value,
      });
      setSelectType(""); // Reset selectType if another option is selected
    } else {
      setSelectType(value);
    }
  };
  const dataValueProduct = product?.data.map((product) => {
    return {
      ...product,
      key: product._id,
    };
  });

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Product</h1>
        <Button
          style={{ marginLeft: "20px", fontSize: "15px" }}
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add
        </Button>
      </div>
      <div>
        <TableComponent
          handleDeleteAllProduct={handleDeleteAllProduct}
          dataValue={dataValueProduct}
          isLoading={isLoading}
          columns={columns}
          onRow={(record, index) => {
            return {
              onClick: () => {
                return setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        title="Thêm sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item label="Name" name="Name">
            <Input
              value={valueProduc.name}
              onChange={handleOnchangeInput}
              name="name"
            />
          </Form.Item>

          <Form.Item label="Type" name="Type">
            <Select
              name="type"
              onChange={handleChangeSelect}
              options={renderOptions(typeProduct?.data)}
            />
          </Form.Item>
          {slectType === "Add_type" ? (
            <Form.Item label="Add type" name="addtype">
              <Input onChange={handleOnchangeInput} name="type" />
            </Form.Item>
          ) : (
            ""
          )}
          <Form.Item label="Price" name="Price">
            <Input
              type="number"
              value={valueProduc.price}
              onChange={handleOnchangeInput}
              name="price"
            />
          </Form.Item>

          <Form.Item label="CountInStock" name="CountInStock">
            <Input
              type="number"
              value={valueProduc.countInStock}
              onChange={handleOnchangeInput}
              name="countInStock"
            />
          </Form.Item>

          <Form.Item label="Rating" name="Rating">
            <Input
              type="number"
              value={valueProduc.rating}
              onChange={handleOnchangeInput}
              name="rating"
            />
          </Form.Item>

          <Form.Item label="Description" name="Description">
            <Input
              value={valueProduc.description}
              onChange={handleOnchangeInput}
              name="description"
            />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Upload onChange={handleChangeImage}>
                <Button>
                  {" "}
                  <FontAwesomeIcon icon={faUpload} /> Click to Upload
                </Button>
              </Upload>
              {valueProduc?.image && (
                <img
                  src={valueProduc?.image}
                  style={{
                    height: "70px",
                    width: "70px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
              )}
            </div>
            {data?.status === "Error" && (
              <div style={{ marginTop: "10px", color: "red" }}>
                {data?.message}
              </div>
            )}
          </Form.Item>
        </Form>
      </ModalComponent>

      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        width="70%"
      >
        <Loading isLoading={loadingDrawer}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 26,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item label="Name" name="name">
              <Input
                value={stateProductDetails?.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item label="Type" name="type">
              <Input
                value={stateProductDetails?.type}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>

            <Form.Item label="Price" name="price">
              <Input
                type="number"
                value={stateProductDetails?.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>

            <Form.Item label="CountInStock" name="countInStock">
              <Input
                type="number"
                value={stateProductDetails?.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item label="Rating" name="rating">
              <Input
                type="number"
                value={stateProductDetails?.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input
                value={stateProductDetails?.description}
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Upload onChange={handleChangeImageDetails}>
                  <Button>
                    {" "}
                    <FontAwesomeIcon icon={faUpload} /> Click to Upload
                  </Button>
                </Upload>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}

                {DataUpdateProduct?.status === "Error" && (
                  <div style={{ marginLeft: "20px", color: "red" }}>
                    {DataUpdateProduct?.message}{" "}
                  </div>
                )}
              </div>
              {data?.status === "Error" && (
                <div style={{ marginTop: "10px", color: "red" }}>
                  {data?.message}
                </div>
              )}
            </Form.Item>
            <Button
              style={{ display: "flex", marginLeft: "auto" }}
              onClick={handleSumitDetails}
            >
              Sumit
            </Button>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Bạn có chắc là muốn xóa sản phẩm chứ ?"
        open={isOpenModalDelete}
        onOk={handleDeleteProduct}
        onCancel={handleCloseModalDelete}
      ></ModalComponent>
    </>
  );
};

export default AdminComponentProduct;
