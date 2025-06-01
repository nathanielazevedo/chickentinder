import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

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
import RCarousel from "../components/RCarousel";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import DCarousel from "../components/DCarousel";
import HCarousel from "../components/HCarousel";

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

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!party._id) return;
    const url = `${window.location.origin}/party/${party._id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showDelete) return <PartyDeleted />;
  if (!party) return "loading";

  return (
    <>
      <BackIcon to="/party/my-parties" />
      <PasswordDialog open={showPassword} setOpen={setShowPassword} />
      <NewPartyDialog open={showNewDialog} setOpen={setShowNewDialog} />

      <SlideIn>
        <PartyHeader
          party={party}
          onManageClick={() => setShowPassword(true)}
        />
        {party._id && (
          <Button
            size="medium"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            variant="outlined"
            sx={{ mt: 2 }}
            fullWidth
          >
            {copied ? "Link Copied!" : "Copy Share Link"}
          </Button>
        )}
        <Link
          to={`/party/${id}/vote`}
          style={{
            textDecoration: "none",
            pointerEvents: voted ? "none" : "auto", // prevent navigation if disabled
          }}
        >
          <Button
            size="medium"
            startIcon={<HowToVoteOutlinedIcon sx={{ fontSize: 18 }} />}
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            disabled={voted}
          >
            Vote
          </Button>
        </Link>

        <Button
          size="medium"
          startIcon={<ManageAccountsOutlinedIcon sx={{ fontSize: 18 }} />}
          onClick={() => setShowPassword(true)}
          variant="outlined"
          sx={{ mt: 2 }}
          fullWidth
        >
          Manage Party
        </Button>
        <RCarousel party={party} swipe={{ id: 1, direction: "right" }} />
        {party.vote_on_days && <DCarousel party={party} />}
        {party.vote_on_hours && <HCarousel party={party} />}
      </SlideIn>
    </>
  );
};

export default Entry;
