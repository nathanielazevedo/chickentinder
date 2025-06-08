import RForm from "./RForm";
import api from "../../api";
import CStepper from "./Stepper";
import { useState } from "react";
import RPreview from "./RPreview";
import Personal from "./Personal";
import Time from "./time/TimeMain";
import VotersInfo from "./VotersInfo";
import { useNavigate } from "react-router-dom";
import { CreateParty } from "../../models/Party";
// import { CustomRestaurant, Restaurant } from "../../models/Restaurant";
import {
  PersonalType,
  RFormType,
  addChecks,
  daysInitial,
  getCheckedRestaurants,
  getLikedDays,
  getLikedHours,
  hoursInitial,
  pInitial,
  rValuesInitial,
  votersInitial,
} from "./CreateHelpers";

// type R = (Restaurant | CustomRestaurant)[];
type R = any;

const Main = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [offset, setOffset] = useState(20);
  const [pError, setPError] = useState("");
  const [rError, setRError] = useState("");
  const [days, setDays] = useState(daysInitial);
  const [timeAnswer, setTimeAnswer] = useState("");
  const [hours, setHours] = useState(hoursInitial);
  const [restaurants, setRestaurants] = useState<R>();
  const [submitting, setSubmitting] = useState(false);
  const [voters, setVoters] = useState(votersInitial);
  const [timeQuestion, setTimeQuestion] = useState("");
  const [rFormData, setrFormData] = useState(rValuesInitial);
  const [personalData, setPersonalData] = useState(pInitial);

  const fetchRestaurants = async (rFormData: RFormType) => {
    setStep(1);
    setrFormData(rFormData);
    setRestaurants(undefined);
    setSubmitting(true);
    try {
      const restaurants = await api.fetchRestaurants(rFormData);
      const withChecks = addChecks(restaurants);
      setRestaurants(withChecks);
      setRError("");
    } catch {
      setStep(0);
      setRError(
        "There was an error fetching restaurants. Try a different location."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fetchMore = async () => {
    try {
      const data = {
        ...rFormData,
        offset,
      };
      const restaurants = await api.fetchRestaurants(data);
      const withChecks = addChecks(restaurants);
      setOffset((prevState) => prevState + 20);
      setRestaurants((prevState: any) => {
        if (!prevState) return withChecks;
        return [...prevState, ...withChecks];
      });
      setRError("");
    } catch {
      setStep(0);
      setRError(
        "There was an error fetching restaurants. Try a different location."
      );
    }
  };

  const completeRestaurants = () => {
    setStep(2);
  };

  const completeTime = (question: string) => {
    setTimeQuestion(question);
    setStep(3);
  };

  const completeVoteInfo = (value: typeof votersInitial) => {
    setVoters(value);
    setStep(4);
  };

  const createParty = async (personalData: PersonalType) => {
    if (!restaurants) return;
    setPersonalData(personalData);
    let vote_on_days = false;
    if (timeQuestion === "Just Day") vote_on_days = true;
    if (timeQuestion === "Time and Day") vote_on_days = true;
    let vote_on_hours = false;
    if (timeQuestion === "Just Time") vote_on_hours = true;
    if (timeQuestion === "Time and Day") vote_on_hours = true;

    const data = {
      restaurants: getCheckedRestaurants(restaurants),
      ...rFormData,
      vote_on_hours,
      vote_on_days,
      ...personalData,
      max_voters: voters.voters ? voters.max_voters : null,
      days_to_vote_on: getLikedDays(days),
      hours_to_vote_on: getLikedHours(hours),
    } as CreateParty;
    try {
      setSubmitting(true);
      const party = await api.createParty(data);
      navigate("/party/" + party._id + "?new=true");
    } catch {
      setSubmitting(false);
      setPError("There was an error creating your party. Try again.");
      console.log("error");
    }
  };

  const steps = [
    {
      component: () => (
        <RForm
          rError={rError}
          formData={rFormData}
          fetchRestaurants={fetchRestaurants}
        />
      ),
    },
    {
      component: () => {
        return (
          <RPreview
            setStep={setStep}
            fetchMore={fetchMore}
            restaurants={restaurants}
            submitting={submitting}
            setRestaurants={setRestaurants}
            completeRestaurants={completeRestaurants}
          />
        );
      },
    },
    {
      component: () => (
        <Time
          completeTime={completeTime}
          timeAnswer={timeAnswer}
          setTimeAnswer={setTimeAnswer}
          setStep={setStep}
          hours={hours}
          setHours={setHours}
          days={days}
          setDays={setDays}
        />
      ),
    },
    {
      component: () => (
        <VotersInfo
          voters={voters}
          setStep={setStep}
          completeVoteInfo={completeVoteInfo}
        />
      ),
    },
    {
      component: () => (
        <Personal
          pError={pError}
          setStep={setStep}
          submitting={submitting}
          createParty={createParty}
          personalData={personalData}
          setPersonalData={setPersonalData}
        />
      ),
    },
  ];

  return (
    <>
      <CStepper step={step} steps={steps} />
      {steps[step].component()}
    </>
  );
};

export default Main;
