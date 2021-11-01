export type DomainListVM = {
  id: number
  name: string
  macroProcesses: MacroProcessesListVM[]
}
export type MacroProcessesListVM = {
  id: number
  name: string
  processes: ProcessListVM[]
}

export type ProcessListVM = {
  id: number
  name: string
  activities: ActivityListVM[]
}

export type ActivityListVM = {
  id: number
  name: string
}