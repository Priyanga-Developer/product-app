import { useEffect, useState } from "react";
import { Switch, Input, Button, Modal, message ,Typography } from "antd";
import ProductTable from "../components/ProductTable";
import ProductGrid from "../components/ProductCardGrid";
import ProductForm from "../components/ProductForm";
import productsData from "../data/products.json";

export default function Home() {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");
  const [grid, setGrid] = useState(false);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSave = (values) => {
    if (editing) {
      // update
      const updated = products.map((p) =>
        p.id === editing.id ? { ...editing, ...values } : p
      );
      setProducts(updated);
      message.success("Product updated");
    } else {
      // add new at top
      const newItem = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: [],
        ...values,
      };
      setProducts([newItem, ...products]);
      message.success("Product added");
    }
    setOpen(false);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Product?",
      okType: "danger",
      onOk: () => {
        setProducts(products.filter((p) => p.id !== id));
        message.success("Deleted");
      },
    });
  };

  return (
    <div style={{ padding: "30px" }}>
   

<Typography.Title
  level={2}
  style={{
    textAlign: "center",
    marginBottom: "10px",
    color: "#1677ff",
  }}
>
  Product List
</Typography.Title>



      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          placeholder="Search..."
          style={{ width: "70%" ,height: "40px"}}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <span>{grid ?"Grid View:" : "Table View"}</span>
          <Switch checked={grid} onChange={(v) => setGrid(v)} />
          <Button type="primary" onClick={handleAdd}>
            Add Product
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        {grid ? (
          <ProductGrid
            products={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <ProductTable
            products={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ProductForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        editing={editing}
      />
    </div>
  );
}
