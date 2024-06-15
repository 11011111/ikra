import {boot} from 'quasar/wrappers'
import Particles from "particles.vue3";
// import { loadSlim } from "@tsparticles/slim";

//
// export default boot(({ app }) => {
//   app.config.globalProperties.v$ = useVuelidate()
// })

export default boot(({ app }) => {
  app.use(Particles)
})
