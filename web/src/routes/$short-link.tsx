import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$short-link')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$short-link"!</div>
}
