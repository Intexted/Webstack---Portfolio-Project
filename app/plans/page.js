import React from "react";
import "@/styles/plans.css";
import GetPlan from "@/components/GetPlan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import ReactPlayer from "react-player";

async function Plans() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Pricing</h1>
          <p className="lead">
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It&apos;s built with default
            Bootstrap components and utilities with little customization.
          </p>
        </div>
        <div className="container">
          <div className="d-flex card-deck mb-3 text-center gap-5">
            <div className="card mb-4 box-shadow" style={{ flex: 1 }}>
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Free</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  $0 <small className="text-muted">/ mo</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>10 users included</li>
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                <GetPlan plan="free" userId={session?.user?._id} />
              </div>
            </div>
            <div className="card mb-4 box-shadow" style={{ flex: 1 }}>
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Premium</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  $30 <small className="text-muted">/ mo</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>20 users included</li>
                  <li>10 GB of storage</li>
                  <li>Priority email support</li>
                  <li>Help center access</li>
                </ul>
                <GetPlan plan="premium" userId={session?.user?._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Plans;
