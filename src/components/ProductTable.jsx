import { Table, Tag, Button } from "antd";

export default function ProductTable({ products, onEdit, onDelete }) {
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Price", dataIndex: "price" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (v) =>
        v ? (
          <Tag color={"green"} variant={"filled"}>
            Active
          </Tag>
        ) : (
          <Tag color={"red"} variant={"filled"}>
            InActive
          </Tag>
        ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="id"
      scroll={{ x: "max-content", y: 450 }}
      pagination={{
        position: ["bottomCenter"],
        total: products.length,
        showSizeChanger: true,
        showTotal: (t, r) => `${r[0]}-${r[1]} of ${t} items`,
        pageSizeOptions: ["5", "10", "20", "50"],
      }}
    />
  );
}
