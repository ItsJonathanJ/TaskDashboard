
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const addTask = () => {
    if (title && subtitle && description && dueDate) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        subtitle,
        description,
        dueDate,
        priority,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setSubtitle("");
      setDescription("");
      setDueDate(new Date());
      setPriority("medium");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="w-full">
            <CardContent className="p-2">
              <div className="flex items-center border rounded-lg p-1">
                <div className="flex-grow space-y-1">
                  <Input
                    id="title"
                    placeholder="Task title"
                    className="border-none text-base font-bold focus:ring-0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    id="subtitle"
                    placeholder="Subtitle"
                    className="border-none text-gray-500 text-sm"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                  <Textarea
                    id="description"
                    placeholder="Description"
                    className="border-none text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {dueDate ? format(dueDate, "PPP") : "Due Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <img
                          src={`/${priority}-priority.svg`}
                          alt={`${priority} priority`}
                          className="w-5 h-5 mr-2"
                        />
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setPriority("high")}>
                        <img
                          src="/high-priority.svg"
                          alt="high priority"
                          className="w-5 h-5 mr-2"
                        />
                        High
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setPriority("medium")}>
                        <img
                          src="/medium-priority.svg"
                          alt="medium priority"
                          className="w-5 h-5 mr-2"
                        />
                        Medium
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setPriority("low")}>
                        <img
                          src="/low-priority.svg"
                          alt="low priority"
                          className="w-5 h-5 mr-2"
                        />
                        Low
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button size="sm" onClick={addTask}>
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Active Tasks</h2>
            <div className="space-y-4">
              {tasks.filter(task => !selectedDate || format(task.dueDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')).map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{task.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Due: {format(task.dueDate, "PPP")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={`/${task.priority}-priority.svg`}
                        alt={`${task.priority} priority`}
                        className="w-5 h-5 mr-2"
                      />
                      <p
                        className={`text-sm font-medium ${
                          task.priority === "high"
                            ? "text-red-500"
                            : task.priority === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            modifiers={{
              taskDates: tasks.map(task => task.dueDate)
            }}
            modifiersStyles={{
              taskDates: {
                fontWeight: 'bold',
                backgroundColor: 'lightblue',
                borderRadius: '50%'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
