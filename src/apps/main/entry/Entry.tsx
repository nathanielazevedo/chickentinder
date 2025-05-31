import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert } from "@mui/material";

import API from "../../../api";
import { setRParty } from "../../../state";
import { useAppSelector } from "../../../state/redux";
import {
  addPartyToLocal,
  getPartyFromLocal,
  haveLocalParties,
  removePartyFromLocal,
} from "../../../utils/localStorage";

import PartyDeleted from "../PartyDeleted";
import SlideIn from "../../../components/SlideIn";
import NewPartyDialog from "../dialogs/NewPartyDialog";
import PasswordDialog from "../dialogs/PasswordDialog";
import BackIcon from "../../../components/backIcons/BackIconTo";

import PartyHeader from "../components/PartyHeader";
import PartyActions from "../components/PartyActions";
import PartyStats from "../components/PartyStats";

const Entry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [voted, setVoted] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const party = useAppSelector((state) => state.party);

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return;
        const res = await API.getParty(id);
        dispatch(setRParty(res));

        const newParty = { _id: id, has_voted: false, name: res.name };
        const partiesInLocal = haveLocalParties();

        if (!partiesInLocal) {
          addPartyToLocal(newParty);
        } else {
          const localParty = getPartyFromLocal(id);
          if (!localParty) {
            addPartyToLocal(newParty);
          } else {
            setVoted(localParty.has_voted);
          }
        }

        if (searchParams.get("new")) {
          setShowNewDialog(true);
        }
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message) {
          id && removePartyFromLocal(id);
          setShowDelete(true);
        } else {
          console.log("uh oh");
        }
      }
    };

    getParty();
  }, [dispatch, id, searchParams]);

  if (showDelete) return <PartyDeleted />;
  if (!party) return "loading";

  return (
    <>
      <BackIcon to="/party/my-parties" />
      <PasswordDialog open={showPassword} setOpen={setShowPassword} />
      <NewPartyDialog open={showNewDialog} setOpen={setShowNewDialog} />

      <SlideIn>
        <PartyHeader party={party} id={id} />

        {party?.r_winner && (
          <Alert severity="warning" variant="outlined" sx={{ my: 2 }}>
            This party is over! Enjoy the party!
          </Alert>
        )}

        <PartyActions
          id={id!}
          voted={voted}
          hasWinner={!!party?.r_winner}
          onManageClick={() => setShowPassword(true)}
          party={party}
        />

        <PartyStats party={party} />
      </SlideIn>
    </>
  );
};

export default Entry;
