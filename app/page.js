import Link from "next/link";
import React from "react";
import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="d-flex p-5 justify-content-between align-items-center">
      <h3>Logo</h3>
      {!session?.user ? (
        <div>
          <Link href="/login" className="btn">
            <h4>Login</h4>
          </Link>
          <Link href="/register" className="btn">
            <h4>register</h4>
          </Link>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between">
          {session?.user.role === "admin" && (
            <Link href="/dashboard/lectures" className="btn">
              <h4>Dashboard</h4>
            </Link>
          )}
          <Link href="/lectures" className="btn">
            <h4>Lectures</h4>
          </Link>
          <Link href="/forms" className="btn">
            <h4>Form</h4>
          </Link>
          <Logout />
        </div>
      )}
    </main>
  );
}

export default Home;
