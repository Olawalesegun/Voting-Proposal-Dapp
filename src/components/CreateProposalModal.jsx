import { XCircleIcon } from "@heroicons/react/16/solid";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import useCreateProposal from "../hooks/useCreateProposal";

const CreateProposalModal = () => {
  const handleCreateProposal = useCreateProposal();
  const [state, setState] = useState({
    description: "",
    recipient: "",
    amount: "",
    duration: "",
    minVote: 2,
  });
  
  const [error, setError] = useState(""); // State for error messages

  const handleInputChange = (name, e) => {
    setState((preState) => ({ ...preState, [name]: e.target.value }));
  };

  const { amount, duration, description, minVote, recipient } = state;

  const validateInputs = () => {
    if (!description || !recipient || !amount || !duration) {
      setError("Please fill in all fields.");
      return false;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Amount must be a positive number.");
      return false;
    }
    if (isNaN(minVote) || Number(minVote) <= 0) {
      setError("Minimum votes must be a positive integer.");
      return false;
    }
    setError(""); // Reset error if inputs are valid
    return true;
  };

  const handleCreateClick = () => {
    if (validateInputs()) {
      handleCreateProposal(description, recipient, amount, duration, minVote);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 px-6 rounded-md shadow-sm">
          Create Proposal
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-xl font-semibold text-gray-800 mb-6">
            Create Proposal
          </Dialog.Title>
          <form className="space-y-4">
            {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1" htmlFor="description">
                Description
              </label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="description"
                type="text"
                value={description}
                onChange={(e) => handleInputChange("description", e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1" htmlFor="recipient">
                Recipient
              </label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="recipient"
                type="text"
                value={recipient}
                onChange={(e) => handleInputChange("recipient", e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1" htmlFor="amount">
                Amount
              </label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => handleInputChange("amount", e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1" htmlFor="duration">
                Duration
              </label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="duration"
                type="text"
                value={duration}
                onChange={(e) => handleInputChange("duration", e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1" htmlFor="minVote">
                Min Required Votes
              </label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="minVote"
                type="text"
                value={minVote}
                onChange={(e) => handleInputChange("minVote", e)}
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
              onClick={handleCreateClick} 
            >
              Create
            </button>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateProposalModal;
