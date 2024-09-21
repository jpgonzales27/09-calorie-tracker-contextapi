import { createContext, Dispatch, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducers";

type ActivityProviderProps = {
  children: React.ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  total: number;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce((total, activity) => (activity.category === 1 ? total + activity.calories : total), 0),
    [state.activities]
  );
  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce((total, activity) => (activity.category === 2 ? total + activity.calories : total), 0),
    [state.activities]
  );
  const total = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities]);

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        total,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
