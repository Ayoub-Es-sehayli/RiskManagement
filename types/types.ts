export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};

export type ActivityDtoInput = {
  activity?: Maybe<Scalars['String']>;
  actor: Scalars['Int'];
  process: Scalars['Int'];
};

export type ActivityPayload = {
  __typename?: 'ActivityPayload';
  id: Scalars['Int'];
};

export type BooleanOperationFilterInput = {
  eq?: Maybe<Scalars['Boolean']>;
  neq?: Maybe<Scalars['Boolean']>;
};

export type Comments = {
  __typename?: 'Comments';
  canProfit?: Maybe<Scalars['String']>;
  evaluationInherent?: Maybe<EvaluationInherent>;
  evaluationInherentId: Scalars['Int'];
  id: Scalars['Int'];
  impactCreditRisk?: Maybe<Scalars['String']>;
  impactImageRisk?: Maybe<Scalars['String']>;
  impactInsatisfaction?: Maybe<Scalars['String']>;
  impactLegal?: Maybe<Scalars['String']>;
  impactMarketRisk?: Maybe<Scalars['String']>;
  impactOther?: Maybe<Scalars['String']>;
  impactProcessInterrupted?: Maybe<Scalars['String']>;
  impactRegulatory?: Maybe<Scalars['String']>;
};

export type CommentsDtoInput = {
  canProfit?: Maybe<Scalars['String']>;
  impactCreditRisk?: Maybe<Scalars['String']>;
  impactImageRisk?: Maybe<Scalars['String']>;
  impactInsatisfaction?: Maybe<Scalars['String']>;
  impactLegal?: Maybe<Scalars['String']>;
  impactMarketRisk?: Maybe<Scalars['String']>;
  impactOther?: Maybe<Scalars['String']>;
  impactProcessInterrupted?: Maybe<Scalars['String']>;
  impactRegulatory?: Maybe<Scalars['String']>;
};

export type CommentsFilterInput = {
  and?: Maybe<Array<CommentsFilterInput>>;
  canProfit?: Maybe<StringOperationFilterInput>;
  evaluationInherent?: Maybe<EvaluationInherentFilterInput>;
  evaluationInherentId?: Maybe<ComparableInt32OperationFilterInput>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  impactCreditRisk?: Maybe<StringOperationFilterInput>;
  impactImageRisk?: Maybe<StringOperationFilterInput>;
  impactInsatisfaction?: Maybe<StringOperationFilterInput>;
  impactLegal?: Maybe<StringOperationFilterInput>;
  impactMarketRisk?: Maybe<StringOperationFilterInput>;
  impactOther?: Maybe<StringOperationFilterInput>;
  impactProcessInterrupted?: Maybe<StringOperationFilterInput>;
  impactRegulatory?: Maybe<StringOperationFilterInput>;
  or?: Maybe<Array<CommentsFilterInput>>;
};

export type CommentsSortInput = {
  canProfit?: Maybe<SortEnumType>;
  evaluationInherent?: Maybe<EvaluationInherentSortInput>;
  evaluationInherentId?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  impactCreditRisk?: Maybe<SortEnumType>;
  impactImageRisk?: Maybe<SortEnumType>;
  impactInsatisfaction?: Maybe<SortEnumType>;
  impactLegal?: Maybe<SortEnumType>;
  impactMarketRisk?: Maybe<SortEnumType>;
  impactOther?: Maybe<SortEnumType>;
  impactProcessInterrupted?: Maybe<SortEnumType>;
  impactRegulatory?: Maybe<SortEnumType>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  neq?: Maybe<Scalars['DateTime']>;
  ngt?: Maybe<Scalars['DateTime']>;
  ngte?: Maybe<Scalars['DateTime']>;
  nin?: Maybe<Array<Scalars['DateTime']>>;
  nlt?: Maybe<Scalars['DateTime']>;
  nlte?: Maybe<Scalars['DateTime']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  neq?: Maybe<Scalars['Int']>;
  ngt?: Maybe<Scalars['Int']>;
  ngte?: Maybe<Scalars['Int']>;
  nin?: Maybe<Array<Scalars['Int']>>;
  nlt?: Maybe<Scalars['Int']>;
  nlte?: Maybe<Scalars['Int']>;
};

export type Domain = {
  __typename?: 'Domain';
  id: Scalars['Int'];
  macroProcesses?: Maybe<Array<Maybe<MacroProcess>>>;
  name?: Maybe<Scalars['String']>;
};

export type DomainFilterInput = {
  and?: Maybe<Array<DomainFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  macroProcesses?: Maybe<ListFilterInputTypeOfMacroProcessFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  or?: Maybe<Array<DomainFilterInput>>;
};

export type DomainSortInput = {
  id?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
};

export enum EDmrTypology {
  Curative = 'CURATIVE',
  Preventive = 'PREVENTIVE'
}

export type EDmrTypologyOperationFilterInput = {
  eq?: Maybe<EDmrTypology>;
  in?: Maybe<Array<EDmrTypology>>;
  neq?: Maybe<EDmrTypology>;
  nin?: Maybe<Array<EDmrTypology>>;
};

export enum EEfficency {
  Average = 'AVERAGE',
  Efficient = 'EFFICIENT',
  Inefficient = 'INEFFICIENT',
  Inexistant = 'INEXISTANT',
  Insuffisant = 'INSUFFISANT',
  NotApplicable = 'NOT_APPLICABLE'
}

export type EEfficencyOperationFilterInput = {
  eq?: Maybe<EEfficency>;
  in?: Maybe<Array<EEfficency>>;
  neq?: Maybe<EEfficency>;
  nin?: Maybe<Array<EEfficency>>;
};

export enum EFrequency {
  ExtremelyRare = 'EXTREMELY_RARE',
  Frequent = 'FREQUENT',
  Infrequent = 'INFREQUENT',
  Permanent = 'PERMANENT',
  Rare = 'RARE',
  VeryFrequent = 'VERY_FREQUENT'
}

export type EFrequencyOperationFilterInput = {
  eq?: Maybe<EFrequency>;
  in?: Maybe<Array<EFrequency>>;
  neq?: Maybe<EFrequency>;
  nin?: Maybe<Array<EFrequency>>;
};

export enum EImpactRating {
  Average = 'AVERAGE',
  High = 'HIGH',
  Insignificant = 'INSIGNIFICANT',
  Low = 'LOW',
  Severe = 'SEVERE',
  VeryHigh = 'VERY_HIGH'
}

export type EImpactRatingOperationFilterInput = {
  eq?: Maybe<EImpactRating>;
  in?: Maybe<Array<EImpactRating>>;
  neq?: Maybe<EImpactRating>;
  nin?: Maybe<Array<EImpactRating>>;
};

export enum ERiskRating {
  Average = 'AVERAGE',
  Critical = 'CRITICAL',
  Inacceptable = 'INACCEPTABLE',
  Low = 'LOW',
  Strong = 'STRONG'
}

export type ERiskRatingOperationFilterInput = {
  eq?: Maybe<ERiskRating>;
  in?: Maybe<Array<ERiskRating>>;
  neq?: Maybe<ERiskRating>;
  nin?: Maybe<Array<ERiskRating>>;
};

export type Entity = {
  __typename?: 'Entity';
  id: Scalars['Int'];
  identifications?: Maybe<Array<Maybe<Identification>>>;
  name?: Maybe<Scalars['String']>;
};

export type EntityFilterInput = {
  and?: Maybe<Array<EntityFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  identifications?: Maybe<ListFilterInputTypeOfIdentificationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  or?: Maybe<Array<EntityFilterInput>>;
};

export type EntitySortInput = {
  id?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
};

export type EvaluationDispositif = {
  __typename?: 'EvaluationDispositif';
  comment?: Maybe<Scalars['String']>;
  dmrGlobal: EEfficency;
  dmrTypology: EDmrTypology;
  id: Scalars['Int'];
  ratingNet: ERiskRating;
  risk?: Maybe<Risk>;
};

export type EvaluationDispositifDtoInput = {
  comment?: Maybe<Scalars['String']>;
  dmrGlobal: EEfficency;
  dmrTypology: EDmrTypology;
  ratingNet: ERiskRating;
};

export type EvaluationDispositifFilterInput = {
  and?: Maybe<Array<EvaluationDispositifFilterInput>>;
  comment?: Maybe<StringOperationFilterInput>;
  dmrGlobal?: Maybe<EEfficencyOperationFilterInput>;
  dmrTypology?: Maybe<EDmrTypologyOperationFilterInput>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  or?: Maybe<Array<EvaluationDispositifFilterInput>>;
  ratingNet?: Maybe<ERiskRatingOperationFilterInput>;
  risk?: Maybe<RiskFilterInput>;
};

export type EvaluationDispositifSortInput = {
  comment?: Maybe<SortEnumType>;
  dmrGlobal?: Maybe<SortEnumType>;
  dmrTypology?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  ratingNet?: Maybe<SortEnumType>;
  risk?: Maybe<RiskSortInput>;
};

export type EvaluationInherent = {
  __typename?: 'EvaluationInherent';
  canProfit: Scalars['Boolean'];
  comments?: Maybe<Comments>;
  frequency: EFrequency;
  id: Scalars['Int'];
  impactCreditRisk: Scalars['Boolean'];
  impactImageRisk: Scalars['Boolean'];
  impactInsatisfaction: Scalars['Boolean'];
  impactLegal: Scalars['Boolean'];
  impactMarketRisk: Scalars['Boolean'];
  impactOther: Scalars['Boolean'];
  impactProcessInterrupted: Scalars['Boolean'];
  impactRaw: EImpactRating;
  impactRegulatory: Scalars['Boolean'];
  ratingRaw: ERiskRating;
  risk?: Maybe<Risk>;
};

export type EvaluationInherentDtoInput = {
  canProfit: Scalars['Boolean'];
  comments?: Maybe<CommentsDtoInput>;
  frequency: EFrequency;
  impactCreditRisk: Scalars['Boolean'];
  impactImageRisk: Scalars['Boolean'];
  impactInsatisfaction: Scalars['Boolean'];
  impactLegal: Scalars['Boolean'];
  impactMarketRisk: Scalars['Boolean'];
  impactOther: Scalars['Boolean'];
  impactProcessInterrupted: Scalars['Boolean'];
  impactRaw: EImpactRating;
  impactRegulatory: Scalars['Boolean'];
  ratingRaw: ERiskRating;
};

export type EvaluationInherentFilterInput = {
  and?: Maybe<Array<EvaluationInherentFilterInput>>;
  canProfit?: Maybe<BooleanOperationFilterInput>;
  comments?: Maybe<CommentsFilterInput>;
  frequency?: Maybe<EFrequencyOperationFilterInput>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  impactCreditRisk?: Maybe<BooleanOperationFilterInput>;
  impactImageRisk?: Maybe<BooleanOperationFilterInput>;
  impactInsatisfaction?: Maybe<BooleanOperationFilterInput>;
  impactLegal?: Maybe<BooleanOperationFilterInput>;
  impactMarketRisk?: Maybe<BooleanOperationFilterInput>;
  impactOther?: Maybe<BooleanOperationFilterInput>;
  impactProcessInterrupted?: Maybe<BooleanOperationFilterInput>;
  impactRaw?: Maybe<EImpactRatingOperationFilterInput>;
  impactRegulatory?: Maybe<BooleanOperationFilterInput>;
  or?: Maybe<Array<EvaluationInherentFilterInput>>;
  ratingRaw?: Maybe<ERiskRatingOperationFilterInput>;
  risk?: Maybe<RiskFilterInput>;
};

export type EvaluationInherentSortInput = {
  canProfit?: Maybe<SortEnumType>;
  comments?: Maybe<CommentsSortInput>;
  frequency?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  impactCreditRisk?: Maybe<SortEnumType>;
  impactImageRisk?: Maybe<SortEnumType>;
  impactInsatisfaction?: Maybe<SortEnumType>;
  impactLegal?: Maybe<SortEnumType>;
  impactMarketRisk?: Maybe<SortEnumType>;
  impactOther?: Maybe<SortEnumType>;
  impactProcessInterrupted?: Maybe<SortEnumType>;
  impactRaw?: Maybe<SortEnumType>;
  impactRegulatory?: Maybe<SortEnumType>;
  ratingRaw?: Maybe<SortEnumType>;
  risk?: Maybe<RiskSortInput>;
};

export type EvaluationResiduel = {
  __typename?: 'EvaluationResiduel';
  controlAutoDescription?: Maybe<Scalars['String']>;
  controlAutoEfficency: EEfficency;
  controlLevelDescription?: Maybe<Scalars['String']>;
  controlLevelEfficency: EEfficency;
  id: Scalars['Int'];
  procedureCircularDescription?: Maybe<Scalars['String']>;
  procedureCircularEfficency: EEfficency;
  risk?: Maybe<Risk>;
  sensibilisationFormationDescription?: Maybe<Scalars['String']>;
  sensibilisationFormationEfficency: EEfficency;
};

export type EvaluationResiduelDtoInput = {
  controlAutoDescription?: Maybe<Scalars['String']>;
  controlAutoEfficency: EEfficency;
  controlLevelDescription?: Maybe<Scalars['String']>;
  controlLevelEfficency: EEfficency;
  procedureCircularDescription?: Maybe<Scalars['String']>;
  procedureCircularEfficency: EEfficency;
  sensibilisationFormationDescription?: Maybe<Scalars['String']>;
  sensibilisationFormationEfficency: EEfficency;
};

export type EvaluationResiduelFilterInput = {
  and?: Maybe<Array<EvaluationResiduelFilterInput>>;
  controlAutoDescription?: Maybe<StringOperationFilterInput>;
  controlAutoEfficency?: Maybe<EEfficencyOperationFilterInput>;
  controlLevelDescription?: Maybe<StringOperationFilterInput>;
  controlLevelEfficency?: Maybe<EEfficencyOperationFilterInput>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  or?: Maybe<Array<EvaluationResiduelFilterInput>>;
  procedureCircularDescription?: Maybe<StringOperationFilterInput>;
  procedureCircularEfficency?: Maybe<EEfficencyOperationFilterInput>;
  risk?: Maybe<RiskFilterInput>;
  sensibilisationFormationDescription?: Maybe<StringOperationFilterInput>;
  sensibilisationFormationEfficency?: Maybe<EEfficencyOperationFilterInput>;
};

export type EvaluationResiduelSortInput = {
  controlAutoDescription?: Maybe<SortEnumType>;
  controlAutoEfficency?: Maybe<SortEnumType>;
  controlLevelDescription?: Maybe<SortEnumType>;
  controlLevelEfficency?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  procedureCircularDescription?: Maybe<SortEnumType>;
  procedureCircularEfficency?: Maybe<SortEnumType>;
  risk?: Maybe<RiskSortInput>;
  sensibilisationFormationDescription?: Maybe<SortEnumType>;
  sensibilisationFormationEfficency?: Maybe<SortEnumType>;
};

export type Identification = {
  __typename?: 'Identification';
  causes?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  impactedEntities?: Maybe<Array<Maybe<Entity>>>;
  impactsOthers: Scalars['Boolean'];
  process?: Maybe<Process>;
  processId: Scalars['Int'];
  riskCause?: Maybe<Scalars['String']>;
  riskName?: Maybe<Scalars['String']>;
};

export type IdentificationDtoInput = {
  causes?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  impactedEntities?: Maybe<Array<Maybe<ImpactedEntityDtoInput>>>;
  impactsOthers: Scalars['Boolean'];
  process: Scalars['Int'];
  riskCause?: Maybe<Scalars['String']>;
  riskName?: Maybe<Scalars['String']>;
};

export type IdentificationFilterInput = {
  and?: Maybe<Array<IdentificationFilterInput>>;
  causes?: Maybe<StringOperationFilterInput>;
  description?: Maybe<StringOperationFilterInput>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  impactedEntities?: Maybe<ListFilterInputTypeOfEntityFilterInput>;
  impactsOthers?: Maybe<BooleanOperationFilterInput>;
  or?: Maybe<Array<IdentificationFilterInput>>;
  process?: Maybe<ProcessFilterInput>;
  processId?: Maybe<ComparableInt32OperationFilterInput>;
  riskCause?: Maybe<StringOperationFilterInput>;
  riskName?: Maybe<StringOperationFilterInput>;
};

export type IdentificationSortInput = {
  causes?: Maybe<SortEnumType>;
  description?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  impactsOthers?: Maybe<SortEnumType>;
  process?: Maybe<ProcessSortInput>;
  processId?: Maybe<SortEnumType>;
  riskCause?: Maybe<SortEnumType>;
  riskName?: Maybe<SortEnumType>;
};

export type ImpactedEntityDtoInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type ListFilterInputTypeOfEntityFilterInput = {
  all?: Maybe<EntityFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
  none?: Maybe<EntityFilterInput>;
  some?: Maybe<EntityFilterInput>;
};

export type ListFilterInputTypeOfIdentificationFilterInput = {
  all?: Maybe<IdentificationFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
  none?: Maybe<IdentificationFilterInput>;
  some?: Maybe<IdentificationFilterInput>;
};

export type ListFilterInputTypeOfMacroProcessFilterInput = {
  all?: Maybe<MacroProcessFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
  none?: Maybe<MacroProcessFilterInput>;
  some?: Maybe<MacroProcessFilterInput>;
};

export type ListFilterInputTypeOfProcessFilterInput = {
  all?: Maybe<ProcessFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
  none?: Maybe<ProcessFilterInput>;
  some?: Maybe<ProcessFilterInput>;
};

export type MacroProcess = {
  __typename?: 'MacroProcess';
  domain?: Maybe<Domain>;
  domainId: Scalars['Int'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  processes?: Maybe<Array<Maybe<Process>>>;
};

export type MacroProcessFilterInput = {
  and?: Maybe<Array<MacroProcessFilterInput>>;
  domain?: Maybe<DomainFilterInput>;
  domainId?: Maybe<ComparableInt32OperationFilterInput>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  or?: Maybe<Array<MacroProcessFilterInput>>;
  processes?: Maybe<ListFilterInputTypeOfProcessFilterInput>;
};

export type MacroProcessSortInput = {
  domain?: Maybe<DomainSortInput>;
  domainId?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addActivity?: Maybe<ActivityPayload>;
  addRisk?: Maybe<RiskPayload>;
};


export type MutationAddActivityArgs = {
  input?: Maybe<ActivityDtoInput>;
};


export type MutationAddRiskArgs = {
  input?: Maybe<RiskFormDtoInput>;
};

export type Position = {
  __typename?: 'Position';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type PositionFilterInput = {
  and?: Maybe<Array<PositionFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  or?: Maybe<Array<PositionFilterInput>>;
};

export type PositionSortInput = {
  id?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
};

export type Process = {
  __typename?: 'Process';
  id: Scalars['Int'];
  macroProcess?: Maybe<MacroProcess>;
  macroProcessId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type ProcessFilterInput = {
  and?: Maybe<Array<ProcessFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  macroProcess?: Maybe<MacroProcessFilterInput>;
  macroProcessId?: Maybe<ComparableInt32OperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  or?: Maybe<Array<ProcessFilterInput>>;
};

export type ProcessSortInput = {
  id?: Maybe<SortEnumType>;
  macroProcess?: Maybe<MacroProcessSortInput>;
  macroProcessId?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  entity?: Maybe<Array<Maybe<Entity>>>;
  position?: Maybe<Array<Maybe<Position>>>;
  process?: Maybe<Array<Maybe<Process>>>;
  risk?: Maybe<Array<Maybe<Risk>>>;
};


export type QueryEntityArgs = {
  order?: Maybe<Array<EntitySortInput>>;
  where?: Maybe<EntityFilterInput>;
};


export type QueryPositionArgs = {
  order?: Maybe<Array<PositionSortInput>>;
  where?: Maybe<PositionFilterInput>;
};


export type QueryProcessArgs = {
  order?: Maybe<Array<ProcessSortInput>>;
  where?: Maybe<ProcessFilterInput>;
};


export type QueryRiskArgs = {
  order?: Maybe<Array<RiskSortInput>>;
  where?: Maybe<RiskFilterInput>;
};

export type Risk = {
  __typename?: 'Risk';
  dateStamp: Scalars['DateTime'];
  evaluationDispositif?: Maybe<EvaluationDispositif>;
  evaluationDispositifId: Scalars['Int'];
  evaluationInherent?: Maybe<EvaluationInherent>;
  evaluationInherentId: Scalars['Int'];
  evaluationResiduel?: Maybe<EvaluationResiduel>;
  evaluationResiduelId: Scalars['Int'];
  id: Scalars['Int'];
  identification?: Maybe<Identification>;
  identificationId: Scalars['Int'];
};

export type RiskFilterInput = {
  and?: Maybe<Array<RiskFilterInput>>;
  dateStamp?: Maybe<ComparableDateTimeOperationFilterInput>;
  evaluationDispositif?: Maybe<EvaluationDispositifFilterInput>;
  evaluationDispositifId?: Maybe<ComparableInt32OperationFilterInput>;
  evaluationInherent?: Maybe<EvaluationInherentFilterInput>;
  evaluationInherentId?: Maybe<ComparableInt32OperationFilterInput>;
  evaluationResiduel?: Maybe<EvaluationResiduelFilterInput>;
  evaluationResiduelId?: Maybe<ComparableInt32OperationFilterInput>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  identification?: Maybe<IdentificationFilterInput>;
  identificationId?: Maybe<ComparableInt32OperationFilterInput>;
  or?: Maybe<Array<RiskFilterInput>>;
};

export type RiskFormDtoInput = {
  evaluationDispositif?: Maybe<EvaluationDispositifDtoInput>;
  evaluationInherent?: Maybe<EvaluationInherentDtoInput>;
  evaluationResiduel?: Maybe<EvaluationResiduelDtoInput>;
  identification?: Maybe<IdentificationDtoInput>;
};

export type RiskPayload = {
  __typename?: 'RiskPayload';
  id: Scalars['Int'];
};

export type RiskSortInput = {
  dateStamp?: Maybe<SortEnumType>;
  evaluationDispositif?: Maybe<EvaluationDispositifSortInput>;
  evaluationDispositifId?: Maybe<SortEnumType>;
  evaluationInherent?: Maybe<EvaluationInherentSortInput>;
  evaluationInherentId?: Maybe<SortEnumType>;
  evaluationResiduel?: Maybe<EvaluationResiduelSortInput>;
  evaluationResiduelId?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  identification?: Maybe<IdentificationSortInput>;
  identificationId?: Maybe<SortEnumType>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: Maybe<Array<StringOperationFilterInput>>;
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  ncontains?: Maybe<Scalars['String']>;
  nendsWith?: Maybe<Scalars['String']>;
  neq?: Maybe<Scalars['String']>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  nstartsWith?: Maybe<Scalars['String']>;
  or?: Maybe<Array<StringOperationFilterInput>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type AddActivityMutationVariables = Exact<{
  activity: ActivityDtoInput;
}>;


export type AddActivityMutation = { __typename?: 'Mutation', addActivity?: { __typename?: 'ActivityPayload', id: number } | null | undefined };

export type AddRiskMutationVariables = Exact<{
  risk: RiskFormDtoInput;
}>;


export type AddRiskMutation = { __typename?: 'Mutation', addRisk?: { __typename?: 'RiskPayload', id: number } | null | undefined };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', entity?: Array<{ __typename?: 'Entity', id: number, name?: string | null | undefined } | null | undefined> | null | undefined };

export type Unnamed_2_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_2_Query = { __typename?: 'Query', position?: Array<{ __typename?: 'Position', id: number, name?: string | null | undefined } | null | undefined> | null | undefined };

export type Unnamed_3_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_3_Query = { __typename?: 'Query', process?: Array<{ __typename?: 'Process', id: number, name?: string | null | undefined, macroProcess?: { __typename?: 'MacroProcess', name?: string | null | undefined, domain?: { __typename?: 'Domain', name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined> | null | undefined };
