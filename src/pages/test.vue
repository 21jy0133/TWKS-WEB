<template>
    <v-app>
        <v-date-picker v-model="date" :no-title="true" :locale="locale" :first-day-of-week="1"
            :allowed-dates="allowedDates"></v-date-picker>
    </v-app>
</template>
  
<script>
export default {
    data() {
        return {
            date: null,
            locale: 'zh-cn',
            allowedDates: {
                // 允许选择的日期范围
                start: new Date(2023, 0, 1),
                end: new Date(2023, 11, 31),
            }
        }
    }
}
</script>
  