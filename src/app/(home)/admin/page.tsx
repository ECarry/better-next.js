import React from "react";

const AdminPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">管理员控制面板</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          这是一个受保护的管理员页面。只有具有管理员权限的用户才能访问。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">用户管理</h2>
            <p className="text-sm text-gray-600">管理用户账户和权限</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">内容管理</h2>
            <p className="text-sm text-gray-600">管理网站内容和设置</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">系统设置</h2>
            <p className="text-sm text-gray-600">配置系统参数和选项</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
