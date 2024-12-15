// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicBattle {

    // Structure to store battle details
    struct Battle {
        uint256 id;
        string track1;
        string track2;
        uint256 votesTrack1;
        uint256 votesTrack2;
        address winner;
        bool isFinished;
    }

    uint256 public battleCount;
    mapping(uint256 => Battle) public battles;
    mapping(address => uint256) public playerVotes;

    event BattleStarted(uint256 battleId, string track1, string track2);
    event Voted(uint256 battleId, address voter, uint256 trackNumber);
    event BattleFinished(uint256 battleId, address winner);

    constructor() {
        battleCount = 0;
    }

    // Function to start a new battle
    function startBattle(string memory track1, string memory track2) public returns (uint256) {
        battleCount++;
        uint256 battleId = battleCount;
        
        battles[battleId] = Battle({
            id: battleId,
            track1: track1,
            track2: track2,
            votesTrack1: 0,
            votesTrack2: 0,
            winner: address(0),
            isFinished: false
        });

        emit BattleStarted(battleId, track1, track2);
        return battleId;
    }

    // Function to vote for a track in a battle
    function voteTrack(uint256 battleId, uint256 trackNumber) public {
        require(battleId <= battleCount && battleId > 0, "Battle does not exist");
        require(trackNumber == 1 || trackNumber == 2, "Invalid track number");
        require(!battles[battleId].isFinished, "Battle has already finished");

        Battle storage battle = battles[battleId];
        
        // If the player has already voted, revert
        require(playerVotes[msg.sender] != battleId, "You have already voted in this battle");

        if (trackNumber == 1) {
            battle.votesTrack1++;
        } else {
            battle.votesTrack2++;
        }

        playerVotes[msg.sender] = battleId;

        emit Voted(battleId, msg.sender, trackNumber);

        // Check if the battle should be finished
        if (battle.votesTrack1 > battle.votesTrack2) {
            finishBattle(battleId, battle.track1);
        } else if (battle.votesTrack2 > battle.votesTrack1) {
            finishBattle(battleId, battle.track2);
        }
    }

    // Function to finish the battle and declare a winner
    function finishBattle(uint256 battleId, string memory winnerTrack) private {
        Battle storage battle = battles[battleId];
        require(!battle.isFinished, "Battle is already finished");

        battle.winner = msg.sender; // In this simplified version, the winner is the last voter.
        battle.isFinished = true;

        emit BattleFinished(battleId, msg.sender);
    }

    // Get the battle details by ID
    function getBattleDetails(uint256 battleId) public view returns (
        uint256 id,
        string memory track1,
        string memory track2,
        uint256 votesTrack1,
        uint256 votesTrack2,
        address winner,
        bool isFinished
    ) {
        Battle memory battle = battles[battleId];
        return (
            battle.id,
            battle.track1,
            battle.track2,
            battle.votesTrack1,
            battle.votesTrack2,
            battle.winner,
            battle.isFinished
        );
    }
}
