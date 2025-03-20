"use strict";
function scheduleTasks(tasks, maxResources) {
    // {key:taskId , value:Task}
    const taskMap = new Map();
    // {key:taskId , value:outer degree task id array]
    const graph = new Map();
    //{key:taskId , value:indegree task count}
    const indegree = new Map();
    const schedule = [];
    const resourceTimeline = [];
    // initializing data structures
    for (const task of tasks) {
        taskMap.set(task.id, task);
        graph.set(task.id, []);
        indegree.set(task.id, 0);
    }
    //assigning values to data structures
    for (const task of tasks) {
        for (const depId of task.dependencies) {
            if (taskMap.has(depId)) {
                continue;
            }
            graph.get(depId).push(task.id);
            indegree.set(task.id, indegree.get(task.id) + 1);
        }
    }
    //Initialize queue with tasks that have no dependencies
    const queue = [];
    for (const task of tasks) {
        if (indegree.get(task.id) === 0) {
            queue.push({ id: task.id, earliest: task.earliestStart });
        }
    }
    queue.sort((a, b) => a.earliest - b.earliest);
    // process the tasks
    const completed = new Set();
    while (queue.length > 0) {
        // step 1 -> finding the earliest possible time that a task (which has 0 indegree) can start
        const { id } = queue.shift();
        const task = taskMap.get(id);
        const depFinishTimes = task.dependencies.map((depId) => {
            const dep = schedule.find((s) => s.id === depId);
            return dep ? dep.start + taskMap.get(depId).duration : 0;
        });
        // step 2 -> finding a start time for the task (which has 0 indegree) that fits resource constraints
        let startTime = Math.max(task.earliestStart, ...depFinishTimes); //(earliest possible time that task can start)
        while (startTime + task.duration <= task.latestFinish) {
            if (canSchedule(task, startTime, resourceTimeline, maxResources)) {
                break;
            }
            startTime++;
        }
        if (startTime + task.duration > task.latestFinish) {
            return []; // no valid slots to find
        }
        // step 3 -> schedule the task
        schedule.push({ id, start: startTime });
        resourceTimeline.push({ time: startTime, delta: task.resources });
        resourceTimeline.push({
            time: startTime + task.duration,
            delta: -task.resources,
        });
        resourceTimeline.sort((a, b) => a.time - b.time);
        completed.add(id);
        // step 4 -> update queue with newly available tasks (new tass that has 0 indegree)
        for (const nextId of graph.get(id) || []) {
            // reduce indegree by one
            indegree.set(nextId, indegree.get(nextId) - 1);
            // adding to the queue, if indegree is 0
            if (indegree.get(nextId) === 0) {
                queue.push({
                    id: nextId,
                    earliest: taskMap.get(nextId).earliestStart,
                });
                queue.sort((a, b) => a.earliest - b.earliest);
            }
        }
    }
    // Step 5: Check if all tasks were scheduled
    return completed.size === tasks.length ? schedule : [];
}
// Helper: Check if task can be scheduled at startTime without exceeding maxResources
function canSchedule(task, startTime, timeline, maxResources) {
    // creating temp timeline
    const tempTimeline = [
        ...timeline,
        { time: startTime, delta: task.resources },
        { time: startTime + task.duration, delta: -task.resources },
    ];
    tempTimeline.sort((a, b) => a.time - b.time);
    // check maxResource constraint
    let currentResources = 0;
    for (const event of tempTimeline) {
        currentResources += event.delta;
        if (currentResources > maxResources) {
            return false;
        }
    }
    return true;
}
// Test the example
const tasks = [
    {
        id: "T1",
        duration: 2,
        earliestStart: 0,
        latestFinish: 4,
        dependencies: [],
        resources: 2,
    },
    {
        id: "T2",
        duration: 1,
        earliestStart: 1,
        latestFinish: 3,
        dependencies: ["T1"],
        resources: 1,
    },
    {
        id: "T3",
        duration: 2,
        earliestStart: 0,
        latestFinish: 5,
        dependencies: [],
        resources: 2,
    },
    {
        id: "T4",
        duration: 1,
        earliestStart: 2,
        latestFinish: 6,
        dependencies: ["T2", "T3"],
        resources: 2,
    },
];
const result = scheduleTasks(tasks, 4);
console.log(result);
