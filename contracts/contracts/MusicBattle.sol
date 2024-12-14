// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicBattle {
    struct Battle {
        uint256 id;
        string track1;
        string track2;
        uint256 votesTrack1;
        uint256 votesTrack2;
        address[] voters;
    }

    uint256 public battleCount = 0;
    mapping(uint256 => Battle) public battles;

    event BattleCreated(uint256 battleId, string track1, string track2);
    event VoteCast(uint256 battleId, uint256 trackNumber, address voter);

    function createBattle(string memory track1, string memory track2) public {
        battleCount++;
        Battle storage newBattle = battles[battleCount];
        newBattle.id = battleCount;
        newBattle.track1 = track1;
        newBattle.track2 = track2;
        emit BattleCreated(battleCount, track1, track2);
    }

    function vote(uint256 battleId, uint256 trackNumber) public {
        Battle storage battle = battles[battleId];

        require(trackNumber == 1 || trackNumber == 2, "Invalid track number");
        for (uint i = 0; i < battle.voters.length; i++) {
            require(battle.voters[i] != msg.sender, "You have already voted");
        }

        battle.voters.push(msg.sender);

        if (trackNumber == 1) {
            battle.votesTrack1++;
        } else {
            battle.votesTrack2++;
        }

        emit VoteCast(battleId, trackNumber, msg.sender);
    }

    function getBattleVotes(uint256 battleId) public view returns (uint256 track1Votes, uint256 track2Votes) {
        Battle storage battle = battles[battleId];
        return (battle.votesTrack1, battle.votesTrack2);
    }
}
