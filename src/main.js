import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI'
//import VIntersection from './directives/VIntersection'
import directives from './directives'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
});

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

//app.directive('intersection', VIntersection)

app.use(store).use(router).mount('#app')
