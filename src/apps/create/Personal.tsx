import { Formik } from "formik";
import SlideIn from "../../components/SlideIn";
import MainButton from "../../components/MainButton";
import { personalSchema, PersonalType } from "./CreateHelpers";
import BackIcon from "../../components/backIcons/BackIconAction";
import { Typography, FormControl, TextField } from "@mui/material";

type Props = {
  pError: string;
  submitting: boolean;
  personalData: PersonalType;
  createParty: (values: PersonalType) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPersonalData: (personalData: PersonalType) => void;
};

const CreateForm = ({
  pError,
  setStep,
  submitting,
  createParty,
  personalData,
  setPersonalData,
}: Props) => {
  return (
    <>
      <BackIcon
        action={() => {
          setStep(3);
          setPersonalData(personalData);
        }}
      />
      <SlideIn>
        <Formik
          onSubmit={createParty}
          initialValues={personalData}
          validationSchema={personalSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "50px",
              }}
            >
              <Typography mb="20px" variant="h3">
                Let's get this party started!
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TextField
                  name="name"
                  label="Party Name"
                  onBlur={handleBlur}
                  value={values.name}
                  required
                  onChange={(e) => {
                    setPersonalData({ ...personalData, name: e.target.value });
                    handleChange(e);
                  }}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  required
                  fullWidth
                  onChange={(e) => {
                    setPersonalData({
                      ...personalData,
                      password: e.target.value,
                    });
                    handleChange(e);
                  }}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={
                    errors.password && touched.password
                      ? errors.password
                      : "You can use this later to manage the party."
                  }
                />
                <MainButton
                  disabled={submitting}
                  type="submit"
                  text={submitting ? "Creating Party!" : "Create Party"}
                />
              </FormControl>
              {pError && (
                <Typography color="error" mt="10px">
                  {pError}
                </Typography>
              )}
            </form>
          )}
        </Formik>
      </SlideIn>
    </>
  );
};

export default CreateForm;
