
const fetchTasks = (req: any, res: { send: (arg0: string) => any; }) => res.send("GET tasks placeholder");
const addTask = (req: any, res: { send: (arg0: string) => any; }) => res.send("ADD tasks placeholder");
const updTaskById = (req: any, res: { send: (arg0: string) => any; }) => res.send("UPDATE tasks placeholder");
const removeTask = (req: any, res: { send: (arg0: string) => any; }) => res.send("DELETE tasks placeholder");


export {fetchTasks, addTask, updTaskById, removeTask}