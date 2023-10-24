"use client";

import React from "react";
import { Row, Col } from "reactstrap";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Loading from "../../components/Loading";
import Highlight from "../../components/Highlight";

function Profile() {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <div className="p-4 bg-firstColor rounded shadow-md">
          <Row className="items-center mb-5 text-center md:text-left">
            <Col xs={12} md={2} className="mb-3 md:mb-0">
              <img
                src={user.picture}
                alt="Profile"
                className="w-20 h-20 md:w-32 md:h-32 rounded-full mx-auto md:mx-0"
                data-testid="profile-picture"
              />
            </Col>
            <Col>
              <h2
                className="text-2xl font-bold text-eightColor"
                data-testid="profile-name"
              >
                {user.name}
              </h2>
            </Col>
          </Row>
          <Row data-testid="profile-json">
            <Col>
              <div className="border-2 border-eightColor rounded-lg">
                <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
});
