import { notFound } from 'next/navigation'
import { PROJECTS } from '@/data/projects'
import ProjectDetail from './ProjectDetail'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}