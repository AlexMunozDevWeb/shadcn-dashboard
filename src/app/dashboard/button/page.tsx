'use client'
import { GitBranch, GitFork, ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"

export default function Page() {
  return (
    <div>
      <p className="mb-5 border border-b-cyan-900 border-x-0 border-t-0">Buttons</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <Button>default</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
        <Button disabled>disabled</Button>
        <Button onClick={ () => console.log("Hola Mundo!")}>click me</Button>
        <Button variant="success" capitalize={false}>capitalize false!</Button>
      </div>

      <p className="my-5 border border-b-cyan-900 border-x-0 border-t-0">Cursos buttons</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <div className="flex items-start gap-2">
        <Button size="xs" variant="outline">
          Extra Small
        </Button>
        <Button size="icon-xs" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
        </div>
        <div className="flex items-start gap-2">
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button size="icon-sm" aria-label="Submit" variant="outline">
            <ArrowUpRightIcon />
          </Button>
        </div>
        <div className="flex items-start gap-2">
          <Button variant="outline">Default</Button>
          <Button size="icon" aria-label="Submit" variant="outline">
            <ArrowUpRightIcon />
          </Button>
        </div>
        <div className="flex items-start gap-2">
          <Button variant="outline" size="lg">
            Large
          </Button>
          <Button size="icon-lg" aria-label="Submit" variant="outline">
            <ArrowUpRightIcon />
          </Button>
        </div>
      </div>

      <p className="my-5 border border-b-cyan-900 border-x-0 border-t-0">Button with icon</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <Button variant="outline">
          <GitFork data-icon="inline-start" /> New Branch
        </Button>
        <Button variant="outline">
          Fork
          <GitBranch data-icon="inline-end" />
        </Button>
      </div>

      <p className="my-5 border border-b-cyan-900 border-x-0 border-t-0">Spinner button</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" />
          Generating
        </Button>
        <Button variant="secondary" disabled>
          Downloading
          <Spinner data-icon="inline-start" />
        </Button>
      </div>
    </div>
  );
}