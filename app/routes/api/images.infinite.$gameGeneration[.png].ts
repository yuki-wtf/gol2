import { createCanvas, Image, GlobalFonts } from '@napi-rs/canvas'
import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import fs from 'fs/promises'
import path from 'path'
import { sql } from '~/db.server'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import { getShortChecksumAddress } from '~/helpers/starknet'

function asset(src: string): string {
  return path.join(process.env.PWD!, 'app/assets', src)
}

function loadFont(src: string): void {
  const basename = path.basename(src, path.extname(src))

  if (!GlobalFonts.has(basename)) {
    GlobalFonts.registerFromPath(asset(path.join('fonts', src)), basename)
  }
}

async function getImage(src: string): Promise<Image> {
  const file = await fs.readFile(asset(path.join('images', src)))
  const image = new Image()
  image.src = file

  return image
}

export async function loader({ params }: DataFunctionArgs): Promise<Response> {
  try {
    loadFont('Mulish/Mulish-ExtraBold.ttf')
    loadFont('Mulish/Mulish-Bold.ttf')

    const canvas = createCanvas(504 * 4, 264 * 4)
    const ctx = canvas.getContext('2d')

    const image = await getImage('infiniteGame_4x_1.png')

    ctx.drawImage(image, 0, 0)

    const gameGeneration = parseInt(params.gameGeneration!)

    if (Number.isNaN(gameGeneration)) {
      throw new Error(`Could not parse $gameGeneration into a number!`)
    }

    const data = await sql<{ gameState: string; transactionOwner: string }>`
      select "gameState", "transactionOwner"
      from infinite
      where COALESCE("gameGeneration", 1) = ${gameGeneration}
      order by "gameState" desc
      limit 1
    `

    if (data.rows[0] == null) {
      throw new Error(`Game generation ${gameGeneration} not found!`)
    }

    const { gameState, transactionOwner } = data.rows[0]

    const accountTruncated = getShortChecksumAddress(transactionOwner)

    const grid = gameStateToGrid(gameState)

    let x = 27 * 4
    let y = 27 * 4
    const s = ((8 * 26.3) / 15) * 4

    ctx.fillStyle = '#1d222c'
    ctx.fillRect(x, y, s * 15, s * 15)

    for (const row of grid) {
      for (const cell of row) {
        if (cell) {
          ctx.lineWidth = 0.5 * 4
          ctx.strokeStyle = '#dbf267'
          ctx.fillStyle = '#dbf267'
          ctx.fillRect(x, y, s, s)
          ctx.strokeRect(x, y, s, s)
        } else {
          ctx.lineWidth = 0.5 * 4
          ctx.strokeStyle = '#2b2e36'
          ctx.fillStyle = '#1d222c'
          ctx.fillRect(x, y, s, s)
          ctx.strokeRect(x, y, s, s)
        }

        x += s
      }
      x -= s * row.length
      y += s
    }

    ctx.font = `${34 * 4}px Mulish-ExtraBold`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#FCFAF8'
    ctx.fillText(gameGeneration.toString(), 271 * 4, (160 + 26 / 2) * 4)

    ctx.font = `${14 * 4}px Mulish-Bold`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#FCFAF8'
    ctx.fillText(accountTruncated, 289 * 4, (218 + 14 / 2) * 4)

    const png = await canvas.encode('png')

    return new Response(png, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': png.byteLength.toString(),
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    return json({ err: err.message }, { status: 500 })
  }
}
