import { Layout } from "~/features/layout"
import { Topbar } from "~/features/topbar"
import { ImageSearch } from "~/features/image-search"

import type { FC } from "react"

export const Home: FC = ({}) => {
  return (
    <Layout>
      <Topbar />
      <ImageSearch />
    </Layout>
  )
}
