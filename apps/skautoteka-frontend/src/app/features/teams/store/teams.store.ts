import { signalStore, withState } from "@ngrx/signals"
import { Team } from "../interfaces/team"
import { withTeamsMethods } from "./teams.methods"

type TeamStoreState = {
  teams: Team[]
  isLoading: boolean;
}

const initialState: TeamStoreState = {
  teams: [],
  isLoading: false
}

export const TeamsStore = signalStore(
  withState(initialState),
  withTeamsMethods()
)
