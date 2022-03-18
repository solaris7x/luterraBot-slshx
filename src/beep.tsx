import { CommandHandler, useDescription, createElement, Message } from "slshx";

// `Env` contains bindings and is declared in types/env.d.ts
export function beep(): CommandHandler<Env> {
  useDescription("Send a boop");
  return (interaction, env, ctx) => (
    <Message ephemeral>🤖 Boop from slshx 🤖</Message>
  );
}
