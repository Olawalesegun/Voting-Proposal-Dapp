import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { liskSepoliaNetwork } from "../connection";

const useVote = (proposalId) => {
  const contract = useContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const handleVote = useCallback(async () => {
    if (!address) {
      toast.error("Connect your wallet!");
      return;
    }
    if (!contract) {
      toast.error("Cannot get contract!");
      return;
    }

    if (Number(chainId) !== liskSepoliaNetwork.chainId) {
      toast.error("You are not connected to the right network");
      return;
    }

    try {
      const votingTx = await contract.vote(proposalId);
      const receipt = await votingTx.wait();

      if (receipt.status === 1) {
        toast.success("Voted successfully!");
      } else {
        toast.error("Voting failed.");
      }
    } catch (error) {
      toast.error("Error during voting: " + error.message);
    }
  }, [address, chainId, contract, proposalId]);

  return { handleVote };
};

export default useVote;
