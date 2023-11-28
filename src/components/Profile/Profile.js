import React from "react";
import { Card, Form, Spinner } from "react-bootstrap";

const Profile = (props) => {
  // console.log(profileInfo);

  const selectedUser =
    props.profileInfo &&
    props.profileInfo.find((user) => user.id === props.selectedUserId);

  // console.log(selectedUser);

  const UserDetalis = () => {
    if (props.isLoading) {
      return (
        <div className="d-flex justify-content-center  align-items-center p-3">
          <Spinner animation="border" variant="warning" />
        </div>
      );
    }
    if (props.loading) {
      return (
        <div className="d-flex justify-content-center  align-items-center p-3">
          <Spinner animation="border" variant="warning" />
        </div>
      );
    }

    if (!selectedUser) {
      return (
        <div className="d-flex justify-content-center  align-items-center p-3">
          <p>
            Select a user from the{" "}
            <span style={{ fontWeight: "700" }}>users list</span> to view their
            profile.
          </p>
        </div>
      );
    }
    return (
      <>
        <Card.Body>
          <Card.Img
            src={selectedUser.avatar}
            className="img-fluid rounded-circle"
            style={{ width: "100px" }}
          />
          <Card.Title>@{selectedUser.profile.username}</Card.Title>
        </Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="userBio.ControlTextarea1">
            <Form.Control as="textarea" rows={3} value={selectedUser.Bio} />
          </Form.Group>
        </Form>

        <Card.Body className="text-start ">
          <Form>
            <Form.Group className="mb-3" controlId="userName.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={`${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userJobTitle.ControlInput1">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" value={selectedUser.jobTitle} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userEmail.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={selectedUser.profile.email} />
            </Form.Group>
          </Form>
        </Card.Body>
      </>
    );
  };

  return (
    <Card className="bg-light border-0 shadow">
      <Card.Body>
        <Card.Header
          className=" bg-info border-0 text-white "
          style={{ fontWeight: "bold" }}
        >
          User Details
        </Card.Header>
        {UserDetalis()}
      </Card.Body>
    </Card>
  );
};

export default Profile;
