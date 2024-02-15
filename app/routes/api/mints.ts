import type { ActionArgs } from '@remix-run/node'
import { sql } from '~/db.server'

export async function action({ request }: ActionArgs) {
  const body = await request.formData()

  if (request.method === 'POST') {
    // delete any existing mints for this generation
    await sql`DELETE FROM mints WHERE "generation" = ${body.get('generation')};`
    await sql`
    INSERT INTO mints (
      "generation",
      "userId",
      "txHash",
      "status"
      )
      VALUES (
        ${body.get('generation')},
        ${body.get('userId')},
        ${body.get('txHash')},
        ${body.get('status')}
        )
        `

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { status: 'success' }
  } else if (request.method === 'DELETE') {
    const deleted = await sql`
    DELETE FROM mints
    WHERE "generation" = ${body.get('generation')}
    returning *
    `

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { status: deleted.rowCount > 0 ? 'success' : 'cancelled' }
  }
}
