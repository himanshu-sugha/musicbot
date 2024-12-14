const express = require('express');
const { startBattle, voteTrack } = require('./music_battle_contract'); // Import functions from the contract logic

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Route to start a battle
app.post('/startbattle', async (req, res) => {
    try {
        const { track1, track2 } = req.body;  // Get tracks from request body

        if (!track1 || !track2) {
            return res.status(400).json({ message: 'Both track1 and track2 are required.' });
        }

        // Call the startBattle function from the contract
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
    const { battleId, trackNumber } = req.body;  // Get battleId and trackNumber from request body

    if (![1, 2].includes(trackNumber)) {
        return res.status(400).json({ message: 'Invalid track number. Please vote for 1 or 2.' });
    }

    try {
        // Call the voteTrack function from the contract
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

// Start the server
app.listen(5000, () => {
    console.log('Backend running on http://localhost:5000');
});
