<template>
    <v-app>
        <v-layout align-center justify-center>
            <v-progress-circular v-if="!isDataReady" :size="150"></v-progress-circular>
            <v-card v-else class="mx-auto" width="600">
                <v-card-text class="text--primary">
                    <my-select name="terms" :selected="items.service"></my-select>
                    <my-select name="brands_terms" :selected="items.brand"></my-select>
                    <my-select name="styles" :selected="items.style"></my-select>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-app>
</template>

<script>

    import MySelect from "./components/MySelect";
    import {PathHelper} from "./PathHelper";
    import axios from "axios";

    export default {
        name: 'App',
        components: {MySelect},
        data: () => ({
            isDataReady: false,
            items: {}
        }),
        async mounted() {
            let params = this.objToGetParams(PathHelper.getClearArrayOfSelectedPath());
            let response = await axios.get(`https://beta.autobooking.com/api/test/v1/search/parse_link?${params}`);
            this.isDataReady = true;
            this.items = response.data;
        },
        methods: {
            objToGetParams(obj) {
                return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')
            }
        }
    };
</script>
