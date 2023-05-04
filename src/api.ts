const localUrl = "http://localhost:6001";
const prodUrl =
  "https://chickentinder.eba-hn9224mj.us-west-2.elasticbeanstalk.com/";

const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : localUrl;

const getParty = async (id: string): Promise<any> => {
  return fetch(baseUrl + "party/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (res.status !== 200) throw new Error("Error getting party");
      return res.json().then((data) => {
        console.log("here", data);
        return data;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createParty = async (formData: any): Promise<any> => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData),
  })
    .then(async (res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          return data;
        });
      } else {
        throw new Error("Error creating party");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const vote = async (id: string, likes: any): Promise<any> => {
  return fetch(baseUrl + "party/" + id + "/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: likes }),
  })
    .then((res) => {
      if (res.status !== 200) throw new Error("Error voting");
      return res.json().then((data) => {
        return data;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const validatePassword = async (id: string, password: string): Promise<any> => {
  return fetch(baseUrl + "party/" + id + "/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  }).then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export default { getParty, vote, validatePassword, createParty };
