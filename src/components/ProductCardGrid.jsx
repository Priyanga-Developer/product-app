import { Card, Tag, Button } from "antd";

export default function ProductGrid({ products, onEdit, onDelete }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
      }}
    >
      {products.map((p) => (
        <Card
          key={p.id}
          title={p.name}
          extra={
            <Tag color={p.isActive ? "green" : "red"} variant={"filled"}>
              {p.isActive ? "Active" : "Inactive"}
            </Tag>
          }
        >
          <p>
            <b>Category:</b> {p.category}
          </p>
          <p>
            <b>Price:</b> ₹{p.price}
          </p>
          <p>
            <b>Stock:</b> {p.stock}
          </p>
          <p>
            <b>Created:</b> {new Date(p.createdAt).toLocaleDateString()}
          </p>

          <p>
            <b>Description:</b>
            <br /> {p.description}
          </p>

          <div style={{ margin: "10px 0" }}>
            {p.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", paddingTop: "10px" }}>
            <Button type="primary" onClick={() => onEdit(p)}>
              Edit
            </Button>
            <Button type="primary" danger onClick={() => onDelete(p.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
