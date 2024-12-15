// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShareMusic {
    mapping(address => uint256[]) public sharedTracks;

    event MusicShared(address from, address to, uint256 trackId);

    function shareMusic(uint256 trackId, address to) external {
        sharedTracks[to].push(trackId);
        emit MusicShared(msg.sender, to, trackId);
    }

    function getSharedTracks(address user) external view returns (uint256[] memory) {
        return sharedTracks[user];
    }
}
