import { createCanvas, Image, GlobalFonts } from '@napi-rs/canvas'
import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import fs from 'fs/promises'
import path from 'path'
import { sql } from '~/db.server'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import { getShortChecksumAddress } from '~/helpers/starknet'

function asset(src: string): string {
  return path.join(process.env.PWD, 'app/assets', src)
}

function loadFont(src: string): void {
  const basename = path.basename(src, path.extname(src))

  if (!GlobalFonts.has(basename)) {
    GlobalFonts.registerFromPath(asset(path.join('fonts', src)), basename)
  }
}

async function getImage(src): Promise<Image> {
  const file = await fs.readFile(asset(path.join('images', src)))
  const image = new Image()
  image.src = file

  return image
}

export async function loader({ params }: DataFunctionArgs): Promise<Response> {
  try {
    loadFont('Mulish/Mulish-ExtraBold.ttf')
    loadFont('Mulish/Mulish-Bold.ttf')

    const canvas = createCanvas(514 * 4, 293 * 4)
    const ctx = canvas.getContext('2d')

    const image = await getImage('infiniteGame_4x.png')

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

    let x = 18 * 4
    let y = 18 * 4
    let s = ((8 * 32) / 15) * 4

    ctx.fillStyle = '#1d222c'
    ctx.fillRect(x, y, s * 15, s * 15)

    for (const row of grid) {
      for (const cell of row) {
        if (cell) {
          ctx.lineWidth = 0
          ctx.fillStyle = '#dbf267'
          ctx.fillRect(x, y, s, s)
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
    ctx.fillText(gameGeneration.toString(), 292 * 4, (173 + 26 / 2) * 4)

    ctx.font = `${14 * 4}px Mulish-Bold`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#FCFAF8'
    ctx.fillText(accountTruncated, 310 * 4, (234 + 14 / 2) * 4)

    const png = await canvas.encode('png')

    return new Response(png, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': png.byteLength.toString(),
      },
    })
  } catch (err: any) {
    return json({ err: err.message }, { status: 500 })
  }
}
