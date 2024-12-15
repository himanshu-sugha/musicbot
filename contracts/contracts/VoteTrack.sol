// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteTrack {
    mapping(uint256 => uint256) public trackVotes;

    event TrackVoted(uint256 trackId, address voter);

    function vote(uint256 trackId) external {
        trackVotes[trackId] += 1;
        emit TrackVoted(trackId, msg.sender);
    }

    function getVotes(uint256 trackId) external view returns (uint256) {
        return trackVotes[trackId];
    }
}
