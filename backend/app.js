const express = require('express');
const { startBattle, voteTrack, shareMusic, getLeaderboards } = require('./music_battle_contract'); // Import functions from music_battle_contract
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Route to start a battle
app.post('/startbattle', async (req, res) => {
    try {
        const { track1, track2 } = req.body;

        if (!track1 || !track2) {
            return res.status(400).json({ message: 'Both track1 and track2 are required.' });
        }

        // Call the startBattle function from music_battle_contract
        const result = await startBattle(track1, track2);

        // Return success response with transaction hash
        res.json({
            message: `Music Battle between ${track1} and ${track2} has started!`,
            track1,
            track2,
            transactionHash: result.transactionHash
        });
    } catch (error) {
        console.error('Error starting battle:', error.message || error);
        res.status(500).json({ error: 'Failed to start battle. Please try again.' });
    }
});

// Route to vote for a track
app.post('/votetrack', async (req, res) => {
    const { battleId, trackNumber } = req.body;

    if (![1, 2].includes(trackNumber)) {
        return res.status(400).json({ message: 'Invalid track number. Please vote for 1 or 2.' });
    }

    try {
        // Call the voteTrack function from music_battle_contract
        const result = await voteTrack(battleId, trackNumber);

        // Return success response with transaction hash
        res.json({
            message: `Vote registered for Track ${trackNumber}!`,
            transactionHash: result.transactionHash
        });
    } catch (error) {
        console.error('Error voting for track:', error.message || error);
        res.status(500).json({ error: 'Failed to register vote. Please try again.' });
    }
});

// Route to share music
app.post('/sharemusic', async (req, res) => {
    const { trackId, userAddress } = req.body;

    if (!trackId || !userAddress) {
        return res.status(400).json({ message: 'Track ID and User Address are required.' });
    }

    try {
        // Call the shareMusic function from music_battle_contract
        const result = await shareMusic(trackId, userAddress);

        // Return success response with transaction hash
        res.json({
            message: `Track ${trackId} shared with user ${userAddress}!`,
            transactionHash: result.transactionHash
        });
    } catch (error) {
        console.error('Error sharing music:', error.message || error);
        res.status(500).json({ error: 'Failed to share music. Please try again.' });
    }
});

// Route to get the leaderboards
app.get('/leaderboards', async (req, res) => {
    try {
        // Call the getLeaderboards function from music_battle_contract
        const leaderboards = await getLeaderboards();

        // Return success response with leaderboard data
        res.json({ leaderboards });
    } catch (error) {
        console.error('Error fetching leaderboards:', error.message || error);
        res.status(500).json({ error: 'Failed to fetch leaderboards. Please try again.' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Backend running on http://localhost:5000');
});
