
import { Input } from "antd";
import debounce from "lodash.debounce";
import { useMemo } from "react";

export default function SearchBar({ onSearch }) {
  const debounced = useMemo(
    () => debounce((val) => onSearch(val), 500),
    []
  );

  return (
    <Input
      placeholder="Search products..."
      allowClear
      onChange={(e) => debounced(e.target.value)}
      style={{ marginBottom: 20 }}
    />
  );
}
