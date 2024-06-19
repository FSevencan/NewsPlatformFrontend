import React, { useState } from 'react';
import axios from 'axios';
import usePoll from '../../../hooks/pollHook/usePoll';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';


const PollWidget = ({ pollId }) => {
    const { poll, setPoll, loading, error, fetchPoll } = usePoll(pollId); 
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem(`poll_vote_${pollId}`));

    const handleVoteChange = async (event) => {
        const optionId = event.target.value;
        localStorage.setItem(`poll_vote_${pollId}`, optionId);
        setSelectedOption(optionId);

        try {
            const voteResponse = await axios.post(`https://haberapi.fatihsevencan.com/api/PollVotes`, {
                PollId: pollId,
                PollOptionId: optionId,
                VoterIdentifier: "GhostUser"
            });

            if (voteResponse.status === 201) {
               
                await fetchPoll(); // Güncel verileri çek
            }
        } catch (error) {
            console.error('Oy verilirken hata oluştu:', error);
        }
    };

  
    const calculatePercentage = (count) => {
        const totalVotes = poll.options.pollOptions.reduce((acc, option) => acc + option.voteCount, 0);
        return (count / totalVotes) * 100;
    };

    if (loading) return <Typography>Yükleniyor...</Typography>;
    if (error) return <Typography>Hata: {error.message}</Typography>;
    if (!poll) return null;

    // Toplam oy sayısını hesapla
    const totalVotes = poll.options.pollOptions.reduce((acc, option) => acc + option.voteCount, 0);

    return (
        <Box className="panel_inner poll-widget" sx={{ bgcolor: 'background.paper' }}>
            <Box >
                <Typography variant="h6" gutterBottom>
                    <div className="panel_header" style={{ marginTop: "-7px" }}>
                        <h4>
                            <strong>ANKET</strong>
                        </h4>
                    </div>
                </Typography>
               
            </Box>
            <Box className="panel_body poll-content">
                <Typography variant="subtitle1" gutterBottom>
                    {poll.question}
                </Typography>
                <br/>
                <FormControl component="fieldset">
                    <RadioGroup name="pollOptions" value={selectedOption} onChange={handleVoteChange}>
                        {poll.options.pollOptions.map((option) => (
                            <FormControlLabel
                                key={option.id}
                                value={option.id}
                                control={<Radio disabled={!!selectedOption} />}
                                label={option.optionText}
                                disabled={!!selectedOption}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                {selectedOption &&
                    poll.options.pollOptions.map((option) => (
                        <Box key={option.id} display="flex" alignItems="center" mt={2}>
                            <Box width="100%" mr={1}>
                                <LinearProgress variant="determinate" value={calculatePercentage(option.voteCount)} />
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">
                                    {`${option.voteCount} Oy (${calculatePercentage(option.voteCount).toFixed(1)}%)`}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default PollWidget;