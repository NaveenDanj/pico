import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-[#0F172A]">
      <Outlet />
    </div>
  );
}

export default AuthLayout;