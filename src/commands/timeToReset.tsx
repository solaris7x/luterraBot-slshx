import {
  CommandHandler,
  useDescription,
  createElement,
  Message,
  Fragment,
} from "slshx";
import resetTimes from "../functions/resetTimes";

export function timeToReset(): CommandHandler<Env> {
  useDescription("Time left until reset");
  const { dailyResetETA, weeklyResetETA } = resetTimes();
  return (interaction, env, ctx) => (
    <Message ephemeral>
      <>⏳ Daily reset in {dailyResetETA} ⏳</>
      {"\n"}
      <>⏳ Weekly reset in {weeklyResetETA} ⏳</>
    </Message>
  );
}
