import type { ActionArgs } from "@remix-run/node";
import { hexToDecimalString } from "starknet/utils/number";
import { sql } from "~/db.server";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  const tx = await sql`
    INSERT INTO transaction (
      "hash",
      "status",
      "functionName",
      "functionCaller",
      "functionInputCellIndex",
      "functionInputGameState",
      "functionInputGameId"
    )
    VALUES (
      ${body.get('hash')},
      ${body.get('status')},
      ${body.get('functionName')},
      ${hexToDecimalString(body.get('functionCaller') as string)},
      ${body.get('functionInputCellIndex')},
      ${body.get('functionInputGameState')},
      ${body.get('functionInputGameId')}
    )
    RETURNING *;
  `

  return tx.rows[0]
}
