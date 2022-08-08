import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useStarknet } from '@starknet-react/core'
import { getDB } from '~/db.server'
import ContainerInner from '../components/Layout/ContainerInner'

export async function loader(args: LoaderArgs) {
  const db = await getDB()

  return json(await db.query(`select * from infinite`))
}

export default function Playground2() {
  const { account } = useStarknet()
  const data = useLoaderData<typeof loader>()

  console.log(data)

  return <ContainerInner>{account}</ContainerInner>
}
