const user = {
  user_id: 1,
  user_name: "user_name",
  user_email: "user_email",
};

const field = {
  user_id: 1,
  field_id: 1,
  field_name: "field_name",
  status: "status",
  last_irrigation: "date",
  next_irrigation: "date",
  avg_irrigation_time: 1,
};

const irrigation = {
  user_id: 1,
  field_id: 1,
  irrigation_id: 1,
  irrigation_time: "date",
  irrigation_duration: 1,
  irrigation_status: "status",
};

const sensor = {
  user_id: 1,
  field_id: 1,
  sensor_id: 1,
  sensor_name: "sensor_name",
  sensor_status: "status",
  sensor_value: 1,
  sensor_unit: "unit",
  sensor_type: "type",
  sensor_last_update: "date",
};

/*
  Get Fields
  GET /:userId/fields
  Response: field[]
*/
