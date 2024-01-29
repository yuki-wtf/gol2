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
    await sql`
    DELETE FROM mints
    WHERE "generation" = ${body.get('generation')}
    `

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { status: 'success' }
  }
}
