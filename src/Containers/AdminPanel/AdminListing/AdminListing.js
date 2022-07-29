import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import ListItem from "../../../Components/List/ListItem";
import { useHistory } from "react-router-dom";
import DeleteModal from "../../../Components/DeleteModal";

const AdminListing = () => {
  const columns = [
    {
      title: "S/N",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
      ellipsis: true,
    },

    {
      title: "Listing",
      dataIndex: "shopName",
      key: "shopName",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      fixed: 'right',
      render: (index, record) => (
        <div>
          <a style={{ padding: "10px" }} onClick={() => onEdit(record)}>
            Edit
          </a>
          <a style={{ padding: "10px" }} onClick={() => showModal(record)}>
            Delete
          </a>
        </div>
      ),
    },
  ];
  const allListing = useSelector((state) => state.allListing.list);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowRecord, setRowRecord] = useState({});

  const history = useHistory();
  const onEdit = (record) => {
    history.push(`/list/${record.id}`);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const showModal = (rowData) => {
    setRowRecord(rowData);
    setIsModalVisible(true);
  };

  return (
    <div>
      <DeleteModal
        rowData={rowRecord}
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
      <Table columns={columns} dataSource={allListing} scroll={{
      x: 756,
    }} />
    </div>
  );
};
export default AdminListing;
