import React from "react";
import actions from "@/actions";

async function UsersPage() {
  const users = await actions.GetUsers();
  //   console.log(users);
  return (
    <div>
      {" "}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Nickname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.nickname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
