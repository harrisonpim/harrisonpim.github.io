import Client from '../prismic/helpers'
import Education from '../components/cv/education'
import { GetStaticProps } from 'next'
import Jobs from '../components/cv/jobs'
import Layout from '../components/layout'
import Link from 'next/link'
import Other from '../components/cv/other'
import Projects from '../components/cv/projects'
import { RichText } from 'prismic-reactjs'
import Tools from '../components/cv/tools'
import { linkResolver } from '../prismic/resolvers'

const CV = ({ overview, jobs, tools, education, projects, other }) => {
  return (
    <Layout
      title={RichText.asText(overview.data.title)}
      description={RichText.asText(overview.data.description)}
      wide
      favicon={RichText.asText(overview.data.favicon)}
    >
      <div className="max-w-2xl">
        <Link href="/">
          <a className="no-underline">
            <h1>{RichText.asText(overview.data.title)}</h1>
          </a>
        </Link>
        <div className="text-sm pb-4 py-2">
          <RichText
            render={overview.data.description}
            linkResolver={linkResolver}
          />
        </div>
        <div className="space-y-4">
          <Jobs data={jobs} />
          <Education data={education} />
          <Tools data={tools} />
          <Projects data={projects} />
          <Other data={other} />
        </div>
      </div>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const client = Client()
  const overview = await client.getByUID('page', 'cv', {})
  const jobs = await client.getSingle('cv-jobs', {})
  const tools = await client.getSingle('cv-tools', {})
  const education = await client.getSingle('cv-education', {})
  const projects = await client.getSingle('cv-projects', {})
  const other = await client.getSingle('cv-other', {})
  return { props: { overview, jobs, tools, education, projects, other } }
}

export default CV
