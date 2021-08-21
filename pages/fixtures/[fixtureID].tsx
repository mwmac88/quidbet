import React from 'react'
import { useRouter } from 'next/router'

import { useFixture } from '@/hooks/useFixture'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getFixtures } from '@/hooks/useFixtures'

const Fixture = () => {
  const router = useRouter();
  const { fixtureID } = router.query;
  const { data, isError, isSuccess} = useFixture(Number(fixtureID));

  if (isError || !isSuccess || !data) { 
    return (
    <div>
      No Fixture Here Sorry!
    </div>
  )
    }

    const { name, date, inplay } = data;

    return ( <div><div>{name} @ {date}</div> { inplay ? <div>Match is in-play!</div> : null}</div>)
}

export async function getStaticPaths() {
  const {fixtures} = await getFixtures({page: 1});
  const fixtureIDs = Object.keys(fixtures);
  return {
    paths: fixtureIDs.map(id => { return { params: { fixtureID: id } }}),
    fallback: false
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Fixture
