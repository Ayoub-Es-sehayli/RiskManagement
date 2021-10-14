export type IdentificationVM = {
  riskName: string
  riskCause: string
  process: number
  description: string
  impacts_others: boolean
  impacted_entities: ImpactedEntityVM[]
  causes: CauseVM[]
}
export type EvaluationInherentVM = {
  frequency: number
  impact_raw: number
  rating_raw: number
  can_profit: boolean
  impact_regulatory: boolean
  impact_legal: boolean
  impact_image_risk: boolean
  impact_insatisfaction: boolean
  impact_credit_risk: boolean
  impact_market_risk: boolean
  impact_process_interrupted: boolean
  impact_other: boolean
  comments: {
    can_profit: string
    impact_regulatory: string
    impact_legal: string
    impact_image_risk: string
    impact_insatisfaction: string
    impact_credit_risk: string
    impact_market_risk: string
    impact_process_interrupted: string
    impacts_other: string
    [key: string]: string;
  }
}
export type EvaluationResiduelVM = {
  control_levels_efficency: number
  control_levels_description: string
  control_auto_efficency: number
  control_auto_description: string
  procedure_circular_efficency: number
  procedure_circular_description: string
  sensibilisation_formation_efficency: number
  sensibilisation_formation_description: string
}
export type EvaluationDispositifVM = {
  dmr_global: number
  dmr_typology: number
  rating_net: number
  comment: string
}
type RiskFormVM = {
  identification: IdentificationVM
  evaluation_inherent: EvaluationInherentVM
  evaluation_residuel: EvaluationResiduelVM
  evaluation_dispositif: EvaluationDispositifVM
}
export default RiskFormVM;


export type ImpactedEntityVM = {
  id: number
  name: string
}
export type CauseVM = {
  cause: string
}