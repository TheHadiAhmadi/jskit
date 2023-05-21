import { AdminLayout, Text, View } from "../../components/index.js";

export function middleware(req, res, next) {
  console.log("middleware");
}

export default AdminLayout;
