import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import RiskFormVM from "~/types/RiskFormVM";

@Module({
  name: 'riskModule',
  stateFactory: true
})
export default class RiskModule extends VuexModule {
  currentRisk: RiskFormVM | null = null

  @Mutation
  SetCurrentRisk(risk: RiskFormVM) {
    this.currentRisk = risk
  }

  @Mutation
  SetImpactComment(payload: { impact: string, comment: string }) {
    this.currentRisk!!.evaluationInherent.comments[payload.impact] = payload.comment;
  }

  @Action
  StoreRisk(risk: RiskFormVM) {
    this.context.commit('SetCurrentRisk', risk)
  }

  @Action
  CommentOn(payload: { impact: string, comment: string }) {
    this.context.commit('SetImpactComment', payload)
  }
}