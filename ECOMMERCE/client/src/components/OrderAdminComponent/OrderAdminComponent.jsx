import React from "react";
import * as OrderService from "../../Service/OrderService";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import TableComponent from "../TableComponent/TableComponent";

const OrderAdminComponent = () => {
  const user = useSelector((state) => state.user);
  const fetchAllOrder = async () => {
    const res = OrderService.getAllOrder(user?.acces_token);
    return res;
  };
  const getAllOder = useQuery({
    queryKey: ["get-all-order"],
    queryFn: fetchAllOrder,
    retry: 3,
    retryDelay: 1000,
  });

  const columns = [
    {
      title: "Tên người mua",
      dataIndex: "fullname",
      sorter: (a, b) => a.fullname.length - b.fullname.length,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Tình trạng thanh toán",
      dataIndex: "isPaid",
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
    },
    // {
    //   title: "Hoạt động",
    //   dataIndex: "description",
    // },
  ];

  const dataValueOrder = getAllOder?.data?.data?.map((order) => {
    const dateStr = order.createdAt;
    const dateObj = new Date(dateStr); // Tạo đối tượng Date
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" }; // Định dạng lại ngày thành dd/mm/yy
    const formattedDate = dateObj.toLocaleDateString("en-GB", options);
    return {
      ...order,
      key: order._id,
      isPaid: order.isPaid === false ? "Chưa thanh toán" : "Đã thanh toán",
      paymentMethod: order?.paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : "Thanh toán bằng paypal",
      createdAt: formattedDate
    };
  });
  console.log("dataValue", dataValueOrder);
  return (
    <div style={{marginLeft:'30px'}}>
      <h2>Quản lí đơn hàng</h2>
      <TableComponent
        handleDeleteAllUser={""}
        columns={columns}
        isLoading={false}
        dataValue={dataValueOrder}
      />
    </div>
  );
};

export default OrderAdminComponent;
