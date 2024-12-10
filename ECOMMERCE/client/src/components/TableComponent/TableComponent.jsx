import React, { useState } from "react";
import { Button, Table } from "antd";
import Loading from "../LoadingComponent/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const TableComponent = ({ dataValue, isLoading, columns, handleDeleteAllUser, handleDeleteAllProduct, ...props }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Số phần tử mỗi trang
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // cấu hình cột không được checked
      name: record.name,
    }),
  };

  const handleDeleteMany = () => {
    if (handleDeleteAllUser) {
      handleDeleteAllUser(selectedRowKeys);
    } else if (handleDeleteAllProduct) {
      handleDeleteAllProduct(selectedRowKeys);
    }
  };

  const keysToExclude = ["_id", "isAdmin", "createdAt", "updatedAt", "__v"];
  const filterKey = (obj, keys) => {
    return Object.keys(obj).reduce((acc, key) => {
      if (!keys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };

  const filteredArray = dataValue?.map((item) =>
    filterKey(item, keysToExclude)
  );

  const exportToExcel = () => {
    // Truncate values exceeding 32,767 characters
    const truncateValue = (value, maxLength = 32767) =>
      typeof value === "string" && value.length > maxLength
        ? value.substring(0, maxLength)
        : value;

    const filteredAndTruncatedArray = filteredArray?.map(row =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, truncateValue(value)])
      )
    );

    const worksheet = XLSX.utils.json_to_sheet(filteredAndTruncatedArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "data.xlsx");
  };

  return (
    <Loading isLoading={isLoading}>
      {selectedRowKeys.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Button
            style={{
              marginBottom: "20px",
              backgroundColor: "#384877",
              color: "#fff",
            }}
            onClick={handleDeleteMany}
          >
            <FontAwesomeIcon style={{ marginRight: "2px" }} icon={faEraser} />{" "}
            Xóa tất cả
          </Button>
        </div>
      )}

      <div
        style={{
          width: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          border: "2px solid #ccc",
        }}
      >
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={pagination}
          onChange={handleTableChange}
          columns={columns}
          dataSource={dataValue}
          {...props}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          style={{ backgroundColor: "#28a745", color: "#fff" }}
          onClick={exportToExcel}
        >
          <FontAwesomeIcon style={{ marginRight: "2px" }} icon={faFileExcel} />{" "}
          Xuất Excel
        </Button>
      </div>
    </Loading>
  );
};

export default TableComponent;
