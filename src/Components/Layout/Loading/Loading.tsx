import { LoadingOutlined } from "@ant-design/icons";
import "./Loading.css";

export function Loading(): JSX.Element {
  return (
    <div className="Loading">
      <LoadingOutlined />
    </div>
  );
}
