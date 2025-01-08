import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "../../UserContext";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get the user context

  const initialValues = {
    title: "",
    description: "",
    location: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().optional(),
    location: Yup.string().required("Location is required"),
    date: Yup.string()
      .required("Date and time are required")
      .test("is-future-date", "Event date must be in the future", (value) => {
        return new Date(value) > new Date();
      }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        "http://localhost:8080/events",
        {
          ...values,
          creatorId: user.userId, // Pass the creatorId from the user context
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event created successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create the event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create an Event
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-gray-700"
                >
                  Title
                </label>
                <Field
                  name="title"
                  id="title"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-lg font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-lg font-medium text-gray-700"
                >
                  Location
                </label>
                <Field
                  name="location"
                  id="location"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-lg font-medium text-gray-700"
                >
                  Date and Time
                </label>
                <Field
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300"
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateEventPage;