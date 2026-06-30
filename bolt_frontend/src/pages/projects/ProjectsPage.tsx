import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Pagination } from '../../components/ui/Pagination';
import { Skeleton } from '../../components/ui/Skeleton';
import { ProjectCard, CreateProjectModal, EditProjectModal, DeleteProjectDialog } from '../../features/projects/components';
import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types';

export function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  const { data, isLoading } = useProjects({ page, pageSize: 12 });
  const projects = data?.data || [];
  const totalPages = data?.meta?.pagination?.pageCount || 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {data?.meta?.pagination?.total || 0} projects total
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No projects yet"
          description="Create your first project to get started."
          actionLabel="Create Project"
          onAction={() => setCreateModalOpen(true)}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <CreateProjectModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <EditProjectModal project={editProject} open={!!editProject} onOpenChange={() => setEditProject(null)} />
      <DeleteProjectDialog projectId={deleteProjectId} open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)} />
    </div>
  );
}
