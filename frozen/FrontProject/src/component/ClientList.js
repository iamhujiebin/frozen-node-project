import Context from '../context';
import Tpl from './ClientList.html';

const ClientList = Vue.component("client-list", {
    template: Tpl,

    data() {
        return {
            clients: ["结冰", "梦茵"],
        };
    },

    methods: {
        /**
         * 
         * @param {Context} context 
         */
        setContext(context) {
            this._context = context;
        },
        setClients(clients) {
            this.clients.length = 0;
            this.clients.push(...clients);
        }
    }
});

export default ClientList;