import { Formik } from "formik";
import SlideIn from "../../components/SlideIn";
import MainButton from "../../components/MainButton";
import BackIcon from "../../components/backIcons/BackIconTo";
import {
  toMiles,
  toMeters,
  rFormSchema,
  RFormType,
  typeOptions,
} from "./CreateHelpers";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Slider,
  MenuItem,
} from "@mui/material";

type Props = {
  formData: RFormType;
  rError: string | null;
  fetchRestaurants: (formData: RFormType) => void;
};

const RForm = ({ rError, formData, fetchRestaurants }: Props) => {
  return (
    <>
      <BackIcon to="/" />
      <SlideIn>
        <Formik
          initialValues={formData}
          onSubmit={fetchRestaurants}
          validationSchema={rFormSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <Typography mb="5px" variant="h3">
                Where's the Party?
              </Typography>
              <Typography mb="30px" color="secondary">
                We'll find the best places near you!
              </Typography>
              <FormControl
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <TextField
                  select
                  name="type"
                  label="Type of Place"
                  variant="outlined"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  error={Boolean(touched.type) && Boolean(errors.type)}
                  helperText={
                    errors.type && touched.type
                      ? errors.type
                      : "Choose a category"
                  }
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="location"
                  label="City Name or Zip Code"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  required
                  helperText={touched.location && errors.location}
                />

                <FormControl fullWidth>
                  <TextField
                    select
                    name="price"
                    label="Max Price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    required
                  >
                    <MenuItem value="0">No Limit</MenuItem>
                    <MenuItem value="1">$</MenuItem>
                    <MenuItem value="2">$$</MenuItem>
                    <MenuItem value="3">$$$</MenuItem>
                    <MenuItem value="4">$$$$</MenuItem>
                  </TextField>
                </FormControl>

                <Box
                  width="100%"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography>Max Distance From Location</Typography>
                    <Typography color="text.secondary">
                      {toMiles(values.max_distance)} miles
                    </Typography>
                  </Box>
                  <Slider
                    min={1}
                    step={1}
                    max={24}
                    marks={[
                      { value: 1, label: "1" },
                      { value: 5, label: "5" },
                      { value: 10, label: "10" },
                      { value: 15, label: "15" },
                      { value: 20, label: "20" },
                      { value: 24, label: "24" },
                    ]}
                    valueLabelDisplay="auto"
                    aria-label="Max Distance"
                    value={toMiles(values.max_distance)}
                    onChange={(_e, value) =>
                      setFieldValue("max_distance", toMeters(value as number))
                    }
                  />
                </Box>

                <MainButton type="submit" text="Find Places" />

                {rError && (
                  <Typography color="error" mt="px">
                    {rError}
                  </Typography>
                )}
              </FormControl>
            </form>
          )}
        </Formik>
      </SlideIn>
    </>
  );
};

export default RForm;
