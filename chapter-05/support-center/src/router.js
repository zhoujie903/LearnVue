import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import FAQ from './components/FAQ'
import Login from './components/Login.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import Tickets from './components/Tickets.vue'
import Ticket from './components/Ticket.vue'
import NewTicket from './components/NewTicket.vue'
import NotFound from './components/NotFound.vue'
import state from './state'

Vue.use(VueRouter)

const routes = [
    {path:'/', name:'home',component:Home},
    {path:'/faq', name:'faq',component:FAQ},
    {path:'/login', name:'login', component:Login,meta:{
        guest:true
    }},
    {
        path:'/tickets', 
        // name:'tickets', 
        component:TicketsLayout,meta:{
        private:true
        },
        children:[
            {path:'',name:'tickets',component:Tickets},
            {path:'new',name:'new-ticket',component:NewTicket},
            {path:':id',name:'ticket', component:Ticket,props:true},
        ]
    },
    {path:'*',component:NotFound}
]

const router = new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { selector: to.hash}
        } else {
            return { x:0, y:0}
        }
    }
})

router.beforeEach((to, from,next)=>{
    if (to.matched.some(r=>r.meta.private) && !state.user){
        next({
            name:'login',
            params:{
                wantedRoute:to.fullpath,
            }
        })
        return
    }

    if (to.matched.some(r=>r.meta.guest) && state.user) {
        next({name:'home'})
        return
    }
    next()
})

export default router

