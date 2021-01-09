import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewLinkForm = () => {
  return (
    <div className="newLinkForm">
      <Form>
        <Form.Group controlId="websiteUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control type="basic-url" placeholder="Enter URL" />
          <Form.Text className="text-muted">
            Enter the URL of the webpage you want to bookmark.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="websiteTag">
          <Form.Label>Tag 1</Form.Label>
          <Form.Control type="textarea" placeholder="Enter Tag" />
        </Form.Group>

        <Form.Group controlId="websiteTag">
          <Form.Label>Tag 2</Form.Label>
          <Form.Control type="textarea" placeholder="Enter Tag" />
        </Form.Group>

        <Form.Group controlId="websiteTag">
          <Form.Label>Tag 3</Form.Label>
          <Form.Control type="textarea" placeholder="Enter Tag" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Comments</Form.Label>
          <Form.Control type="textarea" placeholder="Add Comments Here " />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewLinkForm;
