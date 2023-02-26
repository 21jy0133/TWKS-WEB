<template>

        <div class="images pa-8" v-viewer>
            <v-row>
                <v-col cols="3"
                    v-for="image in filteredImages">
                    <v-img :src="staticEndpoint + image.path"> </v-img>
                </v-col>
            </v-row>
        </div>
</template>


<script>
import ScreenshotDataService from '../services/screenshotData.service';






export default {
    name: "App",

    data() {

        return {
            index: 0,
            images: null,
            staticEndpoint: import.meta.env.VITE_API_ENDPOINT + 'static/screenshot/',
            startIndex: 0,
            maxIndex: 100,
        };
    },
    computed: {
        filteredImages() {
            if (this.pickedTimeSlot && this.images){
                return this.images.filter(x=> new Date(x.datetime).getHours() == this.pickedTimeSlot)
            }
            return []
        },
    },
    props: [
        'empId',
        'pickedDate',
        'pickedTimeSlot',
    ],
    watch: {
        pickedDate() {
            this.updateGallery()
        },
        empId() {
            this.updateGallery()
        },
        /*
        pickedTimeSlot(){
            this.updateGallery()
        }*/
    },

    methods: {
        last() {
            if (this.startIndex == 0)
                return
            this.startIndex = (this.startIndex - 1) % this.maxIndex;
        },
        next() {
            this.startIndex = (this.startIndex + 1) % this.maxIndex;
        },

        updateGallery() {
            if (!this.empId || !this.pickedDate)
                return


            ScreenshotDataService.seachEmpIdData(this.empId, this.pickedDate.toLocaleString('sv').slice(0, 10)).then(res => {

                this.images = res.data._embedded.screenshot

            })
        }
    },
    mounted() {
        this.updateGallery()
    }

}

</script>
<style scoped></style>
