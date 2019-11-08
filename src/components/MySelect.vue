<template>
    <v-select
            :items="items"
            item-text="label"
            item-value="slug"
            :label="name"
            @input="input"
            :value="selected.slug"
    ></v-select>
</template>

<script>
    import axios from "axios";
    import {PathHelper} from "../PathHelper";

    export default {
        name: 'MySelect',
        props: {
            name: {
                require: true,
                type: String
            },
            selected: {
                require: true,
                type: Object
            }
        },
        data: () => ({
            items: []
        }),
        async mounted() {
            let response = await axios.get(`https://beta.autobooking.com/api/test/v1/search/${this.name}`);
            this.items = response.data.data;
        },
        methods: {
            input(value) {
                let route = PathHelper.routeCreator(value, this.name);
                history.pushState(null, null, `http://localhost:8080/${route}`)
            },

        }
    };
</script>
