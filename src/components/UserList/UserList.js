import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Profile from "../Profile/Profile";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionLoader, setSelectionLoader] = useState(false);

  useEffect(() => {
    const fetchUserListHandler = async () => {
      try {
        const response = await axios.get(
          "https://602e7c2c4410730017c50b9d.mockapi.io/users"
        );

        console.log(response.data);
        setUsersList(response.data);
      } catch (error) {
        setError("Failed to fetch user list!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserListHandler();
  }, []);

  const userInfoHandler = (userId) => {
    setSelectedUserId(userId);
    setSelectionLoader(true);
    setTimeout(() => setSelectionLoader(false), 1000);
  };

  // During the development process, it was observed that avatar URLs for users with IDs below 11 were either missing or incorrect. As a result, these avatars couldn't be loaded correctly on the user interface. This issue is likely due to incomplete or incorrect data in the API or data source.
  const filteredUsers = usersList.filter((user) => user.id > 10);

  return (
    <Container>
      <Row md={7} className="gap-lg-4 mt-4">
        <Col className="mb-3">
          <Card className="bg-light border-0">
            <Card.Body>
            <Card.Header
              style={{ fontWeight: "bold" }}
              className="text-white bg-info border-0 mb-2"
            >
              Users List
            </Card.Header>

            {isLoading ? (
              <div className="d-flex justify-content-center  align-items-center p-3">
                <Spinner animation="border" variant="warning" />
              </div>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              filteredUsers.map((userList) => (
                <Card
                  className="my-2 card-hover overflow-hidden"
                  key={userList.id}
                  onClick={() => userInfoHandler(userList.id)}
                >
                  <Card.Body className="d-flex align-items-center p-2">
                    <Card.Img
                      className="img-fluid rounded-5 "
                      style={{ width: "60px" }}
                      src={userList.avatar}
                      alt="Avatar"
                    />
                    <Card.Title className="m-2 fs-6" >
                      {userList.profile.username}
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))
            )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Profile
            profileInfo={usersList}
            selectedUserId={selectedUserId}
            loading={selectionLoader}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
