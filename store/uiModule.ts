import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import { $apollo } from "@/utils/apolloClient"
import ProcessVM from "@/types/ProcessVM";
import getProcesses from "../apollo/query/getProcesses.gql"

@Module({
  name: 'uiModule',
  stateFactory: true
})
export default class UiModule extends VuexModule {
  pageTitle!: string

  @Mutation
  SetTitle(title: string) {
    this.pageTitle = title
  }

  @Action
  ChangeTitle(title: string) {
    this.context.commit("SetTitle", title)
  }
}