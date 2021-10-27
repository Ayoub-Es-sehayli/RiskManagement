import * as yup from 'yup'
import { IdentificationVM, EvaluationInherentVM, EvaluationResiduelVM, EvaluationDispositifVM, CommentsVM } from '@/types/RiskFormVM'
import RiskFormVM from '@/types/RiskFormVM'

export const IdentificationSchema: yup.SchemaOf<IdentificationVM>
  = yup.object({
    riskName: yup.string()
      .required("Le champs est obligatoire")
      .min(15, "Le champs est trops court")
      .max(50, `Ce Champs support seulement un maximun de 50 Charactères`),
    riskCause: yup.string()
      .min(5, "Le champs est trops court")
      .max(50, `Ce Champs support seulement un maximun de 50 Charactères`),
    process: yup.number().required().min(1, "Sélectionner un processus"),
    description: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactsOthers: yup.boolean().required("Ce Champs est requis"),
    impactedEntities: yup.array(
      yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
      })).required().max(3, "Vous pouvez seulement sélectionner 3 Entitées"),
    causes: yup.array(
      yup.object({
        cause: yup.string()
          .required("Ce Champs est requis")
          .max(100, "Ce Champs support seulement 100 Charactères")
      }).defined())
      .min(1, "Un minimun d'une cause doit être spécifié")
      .max(4, "Ce Champs support un maximum de 4 entrées"),
  }).defined()

const CommentsSchema: yup.SchemaOf<CommentsVM>
  = yup.object({
    canProfit: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactRegulatory: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactLegal: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactImageRisk: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactInsatisfaction: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactCreditRisk: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactMarketRisk: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactProcessInterrupted: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères"),
    impactOther: yup.string()
      .max(200, "Ce Champs support seulement 200 Charactères")

  })

export const EvaluationInherentSchema: yup.SchemaOf<EvaluationInherentVM>
  = yup.object({
    frequency: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    impactRaw: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    ratingRaw: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    canProfit: yup.boolean()
      .required("Le champs est obligatoire"),
    impactRegulatory: yup.boolean()
      .required("Le champs est obligatoire"),
    impactLegal: yup.boolean()
      .required("Le champs est obligatoire"),
    impactImageRisk: yup.boolean()
      .required("Le champs est obligatoire"),
    impactInsatisfaction: yup.boolean()
      .required("Le champs est obligatoire"),
    impactCreditRisk: yup.boolean()
      .required("Le champs est obligatoire"),
    impactMarketRisk: yup.boolean()
      .required("Le champs est obligatoire"),
    impactProcessInterrupted: yup.boolean()
      .required("Le champs est obligatoire"),
    impactOther: yup.boolean()
      .required("Le champs est obligatoire"),
    comments: CommentsSchema.defined()
  }).defined()

export const EvaluationResiduelSchema: yup.SchemaOf<EvaluationResiduelVM>
  = yup.object({
    controlLevelEfficency: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    controlLevelsDescription: yup.string()
      .max(200, "Ce champs support un maximum de 200 charactères"),
    controlAutoEfficency: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    controlAutoDescription: yup.string()
      .max(200, "Ce champs support un maximum de 200 charactères"),
    procedureCircularEfficency: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    procedureCircularDescription: yup.string()
      .max(200, "Ce champs support un maximum de 200 charactères"),
    sensibilisationFormationEfficency: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    sensibilisationFormationDescription: yup.string()
      .max(200, "Ce champs support un maximum de 200 charactères"),
  }).defined()

export const EvaluationDispositifSchema: yup.SchemaOf<EvaluationDispositifVM>
  = yup.object({
    dmrGlobal: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    dmrTypology: yup.number()
      .required("Le champs est obligatoire")
      .min(1)
      .max(2),
    ratingNet: yup.number()
      .required("Le champs est obligatoire")
      .min(0)
      .max(5),
    comment: yup.string()
  }).defined()


export const RiskFormSchema: yup.SchemaOf<RiskFormVM> = yup.object({
  identification: IdentificationSchema,
  evaluationInherent: EvaluationInherentSchema,
  evaluationResiduel: EvaluationResiduelSchema,
  evaluationDispositif: EvaluationDispositifSchema,
}).defined()
