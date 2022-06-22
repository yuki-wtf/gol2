import { InfiniteAbi } from '../../../../abi/GoL2_infinite'
import { dataToGrid } from '../../../../utils/dataToGrid'
import { createCanvas, Image, GlobalFonts } from '@napi-rs/canvas'
import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import * as starknet from 'starknet'

GlobalFonts.registerFromPath(
  path.resolve(process.cwd(), 'assets/fonts/Mulish/Mulish-ExtraBold.ttf'),
  'Mulish-ExtraBold'
)
GlobalFonts.registerFromPath(path.resolve(process.cwd(), 'assets/fonts/Mulish/Mulish-Bold.ttf'), 'Mulish-Bold')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const canvas = createCanvas(514 * 4, 293 * 4)
    const ctx = canvas.getContext('2d')

    const file = await fs.readFile(path.resolve(process.cwd(), 'assets/images/infiniteGame_4x.png'))
    const image = new Image()
    image.src = file

    ctx.drawImage(image, 0, 0)

    const infiniteGame = new starknet.Contract(
      InfiniteAbi,
      '0x0296707849bfbcf454401229e471304d97abe10641440c9f3f754bb6e926620f'
    )

    const gen = parseInt(req.query.gen as string)

    const data = await infiniteGame.call('get_arbitrary_state_arrays', [[gen], '0', ['0'], '0', '0'])

    const account = starknet.getChecksumAddress(data.specific_state_owners[0])
    const accountTruncated =
      account.slice(0, 2) + ' ' + account.slice(2, 6) + ' ... ' + account.slice(account.length - 4)

    const grid = dataToGrid(data.gen_ids_array_result)

    let x = 18 * 4
    let y = 18 * 4
    let s = 8 * 4

    ctx.fillStyle = '#dbf267'

    for (const row of grid) {
      for (const cell of row) {
        if (cell) {
          ctx.fillRect(x, y, s, s)
        }

        x += s
      }
      x -= s * row.length
      y += s
    }

    ctx.font = `${34 * 4}px Mulish-ExtraBold`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#FCFAF8'
    ctx.fillText(gen.toString(), 292 * 4, (173 + 26 / 2) * 4)

    ctx.font = `${14 * 4}px Mulish-Bold`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#FCFAF8'
    ctx.fillText(accountTruncated, 310 * 4, (234 + 14 / 2) * 4)

    res.setHeader('content-type', 'image/png')
    res.send(await canvas.encode('png'))
  } catch (err) {
    res.status(200).json({
      data: err,
    })
  }
}
