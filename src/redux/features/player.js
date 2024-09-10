import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = { data: data, pointsTable: [], matchList: [] };

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setMatch: (state, action) => {
      const { player1, player2, player1Score, player2Score } =
        action.payload.match;
      const player1Data = state.data.players.find(
        (p) => p.playerName === player1
      );
      const player2Data = state.data.players.find(
        (p) => p.playerName === player2
      );

      if (player1Data && player2Data) {
        const resultPlayer1 =
          player1Score > player2Score
            ? "winner"
            : player1Score < player2Score
            ? "runner"
            : "draw";
        const resultPlayer2 =
          player1Score < player2Score
            ? "winner"
            : player1Score > player2Score
            ? "runner"
            : "draw";

        if (resultPlayer1 === "winner") {
          player1Data.totalPoints += 3;
        }
        if (resultPlayer2 === "winner") {
          player2Data.totalPoints += 3;
        }
        if (resultPlayer1 === "draw") {
          player1Data.totalPoints += 1;
          player2Data.totalPoints += 1;
        }

        player1Data.matches.push({
          name: player1,
          opponent: player2,
          result: resultPlayer1,
          score:
            resultPlayer1 === "winner"
              ? `${player1Score}-${player2Score}`
              : `${player2Score}-${player1Score}`,
        });

        player2Data.matches.push({
          name: player2,
          opponent: player1,
          result: resultPlayer2,
          score:
            resultPlayer2 === "winner"
              ? `${player2Score}-${player1Score}`
              : `${player1Score}-${player2Score}`,
        });
      }
    },
    setMatchList: (state, action) => {
      const playerData = state.data.players.find(
        (p) => p.playerName === action.payload.player
      );
      state.matchList = playerData.matches;
    },
    setPointsTable: (state) => {
      const updatedPlayers = state.data.players
        .filter((player) => player.totalPoints > 0)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((player) => ({
          name: player.playerName,
          score: player.totalPoints,
        }));

      state.pointsTable = updatedPlayers;
    },
  },
});

export const { setMatch, setPointsTable, setMatchList } = playerSlice.actions;
export default playerSlice.reducer;
