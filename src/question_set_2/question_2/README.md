# Resource-Constrained Task Scheduling

You are developing a system to schedule tasks for a team, where each task requires specific resources (e.g., team members, equipment) and must be completed within a given time window. Tasks also have dependencies, meaning some tasks cannot start until others are finished. Resources are limited, so only a certain number of tasks can be scheduled at the same time, based on resource availability.

## Requirements

Define a **Task** type with properties:

- **id** (string): Unique identifier for the task.
- **duration** (number): Time units required to complete the task.
- **earliestStart** (number): Earliest time the task can start.
- **latestFinish** (number): Latest time the task must be finished.
- **dependencies** (array of task IDs): Tasks that must be completed before this one starts.
- **resources** (number): Number of resource units required (e.g., team members).

Define a constant **MAX_RESOURCES** (number): The total available resource units at any given time.

Implement a function `scheduleTasks(tasks: Task[], maxResources: number): { id: string; start: number }[]` that:

- Returns a schedule as an array of objects, each containing a task `id` and its assigned `start` time.
- Respects task dependencies (a task starts only after all its dependencies are completed).
- Ensures each task starts no earlier than its `earliestStart` and finishes no later than its `latestFinish`.
- Ensures the total resources used by tasks running at the same time does not exceed `maxResources`.
- If no valid schedule exists, returns an empty array.
- Aim for an efficient solution that can handle a moderate number of tasks (e.g., hundreds).

### Example
```typescript
const tasks: Task[] = [
  { id: "T1", duration: 2, earliestStart: 0, latestFinish: 4, dependencies: [], resources: 2 },
  { id: "T2", duration: 1, earliestStart: 1, latestFinish: 3, dependencies: ["T1"], resources: 1 },
  { id: "T3", duration: 2, earliestStart: 0, latestFinish: 5, dependencies: [], resources: 2 },
  { id: "T4", duration: 1, earliestStart: 2, latestFinish: 6, dependencies: ["T2", "T3"], resources: 2 },
];
const MAX_RESOURCES = 4;
```

A valid schedule could be:
```typescript
[
  { id: "T1", start: 0 },  // Runs 0-2, uses 2 resources
  { id: "T3", start: 0 },  // Runs 0-2, uses 2 resources (total 4)
  { id: "T2", start: 2 },  // Runs 2-3, uses 1 resource
  { id: "T4", start: 3 },  // Runs 3-4, uses 2 resources
]
```
- T1 and T3 can run in parallel from time 0 to 2 (total resources = 2 + 2 = 4 ≤ 4).
- T2 starts at 2 after T1 finishes, within its window (1 to 3), using 1 resource.
- T4 starts at 3 after T2 and T3, within its window (2 to 6), using 2 resources.

If `MAX_RESOURCES` were 2, no valid schedule would exist due to resource conflicts, so the function would return `[]`.


### Solution Approach
This problem combines topological sorting (for dependencies) with resource and time constraints. We’ll use a greedy approach with a priority queue to schedule tasks as early as possible, checking resource availability and time windows.

- **Build a Dependency Graph and Indegree Map**:
    - Map tasks to their dependent tasks and track how many dependencies each task has.

- **Track Resource Usage Over Time**:
    - Use a timeline to monitor when resources are allocated and freed.

- **Schedule with a Priority Queue**:
    - Prioritize tasks that can start earliest, respecting dependencies, resources, and time windows.

- **Validate the Schedule**:
    - Ensure all tasks are scheduled within constraints or detect infeasibility.