import React, { useState, useEffect } from 'react';
import axios from 'axios';

const teamIds = [549, 611, 645, 998]; // Beşiktaş, Fenerbahçe, Galatasaray, Trabzonspor

const GameResults = () => {
    const [gameResults, setGameResults] = useState([]);

    useEffect(() => {
        const API_KEY = '14b705c0bbdac2ddde231febf7c7a460';

        const fetchGameResults = async () => {
            try {
                const responses = await Promise.all(teamIds.map(teamId =>
                    axios.get('https://v3.football.api-sports.io/fixtures', {
                        headers: {
                            'x-rapidapi-key': API_KEY,
                            'x-rapidapi-host': 'v3.football.api-sports.io',
                        },
                        params: {
                            timezone: 'Europe/Istanbul',
                            team: teamId,
                            last: 1 // Sadece en son maçı almak için
                        }
                    })
                ));

                // Tüm takımlar için sonuçları düzleştir ve state'e kaydet
                const lastMatches = responses.map(response => response.data.response[0]); // Her takımın son maçı
                setGameResults(lastMatches);
            } catch (error) {
                console.error('Error fetching game results:', error);
            }
        };

        fetchGameResults();
    }, []);

    if (!gameResults.length) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div>
            <div className="panel_header">
                <h4><strong>MAÇ</strong> SONUÇLARI</h4>
            </div>
            {gameResults.map((game) => (
                <div key={game?.fixture.id} className="game-result">
                    <div className="teams">
                        <div className="team">
                            <img src={game?.teams.home.logo} alt={game?.teams.home.name} />
                            <p>{game?.teams.home.name}</p>
                        </div>
                        <div className="score">
                            {game?.goals.home} - {game?.goals.away}
                        </div>
                        <div className="team">
                            <img src={game?.teams.away.logo} alt={game?.teams.away.name} />
                            <p>{game?.teams.away.name}</p>
                        </div>
                    </div>
                    <hr className="red-line" />
                </div>
            ))}
        </div>
    );
};

export default GameResults;