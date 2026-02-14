import { Outlet } from "react-router";

export default function Application() {
  return (
    <div>
      board page
      <Outlet />
    </div>
  );
}
