import React from 'react'
import { NextSeo } from 'next-seo'
import { NextPage } from 'next'
import Infinite from '.'

interface Props {
  readonly gen: number
}

const Page: NextPage<Props> = ({ gen }) => {
  return (
    <>
      <NextSeo
        title="CREATE GAMES. GIVE LIFE. EVOLVE."
        description="GoL2 a fun and interactive way to introduce new users and developers to smart contracts written in Cairo. With Starknet. Game of Life..."
        openGraph={{
          images: [
            {
              url: `/api/images/infinite/${gen}.png`,
              width: 514 * 4,
              height: 293 * 4,
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Infinite />
    </>
  )
}

Page.getInitialProps = async ({ query }) => {
  return {
    gen: parseInt(query.gen as string),
  }
}

export default Page
