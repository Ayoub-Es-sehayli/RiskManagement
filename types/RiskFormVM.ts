export type IdentificationVM = {
  riskName: string
  riskCause?: string
  process: number
  description?: string
  impactsOthers: boolean
  impactedEntities: ImpactedEntityVM[]
  causes: CauseVM[]
}
export type EvaluationInherentVM = {
  frequency: number
  impactRaw: number
  ratingRaw: number
  canProfit: boolean
  impactRegulatory: boolean
  impactLegal: boolean
  impactImageRisk: boolean
  impactInsatisfaction: boolean
  impactCreditRisk: boolean
  impactMarketRisk: boolean
  impactProcessInterrupted: boolean
  impactOther: boolean
  comments: CommentsVM
}
export type EvaluationResiduelVM = {
  controlLevelEfficency: number
  controlLevelsDescription?: string
  controlAutoEfficency: number
  controlAutoDescription?: string
  procedureCircularEfficency: number
  procedureCircularDescription?: string
  sensibilisationFormationEfficency: number
  sensibilisationFormationDescription?: string
}
export type EvaluationDispositifVM = {
  dmrGlobal: number
  dmrTypology: number
  ratingNet: number
  comment?: string
}
type RiskFormVM = {
  identification: IdentificationVM
  evaluationInherent: EvaluationInherentVM
  evaluationResiduel: EvaluationResiduelVM
  evaluationDispositif: EvaluationDispositifVM
}
export default RiskFormVM;


export type ImpactedEntityVM = {
  id: number
  name: string
}
export type CauseVM = {
  cause: string
}

export interface ICommentsVM {
  [key: string]: string | undefined;
}

export type CommentsVM = {
  canProfit?: string
  impactRegulatory?: string
  impactLegal?: string
  impactImageRisk?: string
  impactInsatisfaction?: string
  impactCreditRisk?: string
  impactMarketRisk?: string
  impactProcessInterrupted?: string
  impactOther?: string
}