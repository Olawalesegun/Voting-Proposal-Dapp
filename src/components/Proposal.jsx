import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { formatEther } from "ethers";
import useVote from "../hooks/useVote";

const Proposal = ({
  proposalId,
  description,
  amount,
  minRequiredVote,
  votecount,
  deadline,
  executed,
}) => {
  const {handleVote} = useVote(proposalId);

  const onVoteClick = () => {
    handleVote();
  };

  const isPastDeadline = Date.now() / 1000 > Number(deadline);

  return (
    <Box className="bg-white border border-gray-200 rounded-lg p-6 w-80 shadow-md">
      <Text className="text-xl font-semibold mb-4 text-gray-800">
        Proposals
      </Text>
      <Box className="space-y-2">
        <Flex className="justify-between">
          <Text className="text-gray-500">Description:</Text>
          <Text className="text-gray-800">{description}</Text>
        </Flex>
        <Flex className="justify-between">
          <Text className="text-gray-500">Amount:</Text>
          <Text className="text-gray-800">{formatEther(amount)} ETH</Text>
        </Flex>
        <Flex className="justify-between">
          <Text className="text-gray-500">Required Vote:</Text>
          <Text className="text-gray-800">{Number(minRequiredVote)}</Text>
        </Flex>
        <Flex className="justify-between">
          <Text className="text-gray-500">Vote Count:</Text>
          <Text className="text-gray-800">{Number(votecount)}</Text>
        </Flex>
        <Flex className="justify-between">
          <Text className="text-gray-500">Deadline:</Text>
          <Text className="text-gray-800">
            {new Date(Number(deadline) * 1000).toLocaleDateString()}
          </Text>
        </Flex>
        <Flex className="justify-between">
          <Text className="text-gray-500">Executed:</Text>
          <Text className="text-gray-800">{String(executed)}</Text>
        </Flex>
      </Box>

      <Button
        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium w-full mt-6 py-2 rounded-md"
        onClick={onVoteClick}
        disabled={executed || isPastDeadline}
      >
        {executed ? "Executed" : isPastDeadline ? "Expired" : "Vote"}
      </Button>
    </Box>
  );
};

export default Proposal;
