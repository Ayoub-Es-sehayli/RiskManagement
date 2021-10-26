import * as yup from 'yup';
import ActivityVM from '../ActivityVM';

export const ActivitySchema:
  yup.SchemaOf<ActivityVM> = yup.object({
    activity: yup.string().required("L'activité est requis").max(150, "Ce Champs support un maximum de 150 charactères"),
    actor: yup.number().integer().required("L'acteur risque est requis").min(1, "Vous devez sélectionner un acteur risque"),
    process: yup.number().integer().required("Le processus est requis").min(1, "Vous devez sélectionner un processus")
  })
