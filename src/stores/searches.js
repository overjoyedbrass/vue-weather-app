import { defineStore } from "pinia";
import { reactive } from 'vue';
export const useSearchStore = defineStore("search", () => {
    const searches = reactive({})
    function addSearch(search) {
        searches[search.name] = search
    }
    return { searches, addSearch };
});
