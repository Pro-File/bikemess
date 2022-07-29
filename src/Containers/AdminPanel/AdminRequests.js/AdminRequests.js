import React, { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import styles from "./index.module.less";
import { useSelector } from "react-redux";
import { SimpleHeading } from "../../../Components/common/Heading";

const AdminRequests = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const requestListing = useSelector((state) => state.allRequest.requestList);
  const [requestList, setRequestList] = useState(requestListing);
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  useEffect(() => {
    let listing = requestListing.map((request, index) => {
      return { ...request, key: index };
    });
    setRequestList([...listing]);
  }, []);

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns = [
    {
      title: "S/N",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
      ellipsis: true,
    },
    {
      title: "Request Type",
      dataIndex: "requestType",
      key: "requestType",
      filters: [
        {
          text: "update",
          value: "update",
        },
        {
          text: "delete",
          value: "delete",
        },
      ],
      render: (record) => <div className={styles.upperCase}>{record}</div>,
      filteredValue: filteredInfo.requestType || null,
      onFilter: (value, record) => record.requestType.includes(value),
      ellipsis: true,
    },
    {
      title: "Listing",
      dataIndex: "listingName",
      key: "listingName",
      render: (record) => <div className={styles.upperCase}>{record}</div>,
      sorter: (a, b) => a.listingName.length - b.listingName.length,
      sortOrder:
        sortedInfo.columnKey === "listingName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Request Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder:
        sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={clearAll}>Remove Filters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={requestList}
        onChange={handleChange}
        scroll={{
          x: 756,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <SimpleHeading size={16} heading={"Description :"} />
              <p>{record.description}</p>
            </>
          ),
        }}
      />
    </>
  );
};

export default AdminRequests;
