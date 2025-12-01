import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";

export default function ProductForm({ open, onClose, onSave, editData }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editData) form.setFieldsValue(editData);
    else form.resetFields();
  }, [editData]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      values.price = Number(values.price);
      values.stock = Number(values.stock || 0);
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={editData ? "Edit Product" : "Add Product"}
      open={open}
      centered
      okText="Save"
      width={600}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSubmit} // Cleanly separated
      destroyOnClose={true}  // FIX: Prevents form reuse issues
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price (₹)"
          rules={[
            { required: true, message: "Price is required" },
            {
              validator(_, v) {
                if (!v || /^[0-9]*\.?[0-9]*$/.test(v)) return Promise.resolve();
                return Promise.reject("Enter a valid number");
              },
            },
          ]}
        >
          <Input placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Select
            placeholder="Select category"
            options={[
              { value: "Electronics" },
              { value: "Furniture" },
              { value: "Fashion" },
              { value: "Sports" },
              { value: "Kitchen" },
              { value: "Home" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[
            {
              validator(_, v) {
                if (!v || /^[0-9]+$/.test(v)) return Promise.resolve();
                return Promise.reject("Stock must be a whole number");
              },
            },
          ]}
        >
          <Input placeholder="Enter stock quantity" />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            placeholder="Add tags"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
