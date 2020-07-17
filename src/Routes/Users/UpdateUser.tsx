import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Field, Formik, Form } from "formik";

import FormButtons from "components/FormButtons";
import FormContainer from "components/FormContainer";
import FormSection from "components/FormSection";
import FormText from "components/FormText";

import history from "lib/history";
import { useGetUser, useUpdateUser } from "lib/queries";

const UpdateUser: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetUser(id);
  const [updateUser, { data: userDataUpdated }] = useUpdateUser();
  useEffect(() => {
    if (userDataUpdated && userDataUpdated.update_user.id) {
      history.push("/users");
    }
  }, [userDataUpdated]);
  if (loading) return <span>Loading...</span>;
  if (error) return <span>{`Error! ${error.message}`}</span>;
  if (!(data && data.get_user)) return <span>{`Error! No data from API`}</span>;
  return (
    <FormContainer>
      <Formik
        initialValues={data.get_user}
        onSubmit={({ name, email, role }) => {
          updateUser({ variables: { id, name, email, role } });
        }}
      >
        {() => (
          <Form noValidate>
            <FormSection>
              <Typography variant="h6" gutterBottom>
                Update User
              </Typography>
              <Field
                type="email"
                name="email"
                label="Email"
                component={FormText}
              />
              <Field name="name" label="Name" component={FormText} />
              <Field name="role" label="Role" component={FormText} />
            </FormSection>
            <Divider />
            <FormButtons
              onCancel={() => history.push("/users")}
              submitLabel="Update User"
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default UpdateUser;