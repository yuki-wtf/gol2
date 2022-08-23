import { createCanvas, Image, GlobalFonts } from '@napi-rs/canvas'
import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import fs from 'fs/promises'
import path from 'path'
// import * as starknet from 'starknet'
// import { dataToGrid } from '~/helpers/dataToGrid'
// import { getShortChecksumAddress } from '~/helpers/starknet'
// import { InfiniteModeAbi, InfiniteModeAddress } from '~/smartContracts/InfiniteMode'

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

    // const infiniteGame = new starknet.Contract(InfiniteModeAbi, InfiniteModeAddress)

    const gen = parseInt(params.gen!)

    // const data = await infiniteGame.call('get_arbitrary_state_arrays', [[gen], '0', ['0'], '0', '0'])

    // const accountTruncated = getShortChecksumAddress(data.specific_state_owners[0])
    const accountTruncated = '123'

    const grid = []
    // const grid = dataToGrid(data.gen_ids_array_result)!

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
